import React from 'react'

export default class SignUp extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            username: null,
            password: null,
            error: null
        }
    }

    onEditUsername = (e) => {
        this.setState({username: e.target.value})
    }

    onEditPassword = (e) => {
        this.setState({password: e.target.value})
    }

    signUp = async () => {
        const user = {username: this.state.username,password: this.state.password}
        try {
            const response = await fetch('/api/signup',{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })

            if(response.status === 400) {
                this.setState({error: 'Invalid username / password'})
                return
            }
            if(response.status !== 201) {
                this.setState({error: "Error when connection to server: " + response.status})
                return
            }

            this.setState({ errorMsg: null });
            this.props.updateLoggedInUser(this.state.username);
            this.props.history.push("/");

        } catch (err) {
            this.setState({error: 'Error connecting to server: ' + err})
        }
    }

    render() {
        return (
            <div>
                {this.state.error && this.state.error}
                <div>
                    <label>Username</label>
                    <input type="text" onChange={this.onEditUsername}></input>
                    <label>Password</label>
                    <input type="password" onChange={this.onEditPassword}></input>
                    <button onClick={this.signUp}>Sign up</button>
                </div>
            </div>
        )
    }
}