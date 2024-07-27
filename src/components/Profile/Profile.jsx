import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

const Profile = ({handleCardClick, weatherData}) => {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection weatherData={weatherData} handleCardClick={handleCardClick}/>
      </section>
    </div>
  );
};

export default Profile;
