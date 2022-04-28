import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import StaticBody from "./components/StaticBody";
import store from "./store";
import MainField from "./components/MainField";
import PrivacyPolicy from './components/PrivacyPolicy';

function App() {
  const [settings, setSettings] = useState({
    colorBlind: false,
    darkMode: false,
  });

  store.subscribe(() => {
    if (
      store.getState().darkMode !== settings.darkMode ||
      store.getState().colorBlindMode !== settings.colorBlind
    ) {
      setSettings({
        colorBlind: store.getState().colorBlindMode,
        darkMode: store.getState().darkMode,
      });
    }
  });

  return (
    <div
      className={
        "App " +
        (store.getState().darkMode ? "darkMode " : "") +
        (store.getState().colorBlindMode ? "colorBlind" : "")
      }
    >
      {window.location.pathname === "/privacy-policy" ? (
        <PrivacyPolicy/>
      ) : (
        <div>
          <Header />
          <MainField />
          <StaticBody />
        </div>
      )}
    </div>
  );
}

export default App;
