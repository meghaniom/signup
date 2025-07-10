import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        formData
      );
      const {token, role} = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role",role)
      setMessage({ type: "success", text: "Login successful!" });

      if(role === "admin") {
        navigate("/admindashboard");
      }
      else
      navigate("/dashboard");
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Login failed.",
      });
    }
  };
  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex w-1/2 bg-gradient-to-b from-blue-700 to-blue-900 text-white items-center justify-center p-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
          <p className="text-lg">
            Log in to access your tasks and keep things on track.
          </p>
          <div className="flex gap-4 justify-center mt-6">
            <button className="bg-white text-blue-700 px-3 py-1 rounded-full">
              f
            </button>
            <button className="bg-white text-blue-700 px-3 py-1 rounded-full">
              G
            </button>
            <button className="bg-white text-blue-700 px-3 py-1 rounded-full">
              in
            </button>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-8 py-12">
        <div className="max-w-md w-full space-y-6">
          <h2 className="text-3xl font-bold text-center text-blue-700">
            Login to Your Account
          </h2>

          {message && (
            <div
              className={`p-3 rounded text-sm ${
                message.type === "error"
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
             
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Log In
            </button>
          </form>

          <p className="text-sm text-center text-gray-500">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/")}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
