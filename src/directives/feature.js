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
