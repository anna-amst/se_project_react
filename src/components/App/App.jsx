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

import * as auth from "../../utils/auth";
//import { setToken, getToken } from "../../utils/token";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("register");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  //const location = useLocation();

  const handleRegistration = ({ name, email, password, avatar }) => {
    auth
      .register(name, password, email, avatar)
      .then(() => {
        // close active modal
        // sign in user
        navigate("/login");
      })
      .catch(console.error);
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    auth
      .authorize(email, password) // name, avatar instead ?? and pass as a context to side bar component
      .then((data) => {
        if (data.jwt) {
          //setToken(data.jwt);
          setUserData(data.user);
          setIsLoggedIn(true);
          navigate("/profile");
        }
      })
      .catch(console.error);
  };

  // useEffect(() => {
  //   const jwt = getToken();

  //   if (!jwt) {
  //     return;
  //   }
  //   // TO Do
  // }, []);

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

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const onAddItem = (item) => {
    return addItem(item)
      .then((newItem) => {
        setClothingItems((clothingItems) => [newItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleDeleteItem = (id) => {
    deleteItem(id)
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
    // <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <CurrentTempratureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
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
                    userData={userData}
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
      </CurrentTempratureUnitContext.Provider>
    </div>
    // </CurrentUserContext.Provider>
  );
}

export default App;
