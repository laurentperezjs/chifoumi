var Dispatcher = require('flux').Dispatcher;
var objectAssign = require('react/lib/Object.assign');

var AppDispatcher = objectAssign(new Dispatcher(), {
    handleViewAction: function(action) {
        this.dispatch({
            source: 'VIEW_ACTION',
            action: action
        });
    }

});

module.exports = AppDispatcher;