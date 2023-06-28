function uploadRequest(url,userData) {

    fetch(url, {
            method: 'POST',
            body: userData,
          })
          .then(response => {
//            if (!response.ok) {
//              throw new Error('File upload failed. Please try again later.');
//            }
            console.log(response);
            return response.json();
          })
          .then(data => {
            clearMessages();
            displayUploadResult(data);
          })
          .catch(error => {
            console.error('Upload error:', error);
            alert(error.message); //
          });
}     

function clearMessages(){
    const message = document.getElementById('result');
    message.textContent = '';
}

function displayUploadResult(data) {
  
    var resultsContainer = document.getElementById('result');
    var countInfo = data.countInfo;


    if(countInfo.hasOwnProperty('noFiles')){
        resultsContainer.textContent = countInfo['noFiles'];
    } else if(countInfo.hasOwnProperty('error')){
        resultsContainer.textContent = countInfo['error'];
        resultsContainer.innerText += "\n" + countInfo['success']+"\n";
    } else {
        resultsContainer.textContent = countInfo['success'];
    }

    var responseData = data.response;
    var successful = [];
    var j=0;
    for (var i = 0; i < responseData.length; i++) {

            var fileName = responseData[i].filename;
            var isSuccess = responseData[i].success;
            var message = responseData[i].message;

            if(data.hasOwnProperty('developerMessage')){
                var devMessage = responseData[i].developerMessage;
            }
            console.log(devMessage);

            if(isSuccess){
              successful.push(data.fileDataCollection[j]);
              j++;
            }

            if (!isSuccess) {
                var resultElement = document.getElementById('result');
                resultElement.innerText += "\n"+ 'Файл: ' + fileName +"\n"+ message;
            }
    }
    // Update table after uploading every file 
    renderFileList(successful,true);
    //getFiles();

}