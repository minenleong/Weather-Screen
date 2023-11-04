import React, { Component } from "react";
import moment from "moment";
import SearchHistory from "./SearchHistory";

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
    };
  }

  componentDidMount() {
    const apiKey = "06a17fbd827afd00eda7804891ec5c19";
    const lat = 1.29027;
    const lon = 103.851959;
    const xhr = new XMLHttpRequest();
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

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
  }

  render() {
    const { weatherData, loading } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!weatherData) {
      return <div>Error loading weather data</div>;
    }

    return (
      <div >
        <h2 className="ws-header">Today's Weather in {weatherData.name}</h2>
        <hr></hr>
        <Form>
          <Row className="mb-5 ws-description">
            <Col xs="auto">City:</Col>
            <Col className="col-2">
              <Form.Control type="text" />
            </Col>
            <Col xs="auto">Country:</Col>
            <Col className="col-2">
              <Form.Control type="text" />
            </Col>
            <Col xs="auto">
              <Button as="input" type="submit" value="Submit" />
            </Col>
            <Col xs="auto">
              <Button as="input" type="reset" value="Reset" />
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
          <h3 className="ws-header">Search History</h3>
          <SearchHistory/>
        </div>
      </div>
    );
  }
}

export default Weather;



