import React, { useState } from "react";
import { Timer } from "../Timer";
import { Randomizer } from "../Randomizer";
import { Calculator } from "../Calculator";
import { Converter } from "../Converter";
import { Info } from "../Info";
import { Contacts } from "../Contacts";

function Main({ activeComponent }) {
  return (
    <div className="container">
      {activeComponent === "timer" && <Timer />}
      {activeComponent === "randomizer" && <Randomizer />}
      {activeComponent === "calculator" && <Calculator />}
      {activeComponent === "converter" && <Converter />}
      {activeComponent === "info" && <Info />}
      {activeComponent === "contacts" && <Contacts />}
    </div>
  );
}

export { Main };
