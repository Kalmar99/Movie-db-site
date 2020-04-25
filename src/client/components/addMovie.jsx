import React from 'react'
import {Link} from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

import {Header} from './header'
import {MovieForm} from './movieForm'

export class AddMovie extends React.Component {
    
    constructor(props) {
        super(props)

        this.state = {
            error: null
        }

    }

    createMovie = async (state) => {

        const movie = {
            name: state.name,
            year: state.year,
            stars: state.stars,
            description: state.description,
            image: state.image
        }

        let response;
        
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
            <MovieForm 
                name={null}
                action={this.createMovie}
                username={this.props.username}
                title={'Add Movie'}
            />
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