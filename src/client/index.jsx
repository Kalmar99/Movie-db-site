import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import {Home} from './components/home'
import {Login} from './components/login'
import SignUp from './components/signup'
import NotFound from './components/notfound'
import {Movie} from './components/movie'
import {AddMovie} from './components/addMovie'
import {EditMovie} from './components/editMovie'


export class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: null
        }
    }

    updateLoggedInUser = (username) => {
      this.setState({username:username})  
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path="/login"
                               render={props => <Login {...props}
                                                       username={this.state.username}
                                                       updateLoggedInUser={this.updateLoggedInUser}/>}/>
                        <Route exact path="/signup"
                               render={props => <SignUp {...props}
                                                        username={this.state.username}
                                                        updateLoggedInUser={this.updateLoggedInUser}/>}/>
                         <Route exact path="/movie"
                               render={props => <Movie {...props}
                                                      username={this.state.username}
                                                      updateLoggedInUser={this.updateLoggedInUser}/>}/>
                        <Route exact path="/addmovie"
                               render={props => <AddMovie {...props}
                                                      username={this.state.username}
                                                      updateLoggedInUser={this.updateLoggedInUser}/>}/>
                        <Route exact path="/editmovie"
                               render={props => <EditMovie {...props}
                                                      username={this.state.username}
                                                      updateLoggedInUser={this.updateLoggedInUser}/>}/>

                        <Route exact path="/"
                               render={props => <Home {...props}
                                                      username={this.state.username}
                                                      updateLoggedInUser={this.updateLoggedInUser}/>}/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App/>,document.getElementById("root"))