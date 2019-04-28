var apiReferenceModule                          = "startup";

var Promise                                     = require('bluebird');
var envDetails                                  = require('./../properties/environmentDetails');
var MongoClient                                 = require('mongodb').MongoClient;
var http                                        = require('http');
var md5                                         = require('md5');
var mysql                                       = require('mysql');
var constants                                   = require('../properties/constants');
var mysqlLib                                    = require('../services/mysqlLib');

exports.initializeServer                          = initializeServer;


function initializeServer() {
    return new Promise((resolve,reject)=>{
        var currentApi = {
            module : apiReferenceModule,
            api : 'initializeServer'
        }
        Promise.coroutine(function* () {
            connection          = yield mysqlLib.initializeConnectionPool(envDetails.databaseSettings.mysql.master);
            var server = yield startHttpServer(envDetails.port);
        })().then((data) => {
            resolve(data);
        }, (error) => {
            reject(error);
        });
    })
}

function startHttpServer(port) {
    return new Promise((resolve,reject) => {
        var server = http.createServer(app).listen(port, function (err, result) {
            if(err)
                reject(err);
            console.log("###################### Express connected ##################", port, app.get('env'));
            resolve(server);
        });
    });
}
