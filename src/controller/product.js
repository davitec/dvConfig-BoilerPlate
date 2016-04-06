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
