import { useState } from "react";
import styles from "./App.module.css";

const NUMS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const OPERATORS = ["+", "-", "=", "C"];
const NUMBER = "NUMBER";
const OPERATOR = "OPERATOR";

export const App = () => {
  const [operand1, setOperand1] = useState("");
  const [operand2, setOperand2] = useState("");
  const [operator, setOperator] = useState("");
  const [isResult, setIsResult] = useState(false);

  const clear = () => {
    setOperand1("");
    setOperand2("");
    setOperator("");
    setIsResult(false);
  };

  const handleClick = (value, type) => () => {
    if (type === NUMBER) {
      if (operand1 && operator) {
        setOperand2((prev) => prev + value);
      } else {
        setOperand1((prev) => prev + value);
      }
    }

    if (type === OPERATOR) {
      switch (value) {
        case "C":
          clear();
          break;
        case "=":
          setIsResult(true);
          break;
        default:
          if (operand1) {
            setOperator(value);
          }
      }
    }

    if (isResult) {
      clear();
    }
  };

  const renderOutput = () => {
    let output = "0";

    if (isResult) {
      if (operator === "+") {
        output = Number(operand1) + Number(operand2);
      }

      if (operator === "-") {
        output = Number(operand1) - Number(operand2);
      }
    } else {
      output = `${operand1 || 0}${operator}${operand2}`;
    }

    return output;
  };

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <div className={`${styles.display} ${isResult ? styles.outcome : ""}`}>
          {renderOutput()}
        </div>
        <div className={styles.operators}>
          {OPERATORS.map((item) => (
            <button
              className={styles.operand}
              key={item}
              onClick={handleClick(item, OPERATOR)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className={styles.nums}>
          {NUMS.map((item) => (
            <button
              key={item}
              className={styles.button}
              onClick={handleClick(item, NUMBER)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
