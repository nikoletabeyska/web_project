function uploadRequest(url,userData) {

    fetch(url, {
            method: 'POST',
            body: userData,
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('File upload failed. Please try again later.');
            }
            console.log(response);
            return response.json();
          })
          .then(data => {
            console.log(data);
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
    result.textContent = '';
}

function displayUploadResult(data) {
    var resultsContainer = document.getElementById('result');
    var countInfo = data.countInfo;

    if(countInfo.hasOwnProperty('noFiles')){
        resultsContainer.textContent = countInfo['noFiles'];
    } else if(countInfo.hasOwnProperty('error')){
        resultsContainer.textContent = countInfo['error'];
        resultsContainer.innerText += "\n" + countInfo['success'];
    } else {
        resultsContainer.textContent = countInfo['success'];
    }

    var responseData = data.response;
            // Process the JSON data received from the PHP script
    for (var i = 0; i < responseData.length; i++) {
            var fileName = responseData[i].filename;
            var isSuccess = responseData[i].success;
            var message = responseData[i].message;
            if(data.hasOwnProperty('developerMessage')){
                var devMessage = responseData[i].developerMessage;
            }
            console.log(devMessage);

            if (!isSuccess) {
                var resultElement = document.createElement('div');
                resultElement.classList.add('result');
                resultElement.classList.add('error');
                // Create and append file name element
                var fileError = document.createElement('p');
                fileError.textContent = 'Файл: ' + fileName + " Грешка:" + message;
                resultElement.appendChild(fileError);
          
                // Append the result element to the container
                resultsContainer.appendChild(resultElement);
            }
    }
    getFiles();

}