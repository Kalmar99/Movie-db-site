import React from 'react'
import {Link} from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'




export class Header extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            error: null
        }
    }

   componentDidMount() {
        this.checkUserState();
   }

   checkUserState = async () => {

    let response;
    let payload;

    try {   
        response = await fetch('/api/user')
        payload = await response.json()
    } catch(error) {
        this.setState({error})
        return;
    }

    if(response.status === 404) {
        this.props.updateLoggedInUser(false)
        return;
    }

    if(response.status === 401) {
        this.props.updateLoggedInUser(false)
        return;
    }

    if(response.status === 200) {
        this.props.updateLoggedInUser(payload.username)
        return;
    }

   }

   logout = async () => {
        let response;
        
        try {
            response = await fetch('/api/logout',{
                method: 'POST'
            })
        } catch(error) {
            this.setState({error})
        }

        if(response.status == 401) {
            this.setState({error: 'You are not logged in'})
        }

        if(response.status == 500) {
            this.setState({error: '500 Internal Server Error'})
        }

        if(response.status == 204) {
            this.props.updateLoggedInUser(false)
        }
   }

   onUserStateChange = () => {
        if(!this.props.username) {
            this.props.history.push('/login');
        } else {
            this.logout()
        }
   }

    render() {
       
        return (
            <Container className="m-2">
                <Row>
                    <img src="./img/movies.png" className="img-fluid ml-2"></img>
                    <Col lg={2}>
                        <h1>MovieDB</h1>
                    </Col>
                    <Col lg={1} className="my-auto">
                        <Link to="/" className={"header-link mx-auto"}>Home</Link>
                    </Col>
                    <Col lg={2} className="my-auto">
                        <Link to="/addmovie" className="header-link mx-auto">Add Movie</Link>
                    </Col>
                    <Col lg={2} className="my-auto">
                        <button className="p-1 m-1" onClick={this.onUserStateChange}>{this.props.username ? 'Log Out' : 'Log In'}</button>
                    </Col>
                </Row>
            </Container>
        )
    }
}