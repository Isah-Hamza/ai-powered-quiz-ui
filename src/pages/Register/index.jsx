import React from "react";
import guyWithPic from "../../assets/images/guy-with-pc.jpg";
import CustomInput from "../../components/CustomInput";
import CustomPasswordInput from "../../components/CustomPasswordInput";
import CustomButton from "../../components/CustomButton";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-blue-600">
      <div className="w-[70%]">
        <img className="w-full h-full" src={guyWithPic} />
      </div>
      <div className="relative w-[30%] bg-white p-8 justify-center items-center flex flex-col">
        <div>
          <div className="text-center">
            <h3 className="text-3xl font-bold">Create A New Account</h3>
            <p>
              Already have an account ?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-blue-400 underline cursor-pointer text-sm"
              >
                Login here
              </span>{" "}
            </p>
          </div>
          <div className="mt-10">
            <div className="flex flex-col gap-2">
              <CustomInput label={"Name"} placeholder="johndoe@gmail.com" />
              <CustomInput label={"Email"} placeholder="johndoe@gmail.com" />
              <CustomInput label={"Phone"} placeholder="johndoe@gmail.com" />
              <CustomPasswordInput label={"Password"} />
            </div>
            <div className="mt-2.5"></div>
          </div>

          <div className="mt-10">
            <CustomButton text={"Register"} />
          </div>
        </div>
        <p className="absolute text-center font-semibold text-xs left-1/2 -translate-x-1/2 bottom-1">
          AI POWERED ASSESSMENT SYSTEM
        </p>
      </div>
    </div>
  );
};

export default Register;
