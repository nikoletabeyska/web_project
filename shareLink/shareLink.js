window.addEventListener("load",function() {
    console.log("View JS on laod");
    const url = new URL(window.location.href);
    const pathParam = encodeURIComponent(url.searchParams.get('file'));
 console.log(url);
 console.log(pathParam);

    var absolutePath= new URL("../shareLink/shareLink.php?file=", document.baseURI).href;
    var shareViewLink = document.getElementById("shareViewButton");
    shareViewLink.href = absolutePath + pathParam;
    shareViewLink.textContent = absolutePath + pathParam;


    const copyButton = document.getElementById('copyLink');

    copyButton.addEventListener('click', function() {
      const viewableLink = absolutePath + pathParam; // Replace with the actual viewable link
  
      const tempInput = document.createElement('input');
      tempInput.value = viewableLink;
  
      document.body.appendChild(tempInput);
  
      tempInput.select();
  
      document.execCommand('copy');
  
      document.body.removeChild(tempInput);
      shareViewLink.textContent= "  Копирано в буфера!";
      shareViewLink.style.fontSize="16pt";
    });
    const inputButton = document.getElementById('showInputField');

    inputButton.addEventListener('click', function() {
        changeVisibility("visible");
    });

    copyButton.addEventListener('click', function() {
      console.log("Clicked");
      var input = document.getElementById('emailInput').value;
      var data = {'email': input, 'file_id': pathParam };
      saveLinkReceiver('../shareLink/saveLinkReceiver.php', data);
        
    });
    
  
    });




function viewLink(){
    linkField=document.getElementById("shareViewButton");
    linkField.style.visibility="visible";

}

function changeVisibility(visibility){
  inputField = document.getElementById("emailInput");
  text = document.getElementById("textInput");
  button = document.getElementById("copyLink");
  text.style.visibility = visibility;
  inputField.style.visibility = visibility;
  button.style.visibility = visibility;
}


function saveLinkReceiver(url,data){
  console.log("in saveLink");
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
  ,            },
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
          copyLinkToBuffer(data['file_id']);
        }
        else{
          var error = document.getElementById('emailError');
          error.textContent = responseData['errors'];

        }
     })
    .catch(error => {
        console.log(error);
        // Handle any errors that occurred during the request
    });
}

function clearMessages(){
  var error = document.getElementById('emailError');
  error.textContent = "";
  var shareViewLink = document.getElementById("shareViewButton");
  shareViewLink.textContent= "";

}

function copyLinkToBuffer(pathParam) {
  var shareViewLink = document.getElementById("shareViewButton");
  shareViewLink.href = "../shareLink/shareLink.php?file=" + pathParam;
  var viewableLink = "../shareLink/shareLink.php?file=" + pathParam; // Replace with the actual viewable link

  const tempInput = document.createElement('input');
  tempInput.value = viewableLink; 
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
  changeVisibility("hidden");
  shareViewLink.style.visibility = "visible";
  shareViewLink.textContent= "Копирано в буфера!";
  shareViewLink.style.fontSize="16pt";

}