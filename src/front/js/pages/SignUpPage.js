import React from 'react';
import { FormSignUp } from '../component/FormSignUp';
import { Link } from 'react-router-dom';
//import '../../styles/SignUpPage.css';
import { Navbar } from "../component/navbar";


export const SignUpPage = () => {
  return (
    <div className="signup-page">
      <div className="signup-content">
        <div className="signup-header">
          <h1>Join the Multiverse</h1>
          <p>Create your account and start exploring infinite dimensions!</p>
        </div>
      
        <FormSignUp />
        <div className="signup-footer">
          
        </div>
      </div>
    </div>
  );
};
