import React, { Component } from "react";
import moment from "moment";
import SearchHistory from "./SearchHistory";
import { toast } from "react-toastify";

// Bootstrap
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import "./WeatherScreen.scss";

class Weather extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null,
      loading: true,
      currentTime: new Date(),
      apiKey: "06a17fbd827afd00eda7804891ec5c19",
      lat: 1.29027,
      lon: 103.851959,
      cityName: "",
      countryName: "",
      combineCityCountry: "",
      history: [],
    };
  }

  componentDidMount() {
    this.weatherDataCall();
  }

  componentDidUpdate(prevProps, prevState) {
    // Called when the component updates (state or props change)
    // You can check if specific conditions are met and call your function
    if (this.state.lat !== prevState.lat || this.state.lon !== prevState.lon) {
      this.weatherDataCall();
    }
  }

  weatherDataCall = () => {
    const xhr = new XMLHttpRequest();
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lon}&appid=${this.state.apiKey}&units=metric`;
    xhr.open("GET", url, true);
    xhr.onload = () => {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        this.setState({ weatherData: data, loading: false });
      } else {
        this.setState({ loading: false });
        console.error("Error fetching weather data.");
      }
    };
    xhr.send();
    this.setState({
      currentTime: moment().format("MMMM Do YYYY, h:mm:ss a"),
    });
  };

  convertCountryCityToLatLon = () => {
    const xhr = new XMLHttpRequest();
    let url = null;
    if (this.state.cityName !== "" && this.state.countryName !== "") {
      url = `http://api.openweathermap.org/geo/1.0/direct?q=${this.state.cityName},${this.state.countryName}&appid=${this.state.apiKey}`;
    } else if (this.state.cityName) {
      url = `http://api.openweathermap.org/geo/1.0/direct?q=${this.state.cityName}&appid=${this.state.apiKey}`;
    } else if (this.state.countryName) {
      url = `http://api.openweathermap.org/geo/1.0/direct?q=${this.state.countryName}&appid=${this.state.apiKey}`;
    }
    xhr.open("GET", url, true);
    xhr.onload = () => {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        this.setState(
          {
            loading: false,
            lat: data[0].lat,
            lon: data[0].lon,
          },
          () => {
            this.weatherDataCall();
          }
        );
      } else {
        this.setState({ loading: false });
        console.error("Error fetching weather data.");
      }
    };
    xhr.send();
  };

  handleCityChange = (e) => {
    this.setState({ cityName: e.target.value });
  };
  handleCountryChange = (e) => {
    this.setState({ countryName: e.target.value });
  };

  handleSearch = () => {
    if (this.state.countryName  || this.state.cityName) {
      this.convertCountryCityToLatLon();
      const newHistoryEntry = {
        cityName: this.state.cityName,
        countryName: this.state.countryName,
      };
      this.setState((prevState) => ({
        history: [newHistoryEntry, ...prevState.history],
      }));
    } else {
      toast.error("Please enter either City or Country");
    }
  };
  handleReset = () => {
    this.setState({ cityName: "", countryName: "" });
  };

  render() {
    const { weatherData, loading } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!weatherData) {
      return <div>Error loading weather data</div>;
    }

    return (
      <div>
        <h2 className="ws-header">Today's Weather in {weatherData.name}</h2>
        <hr></hr>
        <Form>
          <Row className="mb-5 ws-description">
            <Col xs="auto">City Name:</Col>
            <Col className="col-2">
              <Form.Control
                type="text"
                onChange={this.handleCityChange}
                value={this.state.cityName}
              />
            </Col>
            <Col xs="auto">Country Code:</Col>
            <Col className="col-2">
              <Form.Control
                type="text"
                onChange={this.handleCountryChange}
                value={this.state.countryName}
              />
            </Col>
            <Col xs="auto">
              <Button variant="primary" onClick={this.handleSearch}>
                Submit
              </Button>
            </Col>
            <Col xs="auto">
              <Button variant="primary" onClick={this.handleReset}>
                Reset
              </Button>
            </Col>
          </Row>
        </Form>
        <div className="ws-description">
          <p>Description: {weatherData.weather[0].description}</p>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}</p>
          <p>Time: {this.state.currentTime}</p>
        </div>
        <hr></hr>
        <div>
          <SearchHistory history={this.state.history} />
        </div>
      </div>
    );
  }
}

export default Weather;
