'use strict';

/**
 *
 * dvConfig.js is Part of davitec dvConfig BoilerPlate
 * see https://www.davitec.de/dvConfig for Details
 *
 * Wir übernehmen keine Gewährleistung.
 *
 * Rico Schüppel, rs@davitec.de, 2016
 *
 */

(function() {
    var app = angular.module('saxoconfig', []);

function makeid(len){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < len; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

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




app.service('FeatureTreeService',
    function(){
        var FeatureTreeUtility = this;

        /**
         * Executes a recursive search for fully qualifed name within product model
         * Perfomres search within Features, Features in Groups, Int and Enum Attributes
         * Recursively loops through Features
         *
         * @param f
         * @param fqn
         * @returns Object or null
         */
        this.doRecursiveSearch = function(f,fqn){

            //console.log("FQN: ", fqn);
            //console.log("Fobj:", f);
            var indx = 0,gindx = 0,findx = 0;

            if (typeof f.fqn !== 'undefined'){
                //console.log(fqn);
                if (f.fqn === fqn) {
                    //console.log(f,fqn);
                    return f;
                }
            }

            if (typeof f.features !== 'undefined'){
                for(indx = 0; indx< f.features.length; ++indx){
                    var ret = this.doRecursiveSearch(f.features[indx],fqn);
                    if (ret != null) {return ret;}
                }
            }

            if (typeof f.groups !== 'undefined'){
                for (gindx = 0; gindx < f.groups.length; ++gindx) {
                    if (typeof f.groups[gindx].features !== 'undefined') {
                        for (findx = 0; findx < f.groups[gindx].features.length; ++findx) {
                            //if (f.groups[gindx].features[findx].confstate === 'undefined') {
                            var ret = this.doRecursiveSearch(f.groups[gindx].features[findx], fqn);
                            if (ret != null) {return ret;}
                            //}
                        }
                    }
                }
            }

            if (typeof f.int !== 'undefined'){
                for(indx = 0; indx< f.int.length; ++indx){
                    var ret = this.doRecursiveSearch(f.int[indx],fqn);
                    if (ret != null) {return ret;}
                }
            }

            if (typeof f.enum !== 'undefined'){
                for(indx = 0; indx< f.enum.length; ++indx){
                    var ret = this.doRecursiveSearch(f.enum[indx],fqn);
                    if (ret != null) {return ret;}
                }
            }

        };

        /**
         * returns the first selected feature of a feature group
         *
         * @param f feature
         * @param gindx n-th group in f
         */
        this.getFirstSelectedFeatureOfGroup = function(f,gindx){
            //console.log("gfsfog", f);
            if (typeof f === 'undefined') return null;
            if (typeof f.groups === 'undefined') return null;
            if (typeof gindx === 'undefined') gindx = 0;
            if (typeof f.groups[gindx] === 'undefined') return null;

            var indx = 0;
            for (indx = 0; indx <= f.groups[gindx].features.length; indx++){
                if (typeof f.groups[gindx].features[indx] !== 'undefined'){
                    if (f.groups[gindx].features[indx].isSelected) return f.groups[gindx].features[indx];
                }
            }
            return null;
        };

        return{
            'FeatureTreeUtility' : FeatureTreeUtility
        };
    });

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

app.service('SettingService',['$http','$rootScope',function($http,$rootScope){

    var settings = this;
    settings.data = [];

    settings.loadSettings = function(){
        $http({
            method: 'GET',
            url : './ServerCode/LoadSettings.php'
        }).then(
            function(response) {
                settings.data = response.data;
                $rootScope.$broadcast('settingsLoaded', settings.data.Sessionkey);
                console.log("settings loaded", settings.data);
            },
            //errorCallback
            function(data) {
                console.log("error loading settings", settings.data, data);
            }
        );
    };
}]);
    



    // #####################

    /**
     * Directive for Widget IntAttrAsInput
     *
     * REQUIRED PARAMETER
     * ctrl: product controller containing the productdata to watch for changes
     * form: the form, where the input tag will be places
     * fqn: fully qualified name of attribute
     */
    app.directive('inputIntAttr',function() {
        return {
            restrict : 'E',
            scope : true,
            templateUrl : './typo3conf/ext/dv_saxoboard_configurator/Resources/Public/Templates/InputIntAttr.html',
            link: function (scope, element, attrs) {
                scope.form = scope.$eval(attrs.form);
                scope.ctrl = scope.$eval(attrs.ctrl);
                scope.fqn = scope.$eval(attrs.fqn);
                scope.tooltip = scope.$eval(attrs.tooltip);

                scope.$watch('ctrl.productdata', function() {
                        scope.attr = scope.ctrl.getFeature(scope.fqn);
                    }
                );
            }
        }
      });

app.directive('attribute',['$http','$compile',function($http,$compile) {

    var link = function(scope,element,attrs){
        scope.fqn = attrs.fqn;
        scope.ctrl = scope.$eval(attrs.ctrl);

        scope.$watch('ctrl.productdata', function(){
            scope.attribute = scope.ctrl.getModelElement(scope.fqn);
            if ((typeof scope.attribute !== 'undefined') && (scope.attribute.isSingleton)){
                scope.selected_attribute_value = scope.attribute.SingletonValue.toString();
            }
        });

        // dynamically linked Widget TemplateURL, if widget is defined (overwrite) .. otherwise use ordinary html
        if (typeof attrs.widget !== 'undefined'){

            scope.content = [];

            var templUrl = "./widgets/" + attrs.widget + ".html";

            $http({
                method: 'GET',
                url : templUrl
            }).then(
                //successCallBack
                function(result){
                    scope.content = result.data;
                    element.html(scope.content).show();
                    $compile(element.contents())(scope);
                },
                //errorCallback
                function(result){
                    console.log("Error: unable to load feature widget template");
                }
            );
        }
    };

    return {
        restrict : 'E',
        scope : true,
        link: link
    };
}]);

app.directive('feature',['$http','$compile',function($http,$compile) {

    var link = function(scope,element,attrs){
        scope.fqn = attrs.fqn;
        scope.ctrl = scope.$eval(attrs.ctrl);

        scope.$watch('ctrl.productdata', function(){
            scope.feature = scope.ctrl.getModelElement(scope.fqn);

            //determine the first selected subfeature, if a group index is defined
            if ((typeof scope.grpindx !== 'undefined') && (scope.grpindx !== null)) {
                scope.selected_subfeature = scope.ctrl.getFirstSelectedFeatureOfGroup(scope.fqn, scope.grpindx);
                if ((typeof scope.selected_subfeature !== 'undefined') && (scope.selected_subfeature !== null)) {
                    scope.selected_subfeature_fqn = scope.selected_subfeature.fqn;
                } else {
                    scope.selected_subfeature_fqn = null;
                }
            }
        });

        // dynamically linked Widget TemplateURL, if widget is defined (overwrite) .. otherwise use ordinary html
        if (typeof attrs.widget !== 'undefined'){

            if (typeof attrs.grpindx !== 'undefined'){
                scope.grpindx = attrs.grpindx;
            } else {
                console.log("Warning: By using a feature widget for " + scope.fqn + ", you may define a group index (grpindx) to access correct group. No value given, grpindx is set to 'undefined'.")
                scope.grpindx = null;
            }

            scope.content = [];

            var templUrl = "./widgets/" + attrs.widget + ".html";

            $http({
                method: 'GET',
                url : templUrl
            }).then(
                //successCallBack
                function(result){
                    scope.content = result.data;
                    element.html(scope.content).show();
                    $compile(element.contents())(scope);
                },
                //errorCallback
                function(result){
                    console.log("Error: unable to load feature widget template");
                }
            );
        }
    };

    return {
        restrict : 'E',
        scope : true,
        link : link
    };
}]);

app.controller('InputIntAttr',['$scope',function($scope){
    var validator = this;

    this.init = function(){
        validator.size = null;
        validator.haserror = true;
        validator.inputFieldStatusName = 'inputFieldStatusError';
    };

    this.haschanged = function(inputfield,attr){
        validator.haserror = inputfield.$invalid;
        validator.inputFieldStatusName = (validator.haserror)?'inputFieldStatusError':'inputFieldStatusSuccess';
    };

    this.checkvals = function (inputfield,attr){
        console.log("set",inputfield);
        console.log("to",attr);
        if (inputfield.$error) {
            if (inputfield.$error.required){
                validator.size = attr.min_active;
            }

            if (inputfield.$error.max){
                validator.size = attr.max_selectable;
            }

            if (inputfield.$error.min){
                validator.size = attr.min_selectable;
            }

            if (inputfield.$error.number){
                validator.size = attr.min_selectable;
            }
        }
        console.log("value",validator.size);
        validator.haserror = false;
        validator.inputFieldStatusName = inputFieldStatusSuccess;
        $scope.$parent.ctrl.selectAttributeValue(attr,validator.size);
    };
}]);

app.controller('ConfigStepsController',['$scope',function($scope){
    var sp = this;
    sp.steps = {
        1: 'Tischplatte',
        2: 'Gestell',
        3: 'Zubehör',
        4: 'Bestellen'
    };

    this.tab = 1;

    this.isSet = function(checkTab) {
        return sp.tab === parseInt(checkTab,10);
    };

    this.setTab = function(activeTab) {
        var set_this_new_tab = parseInt(activeTab,10);

        if (sp.tab > set_this_new_tab){
            //reset context
            switch (sp.tab){
                case 4:
                    if (set_this_new_tab === 2) $scope.$parent.prodctrl.resetContext('Step3','loadProduct');
                    if (set_this_new_tab === 1) $scope.$parent.prodctrl.resetContext('Step3','DeleteStep2');
                    break;
                case 3:
                    if (set_this_new_tab === 2) $scope.$parent.prodctrl.resetContext('Step3','loadProduct');
                    if (set_this_new_tab === 1) $scope.$parent.prodctrl.resetContext('Step3','DeleteStep2');
                    break;
                case 2:
                    if (set_this_new_tab === 1) $scope.$parent.prodctrl.resetContext('Step2','loadProduct');
                    break;
            }
        }

        sp.tab = set_this_new_tab;
    };

    /*
    $scope.$on('LoadStep2',function(event,eventdata) {
        sp.setTab(2);
    });

    $scope.$on('LoadStep1',function(event,eventdata) {
        sp.setTab(1);
    });
    */

    $scope.$on('DeleteStep2',function(event,eventdata) {
        $scope.$parent.prodctrl.resetContext('Step2','loadProduct');
    });

    this.getTab = function(){
        return sp.tab;
    };

    this.nextTab = function(){
        sp.setTab(sp.tab+1);
    };

    this.checkTab = function(activeTab){
        sp.wantToSetTab = parseInt(activeTab,10);
    };

    this.getSteps = function(){
        return sp.steps;
    };
}]);

app.controller('ProductController',['$scope','ProductModelService',function($scope,ProductModelService){
    var prodctrl = this;

    prodctrl.productdata = []; //for short access from widgets
    prodctrl.productmodel = ProductModelService.productmodel;

    $scope.$on("loadProduct",function(event,eventdata){
        prodctrl.productmodel.getProduct();
    });

    $scope.$on("settingsLoaded",function(event,eventdata) {
        console.log("Sessionkey is", eventdata);
        prodctrl.productmodel.initProduct(eventdata);
    });

    $scope.$on("productLoaded",function(event,eventdata) {
        console.log("product loaded", eventdata);
        prodctrl.productmodel.dataset = eventdata;
        prodctrl.productdata = prodctrl.productmodel.dataset;
    });

    $scope.$on("decisionFinished",function(event,eventdata) {
        console.log("decision was made", eventdata);
        prodctrl.productmodel.dataset = eventdata;
        prodctrl.productdata = prodctrl.productmodel.dataset;
    });

    this.getModelElement = function(fqn){
        return prodctrl.productmodel.getProductModelElement(fqn);
    };

    this.getFirstSelectedFeatureOfGroup = function(fqn,gindx){
        if (typeof fqn === 'undefined') return null;
        return prodctrl.productmodel.getFirstSelectedFeatureOfGroup(prodctrl.getModelElement(fqn),gindx);
    };

    this.clickFeature = function(fqn,state) {
        var f = prodctrl.productmodel.getProductModelElement(fqn);
        if (typeof f !== 'undefined') {
            if (state === true) {
                if ((typeof f.isSelectable !== 'undefined') && f.isSelectable === true) prodctrl.selectFeature(f);
                if ((typeof f.isSelected !== 'undefined') && f.isSelected === true) prodctrl.releaseFeature(f);
            }
            if (state === false) prodctrl.disableFeature(f);
        }
    };

    this.deleteAllDecisions = function(){
        prodctrl.productmodel.deleteAllDecisions();
    };

    this.selectFeature = function(f) {
        prodctrl.productmodel.putDecision(f.fqn,{'state': 'SELECT'});
    };

    this.releaseFeature = function(f){
        prodctrl.productmodel.deleteDecision(f.fqn);
    };

    this.disableFeature = function(f) {
        var postdata = {
            'state': 'DISABLE'
        };
        prodctrl.productmodel.postDecision(f.fqn,postdata);
    };

    this.selectAttributeValue = function(attr,value) {
        if (value !== 'undefined' && value !== null && value.toString().length > 0){
            var postdata = {
                'state': 'SELECT',
                'value': value.toString()
            };
            console.log("change",attr.fqn,value);
            prodctrl.productmodel.putDecision(attr.fqn,postdata);
        }
    };

    this.resetContext = function(context, broadcastEventMsg){
        prodctrl.productmodel.deleteContext(context,broadcastEventMsg);
    };


}]);

/**
 * Directive displays the values of an INT Attribut as single select Option.
 * Directives lives within a detail tag and requires $parent.ctrl and $parent.feature
 */
app.directive('selectIntAttr',function() {
    return {
        restrict : 'E',
        scope : true,
        templateUrl : './widgets/IntSingleSelect.html',
        link: function (scope, element, attrs) {
            scope.name = scope.$eval(attrs.name);
            scope.ctrl = scope.$parent.ctrl;

            scope.$watch(
                'ctrl.productdata', function() {
                    scope.parentf = scope.$parent.feature;
                    if (typeof scope.parentf !== 'undefined') {
                        scope.fqn = scope.$parent.feature.fqn + "." + scope.name;
                        scope.iattr = scope.ctrl.getModelElement(scope.fqn);
                    }
                }
            );
            //console.log(scope);
        }
    }
});

  
})();
