import React from 'react'
import {Link} from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'




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

        try {
            response = await fetch('/api/movies',{
                method: 'POST',
                headers: [
                    {'Content-Type': 'appliction/json'}
                ],
                body: JSON.stringify(movie)
            })
        } catch(error) {
            this.setState({error})
        }

        if(response.status === 401) {
            this.setState({error: 'you need to be logged in to do that!'})
        }
        if(response.status === 500) {
            this.setState({error:'500 Internal Server Error'})
        }
        if(response.status === 201) {
            this.props.history.push('/movie/?n=' + movie.name)
        }

    }

    renderIfLoggedIn = () => {
        return (
            <Container>
                <Row>
                    <Col><label>Movie Title</label></Col>
                </Row>
                <Row>
                    <Col><input onChange={this.onNameChange} type="text"></input></Col>
                </Row>
                <Row> 
                    <Col><label>Thumbnail Url</label></Col>
                </Row>
                <Row>
                    <Col><input onChange={this.onImageChange} type="text"></input></Col>
                </Row>
                <Row>
                    <Col><label>Description</label></Col>
                </Row>
                <Row>
                    <Col><textarea onChange={this.onDescriptionChange}></textarea></Col>
                </Row>
                <Row>
                    <Col><label>Stars</label></Col>
                    <Col><input onChange={this.onStarsChange} type="number"></input></Col>
                    <Col><label>Year</label></Col>
                    <Col><input onChange={this.onYearChange} type="number"></input></Col>
                </Row>
                <Row>
                    <button onClick={this.createMovie}>Add Movie</button>
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

        if(!this.props.username) {
            content = this.renderIfLoggedOut()
        } else {
            content = this.renderIfLoggedIn()
        }

        return (
            <Container>
                <Row>
                    {content}
                </Row>
            </Container>
        )
    }
}