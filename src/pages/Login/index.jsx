import React, { useEffect, useState } from "react";
import guyWithPic from "../../assets/images/guy-with-pc.jpg";
import CustomInput from "../../components/CustomInput";
import CustomPasswordInput from "../../components/CustomPasswordInput";
import CustomButton from "../../components/CustomButton";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiEndpoints } from "../../api";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ matric: "", password: "" });

  const handleLogin = async () => {
    if (
      data.matric === "2023/1/00000CT" &&
      data.password.toLowerCase() === "admin"
    ) {
      navigate("/admin");
      toast.success("Logged in as admin", { theme: "colored" });
      return;
    }

    await axios
      .post(apiEndpoints.LOGIN, data)
      .then((res) => {
        navigate("/student");
        toast.success(res.data.message, { theme: "colored" });
      })
      .catch((e) => toast.error(e.response.data.message, { theme: "colored" }));
  };

  return (
    <div className="flex h-screen bg-blue-600">
      <div className="w-[70%]">
        <img className="w-full h-full" src={guyWithPic} />
      </div>
      <div className="w-[30%] bg-white p-8 justify-center items-center flex flex-col relative">
        <div className="">
          <div className="text-center">
            <h3 className="text-3xl font-bold">Welcome Back, User</h3>
            <p>
              New to the platform,{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-blue-400 underline cursor-pointer text-sm"
              >
                Register here
              </span>{" "}
            </p>
          </div>
          <div className="mt-10">
            <CustomInput
              label={"Matric. Number"}
              placeholder="2023/1/12345CT"
              onChange={(e) => {
                console.log(data);
                setData((prev) => ({ ...prev, matric: e.target.value }));
              }}
            />
            <div className="mt-2.5">
              <CustomPasswordInput
                label={"Password"}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, password: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="text-sm flex items-center gap-4 justify-between mt-2">
            <div className="mr-1 flex items-center gap-0.5">
              <input className="" type="checkbox" name="" id="" />
              <span>Remember me</span>
            </div>
            <p className="text-sm">Forgot Password</p>
          </div>
          <div className="mt-10">
            <CustomButton
              // disabled={data.matric === "" || data.password === ""}
              onClick={handleLogin}
              text={"Login"}
            />
          </div>
        </div>
        <p className="absolute text-center font-semibold text-xs left-1/2 -translate-x-1/2 bottom-1">
          AI POWERED ASSESSMENT SYSTEM
        </p>
      </div>
    </div>
  );
};

export default Login;
