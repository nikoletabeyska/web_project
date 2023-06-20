document.addEventListener("DOMContentLoaded", function() {
    //console.log("hi");
    getFiles();
});

function getFiles() {
    fetch("http://localhost/web_project/src/getFiles.php")
        .then(response => response.json())
        .then(files => renderFileList(files))
        .catch(error => console.error("Error:", error));
}

function renderFileList(files) {
    var fileList = document.getElementById("file-list");
    fileList.innerHTML = "";
    
    files.forEach(function(file) {
  
        var row = document.createElement("tr");


        var check = document.createElement("td");
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "file-checkbox";
        check.appendChild(checkbox);
        row.appendChild(check);

        var name = document.createElement("td");
        var link = document.createElement("a");
        link.href = "http://localhost/web_project/singlefile.html?file=" + encodeURIComponent(file);
        link.textContent = file.name;
        name.appendChild(link);
        row.appendChild(name);

        var type = document.createElement("td");
        type.textContent = file.type;
        row.appendChild(type);

        var size = document.createElement("td");
        size.textContent = file.size;
        row.appendChild(size);

        var permissions = document.createElement("td");
        permissions.textContent = " ";
        row.appendChild(permissions);

        var owner = document.createElement("td");
        owner.textContent = file.username;
        row.appendChild(owner);

        var date = document.createElement("td");
        date.textContent = file.date;
        row.appendChild(date);

        fileList.appendChild(row);

    });

   
}




// Event handler for checkbox changes
