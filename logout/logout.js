window.addEventListener("load", function() {
        const logoutButton=document.getElementById("logoutButton");
        logoutButton.addEventListener("click", function(event){
            event.preventDefault();
            fetch("../logout/logoutsession.php",{
                method:'POST',
                headers: {
                    //'Content-Type': 'application/x-www-form-urlencoded'
                    'Content-Type': 'application/json',
                    },
                body: {}
            })
            .then(response => {return response.json()})
            .then(responseJson => {
                console.log(responseJson);
                window.location.href = "../mainpage/mainpage.php";
            }).catch(error => {console.log(error)});
            // tuk da se izpulni php funkciqta za prekusvane na sesiqta
        });
});
