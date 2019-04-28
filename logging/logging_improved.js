/*
 *   LOGGING HANDLER FOR THE APIs
 *
 *   ALL THE LOGGING CALLS WILL BE ROUTED THROUGH THIS MODULE
 *   TO HANDLE SELECTIVE LOGGING DEPENDING UPON THE MODULE
 *   AND THE PARTICULAR HANDLER GENERATING THE LOG
 */

var commonFunctions = require('./../utills/commonFunction');

var levels = {
    trace : 0,
    debug : 1,
    info  : 2,
    warn  : 3
};

exports.trace               = trace;
exports.debug               = debug;
exports.info                = info;
exports.warn                = warn;
exports.logDatabaseQuery    = logDatabaseQuery;
exports.logRequest          = logRequest;
exports.logResponse         = logResponse;
exports.logErrorResponse    = logErrorResponse;

var debuggingPermissions = {
    loggingEnabled 		    :  true,
	defaultLoggingLevel 	:  levels.trace,

    'warehouse'		     : {
        loggingEnabled      : true,
	    defaultLoggingLevel : levels.trace,

        addBrand            : true,
        addStores           : true,
        addProducts         : true,
        addBSQ              : true,
        addStoreInventory   : true,
        addWHInventory      : true,

        generateWHReplenishment: true
    }
};

// A variadic function to log the stuff
function log(loggingLevel, loggingParameters){
    var handlingInfo = loggingParameters[0];
    var apiModule    = handlingInfo.apiModule;
    var apiHandler   = handlingInfo.apiHandler;

    var defaultLoggingLevel = debuggingPermissions[apiModule].defaultLoggingLevel;

    // We need to log all the errors
    if (loggingLevel !== levels.error && (!isLoggingEnabled(apiModule, apiHandler) || loggingLevel > defaultLoggingLevel)) {
        return;
    }

    var stream = process.stdout;
    if(loggingLevel === levels.error){
        stream = process.stderr;
    }

    for(var i = 1; i < loggingParameters.length; i++){
        var date = new Date();
        stream.write(commonFunctions.dateFormat() + ':::' + apiModule + ' ::: ' + apiHandler + ' ::: ' + JSON.stringify(loggingParameters[i]) + '\n');
    }
}


function trace(/* arguments */){
    log(levels.trace, arguments);
}

function debug(/* arguments */){
    log(levels.debug, arguments);
}

function info(/* arguments */){
    log(levels.info, arguments);
}

function warn(/* arguments */){
    log(levels.warn, arguments);
}

function logDatabaseQuery(handlerInfo, eventFired, error, result, query){
    if(error){
        if(typeof query !== 'undefined')
            module.exports.error(handlerInfo, {event : eventFired}, {error : error}, {result : result}, {query: query});
        else
            module.exports.error(handlerInfo, {event : eventFired}, {error : error}, {result : result});
    }
    else{
        if(typeof query !== 'undefined')
            module.exports.trace(handlerInfo, {event : eventFired}, {error : error}, {result : result}, {query: query});
        else
            module.exports.trace(handlerInfo, {event : eventFired}, {error : error}, {result : result});
    }
}


function logRequest(handlerInfo, request){
    module.exports.trace(handlerInfo, {REQUEST : request});
}

function logResponse(handlerInfo, response){
    module.exports.trace(handlerInfo, {RESPONSE : response});
}

function logErrorResponse(handlerInfo, response){
    module.exports.error(handlerInfo, {RESPONSE : response});
}

function isLoggingEnabled(module, handler){
    // Check if the logging has been enabled
    if(!debuggingPermissions.loggingEnabled){
        return false;
    }

    // Check if the logging has been enabled for the complete module
    if (!debuggingPermissions[module].loggingEnabled){
        return false;
    }

    // Check if the logging has been enabled for the particular handler function for the module
    if (!debuggingPermissions[module][handler]){
        return false;
    }

    return true;
}
