


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
