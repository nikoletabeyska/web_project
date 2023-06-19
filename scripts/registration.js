window.onload = (function() {

    var register = document.getElementById('register');
    register.addEventListener('click', function(event){
        event.preventDefault();
        const registrationForm = document.getElementById('registration-form');
        const inputs = registrationForm.querySelectorAll('input');
      
       
        //associative array for userData
        const userData = {};
        inputs.forEach(input => {
            userData[input.name] = input.value;
       });
   
       sendRequest('http://localhost/web_project/src/registration.php', userData);

    })
  

})window.onload = (function() {

    var register = document.getElementById('register');
    register.addEventListener('click', function(event){
        event.preventDefault();
        const registrationForm = document.getElementById('registration-form');
        const inputs = registrationForm.querySelectorAll('input');
      
       
        //associative array for userData
        const userData = {};
        inputs.forEach(input => {
            userData[input.name] = input.value;
       });
   
       sendRequest('http://localhost/src/registration.php', userData);

    })
  

})