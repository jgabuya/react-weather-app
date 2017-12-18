import React from 'react';
import axios from 'axios';
import Form from '../form/Form';
import Result from "../result/Result";
import Error from "../result/Result";
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
                    errorMessage: error.message
                });
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
        return (
            <div>
                <Form onLocationChange={this.onLocationChange} onLocationSubmit={this.onLocationSubmit} />

                {
                    this.state.errorMessage.length &&
                    <Error errorMessage={this.state.errorMessage} />
                }

                {
                    !isEmpty(this.state.weatherData) &&
                    <Result icon={this.state.weatherData.weather[0].icon} />
                }
            </div>
        )
    }
}

export default Main;