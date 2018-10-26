import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import "./App.css";
import Column from './components/Column';
import * as Helpers from './helpers/helpers';
import Container from './components/Container';
import * as GameInteractionCreators from '../actions/gameInteractions';


class App extends Component {
    static propTypes = {
        gameBoard: PropTypes.array.isRequired,
    };

    constructor(props) {
        super(props);
        
        const { dispatch } = props;

        this.cellSelection = bindActionCreators(GameInteractionCreators.cellSelection, dispatch);
    };

    componentDidUpdate() {
        Helpers.checkGameBoard(this.props.gameBoard);
    }
    
    render() { 
        let columns = this.props.gameBoard.map((columnValues, index) =>
            <Column key={index} cellSelection={this.cellSelection} columnIndex={index} columnValues={columnValues} />
        );
        
        return (
            <div className = "App">
                <Container Columns={columns} />
            </div>
        );
    }
}

const mapStateToProps = state => (
    {
        gameBoard: state.gameBoard,
    }
);

export default connect(mapStateToProps)(App);