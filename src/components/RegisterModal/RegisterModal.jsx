import ModalWithForm from "../ModalWithForm/ModalWithForm";

const Register = ({ onClose, isOpen, onSubmit }) => {
  if (!isOpen) {
    return null;
  }

  //handleSubmit

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={onSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email*
        <input
          type="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          name="email"
          value={data.email}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password*
        <input
          type="text"
          className="modal__input"
          id="password"
          placeholder="Password"
          name="password"
          value={data.password}
        />
      </label>
      <label htmlFor="name" className="modal__label">
        Name*
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          name="name"
          value={data.name}
        />
      </label>
      <label htmlFor="avatarUrl" className="modal__label">
        Avatar URL*{" "}
        <input
          type="link"
          className="modal__input"
          id="avatarUrl"
          placeholder="Avatar URL"
          name="avatarUrl"
          value={data.avatarUrl}
        />
      </label>
      <label className="register__button">
        <button type="submit"
        className="register__button"
        onSubmit{handleSubmit} >Sign up</button>
      </label>
      <label className="login__button">
        
      </label>
    </ModalWithForm>
  );
};

export default Register;
