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
