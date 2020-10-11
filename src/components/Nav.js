import React from 'react';
import './Nav.css'
import { Link } from 'react-router-dom';

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
        if (this.props.isMounted === true) {
            let value = e.target.value.trim();
            await this.setState({ searchedValue: value });
        }

    }

    sendSearchedValue() {
        if (this.props.isMounted === true) {
            this.props.searchMovie(this.state.searchedValue);
            this.search.value = '';
        }
    }

    render() {
        return (
            <div className="searchBar">
                <img id="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQHrn1VbmMMJBaPpsJbXdVPAB1gDKA6f4osoA&usqp=CAU" alt="main img" />
                <input type="text" ref={(c) => this.search = c} onChange={this.getSearchValue} />
                <Link to={{ pathname: `/search`, state: { value: this.state.searchedValue } }}><button onClick={this.sendSearchedValue}>search</button></Link>
            </div>
        );
    }

}

export default Nav;