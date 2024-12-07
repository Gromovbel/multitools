import React, { useState, useEffect } from "react";
import M from "materialize-css"; // Импорт Materialize

function Header({ setActiveComponent }) {
  useEffect(() => {
    // Инициализируем дропдаун после того, как компонент отрендерится
    const dropdowns = document.querySelectorAll(".dropdown-trigger");
    M.Dropdown.init(dropdowns);
    // Возвращаем функцию очистки, чтобы удалить слушателей событий при размонтировании компонента
    return () => {
      M.Dropdown.getInstance(dropdowns[0]).destroy();
    };
  }, []);

  return (
    <div>
      <ul id="dropdown1" className="dropdown-content">
        <li>
          <a onClick={() => setActiveComponent("info")}>Info</a>
        </li>
        <li>
          <a onClick={() => setActiveComponent("contacts")}>Contacts</a>
        </li>
        <li className="divider" tabIndex="-1"></li>
      </ul>
      <nav>
        <div className="nav-wrapper">
          <a href="#!" className="brand-logo">
            MultiTools
          </a>
          <ul className="right hide-on-med-and-down">
            <li onClick={() => setActiveComponent("timer")}>Timer</li>
            <li onClick={() => setActiveComponent("randomizer")}>Randomizer</li>
            <li onClick={() => setActiveComponent("calculator")}>Calculator</li>
            <li onClick={() => setActiveComponent("converter")}>Converter</li>
            <li>
              <a
                className="dropdown-trigger btn"
                href="#"
                data-target="dropdown1"
              >
                Help
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export { Header };
