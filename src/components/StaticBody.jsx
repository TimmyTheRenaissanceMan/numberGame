import { Row, Col } from "react-bootstrap";
import ShareBar from "./ShareBar";

const StaticBody = () => {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Row className="secondaryColor2">
        <ShareBar />
        <Col
          xxl="7"
          xl="10"
          lg="12"
          md="12"
          className="text-center px-5 pt-4 pb-4 mx-auto"
        >
          {/* DESCRIPTION */}
          <h4 style={{ fontWeight: "600" }}>
            Number Guess? Guess the Math Equation
          </h4>
          <p>
            The rules are very simple: You need to accurately guess the
            mathematical equation in 6 tries. In each line enter your own
            correct equation to find out what numbers and arithmetic signs are
            in the equation. If the number or sign is in the equation, but in
            the wrong place, it will be highlighted in brown, if in the exact
            place, then in green. If there is no number or sign in the equation
            at all, the color will be gray. Can you guess the target equation in
            6 tries?
          </p>
        </Col>
      </Row>
      {/* RULES */}
      <Row className="mainColor pb-5">
        <Col
          xxl="7"
          xl="10"
          lg="12"
          md="12"
          className="text-center px-5 pt-4 pb-4 mx-auto"
        >
          <h3 className="mb-3" style={{ fontWeight: "600" }}>
            How to play Number Guess?
          </h3>
          {/* STEP 1 */}
          <div className="static-section-numeration">1</div>
          <h4 className="mb-3" style={{ fontWeight: "600" }}>
            Enter your own equation
          </h4>
          <p>
            To start the game, simply enter any correct equation to find clues.
            In total, you will have 6 tries to guess the target equation. When
            calculating, you can use numbers (0-9) and arithmetic signs (+ - * /
            =).
          </p>
          <img
            style={{ borderRadius: "10px", width: "100%", maxWidth: "540px" }}
            alt="img"
            src="https://numberle.org/assets/img/numberle-how-to-1.png"
          />
          {/* STEP 2 */}
          <div className="static-section-numeration">2</div>
          <h4 className="mb-3" style={{ fontWeight: "600" }}>
            Find out what numbers and signs are in the equation
          </h4>
          <p>
            If there are any numbers or arithmetic signs in the target equation,
            but in the wrong place, it will be highlighted in brown. If there
            are numbers or signs in the equation and in the exact place, then it
            will be highlighted in green. Gray color means that these numbers or
            signs are not in the equation.
          </p>
          <img
            style={{ borderRadius: "10px", width: "100%", maxWidth: "540px" }}
            alt="img"
            src="https://numberle.org/assets/img/numberle-how-to-2.png"
          />
          {/* STEP 3 */}
          <div className="static-section-numeration">3</div>
          <h4 className="mb-3" style={{ fontWeight: "600" }}>
            Try to solve the target equation
          </h4>
          <p>
            To win the game, you need to guess the equation exactly (all spots
            are green). At the end of the game, you can easily share your result
            on social media, as well as copy the link and challenge your
            friends!
          </p>
          <img
            alt="img"
            style={{ borderRadius: "10px", width: "100%", maxWidth: "540px" }}
            src="https://numberle.org/assets/img/numberle-how-to-3.png"
          />
        </Col>
      </Row>

      <Row className="secondaryColor">
        <Col
          xxl="7"
          xl="10"
          lg="12"
          md="12"
          className="text-center px-5 pt-4 mx-auto"
        >
          {/* HISTORY */}
          <h4 style={{ fontWeight: "600" }}>What is Number Guess?</h4>
          <p>
            Number Guess? is a math puzzle game inspired by Wordle, the game that
            made a splash in early 2022. The main goal of the Number Guess? game is
            to accurately guess the mathematical equation in 6 tries. As you
            enter your own equations, you'll see colored hints that indicate how
            close you are to solving the puzzle, and if all the rows are
            highlighted in green, then you have won! This game is perfect for
            training your brain and having fun with your friends.
          </p>
        </Col>
      </Row>

      {/* FOOTER */}
      <Row className="text-center secondaryColor pb-4">
        <ShareBar />
        <div className="mt-1">Number Guess?</div>
        <div>
          Number Guess? © {new Date().getFullYear()} All rights reserved. |{" "}
          <a
            style={{ textDecoration: "none", color: "inherit" }}
            href="mailto:abc@example.com"
          >
            Feedback
          </a>{" "}
          |{" "}
          <a
            style={{ textDecoration: "none", color: "inherit" }}
            href="/privacy-policy"
          >
            Privacy Policy
          </a>
        </div>
      </Row>
    </div>
  );
};

export default StaticBody;
