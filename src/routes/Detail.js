import React from 'react';
import axios from 'axios';
import './Detail.css';

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            runtime: '',
            isLoading: true
        }
    }

    async componentDidMount() {
        window.scrollTo({ top: 0 });
        const { history: { push }, location: { state } } = this.props;
        if (state === undefined) {
            push('/');
        } else {
            this.setState({ runtime: `${Math.floor(state.runtime / 60)}h ${state.runtime % 60}min`, isLoading: false });
        }

    }

    render() {
        const { location: { state } } = this.props;
        return state ? (
            <>{this.state.isLoading ? (
                <div className="loader" >
                    <span className="loader__text">Loading...</span>
                </div>
            ) : <div className="detail_frame">
                    <div className="upperSide">
                        <img className="posterImg" src={state.poster} alt="movie_poster" />
                        <div className="informations">
                            <div className="title">{state.title}<span className="year">{state.year}</span></div>
                            <div className="description" id="description_genres">Genres</div>
                            <div className="genres">{state.genres.map((genre, idx) => {
                                return <span key={idx} className="genre">{genre}</span>;
                            })}</div>
                            <div className="description">Rating</div>
                            <div className="rating">{state.rating}</div>
                            <div className="description">Runtime</div>
                            <div className="runtime">
                                {state.runtime === 0 ? '.' :
                                    this.state.runtime
                                }
                            </div>
                        </div>
                    </div>
                    <div className="lowerSide">
                        <div className="title" id="descriptions">Descriptions</div>
                        <div className="summary">
                            {state.summary}
                        </div>
                    </div>
                </div>}

            </>
        ) : null;
    }
}

export default Detail;