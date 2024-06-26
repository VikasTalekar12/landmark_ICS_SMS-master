
var showBrowserButtonNavigationWarning = true;

function allowBrowserButtonNavigation(event) {
    showBrowserButtonNavigationWarning = false;
}

function blockBrowserButtonNavigation() {
    showBrowserButtonNavigationWarning = true;
}
var util = require('util');

// Deps
const Path = require('path');
const JWT = require(Path.join(__dirname, '..', 'lib', 'jwtDecoder.js'));
var util = require('util');
var http = require('https');

// let Client = require('ssh2-sftp-client');
// let sftp = new Client();

exports.logExecuteData = [];

function logData(req) {
    exports.logExecuteData.push({
        body: req.body,
        headers: req.headers,
        trailers: req.trailers,
        method: req.method,
        url: req.url,
        params: req.params,
        query: req.query,
        route: req.route,
        cookies: req.cookies,
        ip: req.ip,
        path: req.path,
        host: req.hostname,
        fresh: req.fresh,
        stale: req.stale,
        protocol: req.protocol,
        secure: req.secure,
        originalUrl: req.originalUrl
    });
    JWT(req.body, process.env.jwtSecret, (err, decoded) => { 
        // verification error -> unauthorized request				
        if (err) {
            console.error(err);
            return res.status(401).end();
        }
        if (decoded && decoded.inArguments && decoded.inArguments.length > 0) {			
		var decodedArgs = decoded.inArguments[0];
		
		//console.log('row data Request log:-'+JSON.stringify(decoded));
        }
    });
    // console.log("body: " + util.inspect(req.body));
    // console.log("headers: " + util.inspect(req.headers));
    // console.log("trailers: " + req.trailers);
    // console.log("method: " + req.method);
    // console.log("url: " + req.url);
    // console.log("params: " + util.inspect(req.params));
    // console.log("query: " + util.inspect(req.query));
    // console.log("route: " + req.route);
    // console.log("cookies: " + req.cookies);
    // console.log("ip: " + req.ip);
    // console.log("path: " + req.path);
    // console.log("host: " + req.host);
    // console.log("fresh: " + req.fresh);
    // console.log("stale: " + req.stale);
    // console.log("protocol: " + req.protocol);
    // console.log("secure: " + req.secure);
    // console.log("originalUrl: " + req.originalUrl);
}

/*
 * POST Handler for / route of Activity (this is the edit route).
 */
exports.edit = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    res.send(200, 'Edit');
};

/*
 * POST Handler for /save/ route of Activity.
 */
exports.save = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    res.send(200, 'Save');
};

/*
 * POST Handler for /execute/ route of Activity.
 */
 
 console.log('Before execute code...');
 
exports.execute = function (req, res) {
	
	var dataLines='';	
	console.log('In Execute function...');	
	 
    // example on how to decode JWT
    JWT(req.body, process.env.jwtSecret, (err, decoded) => { 
        // verification error -> unauthorized request
        if (err) {
            console.error(err);
            return res.status(401).end();
        }
		
        if (decoded && decoded.inArguments && decoded.inArguments.length > 0) {
			
			var decodedArgs = decoded.inArguments[0];					
            dataLines=dataLines+ JSON.stringify(decodedArgs.FirstName)+'|'+JSON.stringify(decodedArgs.LastName)+'|'+JSON.stringify(decodedArgs.CCID)+'\n';
			console.log('row data :-'+dataLines);
			
			//console.log('decoded inArguments Sunil :-'+JSON.stringify(decoded.inArguments));
			//console.log('decoded Sunil :-'+JSON.stringify(decoded.inArguments.LastName));
			//console.log('only decoded Sunil :-'+JSON.stringify(decoded));
			//console.log('decoded inArguments length Sunil :'+decoded.inArguments.length);			
            // decoded in arguments
            
			//console.log('decoded arg0:- '+JSON.stringify(decodedArgs.FirstName));
			
			//var myJson=JSON.stringify(decodedArgs);			           
            logData(req);
            res.send(200, 'Execute');
        } else {
            console.error('inArguments invalid.');
            return res.status(400).end();
        }
    });
};


/*
 * POST Handler for /publish/ route of Activity.
 */
exports.publish = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    res.send(200, 'Publish');
};

/*
 * POST Handler for /publish/ route of Activity.
 */
exports.testPublish = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    res.send(200, 'testPublish');
};
/*
 * POST Handler for /validate/ route of Activity.
 */
exports.validate = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    res.send(200, 'Validate');
};