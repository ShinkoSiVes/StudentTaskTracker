app.controller("StudentTaskTrackerController", function ($scope, StudentTaskTrackerService) {

    $scope.userArray = [];

    $scope.registrationFunc = function () {
        // filtering section
        if (
            $scope.UName == undefined || $scope.UName == "" ||
            $scope.FName == undefined || $scope.FName == "" ||
            $scope.LName == undefined || $scope.LName == "" ||
            $scope.Email == undefined || $scope.Email == "" ||
            $scope.Pass == undefined || $scope.Pass == "" ||
            $scope.conPass == undefined || $scope.conPass == ""
        ) {
            alert("Please fill in all fields.");

        // input array section
        } else {
            var userData = {
                userName: $scope.UName,
                firstName: $scope.FName,
                lastName: $scope.LName,
                email: $scope.Email,
                password: $scope.Pass,
                confirmationPassword: $scope.conPass
            };

            $scope.userArray.push(userData);
        }
    };

    $scope.clearFunc = function () {
        $scope.UName = "";
        $scope.FName = "";
        $scope.LName = "";
        $scope.Email = "";
        $scope.Pass = "";
        $scope.conPass = "";
    };

});