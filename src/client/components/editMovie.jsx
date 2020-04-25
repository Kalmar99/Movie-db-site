import React from 'react'
import {Link} from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

import {Header} from './header'
import {MovieForm} from './movieForm'

export class EditMovie extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            id: null,
            name: '',
            year: '',
            stars: '',
            description: '',
            image: '',
            error: null
        }

    }

    componentDidMount() {
        const id = new URLSearchParams(window.location.search).get('n')
        this.setState({id: id})
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
            return;
        }

        
        if(response.status == 404) {
            this.setState({error: '404 Not found'})
            return;
        }

        if(response.status != 200) {
            this.setState({error: 'error retrieving movie, status code: ' + response.status})
            return;
        }
        
        this.setState({
            name: payload.name,
            year: payload.year,
            stars: payload.stars,
            description: payload.description,
            image: payload.image,
            error: null
        })
    
    }

    editMovie = async (state) => {

        const movie = {
            name: state.name,
            year: state.year,
            stars: state.stars,
            description: state.description,
            image: state.image
        }
        let response;

        try{
            response = await fetch('/api/movies/' + this.state.id,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movie)
            })

        } catch(error) {
            this.setState({error})
        }

        if(response.status === 404) {
            this.setState({error: '404 Cant find the movie you want to edit'})
            return;
        }

        if(response.status === 401) {
            this.props.updateLoggedInUser(false)
            this.setState({error: 'You need to be logged in to do that'})
            return;
        }

        if(response.status === 204) {
            this.props.history.push('/movie?n=' + this.state.name)
            return;
        }

    }

    renderIfLoggedIn = () => {
        return (
           <MovieForm 
            name={this.state.name} 
            year={this.state.year}
            stars={this.state.stars}
            description={this.state.description}
            image={this.state.image}
            action={this.editMovie}
            username={this.props.username}
            title={'Edit Movie'}
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
                    <Col className="m-0 p-1"><h2>Edit Movie</h2></Col>
                </Row>
                <Row className="mt-1">
                    {content}
                </Row>
            </Container>
        )
    }

}