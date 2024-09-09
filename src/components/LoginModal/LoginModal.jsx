import ModalWithForm from "../ModalWithForm/ModalWithForm";

const Login = ({title, isOpen, onClose, onSubmit}) => {

  const handleSubmit() => {

  }


  return (
    <ModalWithForm
      title="Log In"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
<label htmlFor="email" className="modal__label">
    Email* <input type="email"
    className="modal__input"
    id="email"
    placeholder="Email"
    name="email"
    value={data.email}
  />
</label>
<label htmlFor="password" className="modal__label">
    Password* <input type="text"
    className="modal__input"
    id="password"
    placeholder="Password"
    name="password"
    value={data.password}
  />
</label>


    </ModalWithForm>
  );
};
