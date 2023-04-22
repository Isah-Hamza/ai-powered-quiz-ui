import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import StudentLayout from "../../../Layout/StudentLayout";
import axios from "axios";
import { apiEndpoints } from "../../../api";
import { ImSpinner2 } from "react-icons/im";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment/moment";
import { toast } from "react-toastify";
import clock from "../../../assets/images/icons8-time-80.png";
import CountdownTimer from "../../../components/CountdownTimer";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [question, setQuestion] = useState({});
  const [currentQst, setCurrentQst] = useState(0);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState({});
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const submitRef = useRef(null);

  const { duration, instruction, qa = [], lecturer, session } = question;
  const { title, id } = useLocation().state;

  const fetchQuestion = (title) => {
    setLoading(true);
    axios
      .get(apiEndpoints.QUESTION + "/" + title)
      .then((res) => {
        setQuestion(res.data.data);
      })
      .catch((e) => {
        console.log(e.message);
      })
      .finally(() => setLoading(false));
  };

  const submitAnswer = ({ title, payload }) => {
    setSubmitting(true);
    axios
      .post(`${apiEndpoints.QUESTION}/${id}`, payload)
      .then((res) => {
        setResult(res.data.result);
        navigate("/student/score", { state: { result: res.data.result } });
        toast.success("Done and Submitted successfully.", { theme: "colored" });
        console.log(res);
      })
      .catch((e) => {
        toast.error(
          e.response.data.error.message || "An error occured. Try again.",
          {
            theme: "colored",
          }
        );
        console.log(e);
      })
      .finally(() => setSubmitting(false));
  };

  const handleSubmit = () => {
    if (answer === "") {
      toast.error("You are required to provide an answer before submitting", {
        theme: "colored",
      });
      return;
    }

    const payload = {
      answer: qa,
      id: window.localStorage.getItem("user-id"),
    };

    submitAnswer({ title, payload });
  };

  const handleNext = () => {
    if (answer === "") {
      toast.error("You are required to provide an answer before proceeding", {
        theme: "colored",
      });
      return;
    }
    if (qa.length !== currentQst + 1) {
      setCurrentQst((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQst !== 0) {
      setCurrentQst((prev) => prev - 1);
    }
  };

  const timeUp = () => {
    qa?.map((item) => {
      if (!item.user_answer) {
        item.user_answer = "";
      }
    });

    const payload = {
      answer: qa,
      id: window.localStorage.getItem("user-id"),
    };

    submitAnswer({ title, payload });
  };

  useEffect(() => {
    qa?.map((item, idx) => {
      if (idx === currentQst) item.user_answer = answer;
    });
  }, [answer]);

  useEffect(() => {
    if (qa[currentQst]?.user_answer) setAnswer(qa[currentQst]?.user_answer);
    else setAnswer("");
  }, [currentQst]);

  useEffect(() => {
    fetchQuestion(title);
  }, []);

  return (
    <StudentLayout>
      {loading ? (
        <div className="h-[calc(100vh-64px)] w-full grid place-content-center">
          {" "}
          <ImSpinner2 size={20} className="animate-spin" />{" "}
        </div>
      ) : (
        <div className="p-5 pb-3 flex h-[calc(100vh-64px)]">
          <div className="flex flex-col flex-1 relative">
            <CountdownTimer minutes={Number(duration)} timeUp={timeUp} />
            <p className="font-semibold mb-2">Exam Information</p>
            <div className="flex gap-1">
              <p className="font-medium">{"Subject =>"}</p>
              <p className="uppercase">{title}</p>
            </div>
            <div className="flex gap-1">
              <p className="font-medium">{"Date =>"}</p>
              <p>{moment(new Date()).format("LL")}</p>
            </div>
            <div className="flex gap-1">
              <p className="font-medium">{"Course Lecturer =>"}</p>
              <p>{lecturer}</p>
            </div>
            <div className="flex gap-1">
              <p className="font-medium">{"Instruction =>"}</p>
              <p className="first-letter:capitalize">{instruction}</p>
            </div>
            <div className="flex gap-1">
              <p className="font-medium">{"Total Questions =>"}</p>
              <p className="first-letter:capitalize">{qa?.length}</p>
            </div>
            <div className="mt-8">
              <p className="font-semibold">Question {currentQst + 1}.</p>
              <div className="overflow-auto italic mt-1 h-24 px-3 py-2 rounded-sm w-full border">
                {qa[currentQst]?.question}
              </div>
            </div>
            <div className="mt-8 mb-3">
              <p className="font-semibold">
                Answer ( You are advised to be precise, concise and brief )
              </p>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="text-sm mt-1 h-32 px-3 py-2 rounded-sm w-full border outline-none"
              ></textarea>
            </div>
            <div className="flex justify-end gap-2 mt-auto">
              {currentQst > 0 ? (
                <button
                  disabled={submitting}
                  onClick={handlePrev}
                  className="disabled:bg-opacity-50 text-white bg-cyan-700 w-28 rounded py-2 text-sm"
                >
                  Prev
                </button>
              ) : null}
              {qa.length == currentQst + 1 ? (
                <button
                  ref={submitRef}
                  disabled={submitting}
                  onClick={handleSubmit}
                  className="text-white disabled:bg-opacity-50 bg-green-800 w-28 rounded py-2 text-sm"
                >
                  {submitting ? "Submitting..." : "Submit"}
                </button>
              ) : (
                <button
                  disabled={submitting}
                  onClick={handleNext}
                  className="text-white disabled:bg-opacity-50 bg-green-800 w-28 rounded py-2 text-sm"
                >
                  Next
                </button>
              )}
            </div>
          </div>
          {false ? (
            <MyModal result={result} setShowModal={setShowModal} />
          ) : null}
        </div>
      )}
    </StudentLayout>
  );
};

export default Dashboard;
