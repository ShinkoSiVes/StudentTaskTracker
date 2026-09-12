app.controller("StudentTaskTrackerController", function ($scope, StudentTaskTrackerService) {

    $scope.userArray = [];

    $scope.registrationFunc = function () {
        // filtering section
        if (
            $scope.FName == undefined || $scope.FName == "" ||
            $scope.MName == undefined || $scope.MName == "" ||
            $scope.LName == undefined || $scope.LName == ""
        ) {
            alert("Please fill in all fields.");

        // input array section
        } else {
            var userData = {
                firstName: $scope.FName,
                middleName: $scope.MName,
                lastName: $scope.LName
            };

            $scope.userArray.push(userData);
        }
    };

    $scope.cancelFunc = function () {
        $scope.FName = "";
        $scope.MName = "";
        $scope.LName = "";
    };

});