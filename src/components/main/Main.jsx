import React from 'react';
import axios from 'axios';
import { Alert, InputGroup, InputGroupButton, Input, Button } from 'reactstrap';

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
                appid: instance.props.apiKey
            }
        })
    }

    render() {
        return (
            <div>
                <div className={(( this.state.errorMessage.length == 0)? 'd-none ' : '') + 'row mb-3'}>
                    <div className="col">
                        <Alert color="warning">
                            {this.state.errorMessage}
                        </Alert>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <form>
                            <InputGroup>
                                <Input onChange={this.onLocationChange} placeholder="Enter your location" />
                                <InputGroupButton><Button type="submit" onClick={this.onLocationSubmit}>Go!</Button></InputGroupButton>
                            </InputGroup>

                            <div>
                                {JSON.stringify(this.state.weatherData)}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Main;