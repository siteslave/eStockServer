App.factory('DetailService', function ($q, $http) {

    return {

        getDetail: function (orderId) {
            var q = $q.defer();

            var options = {
                method: 'POST',
                url: '/orders/detail',
                data: {
                    id: orderId
                }
            };

            $http(options)
                .success(function (data) {
                    q.resolve(data);
                })
                .error(function (err) {
                    q.reject(err);
                });

            return q.promise;
        },

        getLots: function (code) {
            var q = $q.defer();

            var options = {
                method: 'POST',
                url: '/orders/lots',
                data: {
                    code: code
                }
            };

            $http(options)
                .success(function (data) {
                    q.resolve(data);
                })
                .error(function (err) {
                    q.reject(err);
                });

            return q.promise;
        }

    };

});