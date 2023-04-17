import React from "react";
import { useNavigate } from "react-router-dom";
import futLogo from "../assets/images/futminna_logo-removebg-preview.png";
import avatar from "../assets/images/avatar.jpg";

const StudentLayout = ({ children }) => {
  const navigate = useNavigate();


  const handleLogout = () => {
    navigate("/login");
  };

  const links = [
    {
      title: "Take Exams",
      url: "/student",
    },
    {
      title: "View Results",
      url: "/student/result",
    },
  ];

  return (
    <div className="flex w-full h-screen">
      <aside className="w-[300px] h-full bg-blue-900 flex">
        <div className="py-6 pb-2 px-5 flex-1 flex">
          <div className="text-center text-white flex-1 flex flex-col">
            <div className="w-40 h-40 mx-auto rounded-full mb-2 overflow-hidden bg-white">
              <img className="w-full h-full " src={futLogo} />
            </div>
            <div className="font-semibold text-sm">
              <p>FUT, Minna</p>
              <p>AI ASSESSMENT SYSTEM</p>
            </div>
            <ul className="flex flex-col gap-1 mt-16">
              {links.map((link, idx) => (
                <div
                  key={idx}
                  onClick={() => navigate(link.url)}
                  className="cursor-pointer px-4 py-2.5 bg-cyan-700 max-w-xs"
                >
                  {link.title}
                </div>
              ))}
            </ul>
            <button onClick={handleLogout} className="text-white bg-red-400 max-w-[250px] mx-auto mt-auto px-14 py-2 text-sm">
              LOGOUT
            </button>
          </div>
        </div>
      </aside>
      <main className="flex-1 h-full bg-white">
        <div>
          <div className="h-16 border-b shadow-md flex">
            <div className="ml-auto mr-4 my-auto">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-blue-200 overflow-hidden">
                  <img src={avatar} className="w-full h-full" />
                </div>
                <div className="text-sm font-semibold flex flex-col">
                  <span>Moses Liberty</span>
                  <span className="-mt-1">Student</span>
                </div>
              </div>
            </div>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
};

export default StudentLayout;
