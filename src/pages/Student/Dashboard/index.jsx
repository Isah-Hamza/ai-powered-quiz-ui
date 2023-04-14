import React from "react";
import Layout from "../../../Layout";

const Dashboard = () => {
  return (
    <Layout>
      <div className="p-5 pb-3 flex h-[calc(100vh-64px)]">
        <div className="flex flex-col flex-1 ">
          <p className="font-semibold mb-2">Exam Information</p>
          <div className="flex gap-1">
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
          </div>
          <div className="mt-8">
            <p className="font-semibold">Question 1.</p>
            <div className="overflow-auto italic mt-1 h-24 px-3 py-2 rounded-sm w-full border">
              How do different types of muscle tissue, such as cardiac, smooth,
              and skeletal, differ in terms of their structure, function, and
              location within the body, and what are some examples of diseases
              or disorders that can affect each type of muscle tissue?
            </div>
          </div>
          <div className="mt-8 mb-3">
            <p className="font-semibold">
              Answer ( You are adviced to be precise, concise and brief )
            </p>
            <textarea className="text-sm mt-1 h-32 px-3 py-2 rounded-sm w-full border outline-none"></textarea>
          </div>
          <div className="flex justify-end gap-2 mt-auto">
            <button className="text-white bg-cyan-700 w-28 rounded py-2 text-sm">
              Prev
            </button>
            <button className="text-white bg-green-800 w-28 rounded py-2 text-sm">
              Next
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
