import React from 'react';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {Link} from 'react-router-dom'

import {Header} from './header'

class Movie extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            movie: null,
            error: null,
            username: null,

            title: null,
            stars: null,
            description: null,
        }

    }

    onTitleChange = (event) => {
        this.setState({title: event.target.value})
    }

    onStarsChange = (event) => {
        this.setState({stars: event.target.value})
    }

    onDescriptionChange = (event) => {
        this.setState({description: event.target.value})
    }

    componentDidMount() {
        const id = new URLSearchParams(window.location.search).get('n')
       
        this.fetchMovie(id);
    }

    deleteMovie = async () => {

        let response;

        try {
            response = await fetch('/api/movies/' + this.state.movie.name,{
                method: 'DELETE'
            })

        } catch(error) {
            this.setState({error: 'Unable to connect to server'})
            return;
        }

        if(response.status == 401) {
            this.setState({error: '401 Unautorized'})
            return;
        }

        if(response.status == 404) {
            this.setState({error: '404 Cant find the movie you tried to delete'})
            return;
        }

        if(response.status == 400) {
            this.setState({error: 'Bad request'})
            return;
        }

        if(response.status !== 204) {
            this.setState({error: 'Something went worng: ' + response.status})
            return;
        }

        this.props.history.push('/')
        return;

    }

    postReview = async () => {
        
        let response;
        const review = {
            title: this.state.title,
            stars: this.state.stars,
            description: this.state.description
        }
        try {
            response = await fetch('/api/movies/reviews/' + this.state.movie.name,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(review)
            })
        } catch(error) {
            this.setState({error: 'Cant connect to server'})
            return;
        }

        if(response.status == 404) {
            this.setState({error: '404 cant find that movie'})
            return;
        }   

        if(response.status == 401) {
            this.setState({error: 'You need to be logged in to do that'})
            this.props.updateLoggedInUser(false)
            return;
        }

        if(response.status !== 204) {
            this.setState({error: 'Something went wrong, code: ' + response.status}) 
            return;
        }

        this.fetchMovie(this.state.movie.name)

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
                            {this.props.username && <Row>
                                <Col lg={2}><Link to={'/editmovie?n=' + this.state.movie.name}><button className="editBtn p-1">Edit</button></Link></Col>
                                <Col lg={2}><button className="deleteBtn p-1" onClick={this.deleteMovie}>Delete</button></Col>
                            </Row>}
                        </Container>
                    </Col>
                    </Row>

                    <Row className="justify-content-center mt-3">
                        <Col><h3>Reviews</h3></Col>
                    </Row>
                    <Row className="mt-3">
                        <Col lg={8}>
                        {this.state.movie.review && this.state.movie.review.map((review) => <Container key={review.title + review.description} className="review p-2 mt-2 mb-2">
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
                                <Col lg={4}><input className="mt-3 mb-1 p-1" onChange={this.onTitleChange} type="text" placeholder="Title"></input></Col>
                                <Col lg={2}><i className="fas fa-star star mt-2 mb-1 p-1"> </i> <input onChange={this.onStarsChange} className="review-box-star-input mt-3 mb-1 p-1" type="number"></input></Col>
                            </Row>
                            <Row className="mt-1 mb-1">
                                <Col><textarea onChange={this.onDescriptionChange} rows='5' className="mt-1 mb-1 p-1" placeholder='Description' type="text"></textarea></Col>
                            </Row>
                            <Row className="mt-1 mb-3">
                                <Col><button onClick={this.postReview} className="mt-1 mb-3 p-2">Submit</button></Col>
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