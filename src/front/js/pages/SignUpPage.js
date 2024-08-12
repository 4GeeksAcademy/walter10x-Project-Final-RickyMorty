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
          <h1 className='signuph' style={{color:"white", marginLeft:"780px", paddingTop:"90px", fontWeight:"bold" }}>Join the Multiverse</h1>
          <p style={{color:"white", marginLeft:"750px"}}>Create your account and start exploring infinite dimensions!</p>
        </div>
      
        <FormSignUp />
        <div className="signup-footer">
          
        </div>
      </div>
    </div>
  );
};
