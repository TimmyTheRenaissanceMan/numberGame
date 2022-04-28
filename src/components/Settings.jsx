import { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import store from "../store";

const Settings = () => {
  const [settings, setSettings] = useState({
    equationLength: 5,
    arithmeticSigns: ["+", "-", "/", "*"],
    darkMode: false,
    colorBlindMode: false,
    swapEnterBckspc: false,
  });

  //Return to the game
  const close = () => {
    store.dispatch({
      type: "section",
      payload: "game",
    });
  };

  //Change app state based on changing settings
  const toggleState = (state, value) => {
    store.dispatch({
      type: state,
      payload: value,
    });
  };

  //Change app settings
  const updateSettings = () => {
    setSettings({
      equationLength: store.getState().equationLength,
      arithmeticSigns: store.getState().arithmeticSigns,
      darkMode: store.getState().darkMode,
      colorBlindMode: store.getState().colorBlindMode,
      swapEnterBckspc: store.getState().swapEnterBckspc,
    });
  };

  //Listen to changes
  store.subscribe(() => {
    updateSettings();
  });

  //Prepare settigns onload
  useEffect(() => {
    updateSettings();
  }, []);

  return (
    <div
      className="text-center mx-auto"
      style={{ maxWidth: "600px", minWidth: "252px", padding: "0 12px" }}
    >
      <Row>
        <Col
          xs="12"
          className="menuColor"
          style={{
            position: "relative",
            borderRadius: "10px",
          }}
        >
          <h4 className="pt-1">Settings</h4>
          <i
            style={{
              position: "absolute",
              fontSize: "1.2rem",
              width: "40px",
              top: "9px",
              right: "20px",
            }}
            className="fas fa-times closeBtn"
            onClick={close}
          ></i>
        </Col>
      </Row>
      <Row className="px-3">
        <Col className="mx-auto" sm="10" xs="12">
          <h5 className="mt-2 mb-0">Equation Length</h5>
          <p className="text-center mb-1">
            Choose the number of symbols in the target equation
          </p>
        </Col>
        <Col className="mx-auto" md="10" sm="7" xs="8">
          <Row className="justify-content-center equation">
            <Cell
              type="changeEquation"
              value={5}
              className={
                settings.equationLength === 5 ? "activeSettingsCell" : ""
              }
            />
            <Cell
              type="changeEquation"
              value={6}
              className={
                settings.equationLength === 6 ? "activeSettingsCell" : ""
              }
            />
            <Cell
              type="changeEquation"
              value={7}
              className={
                settings.equationLength === 7 ? "activeSettingsCell" : ""
              }
            />
            <Cell
              type="changeEquation"
              value={8}
              className={
                settings.equationLength === 8 ? "activeSettingsCell" : ""
              }
            />
            <Cell
              type="changeEquation"
              value={9}
              className={
                settings.equationLength === 9 ? "activeSettingsCell" : ""
              }
            />
            <Cell
              type="changeEquation"
              value={10}
              className={
                settings.equationLength === 10 ? "activeSettingsCell" : ""
              }
            />
            <Cell
              type="changeEquation"
              value={11}
              className={
                settings.equationLength === 11 ? "activeSettingsCell" : ""
              }
            />
            <Cell
              type="changeEquation"
              value={12}
              className={
                settings.equationLength === 12 ? "activeSettingsCell" : ""
              }
            />
          </Row>
        </Col>

        <hr className="mt-3 mb-2" style={{ height: "2px" }} />

        <Col className="mx-auto" sm="10" xs="12">
          <h5 className="mt-0 mb-0">Arithmetic Signs</h5>
          <p className="text-center mb-0">
            Choose the arithmetic signs in the target equation
          </p>
        </Col>
        <Col className="mx-auto" md="10" sm="7" xs="8">
          <Row className="justify-content-center">
            <Cell
              type="changeArithmeticSigns"
              value={"+"}
              style={{ fontWeight: "500" }}
              settings={settings}
              className={
                settings.arithmeticSigns.includes("+")
                  ? "activeSettingsCell"
                  : ""
              }
            />
            <Cell
              settings={settings}
              type="changeArithmeticSigns"
              value={"-"}
              style={{ fontWeight: "500" }}
              className={
                settings.arithmeticSigns.includes("-")
                  ? "activeSettingsCell"
                  : ""
              }
            />
            <Cell
              settings={settings}
              type="changeArithmeticSigns"
              value={"*"}
              style={{ fontWeight: "500" }}
              className={
                settings.arithmeticSigns.includes("*")
                  ? "activeSettingsCell"
                  : ""
              }
            />
            <Cell
              settings={settings}
              type="changeArithmeticSigns"
              value={"/"}
              style={{ fontWeight: "500" }}
              className={
                settings.arithmeticSigns.includes("/")
                  ? "activeSettingsCell"
                  : ""
              }
            />
          </Row>
        </Col>

        <hr className="mt-3 mb-2" style={{ height: "2px" }} />

        <Col
          className="mx-auto me-0 ms-0"
          style={{ width: "100%" }}
          md="10"
          sm="7"
          xs="8"
        >
          <Row className="p-0 me-0">
            <Col className="p-0" xs="8">
              <h5 className="text-start">Dark Mode</h5>
              <p className="text-start">Change dark and light mode</p>
            </Col>
            <Col xs="4" className="p-0 mt-3">
              <Form.Check
                style={{ fontSize: "1.3rem" }}
                type="switch"
                id="custom-switch"
                className="float-end settingsToggleBtn"
                checked={settings.darkMode}
                onChange={(event) =>
                  toggleState("darkMode", event.target.checked)
                }
              />
            </Col>
          </Row>
        </Col>

        <hr className="mt-3 mb-2" style={{ height: "2px" }} />

        <Col
          className="mx-auto me-0 ms-0"
          style={{ width: "100%" }}
          md="10"
          sm="7"
          xs="8"
        >
          <Row className="p-0 me-0">
            <Col className="p-0" xs="8">
              <h5 className="text-start">Color Blind Mode</h5>
              <p className="text-start">High contrast colors</p>
            </Col>
            <Col xs="4" className="p-0 mt-3">
              <Form.Check
                style={{ fontSize: "1.3rem" }}
                type="switch"
                id="custom-switch"
                className="float-end settingsToggleBtn"
                checked={settings.colorBlindMode}
                onChange={(event) =>
                  toggleState("colorBlindMode", event.target.checked)
                }
              />
            </Col>
          </Row>
        </Col>
        <hr className="mt-3 mb-2" style={{ height: "2px" }} />

        <Col
          className="mx-auto me-0 ms-0"
          style={{ width: "100%" }}
          md="10"
          sm="7"
          xs="8"
        >
          <Row className="p-0 me-0 mb-5">
            <Col className="p-0" xs="8">
              <h5 className="text-start">Swap Buttons</h5>
              <p className="text-start">Swap "Enter" and "Backspace" buttons</p>
            </Col>
            <Col xs="4" className="p-0 mt-3">
              <Form.Check
                style={{ fontSize: "1.3rem" }}
                type="switch"
                id="custom-switch"
                className="float-end settingsToggleBtn"
                checked={settings.swapEnterBckspc}
                onChange={(event) =>
                  toggleState("swapEnterBckspc", event.target.checked)
                }
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

const Cell = (props) => {
  const changeEquationLength = (value) => {
    
    reloadEquation();
    store.dispatch({
      type: "equationLength",
      payload: value,
    });

  };

  const changeArithmeticSigns = (sign) => {
    reloadEquation();
    const newValue = props.settings.arithmeticSigns.includes(sign)
      ? props.settings.arithmeticSigns.filter((item) => item !== sign)
      : [...props.settings.arithmeticSigns, sign];
    if (newValue.length > 0) {
      store.dispatch({
        type: "arithmeticSigns",
        payload: newValue,
      });
    }
  };


  const reloadEquation = () => {

    store.dispatch({
      type: "flip",
      payload: -1,
    });

    store.dispatch({
      type: "status",
      payload: "playing",
    });

    store.dispatch({
      type: "saveMoves",
      payload: {moves: [], currentLine: 0},
    });
  }

  return (
    <div
      style={props.style}
      className={"settingsCell " + props.className}
      onClick={
        props.type === "changeEquation"
          ? () => {
              changeEquationLength(+props.value);
            }
          : () => {
              changeArithmeticSigns(props.value.toString());
            }
      }
    >
      {props.value ? props.value : ""}
    </div>
  );
};

export default Settings;
