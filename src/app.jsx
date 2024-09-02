import * as React from "react";
import { createRoot } from "react-dom/client";
import { convertTemperature } from "./converter.js";

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: "",
      fromScale: "celsius",
      toScale: "fahrenheit",
      error: "",
    };
  }

  render() {
    const tempChangeFunc = (event) => {
      const input = event.target.value;
      this.setState({ temp: input });
      if (!/^-?\d*\.?\d*$/.test(input)) {
        this.setState({ error: "Invalid input" });
      } else {
        this.setState({ error: "" });
      }
    };

    const fromScaleChangeFunc = (event) => {
      const selectedScale = event.target.value;
      this.setState({ fromScale: selectedScale });
      if (selectedScale === toScale) {
        this.setState({ error: "Cannot convert to same scale" });
      } else {
        this.setState({ error: "" });
      }
    };
    const result = convertTemperature(
      Number(this.state.temp),
      this.state.fromScale,
      this.state.toScale
    );
    const toScaleChangeFunc = (event) => {
      const selectedScale = event.target.value;
      this.setState({ toScale: selectedScale });
      if (selectedScale === fromScale) {
        this.setState({ error: "Cannot convert to same scale" });
      } else {
        this.setState({ error: "" });
      }
    };
    return (
      <div className="container d-flex flex-column justify-content-center text-center">
        <div className="form-group p-2 col-md-8 align-self-center">
          <label htmlFor="celsius" className="form-label">
            Temperature:
          </label>
          <input
            type="number"
            className="form-control"
            value={this.state.temp}
            id="temp"
            placeholder="Введите температуру."
            onChange={tempChangeFunc}
          />
        </div>
        <div className="form-group p-2 col-md-8 align-self-center">
          <label htmlFor="fromScale" className="form-label">
            From Scale:
          </label>
          <select
            className="form-select"
            id="fromScale"
            value={this.state.fromScale}
            onChange={fromScaleChangeFunc}
          >
            <option value="celsius">Celsius</option>
            <option value="fahrenheit">Fahrenheit</option>
            <option value="kelvin">Kelvin</option>
          </select>
        </div>
        <div className="form-group p-2 col-md-8 align-self-center">
          <span className="arrow">➡</span>
        </div>
        <div className="form-group p-2 col-md-8 align-self-center">
          <label htmlFor="toScale" className="form-label">
            To Scale:
          </label>
          <select
            className="form-select"
            id="toScale"
            value={this.state.toScale}
            onChange={toScaleChangeFunc}
          >
            <option value="celsius">Celsius</option>
            <option value="fahrenheit">Fahrenheit</option>
            <option value="kelvin">Kelvin</option>
          </select>
        </div>
        {this.error ? (
          <p className="error-text">
            <i className="fa fa-exclamation-circle" />
            {this.state.error}
          </p>
        ) : (
          <p className="result-text">
            {result !== null ? (
              <>
                <i className="fa fa-thermometer-half" />
                {this.state.temp}{" "}
                {this.state.fromScale === "celsius"
                  ? "Celsius"
                  : this.state.fromScale === "fahrenheit"
                  ? "Fahrenheit"
                  : "Kelvin"}{" "}
                = {result.toFixed(2)}{" "}
                {this.state.toScale === "celsius"
                  ? "Celsius"
                  : this.state.toScale === "fahrenheit"
                  ? "Fahrenheit"
                  : "Kelvin"}
                .
              </>
            ) : (
              "Select different units to convert."
            )}
          </p>
        )}
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="container text-center p-4">
          <h1>Temperature Converter</h1>
        </div>
      </header>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div id="app">
        <Header />
        <Body />
      </div>
    );
  }
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
