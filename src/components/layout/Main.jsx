import React, { useState } from "react";
import { Timer } from "../Timer";
import { Randomizer } from "../Randomizer";
import { Calculator } from "../Calculator";
import { Converter } from "../Converter";

function Main({ activeComponent }) {
  return (
    <div className="container">
      {activeComponent === "timer" && <Timer />}
      {activeComponent === "randomizer" && <Randomizer />}
      {activeComponent === "calculator" && <Calculator />}
      {activeComponent === "converter" && <Converter />}
    </div>
  );
}

export { Main };
