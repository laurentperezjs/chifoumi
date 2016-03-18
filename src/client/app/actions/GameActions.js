var AppDispatcher = require('../dispatcher/AppDispatcher');
var GameConstants = require('../constants/GameConstants');

var GameActions = {
    updateScore: function(score) {
        AppDispatcher.handleViewAction({
            actionType: GameConstants.UPDATE_SCORE,
            data: score
        });
    },
    updateRound: function(round) {
        AppDispatcher.handleViewAction({
            actionType: GameConstants.UPDATE_ROUND,
            data: round
        });
    }
};

module.exports = GameActions;