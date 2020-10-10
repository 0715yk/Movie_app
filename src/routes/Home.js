import React from 'react';
import axios from 'axios';
import Movie from '../components/Movie';
import './Home.css';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            movies: []
        }
    }

    async getMovies() {
        const { data: { data: { movies } } } = await axios.get('https://yts-proxy.now.sh/list_movies.json?sort_by=rating');
        this.setState({ movies, isLoading: false });
    }

    componentDidMount() {
        this.getMovies();
    }

    render() {
        const { movies, isLoading } = this.state;
        return (
            <section className="container">
                {isLoading ? (
                    <div className="loader" >
                        <span className="loader__text">Loading...</span>
                    </div>
                ) :
                    (<div className="movies">
                        {movies.map(movie => {
                            return <Movie key={movie.id} genres={movie.genres} title={movie.title} year={movie.year} summary={movie.summary} poster={movie.medium_cover_image} />
                        })}
                    </div>
                    )}
            </section>
        );
    }
}


export default Home;
