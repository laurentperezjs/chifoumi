"use strict";

const React = require('react');
const Rule = require('./Rule.jsx');
var GameActions = require('./actions/GameActions');
var GameStore = require('./stores/GameStore');

const choices = [
    {id: 1, name: "lizard", beats: [2, 4]},
    {id: 2, name: "spock", beats: [3, 5]},
    {id: 3, name: "scissors", beats: [4, 1]},
    {id: 4, name: "paper", beats: [5, 2]},
    {id: 5, name: "rock", beats: [1, 3]}
];

var rounds = [];
var txp1choice = "Player 1, please choose:";
var txp2choice = "Player 2, please choose:";

function _reset() {
    console.log("reseting");
    GameActions.updateRound({round: txp1choice});
    rounds = [];
    // ReactDOM.unmountComponentAtNode(document.getElementById('result'));
}
function _compute(choices, rounds) {
    var rule = new Rule(choices, rounds);
    return rule.compute();
}

// public

class Choice extends React.Component {
    handleClick(i) {
        var id = parseInt(i.target.id);
        rounds.push(id);
        // print player 2 turn;
        GameActions.updateRound({round: txp2choice});
        if (rounds.length === 2) {
            // compute result
            var res = _compute(choices, rounds);
            GameActions.updateScore(res);
            _reset();
        }
    }

    render() {
        return (
            <div>
                <div className={"choice icon " + this.props.name} onClick={this.handleClick.bind(this)}
                     key={this.props.id} id={this.props.id}>{this.props.name}</div>
            </div>
        )
    }
}

class Choices extends React.Component {
    render() {
        /* why do I have to remap {choices} ? */
        var c = choices.map(function (choice) {
            return (
                <Choice name={choice.name} id={choice.id} key={choice.id}/>
            );
        });
        return (
            <div>
                {c}
            </div>
        );
    }
}
;

class Round extends React.Component {
    constructor(props) {
        super(props);
        this.state = {round: txp1choice};
    }

    componentWillUnmount() {
        GameStore.removeChangeListener(this._onChange);
    }

    componentDidMount() {
        GameStore.addChangeListener(this._onChange.bind(this)); // why must bind ?
    }

    _onChange() {
        this.setState(GameStore.getRound());
    }

    render() {
        return (
            <div id="playerChoice" className="playerChoice">
                {this.state.round}
            </div>
        );
    }
}

class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            score: GameStore.getScore(),
            isVisible: false
        }
    }

    componentWillUnmount() {
        GameStore.removeChangeListener(this._onChange);
    }

    componentDidMount() {
        GameStore.addChangeListener(::this._onChange); // why must bind ?
    }

    _onChange() {
        var newScore = GameStore.getScore();
        this.setState({
            score: newScore,
            isVisible: !!Object.keys(newScore).length
        });
        setTimeout(() => this.setState({isVisible: false}), 4000);
    }

    render() {
        let result;
        if (this.state.score.winner === 0) {
            result = "draw game";
        } else {
            result = "Player " + this.state.score.winner + " won with " + this.state.score.choicename;
        }
        return (
            <div id="result" className={this.state.isVisible ? "shown" : "hidden"}>
                {result}
            </div>
        );
    }
}


const Game = (props) => (
    <div className="app">
        {props.word}
        <img src="img/logo.svg" className="logo"/>
        <Round/>
        <Choices/>
        <Result/>
    </div>);


module.exports = Game;