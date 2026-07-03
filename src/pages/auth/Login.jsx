import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { login } from "../../services/authService";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const loginRequest = {
      email,
      password,
    };

    try {
      const response = await login(loginRequest);

      const user = response.data;

      localStorage.setItem("user", JSON.stringify(user));

      alert("Login successful!");

      if (user.role === "STUDENT") {
        navigate("/student/dashboard");
      } else if (user.role === "ADMIN") {
        navigate("/admin/dashboard");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">InterviewAce</h1>

        <p className="login-subtitle">Prepare. Practice. Perform.</p>

        <h2 className="login-heading">Login</h2>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>

            <div className="input-group">
              <MdEmail className="input-icon" />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>

            <div className="input-group">
              <FaLock className="input-icon" />

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {errors.password && (
                <p className="error-text">{errors.password}</p>
              )}
            </div>
          </div>

          <button className="login-button">Login</button>
        </form>

        <p className="register-text">
          Don't have an account?{" "}
          <Link to="/register" className="register-link">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
