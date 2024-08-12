import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import '../../styles/FormSignup.css';
import { useNavigate } from 'react-router-dom';

export const FormSignUp = () => {
  const { actions } = useContext(Context);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    setError('');
    const success = await actions.signup(firstName, lastName, email, password);
    if (success) {
      setError(`Bienvenido, ${email}!`);
      setTimeout(() => {
        navigate('/');
      }, 4000); // Redirige después de 3 segundos
    } else {
      setError("Error signing up. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="signup-container">
      <div className="signup-form-wrapper">
        <div className="signup-title-container">
          <h1 className="signup-title">Rick and Morty Sign Up</h1>
        </div>
        <form onSubmit={handleSignUp} className="signup-form">
          <div className="input-group">
            <input
              className="signup-input"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              className="signup-input"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              className="signup-input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              className="signup-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="button-group">
            <button className="signup-button" type="submit">
              Sign Up
            </button>
            <button className="cancel-button" type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
        {error && <p className="signup-error-message">{error}</p>}
      </div>
    </div>
  );
};
