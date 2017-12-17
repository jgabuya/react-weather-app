import React from 'react';
import Main from '../main/Main';

class App extends React.Component {
    render() {
        return (
            <div>
                <Main apiUrl={this.props.apiUrl} apiKey={this.props.apiKey} />
            </div>
        );
    }
}

export default App;
