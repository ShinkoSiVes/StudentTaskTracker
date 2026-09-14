app.controller("StudentTaskTrackerController", function ($scope, StudentTaskTrackerService) {

    $scope.userArray = []; 
    var nextId = 1;

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
                id: nextId++,
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

    $scope.editFunc = function (userId) {
        var userData = $scope.userArray[userId];
        userData.userName = $scope.UName;
        userData.firstName = $scope.FName;
        userData.lastName = $scope.LName;
        userData.email = $scope.Email; 
        userData.password = $scope.Pass;
        userData.confirmationPassword = $scope.conPass;
    }

    $scope.deleteFunc = function (index) {
        $scope.delswalFunc(
            "Are you sure you want to delete this?",
            "Yes",
            "No",
            function () {
                $scope.userArray.splice(index, 1);
                $scope.$apply();
            }
        );
    }

    $scope.delswalFunc = function (message, confirmMessage, denyMessage, onConfirm) {
        Swal.fire({
            title: message,
            showDenyButton: true,
            confirmButtonText: confirmMessage,
            denyButtonText: denyMessage
        }).then((result) => {
            if (result.isConfirmed) {
                onConfirm();
                Swal.fire("Deleted", "", "success");
            }
            else if (result.isDenied) {
                Swal.fire("Canceled Delete", "", "error");
            }
        });
    };

    $scope.loginFunc = function ($index) {
        window.location.href = "/Module/MainPage";
    }
        

});