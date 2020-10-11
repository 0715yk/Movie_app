import React from 'react';
import './Nav.css'
class Nav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchedValue: null
        }
        this.getSearchValue = this.getSearchValue.bind(this);
        this.sendSearchedValue = this.sendSearchedValue.bind(this);
    }

    async getSearchValue(e) {
        let value = e.target.value.trim();
        if (value.length >= 5) {
            await this.setState({ searchedValue: value });
            this.props.searchMovie(this.state.searchedValue);
        }
    }

    sendSearchedValue() {
        this.props.searchMovie(this.state.searchedValue);
        this.search.value = null;
    }

    render() {
        return (
            <div className="searchBar">
                <img id="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQHrn1VbmMMJBaPpsJbXdVPAB1gDKA6f4osoA&usqp=CAU" alt="main img" />
                <input type="text" ref={(c) => this.search = c} onChange={this.getSearchValue} />
                <button onClick={this.sendSearchedValue}>search</button>
            </div>
        );
    }

}

export default Nav;