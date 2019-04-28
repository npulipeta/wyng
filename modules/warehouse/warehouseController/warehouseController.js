var async = require('async');
var upload = require("express-fileupload");
var csvtojson = require("csvtojson");

var logging = require('../../../logging/logging_improved');
var responses = require('../../../responses/responses');
var constants = require('../../../properties/constants');
var warehouseServices = require('../warehouseServices/warehouseServices');

app.use(upload());

exports.addBrand    =   addBrand;
exports.addStores   =   addStores;
exports.addProducts =   addProducts;

exports.addBSQ      =   addBSQ;
exports.addStoreInventory = addStoreInventory;
exports.addWHInventory    = addWHInventory;

exports.generateWHReplenishment = generateWHReplenishment;

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

async function addStores(req,res) {
    var handlerInfo = req.handlerInfo || {
            apiModule: 'warehouse',
            apiHandler: 'addStores'
        };
    try{

        var brandId = req.body.brand_id || 1;
        var stores_csv = req.files.stores_master_list;
        var wh_stores_csv = req.files.wh_store_map;
        var ranks_csv = req.files.stores_static_rank;

        logging.trace(handlerInfo, {STORE : stores_csv, WH_MAP : wh_stores_csv, RANK : ranks_csv});


        var stores      = await csvtojson().fromString(stores_csv.data.toString('utf8'));
        var wh_stores   = await csvtojson().fromString(wh_stores_csv.data.toString('utf8'));
        var ranks       = await csvtojson().fromString(ranks_csv.data.toString('utf8'));

        logging.trace(handlerInfo, stores);

        var insertOpts = [];

        for (var store of stores){
            var storeCode = store.Store_Code;
            var wh_store_map = wh_stores.find(o => o.Store_Code === storeCode);
            var store_rank = ranks.find(o => o.Store_Code === storeCode);

            logging.trace(handlerInfo, {STORE : storeCode, WH_MAP : wh_store_map, RANK : store_rank});

            if(wh_store_map != null && store_rank != null){
                insertOpts.push([parseInt(brandId), wh_store_map.WH, store.Store_Code, store_rank.Static_Priority]);
            }
        }

        logging.trace(handlerInfo, insertOpts);

        await warehouseServices.addStores(handlerInfo, insertOpts);
        return responses.actionCompleteResponse(handlerInfo, res);

    } catch(error) {
        var response = {
            flag : constants.responseFlags.SHOW_ERROR_MESSAGE,
            error : error
        };
        logging.trace(handlerInfo, {RESPONSE_SENT: response});
        return responses.somethingWentWrongError(handlerInfo, res);
    }
}

async function addProducts(req,res) {
    var handlerInfo = req.handlerInfo || {
            apiModule: 'warehouse',
            apiHandler: 'addProducts'
        };
    try{

        var brandId = req.body.brand_id || 1;
        var products_csv = req.files.product_master_list;

        logging.trace(handlerInfo, products_csv);


        var products = await csvtojson().fromString(products_csv.data.toString('utf8'));
        logging.trace(handlerInfo, products);

        var insertOpts = [];

        for (var product of products){
            insertOpts.push([parseInt(brandId), product.Product_Code]);
        }

        logging.trace(handlerInfo, insertOpts);

        await warehouseServices.addProducts(handlerInfo, insertOpts);
        return responses.actionCompleteResponse(handlerInfo, res);

    } catch(error) {
        var response = {
            flag : constants.responseFlags.SHOW_ERROR_MESSAGE,
            error : error
        };
        logging.trace(handlerInfo, {RESPONSE_SENT: response});
        return responses.somethingWentWrongError(handlerInfo, res);
    }
}

async function addBSQ(req,res) {
    var handlerInfo = req.handlerInfo || {
            apiModule: 'warehouse',
            apiHandler: 'addBSQ'
        };
    try{

        var brandId = req.body.brand_id || 1;
        var bsq_csv = req.files.bsq;

        logging.trace(handlerInfo, bsq_csv);


        var bsqList = await csvtojson().fromString(bsq_csv.data.toString('utf8'));
        logging.trace(handlerInfo, bsqList);

        var insertOpts = [];

        for (var bsq of bsqList){
            insertOpts.push([parseInt(brandId),bsq.Store_Code, bsq.Product_Code, bsq.BSQ]);
        }

        logging.trace(handlerInfo, insertOpts);

        await warehouseServices.truncateBSQ(handlerInfo);
        await warehouseServices.addBSQ(handlerInfo, insertOpts);

        return responses.actionCompleteResponse(handlerInfo, res);

    } catch(error) {
        var response = {
            flag : constants.responseFlags.SHOW_ERROR_MESSAGE,
            error : error
        };
        logging.trace(handlerInfo, {RESPONSE_SENT: response});
        return responses.somethingWentWrongError(handlerInfo, res);
    }
}

async function addStoreInventory(req,res) {
    var handlerInfo = req.handlerInfo || {
            apiModule: 'warehouse',
            apiHandler: 'addStoreInventory'
        };
    try{

        var brandId = req.body.brand_id || 1;
        var storeInventory_csv = req.files.store_inventory;

        logging.trace(handlerInfo, storeInventory_csv);


        var storeInventory = await csvtojson().fromString(storeInventory_csv.data.toString('utf8'));
        logging.trace(handlerInfo, storeInventory);

        var insertOpts = [];

        for (var product of storeInventory){
            insertOpts.push([parseInt(brandId),product.Store_Code, product.Product_Code, product.Date, product["Closing Inventory"]]);
        }

        logging.trace(handlerInfo, insertOpts);

        await warehouseServices.addStoreInventory(handlerInfo, insertOpts);

        return responses.actionCompleteResponse(handlerInfo, res);

    } catch(error) {
        var response = {
            flag : constants.responseFlags.SHOW_ERROR_MESSAGE,
            error : error
        };
        logging.trace(handlerInfo, {RESPONSE_SENT: response});
        return responses.somethingWentWrongError(handlerInfo, res);
    }
}

async function addWHInventory(req,res) {
    var handlerInfo = req.handlerInfo || {
            apiModule: 'warehouse',
            apiHandler: 'addWHInventory'
        };
    try{

        var brandId = req.body.brand_id || 1;
        var whInventory_csv = req.files.wh_inventory;

        logging.trace(handlerInfo, whInventory_csv);


        var whInventory = await csvtojson().fromString(whInventory_csv.data.toString('utf8'));
        logging.trace(handlerInfo, whInventory);

        var insertOpts = [];

        for (var product of whInventory){
            insertOpts.push([parseInt(brandId),product.WH, product.Product_Code, product.Date, parseInt(product.WH_Qty)]);
        }

        logging.trace(handlerInfo, insertOpts);

        await warehouseServices.addWHInventory(handlerInfo, insertOpts);

        return responses.actionCompleteResponse(handlerInfo, res);

    } catch(error) {
        var response = {
            flag : constants.responseFlags.SHOW_ERROR_MESSAGE,
            error : error
        };
        logging.trace(handlerInfo, {RESPONSE_SENT: response});
        return responses.somethingWentWrongError(handlerInfo, res);
    }
}

async function generateWHReplenishment(req,res) {
    var handlerInfo = req.handlerInfo || {
            apiModule: 'warehouse',
            apiHandler: 'generateWHReplenishment'
        };
    try{

        var brandId = req.body.brand_id;
        var whId = req.body.wh_id;
        var whInvenDate = req.body.wh_inventory_date;
        var storeInvenDate = req.body.store_inventory_date;

        var output = [];

        var products = await warehouseServices.getAllProducts(handlerInfo,[brandId, whId, whInvenDate]);

        for (var product of products){

            logging.trace(handlerInfo, product);

            var productDetails = await warehouseServices.getReqQuantity(handlerInfo, [product.product_id, storeInvenDate, product.product_id]);

            if(productDetails.length > 0){
                var total = product.quantity;
                for(var store of productDetails){
                    var curr_req_qty =  store.req_qty;

                    if(curr_req_qty <= total){
                        total = total - curr_req_qty;

                        output.push({
                            warehouse_id    :   whId,
                            store_id        :   store.store_id,
                            product_id      :   product.product_id,
                            replenish_qty   :   curr_req_qty
                        });
                    }
                }
            }
        }

        const {Parser} = require('json2csv');
        const fs = require('fs');

        const fields = ['warehouse_id', 'store_id', 'product_id', 'replenish_qty'];

        const json2csvParser = new Parser({fields});
        const csv = json2csvParser.parse(output);

        fs.writeFile('./test.csv', csv, (err, data) => {
            if (err) {
                return err;
            }
            //console.log("data >>>>>", data);
        })

        res.setHeader('Content-disposition', 'attachment; filename=testing.csv');
        res.set('Content-Type', 'text/csv');

        return  res.status(200).send(csv);

    } catch(error) {
        var response = {
            flag : constants.responseFlags.SHOW_ERROR_MESSAGE,
            error : error
        };
        logging.trace(handlerInfo, {RESPONSE_SENT: response});
        return responses.somethingWentWrongError(handlerInfo, res);
    }
}