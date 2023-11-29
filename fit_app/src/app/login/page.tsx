'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken';
import './login.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [jwtToken, setJwtToken] = useState<string>('');


  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      var response1 = await fetch('https://afefitness2023.azurewebsites.net/api/Users/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
      var data = await response1.json();
      var tokendecoded = jwt.decode(data.jwt);

      if (tokendecoded) {
        await setJwtToken(data.jwt);
        await localStorage.setItem('jwtToken', data.jwt);

        if (tokendecoded.Role === "Manager") {
          router.push('/manager');
        } else if (tokendecoded.Role === "PersonalTrainer") {
          router.push('/trainer');
        } else {
          router.push('/client');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-6">
          <div className="login-container">
            <div className="logo-container text-center w-1">
              <img src="/FitApp.png" alt="Logo" className="img-fluid w-1" />
            </div>
            <h1 className="text-center">Welcome to Fit App</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" className="form-control" value={email} onChange={handleEmailChange} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" className="form-control" value={password} onChange={handlePasswordChange} />
              </div>
              <button type="submit" className="btn btn-primary btn-block">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
