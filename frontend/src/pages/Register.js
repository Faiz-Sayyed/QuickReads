import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = ({ user, setUser }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/register`, {
        email,
        password,
      })
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response));
        setUser(JSON.parse(localStorage.getItem("user")));
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        if (!error.response) {
          setError("Network Error");
          return;
        }
        setError(error.response.data.error);
      });
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center w-full h-80 text-3xl">Loading</div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <form
            className="flex flex-col justify-center items-center w-1/3 m-10 mt-20 rounded-lg bg-gray-200 drop-shadow-lg"
            onSubmit={handleSubmit}
          >
            <div className="flex justify-center w-full text-2xl bg-blue-500 text-white mb-5 py-3 rounded-t-lg">
              Sign Up
            </div>

            <label className="text-xl m-2">Email address:</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="mb-5 px-3 py-1 w-5/6 text-lg rounded-md border border-gray-400 focus:outline-none"
            />

            <label className="text-xl m-2">Password:</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="mb-5 px-3 py-1 w-5/6 text-lg rounded-md border border-gray-400 focus:outline-none"
            />

            <button
              disabled={loading}
              className="text-xl text-white bg-blue-400 rounded-lg my-5 mx-1 py-1 px-3 cursor-pointer hover:bg-blue-600"
            >
              Sign Up
            </button>
          </form>
          {error && (
            <div className="flex justify-center w-1/3 text-xl text-white bg-red-600 mt-3 p-3 rounded-lg">
              {error}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Register;
