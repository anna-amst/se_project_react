import React from "react";
import "./ToggleSwitch.css";
import { useState } from "react";

const ToggleSwitch = () => {
  const [currentTempUnit, handleToggleSwitchChange] = useState("C");
  const handleChange = () => {
    if (currentTempUnit === "C") handleToggleSwitchChange("F");
    if (currentTempUnit === "F") handleToggleSwitchChange("C");
  };

  return (
    <label className="switch">
      <input type="checkbox" className="switch__box" onChange={handleChange} />
      <span
        className={
          currentTempUnit === "F"
            ? "switch__slider switch__slider-F"
            : "switch__slider switch__slider-C"
        }
      ></span>
      <p
        className={`switch__temp-F ${
          currentTempUnit === "F" && "switch__active"
        }`}
      >
        F
      </p>
      <p
        className={`switch__temp-C ${
          currentTempUnit === "C" && "switch__active"
        }`}
      >
        C
      </p>
    </label>
  );
};

export default ToggleSwitch;
