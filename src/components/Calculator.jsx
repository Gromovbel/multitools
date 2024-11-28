import React, { useState, useEffect } from "react";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  // Обработчик нажатия на клавишу
  const handleInput = (value) => {
    let newInput = input + value;
    // заменяем сочетания '++', '--' и '**' на одиночные операторы
    newInput = newInput.replace(/(\+\+|--|\*\*)/g, (match) => match[0]);
    setInput(newInput);
  };

  const handleEqual = () => {
    try {
      // Разбиваем строку на массив и преобразуем числа в числовой тип
      const equation = input.split(" ").map((element) => {
        return Number(element) ? Number(element) : element;
      });
      // Вычисляем результат
      const result = eval(equation.join(""));
      setOutput(result.toString());
    } catch (error) {
      setOutput(error.message);
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  const handleBackspace = () => {
    setInput(input.slice(0, -1)); // Удаляем последний символ из ввода
  };

  // Обработчик нажатия клавиш на клавиатуре
  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key;

      if (key >= "0" && key <= "9") {
        // Для цифр 0-9
        handleInput(key);
      } else if (key === "+" || key === "-" || key === "*" || key === "/") {
        // Для операторов +, -, *, /
        handleInput(` ${key} `);
      } else if (key === "Enter") {
        // Для Enter
        handleEqual();
      } else if (key === "Backspace") {
        // Для Backspace
        handleBackspace();
      } else if (key === "Escape") {
        // Для Escape (очистка)
        handleClear();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    // Очистка события при размонтировании компонента
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [input]);

  return (
    <div className="calc">
      <input type="text" value={input} disabled />
      <br />
      <input type="text" value={output} disabled />
      <br />
      <div className="row">
        <button onClick={handleClear}>C</button>
        <button onClick={() => handleInput(" / ")}>/</button>
        <button onClick={() => handleInput(" * ")}>x</button>
        <button onClick={handleBackspace}>←</button>
      </div>
      <div className="row">
        <button onClick={() => handleInput("7")}>7</button>
        <button onClick={() => handleInput("8")}>8</button>
        <button onClick={() => handleInput("9")}>9</button>
        <button onClick={() => handleInput(" - ")}>-</button>
      </div>
      <div className="row">
        <button onClick={() => handleInput("4")}>4</button>
        <button onClick={() => handleInput("5")}>5</button>
        <button onClick={() => handleInput("6")}>6</button>
        <button onClick={() => handleInput(" + ")}>+</button>
      </div>
      <div className="row">
        <button onClick={() => handleInput("1")}>1</button>
        <button onClick={() => handleInput("2")}>2</button>
        <button onClick={() => handleInput("3")}>3</button>
        <button onClick={handleEqual}>=</button>
      </div>
      <div className="row">
        <button onClick={() => handleInput("0")}>0</button>
      </div>
    </div>
  );
};

export { Calculator };
