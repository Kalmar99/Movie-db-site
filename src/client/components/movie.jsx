import React from 'react';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

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
        console.log('id')
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
                <Row>
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
                    </Container>}
                    <Row>
                        {this.props.username && <Col>
                        <Container>
                            <Row>
                                <Col><label>Title</label></Col>
                            </Row>
                            <Row>
                                <Col><input type="text"></input></Col>
                            </Row>
                            <Row>
                                <Col><label>Description</label></Col>
                            </Row>
                            <Row>
                                <Col><Col><input type="text"></input></Col></Col>
                            </Row>
                            <Row>
                                <Col><i className="fas fa-star star"> </i> <input type="number"></input></Col>
                                <Col><button>Submit</button></Col>
                            </Row>
                        </Container>
                        </Col>}
                    </Row>
            </Container>
        )
    }
}

export {Movie}