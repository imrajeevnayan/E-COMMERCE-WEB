import React, { useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import Lottie from "lottie-react";
import foodLoadingAnimation from "../assets/animations/food-loading.json";
import "./loading.css";
import "./login.css";

const Login = () => {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail, user, loading } = useAuth();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setError("");
      setShowSuccess(false);
      
      // Disable the button or show loading state
      const result = await signInWithGoogle();
      
      if (result) {
        setShowSuccess(true);
        // Small delay to show success state
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1000);
      }
    } catch (error) {
      console.error("Google Sign-in Error:", error);
      setError(error.message || "Failed to sign in with Google");
      
      // If it's a popup error, give more specific instructions
      if (error.message.includes('popup')) {
        setError(error.message + "\nPlease check your popup blocker settings and try again.");
      }
      
      // Clear error after 7 seconds
      setTimeout(() => {
        setError("");
      }, 7000);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      let result;
      if (isSignUp) {
        result = await signUpWithEmail(email, password);
      } else {
        result = await signInWithEmail(email, password);
      }
      if (result) {
        setShowSuccess(true);
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1500);
      }
    } catch (error) {
      setError(isSignUp ? "Failed to sign up" : "Failed to sign in");
      if (error.code === 'auth/email-already-in-use') {
        setError("Email already exists");
      } else if (error.code === 'auth/invalid-email') {
        setError("Invalid email address");
      } else if (error.code === 'auth/weak-password') {
        setError("Password should be at least 6 characters");
      } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setError("Invalid email or password");
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Lottie
          animationData={foodLoadingAnimation}
          loop={true}
          className="loading-animation"
          style={{ width: 200, height: 200 }}
        />
        <p className="loading-text">Loading...</p>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="modern-login-container">
      <div className="animated-background"></div>
      <div className="modern-login-content">
        <div className="modern-login-box">
          <div className="logo-container">
            <Lottie
              animationData={foodLoadingAnimation}
              loop={true}
              className="lottie-animation"
            />
          </div>
          <h1>Welcome to Zaika</h1>
          <p>The Swaad of India</p>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleEmailAuth} className="auth-form">
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="email-auth-btn">
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </form>
          <div className="auth-separator">
            <span>or</span>
          </div>
          <div className="auth-buttons">
            <button className="modern-google-btn" onClick={handleGoogleSignIn}>
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google"
                className="google-icon"
              />
              <span>Continue with Google</span>
            </button>
          </div>
          <p className="auth-switch">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <button
              className="switch-btn"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
