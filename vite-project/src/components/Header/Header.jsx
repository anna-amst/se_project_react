import "./Header.css";
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/Avatar.png";

function Header() {
  return (
    <header className="header">
        <img className="header__logo" src={logo} />
        <p className="header__date-and-location">Date, location</p>
      <button className="header__button">+ Add clothes</button>
      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
