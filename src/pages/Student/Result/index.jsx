import React, { useEffect, useState } from "react";
import StudentLayout from "../../../Layout/StudentLayout";
import avatar from "../../../assets/images/avatar.jpg";
import { apiEndpoints } from "../../../api";
import axios from "axios";
import { ImSpinner2 } from "react-icons/im";
import moment from "moment";

const StudentResult = () => {
  const id = window.localStorage.getItem("user-id");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  const getUserDetails = () => {
    setLoading(true);
    axios
      .get(apiEndpoints.USER + "/" + id)
      .then((res) => {
        setUser(res.data.user);
        console.log(res);
      })
      .catch((e) => console.log(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <StudentLayout>
      {loading ? (
        <div className="h-[calc(100vh-64px)] w-full grid place-content-center">
          {" "}
          <ImSpinner2 size={20} className="animate-spin" />{" "}
        </div>
      ) : (
        <div className="p-5 pb-3 flex flex-col h-[calc(100vh-64px)] overflow-auto">
          <div className="flex items-center gap-10 h-fit">
            <div>
              <img className="w-40 rounded" src={avatar} alt="user" />
            </div>
            <div className="flex-1 grid grid-cols-3 gap-10 gap-y-5">
              <div>
                <p className="font-semibold">Matric. Number</p>
                <p>{user?.matric}</p>
              </div>
              <div>
                <p className="font-semibold">Student Name</p>
                <p>{user?.name}</p>
              </div>
              <div>
                <p className="font-semibold">Department</p>
                <p>Cyber Security Science</p>
              </div>
              <div>
                <p className="font-semibold">Email</p>
                <p>{user?.email}</p>
              </div>
              <div>
                <p className="font-semibold">Phone Number</p>
                <p>{user?.phone}</p>
              </div>
              <div>
                <p className="font-semibold">Created Date</p>
                <p>{moment(user?.createdAt).format("LL")}</p>
              </div>
            </div>
          </div>
          <div className="w-full my-7">
            <p className="border-b font-semibold text-lg">Result overview</p>
            <div className="w-full mt-3">
              {user.courses?.length ? (
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
              ) : (
                <div className="text-center mt-20">
                  <p className="text-sm">NO course taken yet.</p>
                  <p>The exams you have taken will appear here.</p>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-auto">
            <button
              onClick={() => window.location.reload()}
              className="text-white w-28  bg-[coral]  rounded py-2 text-sm"
            >
              Refresh
            </button>
            <button
              onClick={() => print()}
              className="text-white bg-green-800 w-28 rounded py-2 text-sm"
            >
              Print Page
            </button>
          </div>
        </div>
      )}
    </StudentLayout>
  );
};

export default StudentResult;
