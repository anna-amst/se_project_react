import { Link } from "react-router-dom";
import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const Login = ({ handleLogin, isOpen }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(data);
  };

  return (
    <ModalWithForm title="Log In" onSubmit={handleSubmit} isOpen={isOpen}>
      <label htmlFor="email" className="modal__label">
        Email*{" "}
        <input
          type="email"
          className="modal__input"
          id="email"
          required
          placeholder="Email"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password*{" "}
        <input
          type="text"
          className="modal__input"
          id="password"
          required
          placeholder="Password"
          name="password"
          value={data.password}
          onChange={handleChange}
        />
      </label>
      <div className="login__button-container">
        <button type="submit" className="login__link">
          Log in
        </button>
      </div>
      <div className="login__signup">
        <Link to="/register" className="signup__link">
          Sign up here
        </Link>
      </div>
    </ModalWithForm>
  );
};

export default Login;
