/**
 * Created by rschueppel on 07.01.16.
 */
app.service('ApiUtilityService',
    ['$http','SettingService',function($http,SettingService){
        var api = this;

        SettingService.loadSettings();

        /**
         * GET product data as json from api
         *
         * @param successCallback function
         * @param errorCallback function
         */
        this.getProduct = function(successCallback,errorCallback){
            $http({
                method: 'GET',
                url: SettingService.data.ApiUrlProduct,
                headers: {
                    'Content-Type': 'text/plain',
                    'Accept': 'application/json',
                    'Apikey' : SettingService.data.Apikey,
                    'Sessionkey' : SettingService.data.Sessionkey
                }
            }).then(
                function(response){successCallback(response)},
                function(response){errorCallback(response)}
            );
        };

        /**
         * POST decision
         *
         * @param fqn string
         * @param decision array
         * @param successCallback function
         * @param errorCallback function
         */
        this.postDecision = function(fqn,decision,successCallback,errorCallback) {
            $http({
                method: 'POST',
                url: SettingService.data.ApiUrlDecision + '/' + fqn,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'text/plain',
                    'Apikey': SettingService.data.Apikey,
                    'Sessionkey': SettingService.data.Sessionkey
                },
                data: decision
            }).then(
                function(response){successCallback(response)},
                function(response){errorCallback(response)}
            );
        };

        /**
         * PUT decision
         *
         * @param fqn string
         * @param decision array
         * @param successCallback function
         * @param errorCallback function
         */
        this.putDecision = function(fqn,decision,successCallback,errorCallback) {
            $http({
                method: 'PUT',
                url: SettingService.data.ApiUrlDecision + '/' + fqn,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'text/plain',
                    'Apikey': SettingService.data.Apikey,
                    'Sessionkey': SettingService.data.Sessionkey
                },
                data: decision
            }).then(
                function(response){successCallback(response)},
                function(response){errorCallback(response)}
            );
        };

        /**
         * Get all decisions by calling GET /decision
         *
         * @param successCallback
         * @param errorCallback
         */
        this.getDecisions = function(successCallback,errorCallback) {
            $http({
                method: 'GET',
                url: SettingService.data.ApiUrlDecision,
                headers: {
                    'Content-Type': 'text/plain',
                    'Accept': 'application/json',
                    'Accept-Encoding': 'gzip, deflate',
                    'Apikey': SettingService.data.Apikey,
                    'Sessionkey': SettingService.data.Sessionkey
                }
            }).then(
                function(response){successCallback(response)},
                function(response){errorCallback(response)}
            );
        };

        /**
         * Get single decision by call GET /decision/{fqn}
         *
         * @param fqn string
         * @param successCallback function
         * @param errorCallback function
         */
        this.getDecision = function(fqn,successCallback,errorCallback) {
            $http({
                method: 'GET',
                url: SettingService.data.ApiUrlDecision + '/' + fqn,
                headers: {
                    'Content-Type': 'text/plain',
                    'Accept': 'application/json',
                    'Accept-Encoding': 'gzip, deflate',
                    'Apikey': SettingService.data.Apikey,
                    'Sessionkey': SettingService.data.Sessionkey
                }
            }).then(
                function(response){successCallback(response)},
                function(response){errorCallback(response)}
            );
        };

        /**
         * Delete User Decision on ModelElement FQN
         *
         * @param fqn string
         * @param successCallback function
         * @param errorCallback function
         */
        this.deleteDecision = function(fqn,successCallback,errorCallback) {
            $http({
                method: 'DELETE',
                url: SettingService.data.ApiUrlDecision + '/' + fqn,
                headers: {
                    'Content-Type': 'text/plain',
                    'Accept': 'text/plain',
                    'Apikey': SettingService.data.Apikey,
                    'Sessionkey': SettingService.data.Sessionkey
                }
            }).then(
                function(response){successCallback(response)},
                function(response){errorCallback(response)}
            );
        };

        /**
         * Deletes all user decisions
         *
         * @param successCallback function
         * @param errorCallback function
         */
        this.deleteAllDecisions = function(successCallback,errorCallback) {
            $http({
                method: 'DELETE',
                url: SettingService.data.ApiUrlDecision,
                headers: {
                    'Content-Type': 'text/plain',
                    'Accept': 'text/plain',
                    'Apikey': SettingService.data.Apikey,
                    'Sessionkey': SettingService.data.Sessionkey
                }
            }).then(
                function(response){successCallback(response)},
                function(response){errorCallback(response)}
            );
        };

        /**
         * Deletes all user decision in context
         *
         * @param contextname string
         * @param successCallback function
         * @param errorCallback function
         */
        this.deleteContext = function(contextname,successCallback,errorCallback) {
            $http({
                method: 'DELETE',
                url: SettingService.data.ApiUrlContext + '/' + contextname,
                headers: {
                    'Content-Type': 'text/plain',
                    'Apikey': SettingService.data.Apikey,
                    'Sessionkey': SettingService.data.Sessionkey
                }
            }).then(
                successCallback,
                errorCallback
            );
        };

        return {
            'api' : api
        }
    }]);



