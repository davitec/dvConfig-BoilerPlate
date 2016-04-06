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
