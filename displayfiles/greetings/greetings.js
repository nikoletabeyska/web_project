window.addEventListener("load", function() {
    const userInfo=document.getElementById("userInfo");
        fetch("greetings/greetings.php",{
            method:'POST',
            headers: {
                //'Content-Type': 'application/x-www-form-urlencoded'
                'Content-Type': 'application/json',
                },
            body: {}
        })
        .then(response => {return response.json()})
        .then(responseJson => {
            userInfo.innerHTML="Здравей, " + responseJson[0];
            console.log(responseJson[0]);
            
        }).catch(error => {console.log(error)});
});