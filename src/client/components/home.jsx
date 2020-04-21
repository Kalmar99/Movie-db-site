import React from "react";


export default class Home extends React.Component {
    
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
        try {
            
            const response = await fetch("/api/movies")
            const payload = await response.json()

            if(response.status !== 200) {
                this.setState({error: 'Cant get movies code: ' + response.status})
                return;
            }
            
            this.setState({error: null, movies: payload})

        } catch(err) {
            this.setState({error: 'cant connect to server'})
        }
    }

    render() {

        return (
            <div>
                <p>{this.state.error && this.state.error}</p>
                <h1>React is running</h1>
                <p>Welcome: {this.props.username}</p>

                {this.state.movies && this.state.movies.map((movie) => 
                <div key={movie.name}>
                    <img src={movie.image}></img>
                </div>
                )}


            </div>
        )
    }

}