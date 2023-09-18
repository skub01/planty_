/* import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authenticate } from "../../../src/store";



const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth || "");
  const dispatch = useDispatch();
  const [customError, setCustomError] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;

    if (formName === "signup") {
      const email = evt.target.email.value || "";
      const confirmPassword = evt.target.confirmPassword.value || "";

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      };

      if (!username || !password || !confirmPassword || !email) {
        setCustomError("All fields are required.");
        return;
      } else if (password !== confirmPassword) {
        setCustomError("Your passwords do not match. Please try again.");
        return;
      } else if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)) {
        setCustomError(
          "Please enter a password with at least one lowercase and uppercase letter, one number, and a minimum of 8 characters."
        );
        return;
      } else if (!isValidEmail(email)) {
        setCustomError("Please enter a valid email.");
        return;
      }
      dispatch(authenticate({ username, password, email, method: formName }));
    }

    if (formName === "login") {
      dispatch(authenticate({ username, password, method: formName }));
    } 
  };

  return (
    <div className="auth-form">
      {name === "login" && (
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <label htmlFor="username">
              <small>Username</small>
            </label>
            <input name="username" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </div>
          <div>
            <button type="submit">{displayName}</button>
          </div>
          {error && <div className="error-message">{error}</div>}
        </form>
      )}
      {name === "signup" && (
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" />
          </div>
          <div>
            <label htmlFor="name">
              <small>Choose a username</small>
            </label>
            <input name="username" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              <small>Create a Secure Password</small>
            </label>
            <input name="password" type="password" />
          </div>
          <div>
            <label htmlFor="confirmPassword">
              <small>Confirm Password</small>
            </label>
            <input name="confirmPassword" type="password" />
          </div>
          <div>
            <button type="submit">{displayName}</button>
          </div>
          {customError && <div className="error-message">{customError}</div>}
        </form>
      )}
    </div>
  );
};
export default AuthForm; */