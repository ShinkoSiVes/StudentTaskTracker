app.controller("StudentTaskTrackerController", function ($scope, StudentTaskTrackerService) {

    $scope.userArray = [];
    var nextId = 1;

    $scope.registrationFunc = function () {
        if (
            $scope.UName == undefined || $scope.UName == "" ||
            $scope.FName == undefined || $scope.FName == "" ||
            $scope.LName == undefined || $scope.LName == "" ||
            $scope.Email == undefined || $scope.Email == "" ||
            $scope.Pass == undefined || $scope.Pass == "" ||
            $scope.conPass == undefined || $scope.conPass == ""
        ) {


        //Need to turn these alert into sweetalert 8 here
            alert("Please fill in all fields.");
        }
        else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test($scope.Pass)) {
            alert("Use proper Password Format (8_characters,uppercase,lowercase,number, and a special character)");
        }
        else if ($scope.UName.length < 3 || $scope.UName.length > 20) {
            alert("Username must be between 3 and 20 characters..");
        }
        else if ($scope.FName.length < 2 || $scope.FName.length > 30) {
            alert("First Name must be between 3 and 20 characters..");
        }
        else if ($scope.LName.length < 2 || $scope.LName.length > 30) {
            alert("Last Name must be between 3 and 20 characters..");
        }
        else if ($scope.Pass.length < 8 || $scope.Pass.length > 50) {
            alert("Password must be between 3 and 20 characters..");
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($scope.Email)) {
            alert("Please enter a proper email format");
        }
        else if ($scope.Pass !== $scope.conPass) {
            alert("Password Mismatch please check your Password and Password confirmation and try again");
        }
        else {
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
            $scope.clearFunc();
            $scope.swalsuccessFunc();
        }
    };

    $scope.clearFunc = function () {
        $scope.UName = "";
        $scope.FName = "";
        $scope.LName = "";
        $scope.Email = "";
        $scope.Pass = "";
        $scope.conPass = "";
        $scope.swalsuccessFunc();
    };

    $scope.editFunc = function (userId) {
        var userData = $scope.userArray[userId];
        userData.userName = $scope.UName;
        userData.firstName = $scope.FName;
        userData.lastName = $scope.LName;
        userData.email = $scope.Email;
        userData.password = $scope.Pass;
        userData.confirmationPassword = $scope.conPass;
        $scope.clearFunc();
    }

    $scope.deleteFunc = function (index) {
        $scope.delswalFunc(
            "Are you sure?",
            "Yes",
            "No",
            function () {
                $scope.userArray.splice(index, 1);
                $scope.$apply();
            }
        );
    }

    $scope.loginFunc = function () {
        if (
        $scope.loginUName == undefined || $scope.loginUName == "" ||
        $scope.loginPass == undefined || $scope.loginPass == ""
        ) {
             alert("Please fill in all fields") //Another swal here
          }
        else {
            window.location.href = "/Module/MainPage";
          }
    }

    $scope.copyFunc = function (index) {
        var userData = $scope.userArray[index];
        $scope.UName = userData.userName;
        $scope.FName = userData.firstName;
        $scope.LName = userData.lastName;
        $scope.Email = userData.email;
        $scope.swalsuccessFunc();
    };



    $scope.swalsuccessFunc = function () {
        Swal.fire({
            title: "Success",
            text: "Your input is accepted!",
            icon: "success"
        });
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


    //$scope.errorswalFuncs
    //$scope.errorswalFuncs
    //$scope.errorswalFuncs
    //$scope.errorswalFuncs
    //$scope.errorswalFuncs
    //$scope.errorswalFuncs
    //$scope.errorswalFuncs
    //$scope.errorswalFuncs
    //$scope.errorswalFuncs
});