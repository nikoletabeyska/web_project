
var showButton = document.getElementById("sharedWith");

showButton.addEventListener('click', function(){
    var list = document.getElementById("email-list");

    if(list.style.visibility === "visible"){
        console.log(1);
        list.style.visibility = "hidden";
    }else{
        list.style.visibility = "visible";
        if(!list.querySelector('ul')) {
            getEmails();
        }
    }

})


function getEmails(){
    const url = new URL(window.location.href);
    const file_id = url.searchParams.get('file');
    fetch("showSharedWith.php", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',            
        },
             body: JSON.stringify(decodeURIComponent(file_id))
       })
    .then(response => {
        if (response.ok) {
            console.log("response ok");
            return response.json();
        } else {
            console.log("response not ok");
            return response.json().then(response => {throw new Error(response.error)})
        }
    })
    .then(responseData => {
        //console.log(responseData);
        if(responseData.success){
            displayEmails(responseData.emails);
        }
    })
}

function displayEmails(emailList){
    var list = document.getElementById("email-list");
    var none = document.createElement('p');
    if(emailList.length===0){
        if(!list.querySelector('p')) {
            var none = document.createElement('p');
            none.setAttribute("id", "not-shared");
            none.textContent = "Файлът не е споделен с никого!";
            list.appendChild(none);
        }
    } else {
        var ul = document.createElement("ul");
        for (var i = 0; i < emailList.length; i++) { 
            var li = document.createElement("li");
            li.textContent = emailList[i].email;
            ul.appendChild(li);   
        }
        list.appendChild(ul);
    }
}

 


