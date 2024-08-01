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
      navigate("/"); // Redirigir a la página de inicio u otra página después de iniciar sesión
    } else {
      console.log("Login failed");
      setError("Invalid email or password");
    }
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <div className="title-container">
          <h1 className="title">Rick and Morty Login</h1>
        </div>
        <form onSubmit={handleLogin}>
          <input
            className="input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="button" type="submit">
            Login
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <p className="register-link">
          No estás registrado? <Link to="/signup">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
};
