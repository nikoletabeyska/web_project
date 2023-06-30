window.addEventListener("load",function() {
    console.log("View JS on laod");
    const inputButton = document.getElementById('showInputField');
    const copyButton = document.getElementById('copyLink');
    const url = new URL(window.location.href);
    const pathParam = encodeURIComponent(url.searchParams.get('file'));

    inputButton.addEventListener('click', function() {
        changeVisibility("visible");
    });

    copyButton.addEventListener('click', function() {
      console.log("Clicked");
      var input = document.getElementById('emailInput').value;
      var data = {'email': input, 'file_id':  decodeURIComponent(pathParam)};
      saveLinkReceiver('../shareLink/saveLinkReceiver.php', data, pathParam);
        
    });
  });

function changeVisibility(visibility){
  inputField = document.getElementById("emailInput");
  text = document.getElementById("textInput");
  button = document.getElementById("copyLink");
  text.style.visibility = visibility;
  inputField.style.visibility = visibility;
  button.style.visibility = visibility;
}


function saveLinkReceiver(url,data, pathParam){
  console.log("in saveLink");
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',            
        },
             body: JSON.stringify(data)
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
      console.log("Data received", responseData);
      clearMessages();
        if(responseData.success){
          console.log("copy link",data['file_id']);
          copyToBuffer(pathParam);
          changeVisibility("hidden");
          var success = document.getElementById('success');
          success.textContent = "Копирано в буфера!";
        }
        else{
          var error = document.getElementById('error');
          error.textContent = responseData['errors'];

        }
     })
    .catch(error => {
        console.log(error);
    });
}

function clearMessages(){
  var error = document.getElementById('error');
  error.textContent = "";
  var success = document.getElementById('success');
  success.textContent = "";

}


function copyToBuffer(pathParam){
  var absolutePath= new URL("../shareLink/shareLink.php?file=", document.baseURI).href;
 
  const viewableLink = absolutePath + pathParam; 

  const tempInput = document.createElement('input');
  tempInput.value = viewableLink;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
}