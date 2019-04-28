var request  = require('request');
var config = require('config');
var Promise = require('bluebird');

var constants       = require('../../../properties/constants');
var dbHandler       = require('../../../services/mysqlLib');
var logging         = require('../../../logging/logging_improved');

exports.addBrand    =   addBrand;
exports.addStores   =   addStores;
exports.addProducts =   addProducts;

exports.addBSQ      =   addBSQ;
exports.truncateBSQ =   truncateBSQ;

exports.addStoreInventory = addStoreInventory;
exports.addWHInventory  =   addWHInventory;

exports.getAllProducts = getAllProducts;
exports.getReqQuantity = getReqQuantity;

function addBrand (handlerInfo, opts) {
    return new Promise((resolve, reject) => {

        var query = `INSERT INTO tb_brands SET ? `;

        dbHandler.mysqlQueryPromise(handlerInfo, "addBrand" , query, opts).then((result) => {
            resolve(result);
        }, (error) => {
            reject(error);
        });
    });
}


function addStores (handlerInfo, values) {
    return new Promise((resolve, reject) => {

        var query = "INSERT INTO tb_stores (brand_id, warehouse_id, store_id, priority) VALUES ?";

        dbHandler.mysqlQueryPromise(handlerInfo, "addStore" , query, [values]).then((result) => {
            logging.logDatabaseQuery(handlerInfo, 'addStore', null, result, query.sql);
            resolve(result);
        }, (error) => {
            reject(error);
        });
    });
}

function addProducts (handlerInfo, values) {
    return new Promise((resolve, reject) => {

        var query = "INSERT INTO tb_products (brand_id, product_id) VALUES ?";


        dbHandler.mysqlQueryPromise(handlerInfo, "addProduct" , query, [values]).then((result) => {
            logging.logDatabaseQuery(handlerInfo, 'addProduct', null, result, query.sql);
            resolve(result);
        }, (error) => {
            reject(error);
        });
    });
}

function addBSQ (handlerInfo, values) {
    return new Promise((resolve, reject) => {

        var query = "INSERT INTO tb_bsq (brand_id, store_id, product_id, bsq) VALUES ?";


        dbHandler.mysqlQueryPromise(handlerInfo, "addBSQ" , query, [values]).then((result) => {
            logging.logDatabaseQuery(handlerInfo, 'addBSQ', null, result, query.sql);
            resolve(result);
        }, (error) => {
            reject(error);
        });
    });
}

function truncateBSQ (handlerInfo, values) {
    return new Promise((resolve, reject) => {

        var query = "TRUNCATE TABLE tb_bsq";

        dbHandler.mysqlQueryPromise(handlerInfo, "truncateBSQ" , query, [values]).then((result) => {
            logging.logDatabaseQuery(handlerInfo, 'truncateBSQ', null, result, query.sql);
            resolve(result);
        }, (error) => {
            reject(error);
        });
    });
}

function addStoreInventory (handlerInfo, values) {
    return new Promise((resolve, reject) => {

        var query = "INSERT INTO tb_store_inventory (brand_id, store_id, product_id, date, closing_inventory) VALUES ?";


        dbHandler.mysqlQueryPromise(handlerInfo, "addStoreInventory" , query, [values]).then((result) => {
            logging.logDatabaseQuery(handlerInfo, 'addStoreInventory', null, result, query.sql);
            resolve(result);
        }, (error) => {
            reject(error);
        });
    });
}

function addWHInventory (handlerInfo, values) {
    return new Promise((resolve, reject) => {

        var query = "INSERT INTO tb_wh_inventory (brand_id, warehouse_id, product_id, date, quantity) VALUES ?";

        dbHandler.mysqlQueryPromise(handlerInfo, "addWHInventory" , query, [values]).then((result) => {
            logging.logDatabaseQuery(handlerInfo, 'addWHInventory', null, result, query.sql);
            resolve(result);
        }, (error) => {
            reject(error);
        });
    });
}

function getAllProducts (handlerInfo, values) {
    return new Promise((resolve, reject) => {

        var query = "SELECT * FROM tb_wh_inventory WHERE brand_id = ? AND warehouse_id = ? AND date = ?";

        dbHandler.mysqlQueryPromise(handlerInfo, "getAllProducts" , query, values).then((result) => {
            //logging.logDatabaseQuery(handlerInfo, 'getAllProducts', null, result, query.sql);
            resolve(result);
        }, (error) => {
            reject(error);
        });
    });
}

function getReqQuantity (handlerInfo, opts) {
    return new Promise((resolve, reject) => {
        var product = opts.product;

        var query = "SELECT t1.brand_id, t1.store_id, t1.product_id, t2.bsq, t1.closing_inventory, t2.bsq - t1.closing_inventory AS req_qty, st.priority FROM (SELECT s.* FROM tb_store_inventory s WHERE s.product_id = ? AND s.date = ?) t1 INNER JOIN (SELECT b.* FROM tb_bsq b WHERE b.product_id = ?) t2 ON t1.store_id = t2.store_id LEFT JOIN tb_stores st ON st.store_id = t1.store_id WHERE t2.bsq >= 0 AND t1.closing_inventory >= 0 AND t2.bsq - t1.closing_inventory > 0 ORDER BY st.priority ASC";

        dbHandler.mysqlQueryPromise(handlerInfo, "getReqQuantity" , query, opts.values).then((productDetails) => {
            //logging.logDatabaseQuery(handlerInfo, 'getReqQuantity', null, result);

            var result = [];

            if(productDetails.length > 0){
                var total = product.quantity;
                for(var store of productDetails){
                    var curr_req_qty =  store.req_qty;

                    if(curr_req_qty <= total){
                        total = total - curr_req_qty;

                        var opts = {
                            warehouse_id    :   product.warehouse_id,
                            store_id        :   store.store_id,
                            product_id      :   product.product_id,
                            replenish_qty   :   curr_req_qty
                        };

                        result.push(opts);

                        //logging.trace(handlerInfo, opts);
                    }
                }
            }

            //logging.trace(handlerInfo, {PRODUCT : product, RESULT : result});

            resolve(result);
        }, (error) => {
            reject(error);
        });
    });
}
