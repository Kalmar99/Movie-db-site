import React from 'react'
import {Link} from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

import {Header} from './header'


export class AddMovie extends React.Component {
    
    constructor(props) {
        super(props)

        this.state = {
            name: null,
            year: null,
            stars: null,
            description: null,
            image: null,
            error: null
        }

    }

    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    onYearChange = (event) => {
        this.setState({year: event.target.value})
    }

    onStarsChange = (event) => {
        this.setState({stars: event.target.value})
    }

    onDescriptionChange = (event) => {
        this.setState({description: event.target.value})
    }

    onImageChange = (event) => {
        this.setState({image: event.target.value})
    }

    createMovie = async () => {

        const movie = {
            name: this.state.name,
            year: this.state.year,
            stars: this.state.stars,
            description: this.state.description,
            image: this.state.image
        }

        let response;
        console.log(movie)
        try {
            response = await fetch('/api/movies',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movie)
            });
        } catch(error) {
            this.setState({error})
        }

        if(response.status === 401) {
            this.setState({error: 'you need to be logged in to do that!'})
            return;
        }
        if(response.status === 500) {
            this.setState({error:'500 Internal Server Error'})
            return;
        }
        if(response.status === 201) {
            this.props.history.push('/movie?n=' + movie.name)
            return;
        }

    }

    renderIfLoggedIn = () => {
        return (
            <Container className="review-box">
                <Row>
                    <Col className="mt-3 mb-2" lg={4}><input className="p-1" placeholder="Title" onChange={this.onNameChange} type="text"></input></Col>
                </Row>
                <Row>
                    <Col className="mb-2" lg={7}><input className="p-1" placeholder="Image Url" onChange={this.onImageChange} type="text"></input></Col>
                </Row>
                <Row>
                    <Col className="mb-2"><textarea className="p-1" rows="4" placeholder="Description" onChange={this.onDescriptionChange}></textarea></Col>
                </Row>
                <Row>
                    <Col lg={2}> <i className="fas fa-star star mt-2 mb-1 p-1"> </i> <input className="p-1 review-box-star-input" placeholder="Stars" onChange={this.onStarsChange} type="number"></input></Col>
                    <Col lg={1}><input className="p-1" placeholder="year" onChange={this.onYearChange} type="number"></input></Col>
                </Row>
                <Row>
                    <button className="m-3 p-2" onClick={this.createMovie}>Add Movie</button>
                </Row>
            </Container>
        )
    }

    renderIfLoggedOut = () => {
        return(
            <Container>
                <Row>
                    <Col><p>You need to be logged in to add movies.</p></Col>
                </Row>
                <Row>
                    <Col><Link to="/login">Log in</Link></Col>
                </Row>
            </Container>
        )
    }

    render() {
        
        let content;

        if(this.state.error !== null) {
            console.log(this.state.error)
            content = <p>{this.state.error.toString()}</p>
        } else if(!this.props.username) {
            content = this.renderIfLoggedOut()
        } else {
            content = this.renderIfLoggedIn()
        }

        return (
            <Container>
                <Row className="mb-3">
                    <Header username={this.props.username} updateLoggedInUser={this.props.updateLoggedInUser} history={this.props.history}/>
                </Row>
                <Row>
                    <Col className="m-0 p-1"><h2>Add Movie</h2></Col>
                </Row>
                <Row className="mt-1">
                    {content}
                </Row>
            </Container>
        )
    }
}