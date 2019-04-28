var request  = require('request');
var config = require('config');
var Promise = require('bluebird');

var constants       = require('../../../properties/constants');
var dbHandler       = require('../../../services/mysqlLib');
var logging         = require('../../../logging/logging_improved');

exports.addBrand    =   addBrand;

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