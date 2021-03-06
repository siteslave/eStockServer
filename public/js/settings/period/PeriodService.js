/**
 * Year Service
 */
App.factory('PeriodService', function ($q, $http) {


    return {
        all: function () {

            var q = $q.defer();

            var options = {
                url: '/settings/period/all',
                method: 'POST'
            };

            $http(options)
                .success(function (data) {
                    q.resolve(data);
                })
                .error(function (data, status) {
                    q.reject(status);
                });

            return q.promise;

        },
        get: function (id) {

            var q = $q.defer();

            var options = {
                url: '/settings/period/detail',
                method: 'POST',
                data: {
                    id: id
                }
            };

            $http(options)
                .success(function (data) {
                    q.resolve(data);
                })
                .error(function (data, status) {
                    q.reject(status);
                });

            return q.promise;
        },

        save: function (year) {
            var q = $q.defer();

            var options = {
                url: '/settings/period/save',
                method: 'POST',
                data: {
                    n: year.n,
                    s: year.s,
                    e: year.e
                }
            };

            $http(options)
                .success(function (data) {
                    q.resolve(data);
                })
                .error(function (data, status) {
                    q.reject(status);
                });

            return q.promise;
        },

        delete: function (id) {
            var q = $q.defer();

            var options = {
                url: '/settings/period/remove',
                method: 'POST',
                data: {
                    id: id
                }
            };

            $http(options)
                .success(function (data) {
                    q.resolve(data);
                })
                .error(function (data, status) {
                    q.reject(status);
                });

            return q.promise;
        },

        update: function (id, year) {

            var q = $q.defer();

            var options = {
                url: '/settings/period/update',
                method: 'POST',
                data: {
                    id: id,
                    n: year.n,
                    s: year.s,
                    e: year.e
                }
            };

            $http(options)
                .success(function (data) {
                    q.resolve(data);
                })
                .error(function (data, status) {
                    q.reject(status);
                });

            return q.promise;
            
        }

    }

});
