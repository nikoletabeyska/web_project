window.onload = (function() {

    var upload = document.getElementById('uploadButton');
    upload.addEventListener('click', function(event){
        event.preventDefault();
        var uploadContent = document.getElementById('uploadContent');
        var files = uploadContent.files;

        //Create a new FormData object
        var formData = new FormData();
        //associative array for userData
        
        for(var i = 0; i<files.length; i++){
            formData.append('files[]',files[i]);
        }
        
        uploadRequest('http://localhost/web_project/displayfiles/uploadFiles.php',formData);
        
      })
    })
  