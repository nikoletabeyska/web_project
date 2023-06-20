document.addEventListener("DOMContentLoaded", function() {
        getFiles();
});

function getFiles() {
    fetch("http://localhost/web_project/src/getFiles.php")
        .then(response => response.json())
        .then(files => renderFileList(files))
        .catch(error => console.error("Error:", error));
}

function renderFileList(files, isNew = false) {
    if(files.length>1){
        
        files.sort(function(a, b) {
            var dateA = new Date(a.date);
            var dateB = new Date(b.date);
            console.log(dateA);
            console.log(dateB);
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
        link.href = "http://localhost/web_project/singlefile.html?file=" + encodeURIComponent(files[i]);
        link.textContent = files[i].name;
        name.appendChild(link);
        row.appendChild(name);

        var owner = document.createElement("td");
        owner.textContent = files[i].username;
        row.appendChild(owner);

        var date = document.createElement("td");
        date.textContent = files[i].date;
        row.appendChild(date);

        if(!isNew){
            fileList.appendChild(row);
        }else{
            fileList.insertBefore(row, fileList.firstChild);
        }

    }
}





