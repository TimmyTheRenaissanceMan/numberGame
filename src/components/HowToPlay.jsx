import { Row, Col } from "react-bootstrap";
import store from "../store";

const HowToPlay = (props) => {
  const close = () => {
    store.dispatch({
      type: "section",
      payload: "game",
    });
  };

  return (
    <div
      className="text-center mx-auto"
      style={{ maxWidth: "600px", minWidth: "252px", padding: "0 12px" }}
    >
      <Row>
        <Col
          xs="12"
          className="menuColor mb-3"
          style={{
            position: "relative",
            borderRadius: "10px",
          }}
        >
          <h4 className="pt-1">How to play</h4>
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
        <Col className="mx-auto" sm="10" xs="12">
          <p className="text-center mb-0">
            You have to guess the hidden math equation in 6 tries and the color
            of the tiles changes to show how close you are.
          </p>
          <p className="text-center">
            To start playing, enter any mathematical equation, for example:
          </p>
        </Col>
        <Col className="mx-auto mb-3" md="10" sm="7" xs="8">
          <Row>
            <DemoCell className="orange_cell" value={4} />
            <DemoCell className="green_cell" value={"+"} />
            <DemoCell className="green_cell" value={7} />
            <DemoCell className="orange_cell" value={"*"} />
            <DemoCell value={5} />
            <DemoCell className="green_cell" value={"="} />
            <DemoCell value={3} />
            <DemoCell className="orange_cell" value={9} />
          </Row>
        </Col>

        <Col
          sm="10"
          xs="12"
          className="menuSectionBg mx-auto mt-2"
          style={{
            position: "relative",
            borderRadius: "10px",
            padding: "0 20px",
          }}
        >
          <Row className="pt-3">
            <DemoCell
              style={{ width: "22px", height: "22px", fontSize: "1rem" }}
              value={5}
            />
            <p className="d-inline pt-1 p-0" style={{ width: "auto" }}>
              ,
            </p>
            <DemoCell
              style={{
                width: "22px",
                height: "22px",
                fontSize: "1rem",
                marginLeft: "5px",
              }}
              value={3}
            />
            <spam className="d-inline pt-1 pe-1" style={{width: "auto"}}>is not in</spam>
            <spam className="d-inline pt-1 ps-0 pe-1" style={{width: "auto"}}>the target</spam>
            <spam className="d-inline pt-1 ps-0 pe-1" style={{width: "auto"}}>equation</spam>
            <spam className="d-inline pt-1 ps-0" style={{width: "auto"}}>at all</spam>
          </Row>

          <Row style={{}} className="mt-0 pt-0">
            <DemoCell
              className="mt-0 mb-0 orange_cell"
              style={{ width: "22px", height: "22px", fontSize: "1rem" }}
              value={4}
            />
            <p className="d-inline p-0 mb-0" style={{ width: "auto" }}>
              ,
            </p>
            <DemoCell
              className="mt-0 mb-0 orange_cell"
              style={{
                width: "22px",
                height: "22px",
                fontSize: "1rem",
                marginLeft: "5px",
              }}
              value={"*"}
            />
            <p className="d-inline p-0 mb-0" style={{ width: "auto" }}>
              ,
            </p>
            <DemoCell
              className="mt-0 mb-0 orange_cell"
              style={{
                width: "22px",
                height: "22px",
                fontSize: "1rem",
                marginLeft: "5px",
              }}
              value={9}
            />
            <spam className="d-inline pe-1" style={{width: "auto"}}>is in the</spam>
            <spam className="d-inline ps-0 pe-1" style={{width: "auto"}}>equation,</spam>
            <spam className="d-inline ps-0 pe-1" style={{width: "auto"}}>but in the</spam>
            <spam className="d-inline ps-0 pt-0 mt-0" style={{width: "auto"}}>wrong spot</spam>
          </Row>

          <Row style={{}} className="mt-3  pb-3 pt-0">
            <DemoCell
              className="mt-0 mb-0 green_cell"
              style={{ width: "22px", height: "22px", fontSize: "1rem" }}
              value={"+"}
            />
            <p className="d-inline mb-0 mt-0 p-0" style={{ width: "auto" }}>
              ,
            </p>
            <DemoCell
              className="mt-0 mb-0 green_cell"
              style={{
                width: "22px",
                height: "22px",
                fontSize: "1rem",
                marginLeft: "5px",
              }}
              value={"7"}
            />
            <p className="d-inline  mb-0 mt-0 p-0" style={{ width: "auto" }}>
              ,
            </p>
            <DemoCell
              className="mt-0 mb-0 green_cell"
              style={{
                width: "22px",
                height: "22px",
                fontSize: "1rem",
                marginLeft: "5px",
              }}
              value={"="}
            />

            <spam className="d-inline mt-0 pe-1" style={{width: "auto"}}>is in the</spam>
            <spam className="d-inline mt-0 ps-0 pe-1" style={{width: "auto"}}>equation</spam>
            <spam className="d-inline mt-0 ps-0 pe-1" style={{width: "auto"}}>and in the</spam>
            <spam className="d-inline mt-0 ps-0 pt-0 mt-0" style={{width: "auto"}}>correct spot</spam>
          </Row>
        </Col>

        <Col
          sm="11"
          xs="12"
          className="mx-auto mt-2 px-0"
          style={{
            position: "relative",
            borderRadius: "10px",
            padding: "0",
          }}
        >
          <p className="text-center">
            Guess the target equation (all rows are green) to 🏆 win the game.
          </p>
          <p className="text-center mb-1" style={{ fontWeight: "500" }}>
            Game Rules:
          </p>
        </Col>

        <Col
          sm="10"
          xs="12"
          className="menuSectionBg mx-auto mb-5"
          style={{
            position: "relative",
            borderRadius: "10px",
          }}
        >
          <ul className="text-start pt-2">
            <li>The guess is accepted only with the correct equation</li>
            <li>Each guess must contain one “=”</li>
            <li>
              You can only use <b>1 2 3 4 5 6 7 8 9 0</b> numbers and{" "}
              <b>+ - * / =</b> signs
            </li>
            <li>The equation must have an integer to the right of the "="</li>
            <li>
              Guesses are not commutative (a+b=c and b+a=c are different
              answers)
            </li>
            <ul></ul>
          </ul>
        </Col>
      </Row>
    </div>
  );
};

const DemoCell = (props) => {
  return (
    <div style={props.style} className={"demoCell " + props.className}>
      {props.value ? props.value : ""}
    </div>
  );
};

export default HowToPlay;
