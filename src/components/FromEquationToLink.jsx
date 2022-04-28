const signs = ["+", "-", "*", "/"];

export default class FromEquationToLink {
  constructor(input) {
    this.input = input.replace(" ", "9");
    this.inputArr = input.split("");
    return this.lengthValidation(); // initiate validation
  }

  //Check validity of the length of the equation
  lengthValidation() {
    if (13 > this.inputArr.length && this.inputArr.length > 4) {
      return this.signsValidation();
    } else {
      return "Too short";
    }
  }

  //Check initial validity of the equation
  signsValidation() {
    let checkList = {
      equalSign: false, // input must include =
      mathSign: false, // input must include at least of the arithmetic signs
      noMultiSigns: true, //multiple signs in a row
      firstLastChar: false, //first and last characters must be numbers
    };
    if (
      !signs.includes(this.inputArr[0]) &&
      !signs.includes(this.inputArr[this.inputArr.length - 1])
    ) {
      checkList.firstLastChar = true;
    }
    this.inputArr.forEach((char, index) => {
      if (char === "=") {
        checkList.equalSign = true;
      }
      if (signs.includes(char)) {
        checkList.mathSign = true;
      }
      if (signs.includes(char) && signs.includes(this.inputArr[index - 1])) {
        checkList.noMultiSigns = false;
      }
    });
    switch (true) {
      case checkList.equalSign === false:
        return { error: "No equal sign" };
      case checkList.mathSign === false:
        return { error: "No arithmetic sign was included" };
      case checkList.noMultiSigns === false:
        return { error: "Two arithmetic signs in a row" };
      case checkList.firstLastChar === false:
        return { error: "Invalid equation" };
      default:
        return this.restructureInput();
    }
  }

  restructureInput() {
    // 1. restructure array of strings into a single string
    const inputToStr = this.inputArr.reduce((combo, char) => combo + char, "");
    let equationParts = [];
    // 2. divide equation in arrays. Each array value = side of the equation
    inputToStr
      .split("=")
      .forEach((part) =>
        equationParts.push(part.split(/([*\/()]|\b\s*[-+])/g))
      );
    //3. calculate every side of the equation
    equationParts = equationParts.map((mathExpression) => {
      return this.calculateParts(mathExpression);
    });
    //4. validate equation => are all sides equal?
    return this.validateEquation(equationParts);
  }

  //   calcualte given expression
  calculateParts(mathExpression) {
    let a = "";
    let b = "";
    let sign = "";
    mathExpression.forEach((char) => {
      if (a === "") {
        a = parseInt(char);
      } else {
        if (signs.includes(char)) {
          sign = char;
        } else {
          b = parseInt(char);
          a = this.calculate(a, b, sign);
          b = 0;
          sign = "";
        }
      }
    });
    return a;
  }

  // math operations
  calculate = (a, b, sign) => {
    switch (sign) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return a / b;
      default:
        return 0;
    }
  };

  // check whether sides of the equation are equal
  validateEquation(equationParts) {
    const validated = equationParts.every(
      (element) => element === equationParts[0]
    );
    return validated ? this.generateLink() : { error: "Sides are not equal" };
  }

  generateLink() {
    const link =
      "https://number-game-ten.vercel.app/challenge:" +
      encodeURIComponent(this.input);
    return { link: link };
  }
}
