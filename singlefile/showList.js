
function showList(requestFile, listId, errorMessage){

    var list = document.getElementById(listId);

    if(list.style.visibility === "visible"){
        console.log(1);
        list.style.visibility = "hidden";
    }else{
        list.style.visibility = "visible";
        var ul = document.getElementById(listId+"-ul");
        console.log(ul);
        if(ul){
            console.log(ul);
            list.removeChild(ul);

        }
            getEmails(requestFile, listId, errorMessage);
        
    }

};


function getEmails(requestFile, listId, errorMessage){
    const url = new URL(window.location.href);
    const file_id = url.searchParams.get('file');
    fetch(requestFile, {
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
            displayEmails(responseData.emails,listId,errorMessage);
        }
    })
}

function displayEmails(emailList,listId, errorMessage){
    var list = document.getElementById(listId);
    var none = document.createElement('p');
    if(emailList.length === 0){
        if(!list.querySelector('p')) {
            var none = document.createElement('p');
            none.setAttribute("id", "not-shared");
            none.textContent = errorMessage;
            list.appendChild(none);
        }
    } else {
        if(list.querySelector('p')){
            var none = document.getElementById("not-shared");
            list.removeChild(none);
        }
        var ul = document.createElement("ul");
        ul.id = listId + "-ul";
        for (var i = 0; i < emailList.length; i++) { 
            var li = document.createElement("li");
            li.textContent = emailList[i].email;
            ul.appendChild(li);   
        }
        list.appendChild(ul);
    }
}

