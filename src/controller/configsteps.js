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
