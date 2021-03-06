/**
 * Peroids controller
 */
var Period = require('../models/period');

exports.all = function (req, res) {

    var db = req.db;

    Period.all(db)
        .then(function (rows) {
            res.send({
                ok: true,
                rows: rows
            });
        }, function (err) {
            res.send({
                ok: false,
                msg: err
            });
        });

};

exports.save = function (req, res) {

    var db = req.db;

    var year = {};
    year.name = req.body.n;
    year.start_date = req.body.s;
    year.end_date = req.body.e;

    Period.save(db, year)
        .then(function (id) {
            res.send({
                ok: true,
                id: id
            });
        }, function (err) {
            res.send({
                ok: false,
                msg: err
            });
        });
};

exports.remove = function (req, res) {

    var db = req.db;
    var id = req.body.id;

    Period.remove(db, id)
        .then(function (id) {
            res.send({
                ok: true
            });
        }, function (err) {
            res.send({
                ok: false,
                msg: err
            });
        });
};

exports.update = function (req, res) {
    var db = req.db;

    var year = {};
    year.name = req.body.n;
    year.start_date = req.body.s;
    year.end_date = req.body.e;
    year.id = req.body.id;

    Period.update(db, year)
        .then(function () {
            res.send({
                ok: true
            });
        }, function (err) {
            res.send({
                ok: false,
                msg: err
            });
        });
};
