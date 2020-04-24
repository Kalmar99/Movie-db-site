import React from "react";
import {Link} from 'react-router-dom'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

class Home extends React.Component {
    
    constructor(props) {
        
        super(props)
        
        this.state = {
            movies: null,
            error: null
        }
    }

    componentDidMount() {
        this.fetchMovies()
    }

    fetchMovies = async () => {

        let response;
        let payload;

        try {
             response = await fetch("/api/movies")
             payload = await response.json()
        } catch(err) {
            this.setState({error: 'cant connect to server'})
        }

        if(response.status === 200) {
            this.setState({
                error: null,
                movies: payload
            })
        } else {
            this.setState({error: 'Cant get movies code: ' + response.status})
            return;
        }

    
    }

    render() {

        let display;

        if(this.state.error !== null) {
            display = <p>{this.state.error}</p>
        } else if(this.state.movies === null || this.state.movies.length === 0) {
            display = <p>There is no movies in database</p>
        } else {
            display = 
            <Row className="justify-content-center allMovies">
                <Row lg={12} className="">
                    {this.state.movies && this.state.movies.map((movie) => 
                    <Col className="m-2 mb-3 movie" lg={2} key={movie.name}>
                        <Link to={"/movie?n=" + movie.name}><img src={movie.image}></img></Link>
                    </Col>
                    )}
                </Row>
            </Row>
        }

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
               
                {display}
                
            </Container>
        )
    }

}

export {Home}