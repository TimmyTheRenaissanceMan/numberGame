import { Row, Col } from "react-bootstrap";
import store from "../store";
const GameField = (props) => {
  const keyCheck = (rowIndex, key, position) => {
    if (rowIndex < props.currentLine) {
      let classStr = "";
      if (
        rowIndex === props.currentLine - 1 &&
        props.currentLine !== store.getState().flip
      ) {
        classStr = "flip ";
      }
      switch (true) {
        case props.equation[position] === key:
          return classStr + "green_cell";
        case props.equation[position] !== key && props.equation.includes(key):
          return classStr + "orange_cell";
        default:
          return classStr + "gray_cell";
      }
    }

    if (
      rowIndex === props.currentLine &&
      key !== "" &&
      !props.moves[props.currentLine][position + 1]
    ) {
      return "fillCell";
    }
  };

  setTimeout(() => {
    store.dispatch({
      type: "flip",
      payload: props.currentLine,
    });
  }, 1000);

  return (
    <div
      className="mx-auto mb-0 pt-4 gameField"
      style={{ maxWidth: "580px", minWidth: "200px" }}
    >
      {props.moves.map((array, indx) => {
        return (
          <Row
            className="justify-content-center mx-auto"
            style={{ width: "100%", flexWrap: "wrap" }}
          >
            {array.map((move, index) => {
              return (
                <Col className="p-0" style={{ maxWidth: "60px" }}>
                  <Cell
                    style={
                      indx === props.currentLine - 1
                        ? { animationDelay: (index * 0.1).toString() + "s" }
                        : {}
                    }
                    className={keyCheck(indx, move, index)}
                    value={move}
                    key={indx + index}
                  />
                </Col>
              );
            })}
          </Row>
        );
      })}
    </div>
  );
};

const Cell = (props) => {
  return (
    <div style={props.style} className={"cell " + props.className}>
      {props.value ? props.value : ""}
    </div>
  );
};

export default GameField;
