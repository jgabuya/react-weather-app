import React from 'react';
import axios from 'axios';
import { Alert, InputGroup, InputGroupButton, Input, Button } from 'reactstrap';
import isEmpty from 'lodash/isEmpty';

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
                <div className={((this.state.errorMessage.length === 0)? 'd-none ' : '') + 'row mb-3'}>
                    <div className="col">
                        <Alert color="warning">
                            {this.state.errorMessage}
                        </Alert>
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col">
                        <form>
                            <InputGroup>
                                <Input onChange={this.onLocationChange} placeholder="Enter your location" />
                                <InputGroupButton><Button type="submit" onClick={this.onLocationSubmit}>Go!</Button></InputGroupButton>
                            </InputGroup>
                        </form>
                    </div>
                </div>

                {! isEmpty(this.state.weatherData) &&
                    <div className={((isEmpty(this.state.weatherData))? 'd-none ' : '') + 'row'}>
                        <div className="col">
                            <div className="jumbotron">
                                <img src={'http://openweathermap.org/img/w/' + this.state.weatherData.weather[0].icon + '.png'} alt={this.state.weatherData.weather[0].icon} />
                                
                                <h1 className="display-4">{this.state.weatherData.name}</h1>

                                <p className="lead">
                                    {this.state.weatherData.main.temp} &deg;C, {this.state.weatherData.weather[0].main}
                                </p>
                            </div>
                        </div>
                    </div>
                }

            </div>
        )
    }
}

export default Main;