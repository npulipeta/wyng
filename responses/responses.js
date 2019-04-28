
var constants                           = require('./../properties/constants');
var logging                             = require('../logging/logging_improved');


exports.parameterMissingResponse          = parameterMissingResponse;
exports.actionCompleteResponse            = actionCompleteResponse;
exports.somethingWentWrongError           = somethingWentWrongError;
exports.sendResponse                      = sendResponse;
exports.authenticationError               = authenticationError;
exports.assetIdAlreadyRegistered          = assetIdAlreadyRegistered;
exports.sendError                         = sendError;

function assetIdAlreadyRegistered(handlerInfo, res, err, data) {
  var response = {
    message: err || constants.responseMessages.ASSET_ID_ALREADY_EXISTS,
    status : constants.responseFlags.SHOW_ERROR_MESSAGE,
    data   : data || {}
  };
  logging.warn(handlerInfo, {RESPONSE : response });
  res.status(constants.responseFlags.SUCCESS).send(JSON.stringify(response));
}

function authenticationError(handlerInfo, res, data, msg) {
  var response = {
    message: msg || constants.responseMessages.SHOW_ERROR_MESSAGE,
    status : constants.responseFlags.SHOW_ERROR_MESSAGE,
    data   : data || {}
  };
  logging.warn(handlerInfo, {RESPONSE : response });
  res.send(JSON.stringify(response));
}

function parameterMissingResponse(handlerInfo, res, err, data) {
  var response = {
    message: err || constants.responseMessages.PARAMETER_MISSING,
    status : constants.responseFlags.PARAMETER_MISSING,
    data   : data || {}
  };
  logging.warn(handlerInfo, {RESPONSE : response });
  res.status(constants.responseFlags.SUCCESS).send(JSON.stringify(response));
}

function actionCompleteResponse(handlerInfo, res, data, msg) {
  var response = {
    message: msg || constants.responseMessages.SUCCESS,
    status : constants.responseFlags.SUCCESS,
    data   : data || {}
  };
  logging.trace(handlerInfo, {RESPONSE : response});
  res.status(constants.responseFlags.SUCCESS).send(JSON.stringify(response));
}

function somethingWentWrongError(handlerInfo, res) {
  var response = {
    message: constants.responseMessages.SOMETHING_WENT_WRONG,
    status : constants.responseFlags.INTERNAL_SERVER_ERROR,
    data   : {}
  };
  logging.warn(handlerInfo, {RESPONSE : response });
  res.status(response.status).send(JSON.stringify(response));
}

function sendResponse(handlerInfo, res, msg, status, data) {
  var response = {
    message: msg,
    status : status,
    data   : data || {}
  };
  logging.warn(handlerInfo, {RESPONSE : response });
  res.status(status).send(JSON.stringify(response));
}

function sendError(handlerInfo, res, data, message) {
    var response = {
        message: message || constants.responseMessages.ERROR_IN_EXECUTION,
        status : constants.responseFlags.ERROR_IN_EXECUTION,
        data   : data || {}
    };
    logging.warn(handlerInfo, {RESPONSE : response });
    res.send(JSON.stringify(response));
}




