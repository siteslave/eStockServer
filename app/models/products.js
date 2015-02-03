var Q = require('q');

exports.getProductList = function (db) {
    var q = Q.defer();

    db('products')
        .select('*')
        .orderBy('name', 'asc')
        .exec(function (err, rows) {
            if (err) q.reject(err);
            else q.resolve(rows);
        });

    return q.promise;
};
