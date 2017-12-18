import React from 'react';
import { InputGroup, InputGroupButton, Input, Button } from 'reactstrap';

class Form extends React.Component {
    render() {
        return (
            <div className="row mb-4">
                <div className="col">
                    <form>
                        <InputGroup>
                            <Input onChange={this.props.onLocationChange} placeholder="Enter your location" />
                            <InputGroupButton><Button type="submit" onClick={this.props.onLocationSubmit}>Go!</Button></InputGroupButton>
                        </InputGroup>
                    </form>
                </div>
            </div>
        )
    }
}

export default Form;