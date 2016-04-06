app.service('ProductModelService',
    ['FeatureTreeService','ApiUtilityService','$rootScope','$http',
        function(FeatureTreeService,ApiUtilityService,$rootScope,$http){
            var productmodel = this;
            var api = ApiUtilityService.api;
            productmodel.dataset = [];
            productmodel.xmldata = '';

            this.initProduct = function(sessionkey,SuccessCallbackEvent) {
                $http({
                    method: 'GET',
                    url: './ServerCode/InitProduct.php?sessionkey='+sessionkey
                    }).then(
                        function (post_response) {
                            productmodel.getProduct();
                        },
                        function(post_response){
                            productmodel.reportError2Console("Error on ServerSided Init Product",post_response);
                        }
                    );
            };

            this.getProduct = function(){
                api.getProduct(
                    function (get_reponse) {
                        $rootScope.$broadcast('productLoaded', get_reponse.data);
                    },
                    function (get_reponse) {
                        productmodel.reportError2Console("Error on GET /product", get_reponse);
                    }
                )
            };

            this.postDecision = function(fqn,decision_data) {
                api.postDecision(
                    fqn,
                    decision_data,
                    function(post_response) {
                        productmodel.getProduct();
                    },
                    function(post_response){
                        productmodel.reportError2Console("Error on POST /decision",post_response,post_response.data);
                    }
                );
            };

            this.putDecision = function(fqn,decision) {
                api.putDecision(
                    fqn,
                    decision,
                    function(put_response) {
                        productmodel.getProduct()
                    },
                    function(put_response){
                        productmodel.reportError2Console("Error on PUT /decision/{fqn}",put_response,put_response.data);
                    }
                );
            };

            this.deleteDecision = function(fqn) {
                api.deleteDecision(
                    fqn,
                    function(delete_response) {
                        productmodel.getProduct();
                    },
                    function(delete_response){
                        productmodel.reportError2Console("Error on DELETE /decision/{fqn}",delete_response);
                    }
                );
            };

            this.deleteAllDecisions = function() {
                api.deleteDecision(
                    function(delete_response) {
                        productmodel.getProduct();
                    },
                    function(delete_response){
                        productmodel.reportError2Console("Error on DELETE /decision",delete_response);
                    }
                );
            };

            this.deleteContext = function(contextname,broadcastEventMsg) {
                api.deleteContext(
                    contextname,
                    function (reponse) {
                        $rootScope.$broadcast(broadcastEventMsg, reponse.data);
                    },
                    function(response,contextname){
                        productmodel.reportError2Console("Error on DELETE /context/".contextname,response);
                    }
                );
            };

            /**
             * Return Feature or Attribute Object of given Fully Qualified Name
             *
             * @param fqn
             * @returns Feature
             */
            this.getProductModelElement = function(fqn){
                return FeatureTreeService.FeatureTreeUtility.doRecursiveSearch(productmodel.dataset,fqn);
            };

            this.getFirstSelectedFeatureOfGroup = function(f,gindx){
                if (typeof f === 'undefined') return null;
                return FeatureTreeService.FeatureTreeUtility.getFirstSelectedFeatureOfGroup(f,gindx);
            };

            this.reportError2Console = function(errmsg,errobj,errobj2){
                console.log(errmsg,errobj,errobj2);
            };

            return{
                "productmodel" : productmodel
            };
        }]);
