import React from 'react';
import axios from 'axios';
import Movie from '../components/Movie';
import './Search.css';
import Nav from '../components/Nav';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            movies: []
        }
        this.mounted = false;
        this.searchMovie = this.searchMovie.bind(this);
    }

    async getMovies() {
        if (this.mounted === true) {
            const { data: { data: { movies } } } = await axios.get(`https://yts-proxy.now.sh/list_movies.json?query_term=${this.props.location.state}`);
            await this.setState({ movies, isLoading: false });
        }

    }

    componentDidMount() {
        this.mounted = true;
        this.getMovies();
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    async searchMovie(searchValue) {
        if (this.mounted === true) {
            this.setState({ isLoading: true });
            const { data: { data: { movies } } } = await axios.get(`https://yts-proxy.now.sh/list_movies.json?query_term=${searchValue}&order_by=asc`);
            this.setState({ movies, isLoading: false });
        }
    }

    render() {
        const { movies, isLoading } = this.state;
        return (
            <>
                <section className="navbar">
                    <Nav default={this.default} searchMovie={this.searchMovie} />
                </section>
                <section className="container">
                    {isLoading ? (
                        <div className="loader" >
                            <span className="loader__text">Loading...</span>
                        </div>
                    ) : this.state.movies ?
                            (<div className="movies">
                                {movies.map(movie => {
                                    return <Movie key={movie.id} genres={movie.genres} title={movie.title} year={movie.year} summary={movie.summary} poster={movie.medium_cover_image} />
                                })}
                            </div>
                            ) : (
                                <div className="loader" >
                                    <span className="loader__text">no search results found</span>
                                </div>
                            )}
                </section>
            </>
        );
    }
}


export default Search;
