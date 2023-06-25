document.addEventListener('DOMContentLoaded', function() {
    var shareButton =  document.getElementById("share-button");
    var windowDiv = document.getElementById('window');
    const noSelected = document.getElementById('noSelected');
    const input = document.getElementById("inputEmail");
   
    shareButton.addEventListener('click', function() {
      input.value = "";
      clearMessages();
      noSelected.textContent = "";
      fileIds = getCheckedFiles();

      if(fileIds.length == 0){
        noSelected.textContent = "Няма избрани файлове!";
      } else {
        windowDiv.style.display = 'block';
        windowDiv.classList.add('show');
        document.body.classList.add('blur-background'); 
      } 
    });
  
    var closeButton = document.getElementById("closeButton");
    
    closeButton.addEventListener('click', function() {
        windowDiv.style.display = 'none';
        windowDiv.classList.remove('show');
        document.body.classList.remove('blur-background');   
    });

    var doneButton = document.getElementById("doneButton");
    doneButton.addEventListener('click', function() {
        clearMessages();
        givePermissions(fileIds);
  
  });

});


function getCheckedFiles() {
  var checkboxes = document.getElementsByName('file-checkbox');
  var fileIds = [];
      checkboxes.forEach((checkbox) =>{
          if(checkbox.checked){
              var parent = checkbox.parentElement;
              var el = parent.nextElementSibling.firstChild;
              var hrefValue = el.getAttribute('href');
              var startIndex = hrefValue.indexOf('file=') + 'file='.length;
              var fileId = hrefValue.substring(startIndex);
              fileId = decodeURIComponent(fileId);

              fileIds.push(fileId);
          }
      })
  return fileIds;
}

function givePermissions(fileIds){
  var inputEmail = document.getElementById("inputEmail").value.trim();

  if(inputEmail === ""){
    const errorField = document.getElementById('displayError');
    errorField.textContent = "Няма въведен имейл!";
    return;
  }
  
  const regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  if(regexEmail.test(inputEmail)){
      var data = {'email': inputEmail, 'files': fileIds};
      request(data);

  } else {
      const errorField = document.getElementById('displayError');
      errorField.textContent = "Невалиден имейл!";
        return;
    }
}


function request(data){
     fetch("http://localhost/web_project/displayfiles/givePermissions/givePermissions.php", {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
          },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
          //console.log(response.text());
          return response.json();
      } else {
          console.log("response not ok");
          return response.json().then(response => {throw new Error(response.error)})
      }
    })
    .then(responseData => {
      if (!responseData.success) {
        const errorField = document.getElementById('displayError');
        errorField.textContent = responseData.error;
      } else {
        const successField = document.getElementById('displaySuccess');
        successField.textContent = responseData.message;
      }
   })
  .catch(error => {
      console.log(error);
  });

}

function clearMessages(){
  const errorField = document.getElementById('displayError');
  errorField.textContent = "";
  const successField = document.getElementById('displaySuccess');
  successField.textContent = "";
}