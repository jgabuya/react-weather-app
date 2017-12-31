import React from 'react';
import axios from 'axios';
import Form from './Form';
import Result from "./Result";
import Error from "./Error";
import isEmpty from "lodash/isEmpty";

class Main extends React.Component {
    constructor() {
        super();

        this.state = {
            location: '',
            weatherData: {},
            errorMessage: ''
        }

        this.onLocationChange = this.onLocationChange.bind(this);
        this.onLocationSubmit = this.onLocationSubmit.bind(this);
    }

    onLocationChange(event) {
        this.setState({
            location: event.target.value
        });
    }

    onLocationSubmit(event) {
        event.preventDefault();

        let instance = this;

        this.fetchWeatherData(instance.state.location)

            .then(function (response) {
                instance.setState({
                    weatherData: response.data,
                    errorMessage: ''
                });
            })

            .catch(function (error) {
                instance.setState({
                    weatherData: {},
                    errorMessage: `Weather info for "${instance.state.location}" not available.`
                });

                console.log(error);
            });
    }

    fetchWeatherData(location) {
        let instance = this;

        return axios.get(instance.props.apiUrl, {
            params: {
                q: location,
                units: 'metric',
                appid: instance.props.apiKey
            }
        })
    }

    render() {
        let display;

        if (this.state.errorMessage.length > 0) {
            display = <Error errorMessage={this.state.errorMessage} />;
            console.log(this.state.errorMessage);
        } else if (!isEmpty(this.state.weatherData)) {
            display = <Result icon={this.state.weatherData.weather[0].icon} name={this.state.weatherData.name} description={this.state.weatherData.weather[0].main} temp={this.state.weatherData.main.temp} />;
        }

        return (
            <div>
                <Form onLocationChange={this.onLocationChange} onLocationSubmit={this.onLocationSubmit} />

                {display}
            </div>
        )
    }
}

export default Main;