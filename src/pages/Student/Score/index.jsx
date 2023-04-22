import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import StudentLayout from "../../../Layout/StudentLayout";
import { ImSpinner2 } from "react-icons/im";
import { useLocation, useNavigate } from "react-router-dom";
import success from "../../../assets/images/undraw_agree_re_hor9.png";

const Score = ({}) => {
  const [loading, setLoading] = useState(false);
  const { result } = useLocation().state;
  const navigate = useNavigate();
  const user_name = window.localStorage.getItem("user-name");

  useEffect(() => {
    if (!result.score) {
      navigate("/student/instruction");
    }
  }, [result]);

  return (
    <StudentLayout>
      {loading ? (
        <div className="h-[calc(100vh-64px)] w-full grid place-content-center">
          {" "}
          <ImSpinner2 size={20} className="animate-spin" />{" "}
        </div>
      ) : (
        <div className="p-5 pb-3 flex h-[calc(100vh-64px)] justify-center items-center">
          <div className="w-[500px] min-h-[300px] bg-white rounded p-5 relative">
            {/* <img
              // onClick={setShowModal(false)}
              src={closeIcon}
              className="absolute top-3 right-3 cursor-pointer w-5"
            /> */}
            <div className="flex justify-center w-52 mx-auto">
              <img src={success} alt="success" className="w-52" />
            </div>
            <p className="text-center">
              Hi, <span className="font-semibold text-lg">{user_name}</span> .
              <p>
                Your result for the just concluded assessment is shown below:
              </p>
            </p>
            <div className="flex justify-center flex-col items-center mt-5">
              <p className="font-medium text-lg">Your Score (Final)</p>
              <p
                className={` text-3xl font-medium ${
                  result.score > 50 ? "text-green-700" : "text-[coral]"
                }`}
              >
                {result.score?.toFixed(1)}%
              </p>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => navigate("/student/instruction")}
                className="text-white mx-auto bg-cyan-700 w-28 rounded py-1.5 text-sm mt-4"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </StudentLayout>
  );
};

export default Score;
