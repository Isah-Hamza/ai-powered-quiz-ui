import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../../../Layout/AdminLayout";
import CustomInput from "../../../components/CustomInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Error } from "../../Register";
import { apiEndpoints } from "../../../api";
import axios from "axios";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const nextRef = useRef(null);
  const [strict, setStrict] = useState(false);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState({
    question: "",
    correct_answer: "",
    keywords: "",
    strict: false,
  });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    lecturer: Yup.string().required(),
    duration: Yup.string().required(),
    instruction: Yup.string().required(),
    session: Yup.string().required(),
    strict: Yup.boolean().required(),
  });

  const handlePostQuestion = async (data) => {
    setLoading(true);
    await axios
      .post(apiEndpoints.QUESTION, data)
      .then((res) => {
        toast.success(res.data.message, { theme: "colored" });
        formik.resetForm();
        setCurrentQuestion(0);
        setQuestions([]);
        setQuestion({
          question: "",
          correct_answer: "",
          keywords: "",
          strict: false,
        });
      })
      .catch((e) =>
        toast.error(e.response.data.message || "Error occured", {
          theme: "colored",
        })
      )
      .finally(() => setLoading(false));
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      lecturer: "",
      duration: "",
      instruction: "",
      session: "",
      strict: false,
      qa: [],
    },
    validationSchema,
    async onSubmit(values) {
      if (!questions.length) {
        toast.error("Please add at least one question before submitting.", {
          theme: "colored",
        });
        return;
      }
      if (question.correct_answer != "" && question.question != "") {
        nextRef.current.click();
      }

      values.qa.map((item) => {
        const obj = {};
        item.keywords = item?.keywords?.split(",");
        item.keywords.map((i, idx) => {
          Object.defineProperty(obj, i, { value: 0.1 });
        });
        item.keywords = obj;
        console.log("first", item);
      });
      console.log("values ", values);
      handlePostQuestion(values);
    },
  });

  const {
    touched,
    errors,
    values,
    handleSubmit,
    getFieldProps,
    setFieldValue,
  } = formik;

  const handleNext = (goNext) => {
    if (questions.length > currentQuestion) {
      console.log(question);
      setQuestions(
        questions.map((qstn, idx) => {
          if (idx === currentQuestion) return question;
          else return qstn;
        })
      );
      setCurrentQuestion((prev) => prev + 1);
      return;
    }
    setQuestions((prev) => [...prev, question]);
    setQuestion({
      question: "",
      correct_answer: "",
      keywords: "",
      strict: false,
    });
    if (goNext) setCurrentQuestion((prev) => prev + 1);
  };

  const handlePrev = () => {
    setQuestions(
      questions.map((qstn, idx) => {
        if (idx === currentQuestion) return question;
        else return qstn;
      })
    );
    setCurrentQuestion((prev) => prev - 1);
    setQuestion(questions[currentQuestion - 1]);
    console.log(question);
  };

  useEffect(() => {
    values.qa = questions;
    console.log(values.qa);
  }, [questions]);

  useEffect(() => {
    if (questions[currentQuestion]) setQuestion(questions[currentQuestion]);
    else
      setQuestion({
        question: "",
        correct_answer: "",
        keywords: "",
        strict: false,
      });
  }, [currentQuestion]);

  return (
    <AdminLayout>
      <div>
        <form
          onSubmit={handleSubmit}
          className="p-5 pb-2.5 flex flex-col h-[calc(100vh-64px)]"
        >
          <div className="w-full">
            <p className="border-b ">General</p>
            <div className="grid grid-cols-3 mt-3 gap-3">
              <div>
                <CustomInput
                  label={"Course Name"}
                  {...getFieldProps("title")}
                />
                {touched.title && errors.title && <Error text={errors.title} />}
              </div>
              <div>
                <CustomInput
                  label={"Course Lecturer"}
                  {...getFieldProps("lecturer")}
                />
                {touched.lecturer && errors.lecturer && (
                  <Error text={errors.lecturer} />
                )}
              </div>
              <div>
                <CustomInput
                  type={"Number"}
                  label={"Exam duration (in mins)"}
                  {...getFieldProps("duration")}
                />
                {touched.duration && errors.duration && (
                  <Error text={errors.duration} />
                )}
              </div>
              <div>
                <CustomInput
                  label={"Current session"}
                  {...getFieldProps("session")}
                />
                {touched.session && errors.session && (
                  <Error text={errors.session} />
                )}
              </div>
              <div>
                <CustomInput
                  label={"Course Instruction"}
                  {...getFieldProps("instruction")}
                />
                {touched.instruction && errors.instruction && (
                  <Error text={errors.instruction} />
                )}
              </div>
              <div className=" mt-3">
                <p className="font-semibold mb-1">Strict</p>
                <div className="flex gap-2 items-center">
                  <div>
                    <input
                      className="mr-1"
                      type="radio"
                      id="false"
                      name="strict"
                      {...getFieldProps("strict")}
                    />
                    <label htmlFor="false">False</label>
                  </div>{" "}
                  <div>
                    <input
                      className="mr-1"
                      type="radio"
                      id="true"
                      name="strict"
                      {...getFieldProps("strict")}
                    />
                    <label htmlFor="true">True</label>
                  </div>
                  {touched.strict && errors.strict && (
                    <Error text={errors.strict} />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className=" w-full mt-5 mb-6">
            <p className="border-b">Questions</p>
            <div className="grid grid-cols-2 gap-5 gap-y-3 mt-3">
              <div className="">
                <p className="font-semibold">Question {currentQuestion + 1}</p>
                <textarea
                  value={question?.question}
                  className="text-sm mt-1 h-24 px-3 py-2 rounded-sm w-full border outline-none"
                  // {...getFieldProps("qa[0].question")}
                  onChange={(e) =>
                    setQuestion((prev) => ({
                      ...prev,
                      question: e.target.value,
                    }))
                  }
                  defaultValue={questions[currentQuestion]?.question ?? ""}
                ></textarea>
              </div>
              <div className="">
                <p className="font-semibold">Answer</p>
                <textarea
                  // {...getFieldProps("qa[0].correct_answer")}
                  value={question?.correct_answer}
                  onChange={(e) =>
                    setQuestion((prev) => ({
                      ...prev,
                      correct_answer: e.target.value,
                    }))
                  }
                  className="text-sm mt-1 h-24 px-3 py-2 rounded-sm w-full border outline-none"
                  defaultValue={
                    questions[currentQuestion]?.correct_answer ?? ""
                  }
                ></textarea>
              </div>
              <div className="">
                <CustomInput
                  label={"Keywords (comma seperated)"}
                  // {...getFieldProps("qa[0].keywords")}
                  value={question?.keywords}
                  onChange={(e) =>
                    setQuestion((prev) => ({
                      ...prev,
                      keywords: e.target.value,
                    }))
                  }
                  defaultValue={questions[currentQuestion]?.keywords}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-auto">
            {currentQuestion > 0 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="text-white  bg-cyan-700 w-28 rounded py-2 text-sm"
              >
                prev
              </button>
            ) : null}
            <button
              type="submit"
              className="text-white w-28  bg-[coral]  rounded py-2 text-sm"
            >
              Done, Publish
            </button>
            <button
              ref={nextRef}
              type="button"
              disabled={
                question.correct_answer === "" || question.question === ""
              }
              onClick={() => handleNext(true)}
              className="disabled:bg-opacity-60 text-white bg-green-800 w-28 rounded py-2 text-sm"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
