import React from 'react'
import {Link} from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

import {Header} from './header'

export class MovieForm extends React.Component {

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

        if(this.props.name != null) {
            this.setState({
                name: this.props.name,
                year: this.props.year,
                stars: this.props.stars,
                description: this.props.description,
                image: this.props.image
            })
        }

        /*const id = new URLSearchParams(window.location.search).get('n')
        this.setState({id: id}) 
        this.fetchMovie(id); */
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

    renderIfLoggedIn = () => {
        return (
            <Container className="review-box">
                <Row>
                    <Col className="mt-3 mb-2" lg={4}>
                        <input className="p-1"
                            placeholder="Title" 
                            value={this.state.name} 
                            onChange={this.onNameChange} 
                            type="text">
                        </input></Col>
                </Row>
                <Row>
                    <Col className="mb-2" lg={7}>
                        <input className="p-1" 
                            placeholder="Image Url" 
                            value={this.state.image} 
                            onChange={this.onImageChange} 
                            type="text">
                        </input></Col>
                </Row>
                <Row>
                    <Col className="mb-2">
                        <textarea className="p-1" 
                            rows="4" placeholder="Description" 
                            value={this.state.description} 
                            onChange={this.onDescriptionChange}>
                        </textarea></Col>
                </Row>
                <Row>
                    <Col lg={2}><i className="fas fa-star star mt-2 mb-1 p-1"></i>

                    <input className="p-1 review-box-star-input" 
                        value={this.state.stars}
                        placeholder="Stars" 
                        onChange={this.onStarsChange} type="number">
                    </input></Col>

                    <Col lg={1}><input className="p-1" 
                        placeholder="year" 
                        value={this.state.year} 
                        onChange={this.onYearChange} 
                        type="number">
                    </input></Col>
                </Row>
                <Row>
                    <button className="m-3 p-2" onClick={() => this.props.action(this.state)}>{this.props.title}</button>
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
                <Row className="mt-1">
                    {content}
                </Row>
            </Container>
        )
    }

}