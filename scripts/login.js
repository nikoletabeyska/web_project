window.onload = (
    function attachLoginEvent(){
        const loginBtn = document.getElementById("loginButton");
        loginBtn.addEventListener("click",function (event) {
            event.preventDefault();
            const loginForm = document.getElementById('login-form');
            const inputs = loginForm.querySelectorAll('input');

            const result=document.getElementById("loginInformation");
            result.innerHTML="";

            //associative array for userData
            const userData = {};
            inputs.forEach(input => {
                userData[input.name] = input.value;
            });
            console.log("Login User Json Data")
            console.log(userData);
            sendRequest('http://localhost/src/login.php', userData);

        });
    }
)