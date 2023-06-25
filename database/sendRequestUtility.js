function sendRequest(url, userData) {
    console.log("in send request");
    console.log('Sending request with userData:', JSON.stringify(userData));
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            //'Content-Type': 'application/json',
            },
             body: JSON.stringify(userData)
       })
       //HTTP Request anatomy:
       // URL, Header, Body, Cookies, Status
    .then(response => {
        if (response.ok) {
            //Check is status code of request is 200
            console.log("response ok");
            // response.json() return body of request 
            return response.json();
        } else {
            console.log("response not ok");
            return response.json().then(response => {throw new Error(response.error)})
        }
    })
    .then(responseData => {
        clearErrorMessages();
        if (!responseData.valid) {
            displayErrorMessages(responseData.errors);
        } else {
            window.location.href="http://localhost/web_project/displayfiles/uploadPage.php";
            displaySuccess(responseData.message);
        }
     })
    .catch(error => {
        console.log(error);
        // Handle any errors that occurred during the request
    });
}

function clearErrorMessages(){
    const errors = document.getElementsByClassName('error');
    console.log("clear the errors");
    for(let i = 0; i < errors.length; i++) {
        errors[i].textContent = '';
    }
}

function displayErrorMessages(errors) {
    // iterate over the entries of the errors object and perform a callback function for each entry
    for (var key in errors) {
        if (errors.hasOwnProperty(key)) {
            const field = key;
            const message = errors[key];
            const errorField = document.getElementById(`${field}-error`);
            errorField.textContent = message;
        }
    }

}

function displaySuccess(response) {
    console.log("in scb");
    var success = document.getElementById('success');
    success.textContent = response;
    //window.location = './login.html';
}