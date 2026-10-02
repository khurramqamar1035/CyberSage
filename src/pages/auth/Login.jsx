import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthShell, { FIELD, LABEL } from "../../components/site/AuthShell";
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
    <AuthShell word="PORTAL" title="Client portal" intro="Sign in to see your services, reports and billing."
      footer={<>Don't have an account? <Link to="/signup" className="cs-link font-medium">Request access</Link></>}>
      <h2 className="m-0 t-wide font-[250] text-[30px] leading-[1.05] tracking-[-0.03em]">Sign in</h2>
      <form onSubmit={handleLogin} className="mt-8 flex flex-col gap-5">
        {error && <p role="alert" className="m-0 text-[14px] text-danger border-l-2 border-danger pl-3">{error}</p>}
        <div>
          <label htmlFor="li-email" className={LABEL}>Email address</label>
          <input id="li-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" className={FIELD} />
        </div>
        <div>
          <label htmlFor="li-pass" className={LABEL}>Password</label>
          <input id="li-pass" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" className={FIELD} />
        </div>
        <button type="submit" disabled={isLoading} className="cs-btn cs-btn-primary w-full justify-center mt-2 disabled:opacity-60 disabled:cursor-not-allowed">
          {isLoading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </AuthShell>
  );

};

export default Login;