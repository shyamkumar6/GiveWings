import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";

import Input from "../../components/ui/input/Input";
import Button from "../../components/ui/button/Button";

export default function LoginPage() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      login(res.data.access_token);

      navigate("/dashboard");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F7F7F7]">
      {/* Left Section */}
      <div className="hidden md:flex flex-1 bg-black text-white items-center justify-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">
            GiveWings
          </h1>

          <p className="mt-6 text-lg text-gray-300">
            Transform surplus into impact.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center bg-white px-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-8">
            Welcome Back
          </h2>

          <div className="space-y-4">
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <Button
              title="Login"
              onClick={handleLogin}
            />
          </div>
        </div>
      </div>
    </div>
  );
}