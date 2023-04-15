import React from "react";
import AdminLayout from "../../../Layout/AdminLayout";
import CustomInput from "../../../components/CustomInput";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="p-5 pb-2.5 flex flex-col h-[calc(100vh-64px)]">
        <div className="w-full">
          <p className="border-b ">General</p>
          <div className="grid grid-cols-3 mt-3 gap-3">
            <div>
              <CustomInput label={"Course Name"} />
            </div>
            <div>
              <CustomInput label={"Course Lecturer"} />
            </div>
            <div>
              <CustomInput label={"Exam duration (in hrs)"} />
            </div>
            <div>
              <CustomInput label={"Current session"} />
            </div>
            <div>
              <CustomInput label={"Course Instruction"} />
            </div>
          </div>
        </div>
        <div className=" w-full mt-5 mb-6">
          <p className="border-b">Questions</p>
          <div className="grid grid-cols-2 gap-5 gap-y-3 mt-3">
            <div className="">
              <p className="font-semibold">Question 1</p>
              <textarea className="text-sm mt-1 h-24 px-3 py-2 rounded-sm w-full border outline-none"></textarea>
            </div>
            <div className="">
              <p className="font-semibold">Answer</p>
              <textarea className="text-sm mt-1 h-24 px-3 py-2 rounded-sm w-full border outline-none"></textarea>
            </div>
            <div className="">
              <CustomInput label={"Keywords (comma seperated)"} />
            </div>
            <div className=" mt-3">
              <p className="font-semibold mb-1">Strict</p>
              <div className="flex gap-2 items-center">
                <div>
                  <input
                    className="mr-1"
                    type="radio"
                    name="strict"
                    id="false"
                    value={false}
                    checked={true}
                  />
                  <label htmlFor="false">False</label>
                </div>{" "}
                <div>
                  <input
                    className="mr-1"
                    type="radio"
                    name="strict"
                    id="true"
                    value={true}
                  />
                  <label htmlFor="true">True</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-auto">
          <button className="text-white  bg-cyan-700 w-28 rounded py-2 text-sm">
            prev
          </button>
          <button className="text-white w-28  bg-[coral]  rounded py-2 text-sm">
            Done, Publish
          </button>
          <button className="text-white bg-green-800 w-28 rounded py-2 text-sm">
            Next
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
