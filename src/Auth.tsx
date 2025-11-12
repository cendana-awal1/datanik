import React, { useState } from "react";
import { supabase } from "./supabaseClient";
import { LogIn, Mail, Lock } from "lucide-react";

interface AuthProps {
  onAuthChange: (user: any) => void;
}

export function Auth({ onAuthChange }: AuthProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isSignUp) {
        const {  error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signUpError) throw signUpError;
        setEmail("");
        setPassword("");
        setError(
          "Registration successful! Please check your email to verify your account."
        );
      } else {
        const { data, error: signInError } =
          await supabase.auth.signInWithPassword({
            email,
            password,
          });
        if (signInError) throw signInError;
        onAuthChange(data.user);
      }
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <LogIn size={32} className="auth-icon" />
          <h1>{isSignUp ? "Create Account" : "Login"}</h1>
          <p className="auth-subtitle">LPG Customer Management System</p>
        </div>

        <form onSubmit={handleAuth} className="auth-form">
          <div className="form-group">
            <label className="form-label">
              <Mail size={18} />
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <Lock size={18} />
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="form-input"
            />
          </div>

          {error && (
            <div
              className={`alert ${
                isSignUp && error.includes("successful")
                  ? "alert-success"
                  : "alert-error"
              }`}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-block"
          >
            {loading ? "Processing..." : isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

         {/* <button 
          type="button"
          onClick={() => {
            setIsSignUp(!isSignUp);
            setError('');
          }}
          className="toggle-auth"
        >
          {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
        </button>  */}
      </div>
    </div>
  );
}
