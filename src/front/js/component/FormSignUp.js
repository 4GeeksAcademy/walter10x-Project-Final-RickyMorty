import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import '../../styles/FormSignup.css';
import rickAndMortyBackground from "../../img/rick-and-morty-background.jpg";

export const FormSignUp = () => {
  const { actions } = useContext(Context);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (event) => {
    event.preventDefault();
    const success = await actions.signup(firstName, lastName, email, password);
    if (success) {
      console.log("Sign Up successful");
    } else {
      console.log("Sign Up failed");
      setError("Error signing up");
    }
  };

  return (
    <div className="container" style={{ backgroundImage: `url(${rickAndMortyBackground})` }}>
      <div className="form-wrapper">
        <div className="title-container">
          <h1 className="title">Rick and Morty Sign Up</h1>
        </div>
        <form onSubmit={handleSignUp}>
          <input
            className="input"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            className="input"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
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
            Sign Up
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};
