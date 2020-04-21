import React from 'react';



import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default class Movie extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            movie: null,
            error: null
        }
    }

    componentDidMount() {
        const id = new URLSearchParams(window.location.search).get('name')
        this.fetchMovie(id);
        console.log("Mounted")
    }

    fetchMovie = async (id) => {

        try {

            const url = '/api/movies/' + id

            const response = await fetch(url)
            const payload = await response.json();
            
            if(response.status == 404) {
                this.setState({error: '404 Not found'})
            }

            if(response.status != 200) {
                this.setState({error: 'error retrieving movie, status code: ' + response.status})
            }
            console.log(payload)
            this.setState({movie: payload})

        } catch(err) {
            this.setState({error: err})
        }

    }

    render() {
        return (
            <Container>
                {this.state.movie && <div><Row>
                    
                    <Col lg={3}>
                        <img src={this.state.movie.image}></img>
                    </Col>
                    
                    <Col lg={4}>
                        <Col><h1>{this.state.movie.name}</h1></Col>
                        <Col><b>({this.state.movie.year})</b></Col>
                    </Col>
                    </Row>
                    <Row>
                        <Col><p>{this.state.movie.description}</p></Col>
                    </Row>
                    
                    </div>}
            </Container>
        )
    }
}