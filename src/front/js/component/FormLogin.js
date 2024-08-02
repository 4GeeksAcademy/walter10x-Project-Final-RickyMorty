import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/FormLogin.css';

export const FormLogin = () => {
  const { actions } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    const success = await actions.login(email, password);
    if (success) {
      console.log("Login successful");
      navigate("/");
    } else {
      console.log("Login failed");
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <div className="login-title-container">
          <h1 className="login-title">Rick and Morty Login</h1>
        </div>
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <input
              className="login-input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              className="login-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="login-button" type="submit">
            Login
          </button>
        </form>
        {error && <p className="login-error-message">{error}</p>}
        <p className="login-register-link">
          No estás registrado? <Link to="/signup">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
};