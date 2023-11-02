import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const logout = () => {
    localStorage.removeItem("user");
    setUser("");
    window.location.reload();
  };

  return (
    <div className="flex justify-between items-center w-full py-5 bg-blue-600 text-white">
      <div className="ml-10 text-3xl">
        <Link to="/">QuickReads</Link>
      </div>
      <div className="flex justify-between items-center text-xl w-1/4 mr-10">
        {user ? (
          <div className="flex justify-between items-center">
            <div className="bg-blue-400 rounded-lg mx-1 py-1 px-3 hover:cursor-default">
              {user.data.email[0].toUpperCase()}
            </div>
            <div
              onClick={logout}
              className="bg-blue-400 rounded-lg mx-1 py-1 px-3 cursor-pointer hover:bg-blue-500"
            >
              Logout
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <div>
              <Link
                to="/login"
                className="bg-blue-400 rounded-lg mx-1 py-1 px-3 cursor-pointer hover:bg-blue-500"
              >
                Login
              </Link>
            </div>
            <div>
              <Link
                to="/register"
                className="bg-blue-400 rounded-lg mx-1 py-1 px-3 cursor-pointer hover:bg-blue-500"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
        <div className="bg-blue-400 rounded-lg ml-3 py-1 px-3 cursor-pointer hover:bg-blue-500">
          <Link to="https://github.com/Faiz-Sayyed/QuickReads" target="_blank">
            Github
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
