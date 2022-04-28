import { useState, useEffect, useCallback } from "react";
import GameField from "./GameField";
import Keyboard from "./Keyboard";
import store from "../store";
import Validation from "./Validate";
import GenerateEquation from "./GenerateEquation";
import RecordGameResult from "./RecordGameResult";
import Popup from "./Popup";
const keys = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "Enter",
  "Backspace",
  "-",
  "=",
  "*",
  "/",
  "+",
];

const Game = (props) => {
  const [difficulty, setDifficulty] = useState(store.getState().equationLength);
  const [moves, setMoves] = useState(
    store.getState().moves.moves ? store.getState().moves.moves : []
  );
  const [equation, setEquation] = useState(
    store.getState().equation ? store.getState().equation : ""
  );
  const [currentLine, setCurrentLine] = useState(
    store.getState().moves.currentLine ? store.getState().moves.currentLine : 0
  );
  const [error, setError] = useState("");
  const [status, setStatus] = useState(
    store.getState().status ? store.getState().status : "playing"
  );
  const [popup, setPopup] = useState(
    store.getState().customEquation ? "custom" : ""
  );
  const [section, setSection] = useState("game");
  store.subscribe(() => {
    if (section !== store.getState().section) {
      setSection(store.getState().section);
    }
    if (store.getState().customEquation) {
      setPopup("custom");
    }
  });

  const populateField = (difficulty) => {
    const loadedField = new Array();
    const row = new Array();
    for (let k = 0; k < difficulty; k++) {
      row[k] = "";
    }
    for (let i = 0; i < 6; i++) {
      loadedField[i] = Array.from(row);
    }
    setMoves(loadedField);
    store.dispatch({
      type: "saveMoves",
      payload: { moves: loadedField, currentLine: 0 },
    });
  };

  const registerKey = (key) => {
    if (status === "playing") {
      let index;
      let newMoves = moves;
      switch (key) {
        case "Enter":
          const validation = new Validation(moves[currentLine], equation);
          if (validation.result !== "validated") {
            validationError(validation.result);
          } else {
            const won = moves[currentLine].every(
              (key, index) => key === equation[index]
            );
            store.dispatch({
              type: "saveMoves",
              payload: { moves: moves, currentLine: currentLine + 1 },
            });
            switch (true) {
              case won:
                store.dispatch({
                  type: "status",
                  payload: "won",
                });
                setTimeout(() => {
                  setPopup("won");
                }, 1000);
                RecordGameResult(true, currentLine + 1);
                setCurrentLine((prev) => ++prev);
                setStatus("won");
                window.history.pushState("", "", "/");
                break;
              case currentLine >= 5:
                store.dispatch({
                  type: "status",
                  payload: "lost",
                });
                setStatus("lost");
                setPopup("lost", RecordGameResult(false, 0));
                window.history.pushState("", "", "/");
                break;
              default:
                setCurrentLine((prev) => ++prev);
            }
          }

          break;
        case "Backspace":
          index = moves[currentLine].indexOf("") - 1;
          newMoves[currentLine][index === -2 ? difficulty - 1 : index] = "";
          setMoves([...newMoves]);
          store.dispatch({
            type: "saveMoves",
            payload: { moves: newMoves, currentLine: currentLine },
          });
          break;
        default:
          index = moves[currentLine].indexOf("");
          newMoves[currentLine][index] = key;
          setMoves([...newMoves]);
          store.dispatch({
            type: "saveMoves",
            payload: { moves: newMoves, currentLine: currentLine },
          });
      }
    }
  };

  const validationError = (error) => {
    setError(error);
    setTimeout(() => {
      setError("");
    }, 1500);
  };

  const close = () => {
    document.getElementsByClassName("popUpMenu")[0]?.classList.add("zoom-out");
    setTimeout(() => {
      setPopup("");
      store.dispatch({
        type: "customEquation",
        payload: false,
      });
    }, 200);
  };
  const start = (movesInp) => {
    if (!movesInp[0]) {
      if (window.location.pathname.includes("/challenge:")) {
        const urlEquation = decodeURIComponent(
          window.location.pathname.split("/challenge:")[1]
        );
        if (difficulty !== urlEquation.length) {
          store.dispatch({
            type: "equationLength",
            payload: urlEquation.length,
          });
          setDifficulty(urlEquation.length);
        }
        setEquation(urlEquation);
        store.dispatch({
          type: "saveEquation",
          payload: urlEquation,
        });
      } else {
        createEquation();
        // const newEquation = new GenerateEquation(difficulty);
        // console.log(newEquation)
        // setEquation(newEquation.equation);
        // store.dispatch({
        //   type: "saveEquation",
        //   payload: newEquation,
        // });
      }

      setCurrentLine(0);
      populateField(difficulty);
    }
  };

  const createEquation = () => {
    const newEquation = new GenerateEquation(difficulty);
    console.log(newEquation);
    if (!newEquation.equation) {
      createEquation();
    } else {
      setEquation(newEquation.equation);
      store.dispatch({
        type: "saveEquation",
        payload: newEquation,
      });
    }
  };

  const restart = () => {
    store.dispatch({
      type: "status",
      payload: "playing",
    });
    setStatus("playing");
    close();
    start([]);
  };

  const keyPress = useCallback((e) => {
    if (e.code === "Enter" && (status === "won" || status === "lost")) {
      restart();
    } else if (keys.includes(e.key)) {
      registerKey(e.key);
    }
  });

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  useEffect(() => {
    start(moves);
  }, []);

  return (
    <div
      className="mainColor"
      style={{ height: "650px", position: "relative" }}
    >
      {popup !== "" ? (
        <Popup
          start={start}
          restart={restart}
          close={close}
          popup={popup}
          equation={equation}
          moves={moves}
        />
      ) : (
        ""
      )}
      <Error error={error} hidden={error ? false : true} />
      <GameField
        moves={moves}
        status={status}
        equation={equation}
        currentLine={currentLine}
      />
      <p
        className="text-center mb-0 mt-2"
        style={{ minHeight: "30px", fontWeight: "500", fontSize: ".9rem" }}
      >
        {["won", "lost"].includes(status) ? (
          <span className="miniGameMessage">
            {status === "won" ? "You Won! 🏆" : "You Lost!"}
          </span>
        ) : (
          ""
        )}
      </p>
      <Keyboard
        registerKey={registerKey}
        equation={equation}
        moves={moves}
        currentLine={currentLine}
      />
    </div>
  );
};

export default Game;

const Error = (props) => {
  return (
    <div hidden={props.hidden} className="errorPopup">
      {props.error}
    </div>
  );
};
