import React from "react";
import {Link} from 'react-router-dom'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

export default class Home extends React.Component {
    
    constructor(props) {
        
        super(props)
        
        this.state = {
            movies: null,
            error: null
        }
    }

    componentDidMount() {
        this.fetchMovies()
        console.log(this.props)
    }

    fetchMovies = async () => {
        try {
            
            const response = await fetch("/api/movies")
            const payload = await response.json()

            if(response.status !== 200) {
                this.setState({error: 'Cant get movies code: ' + response.status})
                return;
            }
            
            this.setState({error: null, movies: payload})

        } catch(err) {
            this.setState({error: 'cant connect to server'})
        }
    }

    render() {

        return (
            <Container>
                <Row>
                    <Container className="m-2">
                        <Row>
                            <img src="./img/movies.png" className="img-fluid ml-2"></img>
                            <Col lg={2}>
                                <h1>MovieDB</h1>
                            </Col>
                        </Row>
                    </Container>
                </Row>
                <Row className="justify-content-center">
                    <p>{this.state.error && this.state.error}</p>
                    {this.state.movies && this.state.movies.map((movie) => 
                    <Col className="m-2 mb-3" lg={2} key={movie.name}>
                        <Link to={"/movie?n=" + movie.name}><img src={movie.image}></img></Link>
                    </Col>
                    )}
                </Row>
            </Container>
        )
    }

}