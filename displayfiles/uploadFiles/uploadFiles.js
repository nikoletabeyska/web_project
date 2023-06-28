console.log("Should HitHEre")
window.addEventListener("load", function () {

    console.log("Should Log");
    var upload = document.getElementById('uploadButton');
    upload.addEventListener('click', function (event) {
      event.preventDefault();
      var uploadContent = document.getElementById('uploadContent');
      var files = uploadContent.files;
      var count = files.length;
      var resultsContainer = document.getElementById('overflow');
      var results = document.getElementById('result');
      results.textContent = "";
      const maxCountForFiles=20;
      if(count > maxCountForFiles){
        resultsContainer.innerText = "Превишен лимит на брой избрани файлове! Лимитът е 20 файла!";
        count = maxCountForFiles;
      } else {
        resultsContainer.innerText = "";
      }

      //Create a new FormData object
      var formData = new FormData();
      //associative array for userData

      for (var i = 0; i < count; i++) {
        formData.append('files[]', files[i]);
      }
      console.log("Reached Upload Files");
      uploadRequest('http://localhost/web_project/displayfiles/uploadFiles/uploadFiles.php', formData);

    })
});