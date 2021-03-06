var Main = require('../controllers/Main'),
    Orders = require('../controllers/Orders'),
    Clients = require('../controllers/Clients'),
    Suppliers = require('../controllers/Suppliers'),
    Products = require('../controllers/Products'),
    Purchases = require('../controllers/Purchases'),
    Period = require('../controllers/Period'),
    Users = require('../controllers/Users'),
    Reports = require('../controllers/Reports');

var _ = require('lodash');

var Auth = require('../models/Auth');

module.exports = function (app, auth) {

    // Main page
    app.get('/', auth, Main.index);

    /**********************************************************************************
     * Client api
     **********************************************************************************/
    // for client import
    app.post('/api/products', Main.products);

    app.post('/api/products/list', Products.getList);
    app.post('/api/orders/save', Orders.saveOrdersOnline);
    app.post('/api/orders/cancel', Orders.cancelOrdersOnline);
    app.post('/api/orders/all', Orders.getOnlineStatus);
    app.post('/api/orders/detail', Orders.getOnlineDetail);
    app.post('/api/orders/update_client_orders_stats', Orders.updateClientOrdersStatus);


    /************************************************************************************
     * Orders resources
     ***********************************************************************************/
    app.get('/orders', auth, function (req, res) {
        res.render('orders/Index');
    });
    app.post('/orders/cancel', Orders.doCancel);
    app.post('/orders/approve', Orders.saveApprove);
    app.post('/orders/lots', Orders.getLots);
    app.post('/orders/detail', Orders.getDetail);
    app.post('/orders/list', Orders.getList);
    app.post('/orders/status/list', Orders.getOrderStatusList);
    /************************************* Partials ***********************************/
    app.get('/partials/orders/main', auth, function (req, res) {
        res.render('orders/partials/Main');
    });
    app.get('/partials/orders/approve', auth, function (req, res) {
        res.render('orders/partials/Approve');
    });
    app.get('/partials/orders/detail', auth, function (req, res) {
        res.render('orders/partials/Detail');
    });

    /***********************************************************************************
     *  Clients setting
     **********************************************************************************/
    app.get('/clients', auth, function (req, res) {
        res.render('clients/Index');
    });

    app.get('/partials/clients/index', auth, function (req, res) {
        res.render('clients/partials/Index');
    });

    app.get('/partials/clients/new', auth, function (req, res) {
        res.render('clients/partials/New');
    });

    app.get('/partials/clients/edit', auth, function (req, res) {
        res.render('clients/partials/Edit');
    });

    app.post('/clients/save', Clients.doSave);
    app.post('/clients/all', Clients.all);
    app.post('/clients/active', Clients.active);
    app.post('/clients/get', Clients.get);
    app.post('/clients/update', Clients.update);
    app.post('/clients/remove', Clients.remove);

    // Suppliers
    app.get('/suppliers', auth, function (req, res) {
        res.render('suppliers/Index');
    });

    // Suppliers partials
    app.get('/partials/suppliers/index', auth, function (req, res) {
        res.render('suppliers/partials/Index');
    });

    app.get('/partials/suppliers/add', auth, function (req, res) {
        res.render('suppliers/partials/Add');
    });

    app.get('/partials/suppliers/edit', auth, function (req, res) {
        res.render('suppliers/partials/Edit');
    });

    // Save supplier
    app.post('/suppliers/save', Suppliers.doSave);
    // Update
    app.post('/suppliers/update', Suppliers.doUpdate);
    // Get supplies list
    app.post('/suppliers/list', Suppliers.getList);
    app.post('/suppliers/detail', Suppliers.detail);
    app.post('/suppliers/remove', Suppliers.doRemove);


    // Purchases
    app.get('/partials/purchases/index', auth, function (req, res) {
        res.render('purchases/partials/Index');
    });

    app.get('/partials/purchases/new', auth, function (req, res) {
        res.render('purchases/partials/New');
    });

    app.get('/partials/purchases/edit', auth, function (req, res) {
        res.render('purchases/partials/Edit');
    });

    app.get('/partials/purchases/detail', auth, function (req, res) {
        res.render('purchases/partials/Detail');
    });

    app.get('/purchases', auth, function (req, res) {
        res.render('purchases/Index');
    });

    // Save purchase
    app.post('/purchases/save', Purchases.doSave);
    app.post('/purchases/list', Purchases.getList);
    app.post('/purchases/edit/detail', Purchases.detail);
    app.put('/purchases', Purchases.update);
    app.post('/purchases/remove', Purchases.remove);
    app.post('/purchases/import', Purchases.import);

    //Settings
    app.get('/settings', auth, function (req, res) {
        res.render('settings/Index');
    });
    /**
     * GET  /partials/settings/years
     */
    app.get('/settings/period', auth, function (req, res) {
        res.render('settings/periods/Period');
    });

    app.post('/settings/period/all', Period.all);
    app.post('/settings/period/save', Period.save);
    app.post('/settings/period/remove', Period.remove);
    app.post('/settings/period/update', Period.update);
    /**
     * User management
     */
    app.get('/settings/users', auth, function (req, res) {
        res.render('settings/users/Users');
    });

    app.post('/settings/users/all', Users.all);
    app.post('/settings/users/save', Users.save);
    app.post('/settings/users/remove', Users.remove);
    app.post('/settings/users/update', Users.update);

    /**
     * Product resources
     */
    app.get('/products', auth, function (req, res) {
        res.render('products/Products');
    });

    app.get('/partials/products/main', auth, function (req, res) {
        res.render('products/partials/Main');
    });

    app.get('/partials/products/card', auth, function (req, res) {
        res.render('products/partials/Card');
    });

    app.post('/products/list', Products.getList);
    app.post('/products/save', Products.save);
    app.post('/products/update', Products.update);
    app.post('/products/remove', Products.remove);
    app.post('/products/card', Products.getCard);

    /** login **/
    app.get('/login', function (req, res) {
        if (req.session.username) {
            res.redirect('/');
        } else {
            var error = req.session.error;
            res.render('Login', {error: error});
        }
    });

    app.post('/login', function (req, res) {
        var username = req.body.username;
        var password = req.body.password;
        var startYear = req.body.startYear;
        var endYear = req.body.endYear;

        Auth.doAuth(req.db, username, password)
            .then(function (rows) {
                if (_.size(rows)) {
                    req.session.username = rows.username;
                    req.session.userId = rows.id;
                    req.session.fullname = rows.fullname;
                    req.session.startYear = startYear;
                    req.session.endYear = endYear;
                    //res.send({ok: true, username: req.session.username});
                    res.send({ok: true});
                } else {
                    req.session.error = 'Username/Password incorrect.';
                    res.send({ok: false, msg: 'Username/Password incorrect.'});
                    //res.send({ok: false, username: username});
                }
            }, function (err) {
                console.log(err);
                req.session.error = 'Server error!';
                res.send({ok: false, msg: err});
            });

    });

    app.get('/logout', function (req, res) {
        req.session.destroy(function(err) {
            if (err) console.log(err);
            else res.redirect('/login');
        });
    });

    app.get('/year', Period.all);

    /**
     * Reports
     */
    app.post('/reports/topten', Reports.getTopTen);
};
