import React, { Component } from "react";

import Button from "../components/Button";
import Display from "../components/Display";

import "./Calculator.css";

const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0
};

export default class Calculator extends Component {
  state = { ...initialState };

  constructor(props) {
    super(props);

    this.clearMemory = this.clearMemory.bind(this);
    this.setOperation = this.setOperation.bind(this);
    this.addDigit = this.addDigit.bind(this);
  }

  clearMemory() {
    this.setState({ ...initialState });
  }

  setOperation(operation) {
    if (this.state.current === 0) {
      this.setState({ operation, current: 1, clearDisplay: true });
    } else {
      const equals = operation === "=";
      const currentOperation = this.state.operation;

      const values = [...this.state.values];
      try {
        values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`);
      } catch (error) {
        values[0] = this.state.values[0];
      }
      values[1] = 0;

      this.setState({
        displayValue: values[0],
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values
      });
    }
  }

  addDigit(digit) {
    if (digit === "." && this.state.displayValue.includes(".")) {
      return;
    }

    const clearDisplay =
      this.state.displayValue === "0" || this.state.clearDisplay;

    const currentValue = clearDisplay ? "" : this.state.displayValue;
    const newDisplayValue = currentValue + digit;
    this.setState({ displayValue: newDisplayValue, clearDisplay: false });

    if (digit !== ".") {
      const index = this.state.current;
      const newValue = parseFloat(newDisplayValue);
      const values = [...this.state.values];
      values[index] = newValue;
      this.setState({ values });
      console.log(values);
    }
  }

  render() {
    return (
      <div className="calculator">
        <Display value={this.state.displayValue} />
        <Button click={this.clearMemory} triple>
          AC
        </Button>
        <Button click={this.setOperation} operation>
          /
        </Button>
        <Button click={this.addDigit}>7</Button>
        <Button click={this.addDigit}>9</Button>
        <Button click={this.addDigit}>8</Button>
        <Button click={this.setOperation} operation>
          *
        </Button>
        <Button click={this.addDigit}>4</Button>
        <Button click={this.addDigit}>5</Button>
        <Button click={this.addDigit}>6</Button>
        <Button click={this.setOperation} operation>
          -
        </Button>
        <Button click={this.addDigit}>1</Button>
        <Button click={this.addDigit}>2</Button>
        <Button click={this.addDigit}>3</Button>
        <Button click={this.setOperation} operation>
          +
        </Button>
        <Button click={this.addDigit} double>
          0
        </Button>
        <Button click={this.addDigit}>.</Button>
        <Button click={this.setOperation} operation>
          =
        </Button>
      </div>
    );
  }
}
