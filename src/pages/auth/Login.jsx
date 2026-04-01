import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Shield, Lock, Mail, Loader2 } from "lucide-react";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const handleLogin = async (e) => {

    e.preventDefault();

    setError("");
    setIsLoading(true);

    try {

      const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // store JWT token
      localStorage.setItem("token", data.token);

      // store user info
      localStorage.setItem("companyName", data.user.companyName);
      localStorage.setItem("userEmail", data.user.email);

      navigate("/dashboard");

    } catch (err) {

      setError(err.message);

    } finally {

      setIsLoading(false);

    }

  };


  return (
    <div className="min-h-screen bg-[#06080A] flex flex-col justify-center items-center p-4">

      <div className="mb-8 flex flex-col items-center">
        <Shield className="w-12 h-12 text-blue-500 mb-4" strokeWidth={1.5} />
        <h1 className="text-3xl font-bold text-white tracking-tight">
          CyberSage Portal
        </h1>
        <p className="text-slate-400 mt-2 text-sm">
          Sign in to your client dashboard
        </p>
      </div>


      <div className="w-full max-w-md bg-[#0B0F19] border border-[#1C212E] rounded-2xl p-8 shadow-2xl">

        <form onSubmit={handleLogin} className="space-y-6">

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-lg text-center">
              {error}
            </div>
          )}


          <div className="space-y-2">

            <label className="text-sm font-medium text-slate-300">
              Email Address
            </label>

            <div className="relative">

              <Mail className="w-5 h-5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@company.com"
                className="w-full bg-[#13192B] border border-[#2A3441] text-slate-200 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />

            </div>

          </div>


          <div className="space-y-2">

            <label className="text-sm font-medium text-slate-300">
              Password
            </label>

            <div className="relative">

              <Lock className="w-5 h-5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-[#13192B] border border-[#2A3441] text-slate-200 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />

            </div>

          </div>


          <div className="pt-2">

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 flex justify-center items-center bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-blue-500/25"
            >

              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Sign In"
              )}

            </button>

          </div>

        </form>


        <div className="mt-6 text-center text-sm text-slate-400">

          Don't have an account?{" "}

          <Link
            to="/signup"
            className="text-blue-500 hover:text-blue-400 font-medium transition-colors"
          >
            Request Access
          </Link>

        </div>

      </div>

    </div>
  );

};

export default Login;