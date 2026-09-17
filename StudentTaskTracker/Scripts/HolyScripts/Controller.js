app.controller("StudentTaskTrackerController", function($scope, StudentTaskTrackerService) {

    $scope.userArray = [];
    var nextId = 1;
    $scope.editIndex = null;    

    $scope.registrationFunc = function() {
        if (
            $scope.UName == undefined || $scope.UName == "" ||
            $scope.FName == undefined || $scope.FName == "" ||
            $scope.LName == undefined || $scope.LName == "" ||
            $scope.Email == undefined || $scope.Email == "" ||
            $scope.Pass == undefined || $scope.Pass == "" ||
            $scope.conPass == undefined || $scope.conPass == ""
        ) {
            $scope.swalerrorFunc("Please fill in all fields.");
        }
        else if (isUsernameTaken($scope.UName)) {
            $scope.swalerrorFunc("Username is already taken.");
        }
        else if (isEmailTaken($scope.Email)) {
            $scope.swalerrorFunc("Email is already taken.");
        }
        else if ($scope.UName.length < 3 || $scope.UName.length > 75) {
            $scope.swalerrorFunc("Username must be atleast 3 or more..");
        }
        else if ($scope.FName.length < 2 || $scope.FName.length > 30) {
            $scope.swalerrorFunc("First Name must be atleast 2 or more..");
        }
        else if ($scope.LName.length < 2 || $scope.LName.length > 30) {
            $scope.swalerrorFunc("Last Name must be atleast 2 or more..");
        }
        else if ($scope.Pass.length < 8 || $scope.Pass.length > 75) {
            $scope.swalerrorFunc("Password must be atleast 8 or more");
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($scope.Email)) {
            $scope.swalerrorFunc("Please enter a proper email format");
        }
        else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test($scope.Pass)) {
            $scope.swalerrorFunc("Use proper Password Format (8 characters, uppercase, lowercase, number, and a special character)");
        }
        else if ($scope.Pass !== $scope.conPass) {
            $scope.swalerrorFunc("Password Mismatch please check your Password and Password confirmation and try again");
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
            $scope.swalsuccessFunc("Registration successful!");
        }
    };

    $scope.clearFunc = function() {
        $scope.UName = "";
        $scope.FName = "";
        $scope.LName = "";
        $scope.Email = "";
        $scope.Pass = "";
        $scope.conPass = "";
        $scope.loginPass = "";
        $scope.loginUName = "";
    };

    $scope.editFunc = function (index) {
        // This was where the copyFunc() is transferred to
        if ($scope.editIndex !== index) {
            var userData = $scope.userArray[index];
            $scope.UName = userData.userName;
            $scope.FName = userData.firstName;
            $scope.LName = userData.lastName;
            $scope.Email = userData.email;
            $scope.Pass = userData.password;
            $scope.conPass = userData.confirmationPassword;

            $scope.editIndex = index;
            $scope.clearFunc();
            $scope.swalsuccessFunc("Data copied into the form.");
            return;
        }

        if (
            $scope.UName == undefined || $scope.UName == "" ||
            $scope.FName == undefined || $scope.FName == "" ||
            $scope.LName == undefined || $scope.LName == "" ||
            $scope.Email == undefined || $scope.Email == "" ||
            $scope.Pass == undefined || $scope.Pass == "" ||
            $scope.conPass == undefined || $scope.conPass == ""
        ) {
            $scope.swalerrorFunc("Please fill in everything.");
            return;
        }
        else if (
            $scope.UName.length < 3 || $scope.UName.length > 75 ||
            $scope.FName.length < 2 || $scope.FName.length > 30 ||
            $scope.LName.length < 2 || $scope.LName.length > 30
        ) {
            $scope.swalerrorFunc("Username must be 3-75 characters, and First/Last Name must be 2-30 characters.");
            return;
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($scope.Email)) {
            $scope.swalerrorFunc("Please enter a valid email address.");
            return;
        }
        else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test($scope.Pass)) {
            $scope.swalerrorFunc("Please enter a strong password. (8 characters, uppercase, lowercase, number, and a special character)");
            return;
        }
        else if ($scope.Pass !== $scope.conPass) {
            $scope.swalerrorFunc("Passwords do not match.");
            return;
        }

        var userData = $scope.userArray[$scope.editIndex];
        userData.userName = $scope.UName;
        userData.firstName = $scope.FName;
        userData.lastName = $scope.LName;
        userData.email = $scope.Email;
        userData.password = $scope.Pass;
        userData.confirmationPassword = $scope.conPass;

        $scope.editIndex = null;
        $scope.clearFunc();
        $scope.swalsuccessFunc("Record updated successfully!");
    };

    $scope.deleteFunc = function(index) {
        $scope.delswalFunc(
            "Are you sure?",
            "Yes",
            "No",
            function() {
                $scope.userArray.splice(index, 1);
                $scope.$apply();
            }
        );
    }

    $scope.loginFunc = function() {
        if (
            $scope.loginUName == undefined || $scope.loginUName == "" ||
            $scope.loginPass == undefined || $scope.loginPass == ""
        ) {
            $scope.swalerrorFunc("Please fill in all fields");
        }
        else {
            window.location.href = "/Module/MainPage";
        }
    }



    //     This is the original editFunc that was commented out. It copies the data from the selected user into the form fields for editing.
        //     $scope.editFunc = function(index) {
        //     var userData = $scope.userArray[index];
        //     $scope.UName = userData.userName;
        //     $scope.FName = userData.firstName;
        //     $scope.LName = userData.lastName;
        //     $scope.Email = userData.email;
        //     $scope.swalsuccessFunc("Data copied into the form.");
        // };

    function isUsernameTaken(username, excludeId) {
        for (var i = 0; i < $scope.userArray.length; i++) {
            if ($scope.userArray[i].userName === username && $scope.userArray[i].id !== excludeId) {
                return true;
            }
        }
        return false;
    }

    function isEmailTaken(email, excludeId) {
        for (var i = 0; i < $scope.userArray.length; i++) {
            if ($scope.userArray[i].email === email && $scope.userArray[i].id !== excludeId) {
                return true;
            }
        }
        return false;
    }

    $scope.swalsuccessFunc = function (message) {
        Swal.fire({
            title: "Success",
            text: message,
            icon: "success"
        });
    }

    $scope.swalerrorFunc = function (message) {
        Swal.fire({
            title: "Error",
            text: message,
            icon: "error"
        });
    };

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

});