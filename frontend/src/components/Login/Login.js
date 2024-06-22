import React, { useState } from "react";
import SignInwithGoogle from "./SignInWithGoogle";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3>Login</h3>

          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Dirección de correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Contraseña</label>
            <input
              type="password"
              className="form-control"
              placeholder="Ingrese Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="disabled btn btn-primary">
              Ingresar
            </button>
            <p style={{ fontSize: '12px'}}>Este login es de muestra, Solo se puede ingresar con google</p>
          </div>
          <SignInwithGoogle />
        </form>
      </div>
    </div>
  );
}

export default Login;
