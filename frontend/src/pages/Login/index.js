import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import { URL } from "../../serverUrl";
import { login, requestLogin } from "../../redux/actions/action";
import { NavBar } from "../../components";
import "./login.css";

function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const options = {
  //       method: "POST",
  //       body: {
  //         username: e.target.form.username.value,
  //         password: e.target.form.password.value,
  //       },
  //       headers: { "Content-type": "application/json" },
  //     };
  //     const response = await fetch(
  //       `http://test-django-43.herokuapp.com/login`,
  //       options
  //     );
  //     const data = await response.json();
  //     // (do I need to convert it to json?)
  //     navigate(`/profile`, { replace: true });
  //   } catch (error) {
  //     console.warn(error);
  //   }
  // };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    try {
      const userLogin = {
        username: form.username.value,
        password: form.password.value,
      };
      const options = {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(userLogin),
      };
      const response = await fetch(`${URL}/login/`, options);
      const data = await response.json();
      // dispatch(requestLogin(userLogin));
      if (!data.success) {
        dispatch({
          type: "ERROR",
          payload: "Login not authorised",
        });
      } else {
        dispatch(login(data.token));
      }

      navigate(`profile`, { replace: true });
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <main className="loginmain">
      <NavBar />
      <div className="loginbody">
        <form onSubmit={handleFormSubmit}>
          <h2 id="loginTitle">Login</h2>
          <label className="loginInputLabel" for="username">
            Username
          </label>
          <input className="loginForm" type="text" id="username" />
          <label className="loginInputLabel" for="password">
            Password
          </label>
          <input className="loginForm" type="text" id="password" />
          <input id="submit-btn" type="submit" value="Submit" />
        </form>
        <p>
          Don't have an account?
          <span onClick={() => navigate("/register")}>Register</span>
        </p>
      </div>
    </main>
  );
}

export default Login;