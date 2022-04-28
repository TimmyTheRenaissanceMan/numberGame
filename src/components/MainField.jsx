import { useState } from "react";
import HowToPlay from "./HowToPlay";
import Settings from "./Settings";
import Stats from "./Stats";
import store from "../store";
import Game from "./Game";

const MainField = () => {
  const [section, setSection] = useState("game");

  store.subscribe(() => {
    if (section !== store.getState().section) {
      setSection(store.getState().section);
    }
  });

  return (
    <div className="mainColor" style={{ height: "auto" }}>
      {section === "game" ? (
        <div>
          <Game />
        </div>
      ) : (
        ""
      )}

      {section === "info" ? <HowToPlay /> : ""}
      {section === "settings" ? <Settings /> : ""}
      {section === "stats" ? <Stats /> : ""}
    </div>
  );
};

export default MainField;
