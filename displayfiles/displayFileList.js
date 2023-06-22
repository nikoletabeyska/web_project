document.addEventListener("DOMContentLoaded", function() {
        getFiles();
});

function getFiles() {
    fetch("http://localhost/web_project/displayfiles/getFiles.php")
        .then(response => response.json())
        .then(files => renderFileList(files))
        .catch(error => console.error("Error:", error));
}

function renderFileList(files, isNew = false) {
    if(files.length>1){
        files.sort(function(a, b) {
            var dateA = new Date(a.date);
            var dateB = new Date(b.date);
            return dateB - dateA; // Sort files in ascending order based on date
          });
    }

    var fileList = document.getElementById("file-list");
    
    for (var i = 0; i < files.length; i++) { 
  
        var row = document.createElement("tr");

        var check = document.createElement("td");
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "file-checkbox";
        check.appendChild(checkbox);
        row.appendChild(check);

        var name = document.createElement("td");
        var link = document.createElement("a");
        console.log(files);
        link.href = "http://localhost/web_project/singlefile/singlefile.html?file=" + encodeURIComponent(files[i].id);
        console.log("URI :"+ decodeURIComponent(encodeURIComponent(files[i].id )));
        link.textContent = files[i].name;
        name.appendChild(link);
        row.appendChild(name);

        var owner = document.createElement("td");
        owner.textContent = files[i].username;
        row.appendChild(owner);

        var date = document.createElement("td");
        date.textContent = files[i].date;
        row.appendChild(date);

        fileList.appendChild(row);
        if(!isNew){
            fileList.appendChild(row);

        } else {
            fileList.insertBefore(row, fileList.firstChild);
        }

    }

}




// Event handler for checkbox changes
