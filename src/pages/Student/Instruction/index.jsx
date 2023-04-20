import React, { useEffect, useState } from "react";
import StudentLayout from "../../../Layout/StudentLayout";
import axios from "axios";
import { apiEndpoints } from "../../../api";
import { ImSpinner2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";

const Instruction = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);

  const navigate = useNavigate();

  return (
    <StudentLayout>
      {loading ? (
        <div className="h-[calc(100vh-64px)] w-full grid place-content-center">
          {" "}
          <ImSpinner2 size={20} className="animate-spin" />{" "}
        </div>
      ) : (
        <div className="p-5 pb-3 flex h-[calc(100vh-64px)]">
          <div className="flex flex-col flex-1 ">
            <p className="font-semibold mb-2 border-b">
              About the AI-POWERED System.{" "}
            </p>
            <p>
              AI-powered systems can be built using a variety of machine
              learning algorithms, including supervised learning, unsupervised
              learning, and reinforcement learning. Each of these approaches has
              its own strengths and weaknesses, and the choice of algorithm will
              depend on the specific application and the type of data being
              analyzed.
            </p>
            <p className="font-semibold mb-2 mt-7 border-b">About the Exam </p>
            <p>
              AI-powered systems can be built using a variety of machine
              learning algorithms, including supervised learning, unsupervised
              learning, and reinforcement learning. Each of these approaches has
              its own strengths and weaknesses, and the choice of algorithm will
              depend on the specific application and the type of data being
              analyzed.
            </p>
            <p className="mb-2 mt-7 border-b font-semibold">
              Disclaimer ( Please Read Me ){" "}
            </p>
            <p>
               The use of an AI-powered examination system should be
              carefully considered and implemented with caution. While these
              systems can provide many benefits, such as automating grading and
              providing real-time feedback, there are also potential risks and
              limitations to consider.
            </p>

            <div className="flex justify-end gap-2 mt-auto">
              <button className="text-white bg-cyan-700 w-28 rounded py-2 text-sm">
                Cancel
              </button>
              <button
                onClick={() => navigate("/student/exam-listing")}
                className="text-white bg-green-800 w-28 rounded py-2 text-sm"
              >
                Start Exam
              </button>
            </div>
          </div>
        </div>
      )}
    </StudentLayout>
  );
};

export default Instruction;
