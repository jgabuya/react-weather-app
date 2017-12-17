import React from 'react';
import axios from 'axios';

class Main extends React.Component {
    constructor() {
        super();

        this.state = {
            location: 'Cebu, Philippines',
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
            <form>
                <input type="text" onChange={this.onLocationChange}/>
                <button type="submit" onClick={this.onLocationSubmit}>Go</button>

                <div>
                    {this.state.errorMessage}
                </div>

                <div>
                    {JSON.stringify(this.state.weatherData)}
                </div>
            </form>
        )
    }
}

export default Main;