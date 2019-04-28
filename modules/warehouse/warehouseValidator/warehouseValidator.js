var Joi                                         = require('joi');

var responses                                   = require('./../../../responses/responses');
var logging                                     = require('../../../logging/logging_improved');
var constants                                   = require('./../../../properties/constants');


exports.addBrand           = addBrand;

function validateFields(handlerInfo, req, res, schema) {
    var validation = Joi.validate(req, schema);
    if(validation.error) {
        var errorReason =
            validation.error.details !== undefined
                ? validation.error.details[0].message
                : 'Parameter missing or parameter type is wrong';


        //responses.sendResponse(handlerInfo, res,errorReason, constants.responseFlags.PARAMETER_MISSING);
        return false;
    }
    return true;
}


function addBrand (req, res, next) {
    req.handlerInfo = {
        apiModule: 'warehouse',
        apiHandler: 'addBrand'
    };

    logging.trace(req.handlerInfo, {VALIDATING : req.body});

    var schema = Joi.object().keys({
        name        : Joi.string().required()
    });

    var validFields = validateFields(req.handlerInfo, req.body, res, schema);
    if(validFields){
        next();
    }else{
        responses.parameterMissingResponse(req.handlerInfo, res);
    }
};