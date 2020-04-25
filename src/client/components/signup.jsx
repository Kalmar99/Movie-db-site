import React from 'react'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import {Link} from 'react-router-dom'
import {Header} from './header'
import Alert from 'react-bootstrap/Alert'

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
            <Container>
            <Row>
                <Header username={this.props.username} updateLoggedInUser={this.props.updateLoggedInUser} history={this.props.history}/>
            </Row>
            <Row className="justify-content-center">
                <Col lg={5}>
                    {this.state.error && <Alert variant='warning'>{this.state.error}</Alert>}
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col lg={5}>
                    <Container className="review-box">
                        <Row>
                            <Col><h1>Sign up</h1></Col>
                        </Row>
                        <Row>
                            <Col lg={12}>
                                <input type="text" 
                                placeholder="Username" 
                                className="mt-2 p-2"
                                onChange={this.onEditUsername}>
                                </input>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12}>
                                <input type="password" 
                                placeholder="password" 
                                className="mt-2 p-2"
                                onChange={this.onEditPassword}>
                                </input> 
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <button className="mt-2 mb-3 p-2" onClick={this.signUp}>Sign up</button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p>Already have an account? <Link to="/login">Log in</Link></p>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
        )
    }
}