var showBrowserButtonNavigationWarning = true;

function allowBrowserButtonNavigation(event) {
    showBrowserButtonNavigationWarning = false;
}

function blockBrowserButtonNavigation() {
    showBrowserButtonNavigationWarning = true;
}
// Deps
var activity = require('./activity');

/*
 * GET home page.
 */
exports.index = function(req, res){
    if( !req.session.token ) {
        res.render( 'index', {
            title: 'Unauthenticated',
            errorMessage: 'This app may only be loaded via Salesforce Marketing Cloud',
        });
    } else {
        res.render( 'index', {
            title: 'Journey Builder Activity',
            results: activity.logExecuteData,
        });
    }
};

exports.login = function( req, res ) {
    
    res.redirect( '/' );
};

exports.logout = function( req, res ) {
    req.session.token = '';
};