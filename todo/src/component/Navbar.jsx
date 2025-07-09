import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("User  is not logged in");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/api/v1/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer  ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.removeItem("token");
        alert(data.message || "Logout successfully");
        navigate("/login");
      } else {
        alert(data.message || "Liogout failed");
      }
    } catch (error) {
      console.log("Logout  error :", error);
      alert("something went wrong");
    }
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="font-bold text-xl">Todo App</h1>
      <button
        onClick={logout}
        className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
