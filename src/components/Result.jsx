import React from 'react';

class Result extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col">
                    <div className="jumbotron">
                        <img src={'http://openweathermap.org/img/w/' + this.props.icon + '.png'}
                             alt={this.props.icon}/>

                        <h1 className="display-4">{this.props.name}</h1>

                        <p className="lead">
                            {this.props.temp} &deg;C, {this.props.description}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Result;