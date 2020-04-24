import React from 'react';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import {Header} from './header'

class Movie extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            movie: null,
            error: null,
            username: null
        }

    }

    componentDidMount() {
        const id = new URLSearchParams(window.location.search).get('n')
       
        this.fetchMovie(id);
    }

    fetchMovie = async (id) => {

        let response;
        let payload;

        try {

            const url = '/api/movies/' + id

            response = await fetch(url)
            payload = await response.json();
            
        } catch(err) {
            this.setState({error: err})
        }

        
        if(response.status == 404) {
            this.setState({error: '404 Not found'})
        }

        if(response.status != 200) {
            this.setState({error: 'error retrieving movie, status code: ' + response.status})
        }
        
        this.setState({movie: payload})

    }

    render() {
        return (
            <Container className="mt-3">
                <Row className="mb-3">
                    <Header username={this.props.username} updateLoggedInUser={this.props.updateLoggedInUser} history={this.props.history}/>
                </Row>

                <Row className="mt-3">
                    {this.state.error && <p>{this.state.error}</p>}
                </Row>
                {this.state.movie && <Container><Row className="movie">
                    
                    <Col lg={2}>
                        <img src={this.state.movie.image}></img>
                    </Col>
                    
                    <Col lg={6}>
                        <Container>
                            <Row>
                                <Col><h1>{this.state.movie.name}</h1></Col>
                            </Row> 
                            <Row>
                            <Col lg={1} className="mr-3"><b>({this.state.movie.year})</b></Col>
                            <Col lg={2}><i className="fas fa-star star"></i> <p className="star-text">{this.state.movie.stars}</p> </Col>
                            </Row>
                            <Row>
                                <Col><p>{this.state.movie.description}</p></Col>
                            </Row>
                        </Container>
                    </Col>
                    </Row>

                    <Row className="justify-content-center mt-3">
                        <Col><h3>Reviews</h3></Col>
                    </Row>
                    <Row className="mt-3">
                        <Col lg={8}>
                        {this.state.movie.review && this.state.movie.review.map((review) => <Container key={review.title + review.description} className="review p2">
                            <Row>
                                <Col><h4>{review.title}</h4></Col>
                                <Col className="text-right" lg={2}><i className="fas fa-star star"> </i> <p className="star-text">{review.stars}</p></Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p>{review.description}</p>
                                </Col>
                            </Row>
                        </Container>)}
                        </Col>
                    </Row>
                    
                    <Row>
                        {this.props.username && <Col lg={8}>
                        <Container className="review-box p3 mt-3">
                            <Row className="mt-3 mb-2">
                                <Col lg={4}><input className="mt-3 mb-1 p-1" type="text" placeholder="Title"></input></Col>
                                <Col lg={2}><i className="fas fa-star star mt-2 mb-1 p-1"> </i> <input className="review-box-star-input mt-3 mb-1 p-1" type="number"></input></Col>
                            </Row>
                            <Row className="mt-1 mb-1">
                                <Col><textarea rows='5' className="mt-1 mb-1 p-1" placeholder='Description' type="text"></textarea></Col>
                            </Row>
                            <Row className="mt-1 mb-3">
                                <Col><button className="mt-1 mb-3 p-2">Submit</button></Col>
                            </Row>
                        </Container>
                        </Col>}
                    </Row>

                    </Container>}
            </Container>
        )
    }
}

export {Movie}