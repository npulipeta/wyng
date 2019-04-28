var async = require('async');

var logging = require('../../../logging/logging_improved');
var responses = require('../../../responses/responses');
var constants = require('../../../properties/constants');
var warehouseServices = require('../warehouseServices/warehouseServices');

exports.addBrand    =   addBrand;

async function addBrand(req,res) {
    var handlerInfo = req.handlerInfo || {
            apiModule: 'warehouse',
            apiHandler: 'addBrand'
        };
    try{

        var name        = req.body.name;

        var opts = {
            name        :   name
        };

        var insertResult = await warehouseServices.addBrand(handlerInfo, opts);

        logging.trace(handlerInfo, {INSERT_RESULT : insertResult});

        return responses.actionCompleteResponse(handlerInfo, res, {brand_id : insertResult.insertId});

    } catch(error) {
        var response = {
            flag : constants.responseFlags.SHOW_ERROR_MESSAGE,
            error : error
        };
        logging.trace(handlerInfo, {RESPONSE_SENT: response});
        return responses.somethingWentWrongError(handlerInfo, res);
    }
}