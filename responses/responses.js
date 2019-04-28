
var constants                           = require('./../properties/constants');
var logging                             = require('../logging/logging_improved');


exports.parameterMissingResponse          = parameterMissingResponse;
exports.actionCompleteResponse            = actionCompleteResponse;
exports.somethingWentWrongError           = somethingWentWrongError;
exports.sendResponse                      = sendResponse;
exports.authenticationError               = authenticationError;
exports.assetIdAlreadyRegistered          = assetIdAlreadyRegistered;
exports.sendError                         = sendError;
exports.deviceIdAlreadyRegistered         = deviceIdAlreadyRegistered;
exports.deviceIdNotExist                  = deviceIdNotExist;
exports.qrCodeAlreadyRegistered           = qrCodeAlreadyRegistered;
exports.deviceTypeNotExist                = deviceTypeNotExist;
exports.deviceTypeInActive                = deviceTypeInActive;
exports.trackerIdNotExist                 = trackerIdNotExist;
exports.assetIdNotExist                   = assetIdNotExist;
exports.businessInactive                  = businessInactive;
exports.jobAlreadyExists                  = jobAlreadyExists;
exports.jobAssignedSuccessfully           = jobAssignedSuccessfully;
exports.jobActionCompleted                = jobActionCompleted;
exports.jobFailed                         = jobFailed;
exports.invalidAction                     = invalidAction;
exports.lockAlreadyInRequestedState       = lockAlreadyInRequestedState;
exports.lockManually                      = lockManually;
exports.keyError                          = keyError;

function assetIdAlreadyRegistered(handlerInfo, res, err, data) {
  var response = {
    message: err || constants.responseMessages.ASSET_ID_ALREADY_EXISTS,
    status : constants.responseFlags.SHOW_ERROR_MESSAGE,
    data   : data || {}
  };
  logging.warn(handlerInfo, {RESPONSE : response });
  res.status(constants.responseFlags.SUCCESS).send(JSON.stringify(response));
}

function deviceIdAlreadyRegistered(handlerInfo, res, err, data) {
    var response = {
        message: err || constants.responseMessages.DEVICE_ID_ALREADY_EXISTS,
        status : constants.responseFlags.SUCCESS,
        data   : data || {}
    };
  logging.warn(handlerInfo, {RESPONSE : response });
    res.status(constants.responseFlags.SUCCESS).send(JSON.stringify(response));
}

function qrCodeAlreadyRegistered(handlerInfo, res, err, data) {
    var response = {
        message: err || constants.responseMessages.QR_CODE_ALREADY_EXISTS,
        status : constants.responseFlags.SHOW_ERROR_MESSAGE,
        data   : data || {}
    };
  logging.warn(handlerInfo, {RESPONSE : response });
    res.status(constants.responseFlags.SUCCESS).send(JSON.stringify(response));
}

function deviceTypeNotExist(handlerInfo, res, err, data) {
    var response = {
        message: err || constants.responseMessages.DEVICE_TYPE_NOT_EXIST,
        status : constants.responseFlags.SHOW_ERROR_MESSAGE,
        data   : data || {}
    };
  logging.warn(handlerInfo, {RESPONSE : response });
    res.status(constants.responseFlags.SUCCESS).send(JSON.stringify(response));
}
function trackerIdNotExist(handlerInfo, res, err, data) {
    var response = {
        message: err || constants.responseMessages.TRACKER_ID_NOT_EXIST,
        status : constants.responseFlags.SHOW_ERROR_MESSAGE,
        data   : data || {}
    };
  logging.warn(handlerInfo, {RESPONSE : response });
    res.status(constants.responseFlags.SUCCESS).send(JSON.stringify(response));
}
function deviceIdNotExist(handlerInfo, res, err, data) {
    var response = {
        message: err || constants.responseMessages.DEVICE_ID_NOT_EXIST,
        status : constants.responseFlags.SHOW_ERROR_MESSAGE,
        data   : data || {}
    };
    logging.warn(handlerInfo, {RESPONSE : response });
    res.status(constants.responseFlags.SUCCESS).send(JSON.stringify(response));
}
function assetIdNotExist(handlerInfo, res, err, data) {
    var response = {
        message: err || constants.responseMessages.ASSET_ID_NOT_EXIST,
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
function businessInactive(handlerInfo, res, data, msg) {
    var response = {
      message: msg || constants.responseMessages.BUSINESS_INACTIVE,
      status : constants.responseFlags.BUSINESS_INACTIVE,
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

function lockManually(handlerInfo, res, err, data) {
    var response = {
      message: err || constants.responseMessages.LOCK_MANUALLY,
      status : constants.responseFlags.LOCK_MANUALLY,
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

function deviceTypeInActive(handlerInfo, res, data, message) {
    var response = {
        message: message || constants.responseMessages.DEVICE_TYPE_INACTIVE,
        status : constants.responseFlags.SHOW_ERROR_MESSAGE,
        data   : data || {}
    };
    logging.warn(handlerInfo, {RESPONSE : response });
    res.send(JSON.stringify(response));
}

function jobAlreadyExists(handlerInfo, res, data, msg) {
    var response = {
      message: msg || constants.responseMessages.JOB_ALREADY_EXISTS,
      status : constants.responseFlags.SUCCESS,
      data   : data || {}
    };
    logging.warn(handlerInfo, {RESPONSE : response });
    res.status(constants.responseFlags.SUCCESS).send(JSON.stringify(response));
}
  
function jobAssignedSuccessfully(handlerInfo, res, data, msg) {
    var response = {
      message: msg || constants.responseMessages.JOB_ASSIGNED,
      status : constants.responseFlags.SUCCESS,
      data   : data || {}
    };
    logging.warn(handlerInfo, {RESPONSE : response });
    res.status(constants.responseFlags.SUCCESS).send(JSON.stringify(response));
}

function lockAlreadyInRequestedState(handlerInfo, res, data, msg) {
    var response = {
      message: msg || constants.responseMessages.LOCK_ALREADY_IN_REQUESTED_STATE,
      status : constants.responseFlags.SUCCESS,
      data   : data || {}
    };
    logging.warn(handlerInfo, {RESPONSE : response });
    res.status(constants.responseFlags.SUCCESS).send(JSON.stringify(response));
}

function jobActionCompleted(handlerInfo, res, data, msg) {
    var response = {
      message: msg || constants.responseMessages.JOB_ACTION_COMPLETED,
      status : constants.responseFlags.SUCCESS,
      data   : data || {}
    };
    logging.warn(handlerInfo, {RESPONSE : response });
    res.status(constants.responseFlags.SUCCESS).send(JSON.stringify(response));
}

function jobFailed(handlerInfo, res, data, msg) {
    var response = {
      message: msg || constants.responseMessages.JOB_FAILED,
      status : constants.responseFlags.SHOW_ERROR_MESSAGE,
      data   : data || {}
    };
    logging.warn(handlerInfo, {RESPONSE : response });
    res.status(constants.responseFlags.SUCCESS).send(JSON.stringify(response));
}

function invalidAction(handlerInfo, res, data, msg) {
    var response = {
      message: msg || constants.responseMessages.INVALID_ACTION,
      status : constants.responseFlags.SHOW_ERROR_MESSAGE,
      data   : data || {}
    };
    logging.warn(handlerInfo, {RESPONSE : response });
    res.status(constants.responseFlags.SUCCESS).send(JSON.stringify(response));
}

function keyError(handlerInfo, res, data, msg) {
    var response = {
      message: msg || constants.responseMessages.KEY_ERROR,
      status : constants.responseFlags.SHOW_ERROR_MESSAGE,
      data   : data || {}
    };
    logging.warn(handlerInfo, {RESPONSE : response });
    res.status(constants.responseFlags.SUCCESS).send(JSON.stringify(response));
}
