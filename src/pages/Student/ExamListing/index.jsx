import React, { useEffect, useState } from "react";
import StudentLayout from "../../../Layout/StudentLayout";
import axios from "axios";
import { apiEndpoints } from "../../../api";
import { ImSpinner2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";

const ExamListing = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);

  const navigate = useNavigate();

  const fetchQuestions = () => {
    setLoading(true);
    axios
      .get(apiEndpoints.QUESTION)
      .then((res) => {
        setQuestions(res.data.data);
        console.log(res);
      })
      .catch((e) => console.log(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <StudentLayout>
      {loading ? (
        <div className="h-[calc(100vh-64px)] w-full grid place-content-center">
          {" "}
          <ImSpinner2 size={20} className="animate-spin" />{" "}
        </div>
      ) : (
        <>
          {!questions.length ? (
            <div className="h-[calc(100vh-64px)] w-full grid place-content-center text-center">
              <p className="font-semibold">No Exam Found at the minute.</p>
              <p>Keep Refreshing the page or Contact Admin for Support</p>
              <button
                onClick={() => window.location.reload()}
                className="text-white text-xs bg-green-800 w-24 rounded py-1.5  font-medium  mt-1 m-auto"
              >
                REFRESH
              </button>
            </div>
          ) : (
            <div className="p-5 pb-3 flex h-[calc(100vh-64px)]">
              <div className="flex flex-col flex-1 ">
                <p className="font-semibold mb-2">Your Courses</p>

                <div className="grid grid-cols-4 gap-5 h-36">
                  {questions.map((qst, idx) => (
                    <div
                      key={idx}
                      className="bg-blue-300 rounded p-5 flex flex-col"
                    >
                      <p className="text-center">Title: {qst.title}</p>
                      <p className="text-center -mt-1 mb-2">
                        Duration: {qst?.duration} mins
                      </p>
                      <div className="mt-auto flex justify-center">
                        <button
                          onClick={() =>
                            navigate("/student", {
                              state: { title: qst.title, id: qst._id },
                            })
                          }
                          className="text-white bg-green-800 w-28 rounded py-2 text-sm m-auto"
                        >
                          Start Exam
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* <div className="flex gap-1">
              <p>{"Subject =>"}</p>
              <p>CPT 523</p>
            </div>
            <div className="flex gap-1">
              <p>{"Date =>"}</p>
              <p>Thur, 19th Oct 2022</p>
            </div>
            <div className="flex gap-1">
              <p>{"Session =>"}</p>
              <p>2021 / 2022</p>
            </div>
            <div className="flex gap-1">
              <p>{"Instruction =>"}</p>
              <p>
                Attempt all questions. This exam is closed book, closed laptop.
              </p>
            </div> */}

                <div className="flex justify-end gap-2 mt-auto">
                  <button className="text-white bg-cyan-700 w-28 rounded py-2 text-sm">
                    Prev
                  </button>
                  <button
                    onClick={() => window.location.reload()}
                    className="text-white bg-green-800 w-28 rounded py-2 text-sm"
                  >
                    Refresh Page
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </StudentLayout>
  );
};

export default ExamListing;
