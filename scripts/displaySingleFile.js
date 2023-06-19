document.addEventListener("DOMContentLoaded", function() {
    var file = "<?php echo $_GET['file']; ?>";
    var file = file.path;
    var fileExtension = file.split('.').pop().toLowerCase();

    switch(fileExtension) {
        case 'pdf':
            console.log("hi");
            var pdfEmbed = document.createElement("embed");
            pdfEmbed.src = "http://localhost/web_project/src/"+filePath;
            pdfEmbed.type = "application/pdf";
            pdfEmbed.width = "100%";
            pdfEmbed.height = "800px";
            document.getElementById("file-contents").appendChild(pdfEmbed);
            break;
    }










});

