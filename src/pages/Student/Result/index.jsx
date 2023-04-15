import React from "react";
import StudentLayout from "../../../Layout/StudentLayout";
import avatar from "../../../assets/images/avatar.jpg";

const StudentResult = () => {
  return (
    <StudentLayout>
      <div className="p-5 pb-3 flex flex-col h-[calc(100vh-64px)] overflow-auto">
        <div className="flex items-center gap-10 h-fit">
          <div>
            <img className="w-40 rounded" src={avatar} alt="user" />
          </div>
          <div className="flex-1 grid grid-cols-3 gap-10 gap-y-5">
            <div>
              <p className="font-semibold">Matric. Number</p>
              <p>2016/1/59587CI</p>
            </div>
            <div>
              <p className="font-semibold">Student Name</p>
              <p>Moses Liberty</p>
            </div>
            <div>
              <p className="font-semibold">Faculty</p>
              <p>Engineering</p>
            </div>
            <div>
              <p className="font-semibold">Department</p>
              <p>Cyber Security Science</p>
            </div>
            <div>
              <p className="font-semibold">Email</p>
              <p>mosesliberty@gmail.com</p>
            </div>
            <div>
              <p className="font-semibold">Phone Number</p>
              <p>090898989898</p>
            </div>
          </div>
        </div>
        <div className="w-full my-7">
          <p className="border-b font-semibold text-lg">Result overview</p>
          <div className="w-full mt-3">
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th>Course Name</th>
                  <th>Course Lecturer</th>
                  <th>Date Taken</th>
                  <th>Score </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>CPT 512</td>
                  <td>Muhammad Ali</td>
                  <td>2019-02-23</td>
                  <td>80.7 </td>
                </tr>
                <tr>
                  <td>CSS 522</td>
                  <td>Kudu Muhammad Kudu</td>
                  <td>2019-02-23</td>
                  <td>78.5 </td>
                </tr>
                <tr>
                  <td>IMT 522</td>
                  <td>Zubairu Hassan</td>
                  <td>2019-02-23</td>
                  <td>60.0 </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-auto">
          <button className="text-white w-28  bg-[coral]  rounded py-2 text-sm">
            Cancel
          </button>
          <button className="text-white bg-green-800 w-28 rounded py-2 text-sm">
            Print Page
          </button>
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentResult;
