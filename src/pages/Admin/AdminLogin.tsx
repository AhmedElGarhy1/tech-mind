import React, { FC, useState } from "react";
import { Button } from "react-bootstrap";
import { postLogin } from "../../api/get-api";
import { PostResponse } from "../../types/response";
import { useLocation, useNavigate } from "react-router-dom";

const AdminLogin: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await postLogin({ username, password });
      if (!response.ok) {
        console.log(response);
        setError("Invalid Username or Password");
        setLoading(false);
        return;
      }
      sessionStorage.setItem("auth", response.token);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="d-flex align-items-center justify-content-center bg-dark vh-100 text-center">
      <div
        style={{
          width: 450,
        }}
        className="bg-white py-3 px-5 rounded-3 mx-auto">
        <h1 className="mb-4 mt-3">Admin Login</h1>
        <div
          style={{
            marginTop: -12,
            color: "red",
          }}
          className="mb-3 fw-bold">
          {error}
        </div>
        <div className="mb-3 mx-auto">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 w-100"
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="mx-auto">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 w-100"
            type="password"
            placeholder="Password"
          />
        </div>
        <button
          disabled={loading}
          onClick={handleClick}
          className="main-btn px-5 my-4 mx-auto">
          {loading ? "Loading..." : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
