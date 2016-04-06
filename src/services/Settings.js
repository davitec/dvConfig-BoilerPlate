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
    