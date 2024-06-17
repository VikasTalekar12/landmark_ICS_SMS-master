define([
    'postmonger'
], function (
    Postmonger
) {
    "use strict";
    console.log('Fisrt Start: ');
    var connection = new Postmonger.Session();
    var authTokens = {};
    var payload = {};
		
	//var $ = require('jquery');
    $(window).ready(onRender);
    
    connection.trigger('requestSchema');
    connection.on('requestedSchema', function (data) {    //CONNECTION ON
        // save schema
        console.log('*** Schema ***', JSON.stringify(data['schema']));
        //let schema = JSON.stringify(data['schema']);
        //added blank option in selection
        // $("#TemplateType").append('<option></option>' );
        // $("#TemplateType").append('<option>Media</option>' );
        // $("#TemplateType").append('<option>Non Media</option>' );

        $("#MobileNumber").append('<option></option>' );
        $("#CardNumber").append('<option></option>' );
        $("#Params1").append('<option></option>' );
        $("#Params2").append('<option></option>' );
        $("#Params3").append('<option></option>' );
        $("#Params4").append('<option></option>' );
        $("#Params5").append('<option></option>' );
        $("#Params6").append('<option></option>' );
        $("#Params7").append('<option></option>' );
        $("#Params8").append('<option></option>' );
        $("#Params9").append('<option></option>' );
      

        for( var i =0 ; i < data['schema'].length; i++)
        {
        //if(obj[i].hasOwnProperty('access'))
        //{
        //obj.splice(i,1);
        //}
        var elem= '<option>' + data['schema'][i].key + '</option>' ;
        $("#MobileNumber").append(elem);
        // $("#keyword").append(elem);
        // $("#oa").append(elem);
        // $("#header").append(elem);
        // $("#footer").append(elem);

        $("#CardNumber").append(elem);
        $("#Params1").append(elem);
        $("#Params2").append(elem);
        $("#Params3").append(elem);
        $("#Params4").append(elem);
        $("#Params5").append(elem);        
        $("#Params6").append(elem);
        $("#Params7").append(elem);
        $("#Params8").append(elem);
        $("#Params9").append(elem);
        
        // $("#mediaLink").append(elem );
        // $("#title").append(elem);
        }
        $.each(inArguments, function(index, inArgument) {
            $.each(inArgument, function(key, val) {
                val=val.replace('{{','').replace('}}','');
               if($("#"+key).prop('type') =="checkbox")
               {
                $("#lbl"+key).val(val);
                   if(val =="true")
                {
                    $("#"+key).prop('checked',true);
                }
                else{
                    $("#"+key).prop('checked',false);
                }

               } 
               else{
                $("#"+key).val(val);
               }


            });
        });



    });
// Startup Sequence

    connection.on('initActivity', initialize);
	console.log('Second Start: ');
	
	
	
    connection.on('requestedTokens', onGetTokens);
    connection.on('requestedEndpoints', onGetEndpoints);
    var eventDefinitionKey;
    connection.trigger('requestInteraction');
    
    connection.on('requestedInteraction', function(settings){
        //console.log("printing settings"+settings)
        eventDefinitionKey = settings.triggers[0].metaData.eventDefinitionKey;
    });



    connection.on('clickedNext', save);
	
	
   
    function onRender() {
        // JB will respond the first time 'ready' is called with 'initActivity'
        console.log('Before Rendor Start: ');
		connection.trigger('ready');
       console.log('After Rendor Start: ');
        connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');

    }

    var configchannel;
    var inArguments;
       function initialize (data) {
        if (data) {
            payload = data;
            configchannel=data.metaData.channel;
        }

        var message;
        var hasInArguments = Boolean(
            payload['arguments'] &&
            payload['arguments'].execute &&
            payload['arguments'].execute.inArguments &&
            payload['arguments'].execute.inArguments.length > 0
        );

         inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};
		console.log(inArguments);
		console.log('Initialize Arguments: ');
         
        $.each(inArguments, function(index, inArgument) {
            $.each(inArgument, function(key, val) {
                if (key === 'message') {
                    message = val;
                }
            });
        });

    }
    

    function onGetTokens(tokens) {
        //console.log(tokens);
        authTokens = tokens;
    }

    function onGetEndpoints(endpoints) {
        console.log(endpoints);
		console.log('endpoints: ');
    }

    function save() {

       // var sel = document.getElementById("FROM");
        //var text= sel.options[sel.selectedIndex].text;

        //validation of the fields 
        //mobile number Validation 
        if($("#MobileNumber option:selected" ).val().length ==0)
        {
           alert("Mobile Number is required"); 
        }
        
	   payload['arguments'].execute.inArguments = [{
		   
        "MobileNumber": "{{"+$("#MobileNumber option:selected" ).val()+"}}",
        
        "user":$("#user option:Selected").val(),
        "CardNumber":$("#CardNumber option:Selected").val(),
        "message": $("#message").val(),
        "entityid": $("#entityid").val(),
        
        "TEMP_ID": $("#TEMP_ID").val(),
        "Campaignname": $("#Campaignname").val(),
        "campaignTag": $("#campaignTag").val(),
        "FROM": $("#FROM").val(),

        "Params1": "{{"+$("#Params1 option:selected" ).val()+"}}",
        "Params2": "{{"+$("#Params2 option:selected" ).val()+"}}",
        "Params3": "{{"+$("#Params3 option:selected" ).val()+"}}",
        "Params4": "{{"+$("#Params4 option:selected" ).val()+"}}",
        "Params5": "{{"+$("#Params5 option:selected" ).val()+"}}",
        "Params6": "{{"+$("#Params6 option:selected" ).val()+"}}",
        "Params7": "{{"+$("#Params7 option:selected" ).val()+"}}",
        "Params8": "{{"+$("#Params8 option:selected" ).val()+"}}",
        "Params9": "{{"+$("#Params9 option:selected" ).val()+"}}",
        

        

	}];
        
        payload['metaData'].isConfigured = true;

        console.log('Payload :-'+payload);
        connection.trigger('updateActivity', payload);
    }


});