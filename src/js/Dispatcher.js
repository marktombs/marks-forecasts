const Dispatcher = require('flux/lib/Dispatcher');
const extend = require('lodash/extend');

/**
 * Purpose: to create a single dispatcher instance for use throughout the
 * entire app. The two methods below are merely thin wrappers that describe
 * where the action originated from. Not mandatory, but may be helpful
 **/
module.exports = extend(new Dispatcher(), {

    /**
     * This does nothing yet, but will come in handy if you need to respond
     * to server-originated events and treat them differently...
     **/
    handleServerAction(action) {
        console.info('SERVER_ACTION',action);
        this.dispatch({
            source: 'SERVER_ACTION',
            action: action
        });
    },

    /**
     * Very thin wrapper around the core dispatcher API, just to signify
     * that actions triggered here originated on the client-side
     **/
    handleViewAction(action) {
        console.info('VIEW_ACTION',action);
        this.dispatch({
            source: 'VIEW_ACTION',
            action: action
        });
    }
});
