'use strict';
// Module Dependencies
// -------------------
var express     = require('express');
var bodyParser  = require('body-parser');
var errorhandler = require('errorhandler');
var http        = require('http');
var path        = require('path');
var request     = require('request');
var routes      = require('./routes');
var activity    = require('./routes/activity');
var configjson  = require('./public/config.json');
var config      = require('config');
const fs = require('fs');
require('dotenv').config();
const winston = require('winston');
require('winston-daily-rotate-file');


var logConfiguration = new winston.transports.DailyRotateFile({
    filename: __dirname+'/logs/logs-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
  });

  logConfiguration.on('rotate', function(oldFilename, newFilename) {
    // do something fun
  });

const logger = winston.createLogger({
    transports: [
		logConfiguration
    ]
  });

const Path = require('path');
const { info } = require('console');
const errorHandler = require('errorhandler');
const { connect } = require('http2');
const JWT = require(Path.join(__dirname, 'lib', 'jwtDecoder.js'));

var app = express();

// Configure Express
app.set('port', process.env.PORT || 5000);
app.use(bodyParser.raw({type: 'application/jwt'}));
app.use(bodyParser.urlencoded({ extended: true }));
var jsonParser= bodyParser.json();
//app.use(express.methodOverride());
//app.use(express.favicon());

app.use("/ics/",express.static(path.join(__dirname, 'public'),
{
	setHeaders: (res) => {
		res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
		res.setHeader('Content-Security-Policy', "img-src https:");
		res.setHeader('Referrer-Policy', "no-referrer");
		res.setHeader('X-Content-Type-Options', "nosniff");
		res.setHeader('X-Frame-Options', "ALLOW-FROM https://jbinteractions.s13.marketingcloudapps.com/");
		res.setHeader('Permissions-Policy',"geolocation=*");
		res.setHeader('X-XSS-Protection', "1");
	}
}
));

app.use((req, res, next) => {
res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
res.setHeader('Content-Security-Policy', "img-src https:");
res.setHeader('Referrer-Policy', "no-referrer");
res.setHeader('X-Content-Type-Options', "nosniff");
res.setHeader('X-Frame-Options', "ALLOW-FROM https://jbinteractions.s13.marketingcloudapps.com/");
res.setHeader('Permissions-Policy',"geolocation=*");
res.setHeader('Content-Type', 'application/json');
res.setHeader('X-XSS-Protection', "1");
next();
});

// Express in Development Mode
if ('development' == app.get('env')) {
  app.use(errorhandler());
}

// HubExchange Routes
app.get('/', (req, res) =>{
	try
        {
                if( !req.session.token ) {
                        res.render( 'index', {
                            title: 'Unauthenticated',
                            errorMessage: 'This app may only be loaded via Salesforce Marketing Cloud',
                        });
                    } else {
                        res.send( 'index', {
                            title: 'Journey Builder Activity'
                        });
                    }
        }
        catch (e)
        {
                res.send("Invalid path ",404);
        }
} );
 
app.post('/ics/SendTest',jsonParser, (req, res) => {
	try{
	JWT(req.body, process.env.jwtSecret, (err, decoded) => {
	var bodyJason = req.body;
	var ApiUrl=config.get('SMSText.url');		
	var Password;				
	var bodyJasonNew;
	var smsgid="ICS_TEST";
	var message=bodyJason.message;	
	var FROM=bodyJason.FROM;	
	var msisdn=bodyJason.msisdn	
	var user;
	var entityid=bodyJason.entityid;
	var TEMP_ID=bodyJason.TEMP_ID;
	var Campaignname=bodyJason.Campaignname;
	var campaignTag=bodyJason.campaignTag;  

	if(message.includes("#Params1"))
	{
		message=message.replace("#Params1",bodyJason.Params1);
	}
	if(message.includes("#Params2"))
	{
		message=message.replace("#Params2",bodyJason.Params2);
	}
	if(message.includes("#Params3"))
	{
		message=message.replace("#Params3",bodyJason.Params3);
	}
	if(message.includes("#Params4"))
	{
		message=message.replace("#Params4",bodyJason.Params4);
	}
	if(message.includes("#Params5"))
	{
		message=message.replace("#Params5",bodyJason.Params5);
	}
	if(message.includes("#Params6"))
	{
		message=message.replace("#Params6",bodyJason.Params6);
	}
	if(message.includes("#Params7"))
	{
		message=message.replace("#Params7",bodyJason.Params7);
	}
	if(message.includes("#Params8"))
	{
		message=message.replace("#Params8",bodyJason.Params8);
	}
	if(message.includes("#Params9"))
	{
		message=message.replace("#Params9",bodyJason.Params9);
	}

	if(smsgid.includes("#Params1"))
	{
		smsgid=smsgid.replace("#Params1",bodyJason.Params1);
	}
	if(smsgid.includes("#Params2"))
	{
		smsgid=smsgid.replace("#Params2",bodyJason.Params2);
	}
	if(smsgid.includes("#Params3"))
	{
		smsgid=smsgid.replace("#Params3",bodyJason.Params3);
	}
	if(smsgid.includes("#Params4"))
	{
		smsgid=smsgid.replace("#Params4",bodyJason.Params4);
	}
	if(smsgid.includes("#Params5"))
	{
		smsgid=smsgid.replace("#Params5",bodyJason.Params5);
	}
	if(smsgid.includes("#Params6"))
	{
		smsgid=smsgid.replace("#Params6",bodyJason.Params6);
	}
	if(smsgid.includes("#Params7"))
	{
		smsgid=smsgid.replace("#Params7",bodyJason.Params7);
	}
	if(smsgid.includes("#Params8"))
	{
		smsgid=smsgid.replace("#Params8",bodyJason.Params8);
	}
	if(smsgid.includes("#Params9"))
	{
		smsgid=smsgid.replace("#Params9",bodyJason.Params9);
	}
	
	
	logger.info('From:'+bodyJason.FROM);
	logger.info('msisdn:'+bodyJason.msisdn);
				logger.info('smsgid:'+smsgid);

				var userAcc = config.get("Creds");
				for (var i = 0; i < userAcc.length; i++) {
				  if (userAcc[i]["user"] == bodyJason.user) {
					Password = userAcc[i]["password"];
				  }
				}
				if(bodyJason.user.includes("_option1"))
				{
					user=bodyJason.user.replace("_option1","");
				}
				else
				{
					user=bodyJason.user;
				}

				logger.info('Password:'+Password);
				logger.info('message:'+message);
				logger.info('user:'+user);

				bodyJasonNew= config.get('SMSText.SMSTextmessage');
				bodyJasonNew=bodyJasonNew.replace("#USERNAME",user).replace("#PASSWORD",Password).replace("#from",FROM)
				.replace("#to",msisdn).replace("#message",message).replace("#smsgid",smsgid);
				bodyJasonNew=JSON.parse(bodyJasonNew);
				
				var options = {
				'method': 'POST',
				"body":bodyJasonNew,
				"json":true,
				'url': ApiUrl
				};

				request(options, function (error, response) {
					if (error) {
					  logger.info(
						"Date:" +
						  Date() +
						  " MobileNumber:" +
						  bodyJason.msisdn +
						  " Error:" +
						  JSON.stringify(error)
					  );
					  if (process.env.debug == "Y")
						logger.info(
						  "Date:" +
							Date() +
							" MobileNumber:" +
							bodyJason.msisdn +
							" Error:" +
							JSON.stringify(error)
						);
					  res.send(400, error);
					} else {
					  logger.info(
						"Date:" +
						  Date() +
						  " MobileNumber:" +
						  bodyJason.msisdn +
						  " Response:" +
						  JSON.stringify(response.body)
					  );
					  if (process.env.debug == "Y")
						logger.info(
						  "Date:" +
							Date() +
							" MobileNumber:" +
							bodyJason.msisdn +
							" Response:" +
							JSON.stringify(response.body)
						);
					  res.send(200, response);
					}
				  });
				
				
	});
}
			catch (e) 
			{
				logger.error(e)
			}
} );

app.post('/login', routes.login );
app.post('/logout', routes.logout );

// Custom Hello World Activity Routes
app.post('/ics/save', (req, res) => {
	res.send(200, 'Save');
}
 );
app.post('/ics/validate', (req, res) => {
	res.send(200, 'Validate');
}
 );

app.post('/ics/publish',  (req, res) => { 
	res.send(200, 'Publish');
}
 );

 app.post('/ics/testPublish',  (req, res) => { 
	res.send(200, 'Publish');
}
 );

//app.post('/journeybuilder/execute/', activity.execute );

app.post('/ics/execute', (req, res) => {
    // example on how to decode JWT
	try{

		JWT(req.body, process.env.jwtSecret, (err, decoded) => { 

		var bodyJason;
        // verification error -> unauthorized request							
        if (err) {
				
				throw err;
				
			}
        if (decoded && decoded.inArguments && decoded.inArguments.length > 0) {			
		var decodedArgs = decoded.inArguments[0];
			logger.info("Raw data: "+JSON.stringify(decodedArgs));
		var MobileNumber=JSON.stringify(decodedArgs.MobileNumber).substring(1, JSON.stringify(decodedArgs.MobileNumber).length - 1);
		
				var msisdn=MobileNumber;			
				var Password;				
			    var user1;
				var smsgid;


				var message=JSON.stringify(decodedArgs.message).substring(1, JSON.stringify(decodedArgs.message).length - 1);
				var TEMP_ID=JSON.stringify(decodedArgs.TEMP_ID).substring(1, JSON.stringify(decodedArgs.TEMP_ID).length - 1);
				var FROM=JSON.stringify(decodedArgs.FROM).substring(1, JSON.stringify(decodedArgs.FROM).length - 1);
				var user=JSON.stringify(decodedArgs.user).substring(1, JSON.stringify(decodedArgs.user).length - 1);
				var entityid=JSON.stringify(decodedArgs.entityid).substring(1, JSON.stringify(decodedArgs.entityid).length - 1);
				var Campaignname=JSON.stringify(decodedArgs.Campaignname).substring(1, JSON.stringify(decodedArgs.Campaignname).length - 1);
				var campaignTag=JSON.stringify(decodedArgs.campaignTag).substring(1, JSON.stringify(decodedArgs.campaignTag).length - 1);
							
				var Params1=JSON.stringify(decodedArgs.Params1).substring(1, JSON.stringify(decodedArgs.Params1).length - 1);
				var Params2=JSON.stringify(decodedArgs.Params2).substring(1, JSON.stringify(decodedArgs.Params2).length - 1);
				var Params3=JSON.stringify(decodedArgs.Params3).substring(1, JSON.stringify(decodedArgs.Params3).length - 1);
				var Params4=JSON.stringify(decodedArgs.Params4).substring(1, JSON.stringify(decodedArgs.Params4).length - 1);
				var Params5=JSON.stringify(decodedArgs.Params5).substring(1, JSON.stringify(decodedArgs.Params5).length - 1);
				var Params6=JSON.stringify(decodedArgs.Params6).substring(1, JSON.stringify(decodedArgs.Params6).length - 1);
				var Params7=JSON.stringify(decodedArgs.Params7).substring(1, JSON.stringify(decodedArgs.Params7).length - 1);
				var Params8=JSON.stringify(decodedArgs.Params8).substring(1, JSON.stringify(decodedArgs.Params8).length - 1);
				var Params9=JSON.stringify(decodedArgs.Params9).substring(1, JSON.stringify(decodedArgs.Params9).length - 1);				
				
				if(JSON.stringify(decodedArgs.MobileNumber).length == 2){
					logger.info(' mobile is empty');
			}
		   else{
			//for WhatsApp mapping 
			var ApiUrl;
			ApiUrl=config.get('SMSText.url');

			//Adding hardcoded country code as per Customer Request 
			if(MobileNumber.length < 12)
		{
			MobileNumber="91"+MobileNumber
		}

		
	if(message.includes("#Params1"))
		{
			message=message.replace("#Params1",Params1);
		}
		if(message.includes("#Params2"))
		{
			message=message.replace("#Params2",Params2);
		}
		if(message.includes("#Params3"))
		{
			message=message.replace("#Params3",Params3);
		}
		if(message.includes("#Params4"))
		{
			message=message.replace("#Params4",Params4);
		}
		if(message.includes("#Params5"))
		{
			message=message.replace("#Params5",Params5);
		}
		if(message.includes("#Params6"))
		{
			message=message.replace("#Params6",Params6);
		}
		if(message.includes("#Params7"))
		{
			message=message.replace("#Params7",Params7);
		}
		if(message.includes("#Params8"))
		{
			message=message.replace("#Params8",Params8);
		}
		if(message.includes("#Params9"))
		{
			message=message.replace("#Params9",Params9);
		}
	
		if(smsgid.includes("#Params1"))
		{
			smsgid=smsgid.replace("#Params1",Params1);
		}
		if(smsgid.includes("#Params2"))
		{
			smsgid=smsgid.replace("#Params2",Params2);
		}
		if(smsgid.includes("#Params3"))
		{
			smsgid=smsgid.replace("#Params3",Params3);
		}
		if(smsgid.includes("#Params4"))
		{
			smsgid=smsgid.replace("#Params4",Params4);
		}
		if(smsgid.includes("#Params5"))
		{
			smsgid=smsgid.replace("#Params5",Params5);
		}
		if(smsgid.includes("#Params6"))
		{
			smsgid=smsgid.replace("#Params6",Params6);
		}
		if(smsgid.includes("#Params7"))
		{
			smsgid=smsgid.replace("#Params7",Params7);
		}
		if(smsgid.includes("#Params8"))
		{
			smsgid=smsgid.replace("#Params8",Params8);
		}
		if(smsgid.includes("#Params9"))
		{
			smsgid=smsgid.replace("#Params9",Params9);
		}
		

		
		var userAcc = config.get("Creds");
		for (var i = 0; i < userAcc.length; i++) {
		  if (userAcc[i]["user"] == user) {
			Password = userAcc[i]["password"];
		  }
		}
		if(user.includes("_option1"))
		{
			user1=user.replace("_option1","");
		}
		else
		{
			user1=user;
		}
		// var message1=message.replace(/\n/g, '')

		// var message2= JSON.stringify(JSON.parse(message))

		 logger.info('user1:'+user1);
		logger.info('Password1:'+Password);
		logger.info('From1:'+FROM);
		logger.info('msisdn1:'+MobileNumber);
		logger.info('smsgid1:'+smsgid);
		logger.info('message:'+message);
		//logger.info('message:'+message1);
		//logger.info('message:'+message2);

		bodyJason= config.get('SMSText.SMSTextmessage');
		bodyJason=bodyJason.replace("#USERNAME",user1).replace("#PASSWORD",Password).replace("#from",FROM)
		.replace("#to",MobileNumber).replace("#message",message).replace("#smsgid",smsgid);
		bodyJason=JSON.parse(bodyJason);
		
			// bodyJason= config.get('SMSText.SMSTextmessage');
			// bodyJason=bodyJason.replace("#USERNAME",user).replace("#PASSWORD",Password).replace("#from",FROM)
			// .replace("#to",bodyJason.msisdn).replace("#smsgid",smsgid).replace("#message",message).replace("#templateId",TEMP_ID)
			// .replace("#entityid",entityid).replace("#Campaignname",Campaignname).replace("#campaignTag",campaignTag);
			// bodyJason=JSON.parse(bodyJason);
													
		var options = {
			'method': 'POST',
			"body":bodyJason,
			"json":true,
			'url': ApiUrl
			};

			logger.info('options:'+JSON.stringify(options));

			request(options, function (error, response) {
				if (error) {
				  logger.info(
					"Date:" +
					  Date() +
					  " MobileNumber:" +
					  msisdn +
					  " Error:" +
					  JSON.stringify(error)
				  );
				  if (process.env.debug == "Y")
					logger.info(
					  "Date:" +
						Date() +
						" MobileNumber:" +
						msisdn +
						" Error:" +
						JSON.stringify(error)
					);
				  res.send(400, error);
				} else {
				  logger.info(
					"Date:" +
					  Date() +
					  " MobileNumber:" +
					  msisdn +
					  " Response:" +
					  JSON.stringify(response.body)
				  );
				  if (process.env.debug == "Y")
					logger.info(
					  "Date:" +
						Date() +
						" MobileNumber:" +
						msisdn +
						" Response:" +
						JSON.stringify(response.body)
					);
				  res.send(200, response);
				}
			  });
	   }			
            res.send(200, 'Execute');
        } 			
		else {
            console.error('inArguments invalid.');
		
            return res.status(400).end();
        }					
   
	});}
	catch (err)
	{
		logger.error('Date'+ Date()+ 'Error '+JSON.stringify(err) );
		return res.status(401).end();
	}

} );

var server = http.createServer(null, app); 
server.listen(app.get('port'), function(){
	logger.info('Express server listening on port ' + app.get('port'));
  });