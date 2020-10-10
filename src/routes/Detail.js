import React from 'react';
import './Detail.css';

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        const { history: { push }, location: { state } } = this.props;
        if (state === undefined) {
            push('/');
        }
    }

    render() {
        const { location: { state } } = this.props;
        return state ? <span>{state.title}</span> : null;
    }
}

export default Detail;