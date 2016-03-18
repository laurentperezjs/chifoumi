var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var GameConstants = require('../constants/GameConstants');
var objectAssign = require('react/lib/Object.assign');

var CHANGE_EVENT = 'change';
var _score = {};
var _round =  {};

function updateScore(s) {
    console.log("updateScore:", s)
    _score = s;
}
function updateRound(r) {
    console.log("updateRound:", r)
    _round = r;
}

var GameStore = objectAssign(EventEmitter.prototype, {
    getRound () {
        return _round;
    },
    getScore () {
        return _score;
    },
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});
AppDispatcher.register(function(payload) {

    switch(payload.action.actionType) {
        case GameConstants.UPDATE_SCORE:
            updateScore(payload.action.data);
            break;
         case GameConstants.UPDATE_ROUND:
            updateRound(payload.action.data);
            break;
        default:
            console.log("default payload:" + payload);
            return true;
    }

    GameStore.emitChange();

    return true;
});

module.exports = GameStore;