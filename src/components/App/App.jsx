import { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

import "./App.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";
import CurrentTempratureUnitContext from "../../contexts/CurrentTempretureUnitContext";
import { getItems, addItem, deleteItem } from "../../utils/api";
import AddItemModal from "../AddItemModal/AddItemModal";
import Register from "../RegisterModal/RegisterModal";
import Login from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import * as api from "../../utils/api";

import * as auth from "../../utils/auth";
import { setToken, getToken } from "../../utils/token";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    avatar: "",
    _id: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  //const location = useLocation();

  const handleRegistration = ({ name, email, password, avatar }) => {
    auth
      .register(name, password, email, avatar)
      .then(() => {
        // close active modal
        // sign in user
        handleLogin({ email, password });
      })
      .catch(console.error);
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    auth
      .authorize(email, password)
      .then((data) => {
        console.log(data);
        if (data.token) {
          setToken(data.token);
          setCurrentUser(data.user);
          setIsLoggedIn(true);
          closeActiveModal();
          navigate("/profile");
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }

    api
      .getUserInfo(jwt)
      .then(({ name, avatar }) => {
        setIsLoggedIn(true);
        setCurrentUser({ name, avatar });
        navigate("/profile");
      })
      .catch(console.error);
  }, []);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleSignUpClick = () => {
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleEditProfileClick = () => {
    console.log("Edit profile button clicked");
    setActiveModal("edit-profile");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleEditUser = (data) => {
    const jwt = getToken();
    api
      .updateCurrentUser(data, jwt)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch(console.error);
  };

  const onAddItem = (item) => {
    const jwt = getToken();

    return addItem(item, jwt)
      .then((newItem) => {
        setClothingItems((clothingItems) => [newItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleDeleteItem = (id) => {
    const jwt = getToken();
    deleteItem(id, jwt)
      .then(() => {
        setClothingItems((clothingItems) =>
          clothingItems.filter((item) => item._id !== id)
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  console.log(currentTemperatureUnit);
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTempratureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              handleLoginClick={handleLoginClick}
              handleSignUpClick={handleSignUpClick}
              onClose={closeActiveModal}
            />
            <Routes>
              <Route
                path="/*"
                element={
                  isLoggedIn ? (
                    <Main
                      weatherData={weatherData}
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                    />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      weatherData={weatherData}
                      handleCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      clothingItems={clothingItems}
                      handleEditProfileClick={handleEditProfileClick}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
          </div>

          {activeModal === "add-garment" && (
            <AddItemModal
              onClose={closeActiveModal}
              isOpen={true}
              onAddItem={onAddItem}
            />
          )}

          {activeModal === "preview" && (
            <ItemModal
              onClose={closeActiveModal}
              isOpen={true}
              card={selectedCard}
              onDelete={handleDeleteItem}
            />
          )}

          {activeModal === "register" && (
            <Register
              onClose={closeActiveModal}
              isOpen={true}
              handleRegistration={handleRegistration}
            />
          )}

          {activeModal === "login" && (
            <Login
              onClose={closeActiveModal}
              isOpen={true}
              handleLogin={handleLogin}
            />
          )}

          {activeModal === "edit-profile" && (
            <EditProfileModal isOpen={true} onClose={closeActiveModal} handleEditUser={handleEditUser} />
          )}
        </CurrentTempratureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
