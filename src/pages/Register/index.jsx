import React, { useState } from "react";
import guyWithPic from "../../assets/images/guy-with-pc.jpg";
import CustomInput from "../../components/CustomInput";
import CustomPasswordInput from "../../components/CustomPasswordInput";
import CustomButton from "../../components/CustomButton";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { apiEndpoints } from "../../api";
import axios from "axios";
import { toast } from "react-toastify";

export const Error = ({ text }) => (
  <span className="block -mt-0.5 text-xs text-[coral]">{text}</span>
);

const Register = () => {
  const navigate = useNavigate();

  const [type, setType] = useState("password");

  const handleChangeType = () => {
    if (type === "text") setType("password");
    else setType("text");
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().required(),
    phone: Yup.string().required(),
    password: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema,
    async onSubmit(values) {
      console.log(values);
      await axios
        .post(apiEndpoints.REGISTER, values)
        .then((res) => {
          navigate("/login", { state: { matric: res.data.user.matric } });
          toast.success(
            `${res.data.message} Matric_No. is ${res.data.user.matric}`,
            { theme: "colored", autoClose: false, closeOnClick: false }
          );
        })
        .catch((e) =>
          toast.error(e.response.data.message, { theme: "colored" })
        );
    },
  });
  const { touched, errors, handleSubmit, getFieldProps } = formik;

  return (
    <div className="flex h-screen bg-blue-600">
      <div className="w-[70%]">
        <img className="w-full h-full" src={guyWithPic} />
      </div>
      <div className="relative w-[30%] bg-white p-8 justify-center items-center flex flex-col">
        <form onSubmit={handleSubmit}>
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
              <div>
                <div>
                  <label>Fullname </label>
                  <input
                    className="w-full border rounded-sm outline-none text-sm px-3 py-2.5"
                    placeholder=""
                    {...getFieldProps("name")}
                  />
                </div>
                {touched.name && errors.name && <Error text={errors.name} />}
              </div>
              <div>
                <div>
                  <label>Email </label>
                  <input
                    className="w-full border rounded-sm outline-none text-sm px-3 py-2.5"
                    placeholder=""
                    {...getFieldProps("email")}
                  />
                </div>
                {touched.email && errors.email && <Error text={errors.email} />}
              </div>
              <div>
                <div>
                  <label>Phone </label>
                  <input
                    className="w-full border rounded-sm outline-none text-sm px-3 py-2.5"
                    placeholder=""
                    {...getFieldProps("phone")}
                  />
                </div>
                {touched.phone && errors.phone && <Error text={errors.phone} />}
              </div>
              <div>
                <div>
                  <label>Password </label>
                  <div className="relative">
                    <input
                      className="w-full border rounded-sm outline-none text-sm px-3 py-2.5"
                      type={type}
                      {...getFieldProps("password")}
                    />
                    <span className="absolute top-1/2 -translate-y-1/2 right-2">
                      {type === "password" ? (
                        <FiEyeOff onClick={handleChangeType} />
                      ) : (
                        <FiEye onClick={handleChangeType} />
                      )}
                    </span>
                  </div>
                </div>
                {touched.password && errors.password && (
                  <Error text={errors.password} />
                )}
              </div>
            </div>
            <div className="mt-2.5"></div>
          </div>

          <div className="mt-10">
            <CustomButton type="submit" text={"Register"} />
          </div>
        </form>
        <p className="absolute text-center font-semibold text-xs left-1/2 -translate-x-1/2 bottom-1">
          AI POWERED ASSESSMENT SYSTEM
        </p>
      </div>
    </div>
  );
};

export default Register;
