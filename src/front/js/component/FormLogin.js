import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import '../../styles/FormLogin.css';
import rickAndMortyBackground from "../../img/rick-and-morty-background.jpg";

export const FormLogin = () => {
  const { actions } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(''); // Limpia el error antes de intentar el login
    const success = await actions.login(email, password);
    if (success) {
      console.log("Login successful");
      // Puedes redirigir al usuario o realizar otras acciones aquí
    } else {
      console.log("Login failed");
      setError("Invalid email or password");
    }
  };

  return (
    <div className="container" style={{ backgroundImage: `url(${rickAndMortyBackground})` }}>
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
          <button
            className="button"
            type="submit"
          >
            Login
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};
