import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Home from './components/home'
import {Login} from './components/login'
import SignUp from './components/signup'
import {NotFound} from './components/notfound'

export class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            userId: null
        }
    }

    updateLoggedInUserId = (userId) => {
      this.setState({userId:userId})  
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path="/login"
                               render={props => <Login {...props}
                                                       userId={this.state.userId}
                                                       updateLoggedInUserId={this.updateLoggedInUserId}/>}/>
                        <Route exact path="/signup"
                               render={props => <SignUp {...props}
                                                        userId={this.state.userId}
                                                        updateLoggedInUserId={this.updateLoggedInUserId}/>}/>
                        <Route exact path="/"
                               render={props => <Home {...props}
                                                      userId={this.state.userId}
                                                      updateLoggedInUserId={this.updateLoggedInUserId}/>}/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App/>,document.getElementById("root"))