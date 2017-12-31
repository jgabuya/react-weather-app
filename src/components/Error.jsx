import React from 'react';
import {Alert} from 'reactstrap';

class Error extends React.Component {
    render() {
        return (
            <div className="row mb-3">
                <div className="col">
                    <Alert color="warning">
                        {this.props.errorMessage}
                    </Alert>
                </div>
            </div>
        )
    }
}

export default Error;