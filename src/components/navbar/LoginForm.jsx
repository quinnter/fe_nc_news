import React, { Component } from 'react'
import { Input, InputLabel, Button } from '@material-ui/core';
import { getUser } from '../../api';

export default class LoginForm extends Component {
    state = {
        userInput: ''
    }

    render() {
        return (
            <form onSubmit={this.handleSumbit}>
                <InputLabel>Enter Username</InputLabel>
                <Input
                    label="Enter Username"
                    variant="outlined"
                    onChange={this.storeUserInput}
                    value={this.state.userInput}
                    required
                ></Input>
                <Button type="submit">Login</Button>
            </form>
        )
    }

    storeUserInput = event => {
        this.setState({ userInput: event.target.value })
    }

    handleSumbit = event => {
        event.preventDefault();
        const { userInput } = this.state;
        getUser(userInput)
            .then(user => {
                this.setState({ userInput: "" })
                this.props.loginUser(user.username)
            })
    }


}