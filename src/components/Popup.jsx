import { useState, useRef } from "react";
import { Button, Col, Row } from "react-bootstrap";
import FromEquationToLink from "./FromEquationToLink";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
const domain = "http://numberguess.org/";

const Popup = (props) => {
  const copyEquationLink = () => {
    window.navigator.clipboard.writeText(
      "http://numberguess.org/challenge:" +
        encodeURIComponent(props.equation)
    );
  };
  const saveAsEmoji = () => {
    let output = "";
    props.moves.forEach((line) => {
      line.forEach((move, index) => {
        if (props.equation.includes(move) === false) {
          output += "⬜";
        }
        if (props.equation.includes(move) && props.equation[index] === move) {
          output += "🟩";
        }
        if (props.equation.includes(move) && props.equation[index] != move) {
          output += "🟧";
        }
        if (index === line.length - 1) {
          output += "\n";
        }
      });
    });
    window.navigator.clipboard.writeText(output);
    return output;
  };

  const saveImg = () => {
    html2canvas(document.getElementsByClassName("gameField")[0]).then(function (
      canvas
    ) {
      canvas.toBlob(function (blob) {
        saveAs(blob, "Number game.png");
      });
    });
  };

  return (
    <div>
      <div className="wrap"></div>
      <div
        className="popUpMenu"
        style={{ overflow: "hidden", borderRadius: "15px" }}
      >

          <div>
          {props.popup === "custom" ? (
          <ChallengeMenu close={props.close} />
        ) : ("")}
            {props.popup === "won" ? (
              <WonMenu
              restart={props.restart}
                saveImg={saveImg}
                saveAsEmoji={saveAsEmoji}
                copyEquationLink={copyEquationLink}
                close={props.close}
              />
            ) : (
              ""
            )}
            {props.popup === "lost" ? (
              <LostMenu
              restart={props.restart}
                close={props.close}
                saveImg={saveImg}
                copyEquationLink={copyEquationLink}
                equation={props.equation}
              />
            ) : (
              ""
            )}
          </div>

      </div>
    </div>
  );
};

export default Popup;

const WonMenu = (props) => {
  const [showShareBtns, setShowShareBtns] = useState(false);
  const emojies = props.saveAsEmoji();

  return (
    <div className="secondaryColor" style={{ paddingBottom: "10px" }}>
      <span className="menuColor">
        <h5 className="menuColor p-2" style={{ color: "#d4ac41" }}>
          You Won! 🏆
        </h5>
        <i
          style={{
            position: "absolute",
            fontSize: "1.2rem",
            width: "40px",
            top: "9px",
            right: "20px",
          }}
          className="fas fa-times closeBtn"
          onClick={props.close}
        ></i>
      </span>

      <Button className="restartBtn" onClick={props.restart}>
        RESTART
      </Button>
      <p className="mt-1 mb-1" style={{ fontSize: ".8rem" }}>
        or press Enter to play again
      </p>

      {showShareBtns ? (
        <Row className="pe-3 ps-3 pb-2">
          <Col sm="6" xs="6">
            <Button
              className="mt-2 share-stats-btn twitter-share"
              style={{ width: "100%" }}
              size="sm"
              href={
                "https://twitter.com/intent/tweet?text=" +
                encodeURIComponent(
                  "I won! This is my result: \n" +
                    emojies +
                    " Check it on " +
                    domain
                )
              }
              target="_blank"
            >
              Twitter
            </Button>
          </Col>
          <Col sm="6" xs="6">
            <Button
              className="mt-2 share-stats-btn facebook-share"
              style={{ width: "100%" }}
              size="sm"
              href={
                "https://www.facebook.com/sharer/sharer.php?u=" +
                domain +
                "&quote=" +
                encodeURIComponent(
                  "I won! This is my result: \n" +
                    emojies +
                    " Check it on " +
                    domain
                )
              }
              target="_blank"
            >
              Facebook
            </Button>
          </Col>
          <Col sm="6" xs="6">
            <Button
              className="mt-2 share-stats-btn whatsapp-share"
              style={{ width: "100%" }}
              size="sm"
              href={
                "whatsapp://send?text=" +
                encodeURIComponent(
                  "I won! This is my result: \n" +
                    emojies +
                    " Check it on " +
                    domain
                )
              }
              target="_blank"
            >
              WhatsApp
            </Button>
          </Col>
          <Col sm="6" xs="6">
            <Button
              className="mt-2 share-stats-btn reddit-share"
              style={{ width: "100%" }}
              size="sm"
              href={
                "http://www.reddit.com/submit?url=" +
                domain +
                "&title=" +
                encodeURIComponent(
                  "I won! This is my result: \n" +
                    emojies +
                    " Check it on " +
                    domain
                )
              }
              target="_blank"
            >
              Reddit
            </Button>
          </Col>
        </Row>
      ) : (
        <Button
          size="sm"
          className="popupBtn"
          onClick={() => setShowShareBtns(true)}
        >
          <i class="fas fa-share me-2"></i>Share you result!
        </Button>
      )}
      <Button size="sm" className="popupBtn" onClick={props.saveAsEmoji}>
        <i class="fas fa-th me-2"></i>Copy your puzzle with emojies
      </Button>
      <Button size="sm" className="popupBtn" onClick={props.copyEquationLink}>
        <i class="fas fa-link me-2"></i>Copy link to this equation
      </Button>
      <Button size="sm" className="popupBtn" onClick={props.saveImg}>
        <i class="fas fa-download me-2"></i>Download puzzle image
      </Button>
    </div>
  );
};

const LostMenu = (props) => {
  return (
    <div className="secondaryColor" style={{ paddingBottom: "10px" }}>
      <span className="menuColor">
        <h5 className="menuColor p-2">You Lost!</h5>
        <i
          style={{
            position: "absolute",
            fontSize: "1.2rem",
            width: "40px",
            top: "9px",
            right: "20px",
          }}
          className="fas fa-times closeBtn"
          onClick={props.close}
        ></i>
      </span>
      <p className="mt-1 mb-1" style={{ fontSize: ".9rem" }}>
        The answer was:
      </p>
      <div className="answerBox mx-auto">
        <span>{props.equation}</span>
      </div>
      <Button className="restartBtn">RESTART</Button>
      <p className="mt-1 mb-1" style={{ fontSize: ".8rem" }}>
        or press Enter to play again
      </p>
      <Button size="sm" className="popupBtn" onClick={props.copyEquationLink}>
        <i class="fas fa-link me-2"></i>Copy link to this equation
      </Button>
      <Button size="sm" className="popupBtn" onClick={props.saveImg}>
        <i class="fas fa-download me-2"></i>Download puzzle image
      </Button>
    </div>
  );
};

const ChallengeMenu = (props) => {
  const [message, setMessage] = useState("");
  const input = useRef();

  const generateLink = () => {
    const getLink = new FromEquationToLink(input.current.value);
    if (getLink.error) {
      setMessage(getLink.error);
    } else if (getLink.link) {
      window.navigator.clipboard.writeText(getLink.link);
      setMessage("Link Copied!");
    }
  };

  return (
    <div className="secondaryColor" style={{ paddingBottom: "20px" }}>
      <span className="menuColor">
        <h5 className="menuColor p-2">Number Guess Generator</h5>
        <i
          style={{
            position: "absolute",
            fontSize: "1.2rem",
            width: "40px",
            top: "9px",
            right: "20px",
          }}
          className="fas fa-times closeBtn"
          onClick={props.close}
        ></i>
      </span>
      <p className="mt-3 mb-3 pe-2 ps-2" style={{ fontSize: ".9rem" }}>
        Challenge your friends with an equation from 5 to 12 symbols:
      </p>
      <input ref={input} className="answerBox mx-auto pt-0 pb-0" type="text" />
      <p className="mt-3 mb-3 pe-2 ps-2" style={{ fontSize: ".9rem" }}>
        {message}
      </p>
      <Button className="facebook-share" onClick={generateLink}>
        Copy Link
      </Button>
    </div>
  );
};
