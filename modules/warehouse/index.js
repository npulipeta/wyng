var warehouseValidator     = require('./warehouseValidator/warehouseValidator');
var warehouseController    = require('./warehouseController/warehouseController');

app.post('/add_brand',warehouseValidator.addBrand, warehouseController.addBrand);

app.post('/add_stores',warehouseController.addStores);

app.post('/add_products', warehouseController.addProducts);

app.post('/add_bsq', warehouseController.addBSQ);

app.post('/add_store_inventory', warehouseController.addStoreInventory);

app.post('/add_wh_inventory', warehouseController.addWHInventory);

app.post('/generate_wh_replenishment', warehouseValidator.generateWHReplenishment, warehouseController.generateWHReplenishment);