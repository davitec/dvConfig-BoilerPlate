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
