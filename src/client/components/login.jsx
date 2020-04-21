import React from "react";


export class Login extends React.Component {

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

    login = async () => {

        const user = {username: this.state.username,password: this.state.password}

        try {
            const response = await fetch('api/login',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });

            if(response.status === 401) {
                this.setState({error: 'Invalid username / password'})
                return;
            }

            if(response.status === 204) {
                this.setState({error: null})
                this.props.updateLoggedInUser(this.state.username)
                this.props.history.push('/');
                return;
            }

        } catch(err) {
            this.setState({error: 'Error connecting to server: ' + err})
        }



    }

    render() {
        return (
            <div>
                <p>{this.state.error && this.state.error}</p>
                <label>Username</label>
                <input type="text" onChange={this.onEditUsername}></input>
                <label>Password</label>
                <input type="password" onChange={this.onEditPassword}></input>
                <button onClick={this.login}>Log in</button>
            </div>
        )
    }
}