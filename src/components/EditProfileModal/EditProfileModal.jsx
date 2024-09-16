import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./EditProfileModal.css";

export const EditProfileModal = ({onClose, isOpen}) => {
  const [data, setData] = useState({
    name: "",
    avatar: "",
  });

  if (!isOpen) {
    return null;
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <ModalWithForm title="Change profile data" onClose={onClose}>
      <label htmlFor="name" className="modal__label">
        Name*{" "}
        <input
          type="name"
          className="modal__input"
          id="name"
          required
          placeholder="Name"
          name="name"
          value={data.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar*{" "}
        <input
          type="link"
          className="modal__input"
          id="avatar"
          required
          placeholder="Avatar URL"
          name="avatar"
          value={data.avatar}
          onChange={handleChange}
        />
      </label>
      <button type="submit" className="modal__submit">
        Save changes
      </button>
    </ModalWithForm>
  );
};

export default EditProfileModal;
