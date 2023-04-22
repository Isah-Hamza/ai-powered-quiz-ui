import React, { useEffect, useState } from "react";
import AdminLayout from "../../../Layout/AdminLayout";
import moment from "moment";
import axios from "axios";
import { apiEndpoints } from "../../../api";
import { ImSpinner2 } from "react-icons/im";

const ViewStudents = () => {
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([
    {
      name: "Isah Hamza",
      courses_taken: 3,
      date_joined: "23/04/2023",
      email: "itshamzy@gmail.com",
      phone: "090999999999",
    },
    {
      name: "Musa Aliyu Faruk",
      courses_taken: 3,
      date_joined: "23/04/2023",
      email: "musa@aliyu.com",
      phone: "090999999999",
    },
    {
      name: "Erling Haarland",
      courses_taken: 3,
      date_joined: "23/04/2023",
      email: "erlinghaarland@gmail.com",
      phone: "090999999999",
    },
  ]);

  const studentData = [
    {
      title: "Total Students",
      value: students.length,
    },
    {
      title: "Active Students",
      value: students.length,
    },
    {
      title: "Inactive Students",
      value: 0,
    },
  ];

  const getUsers = () => {
    setLoading(true);
    axios
      .get(apiEndpoints.USER)
      .then((res) => {
        setStudents(res.data.users);
        console.log(res);
      })
      .catch((e) => console.log(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <AdminLayout>
      {loading ? (
        <div className="h-[calc(100vh-64px)] w-full grid place-content-center">
          {" "}
          <ImSpinner2 size={20} className="animate-spin" />{" "}
        </div>
      ) : (
        <div className="p-5 pb-3 flex flex-col h-[calc(100vh-64px)]">
          <p className="text-lg font-semibold">Students</p>
          <div className="mt-2 grid grid-cols-3 gap-5 max-w-[900px]">
            {studentData.map((student) => (
              <div className="bg-blue-200 h-32 p-5 rounded text-center flex flex-col items-center justify-center ">
                <p className="text-lg">{student.value}</p>
                <p className="font-medium">{student.title}</p>
              </div>
            ))}
          </div>
          <div className="w-full mt-7">
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th>Fullname</th>
                  <th>Matric</th>
                  <th>Email</th>
                  <th>Phone </th>
                  <th>Courses taken </th>
                  <th>Action </th>
                </tr>
              </thead>
              {students?.length ? (
                <>
                  <tbody>
                    {students.map((student) => (
                      <tr>
                        <td>{student.name}</td>
                        <td>{student.matric}</td>
                        <td>{student.email}</td>
                        <td>{student.phone}</td>
                        <td className="pl-3">{student.courses?.length}</td>
                        {/* <td>{moment(student.date_joined).format("LL")}</td> */}
                        <td
                          className={`cursor-pointer text-sm text-green-800 underline font-medium`}
                        >
                          view
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              ) : null}
            </table>
            {!students.length ? (
              <div className="text-center mt-20">
                <p className="text-sm font-medium">No data.</p>
                <p>There are no regeistered students yet.</p>
              </div>
            ) : null}
          </div>
          <div className="mt-auto flex justify-end">
            <button
              onClick={() => window.location.reload()}
              className="text-white bg-green-800 w-28 rounded py-2 text-sm"
            >
              Refresh List
            </button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ViewStudents;
