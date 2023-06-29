document.addEventListener("DOMContentLoaded", function() {
    const url = new URL(window.location.href); 
    const pathParam =encodeURIComponent(url.searchParams.get('file'));
    console.log(url);
    // var subFolders=<?php
    // require_once '../database/Db.php';
    // echo "$userPathFromLocalhost";
    // ?>;
    var link = "../singlefile/displaySingleFile.php?file=" + pathParam;
        fetch(link)
            .then(response => response.json())
            .then(file => displayFileContent(file))
            .catch(error => console.error("Error:", error));

});

function displayFileContent(fileInfo) {
    console.log(fileInfo);
    const filePath = fileInfo.path;
    const fileType = fileInfo.type.toLowerCase();
    const extension = fileInfo.name.split('.').pop().toLowerCase();
    fileContents = document.getElementById("file-contents");

    document.getElementById("file-name").textContent = "Име: " + fileInfo["name"];
    document.getElementById("file-size").textContent = "Размер на файла: " + fileInfo["size"];
    document.getElementById("file-type").textContent = "Тип: " + fileInfo["type"];
    document.getElementById("file-update-date").textContent = "Дата на качване: " + fileInfo["date"];
    document.getElementById("file-owner").textContent = "Собственик: " + fileInfo["username"];

    switch(fileType) {

        case 'image/jpeg':
        case 'image/jpg':
        case 'image/png':
        case 'image/webp':
        case 'image/avif':
            const imgElement = document.createElement('img');
            imgElement.src = globalpath+filePath;
            fileContents.appendChild(imgElement);
            imgElement.alt = "Image";
            break;

        case 'application/pdf':
            var pdfEmbed = document.createElement("embed");
            pdfEmbed.src = globalpath+filePath;
            pdfEmbed.type = "application/pdf";
            pdfEmbed.width = "100%";
            pdfEmbed.height = "100%";
            //pdfEmbed.height = "500px";
            fileContents.appendChild(pdfEmbed);
            break;

        case 'text/plain':
            console.log("ji");
            //const txtElement = document.createElement('p');
            fetch(globalpath+filePath)
            .then(response => response.text())
            .then(textContent => {
                console.log(textContent);
              const preElement = document.createElement('pre');
              preElement.textContent = textContent;
              fileContents.appendChild(preElement);
            })
            .catch(error => {
              console.error('Error:', error);
            });
            break;

        case 'audio/mp3':
        case 'audio/wav':
        case 'audio/ogg':
        case 'audio/mpeg':
            // Audio
            const audioElement = document.createElement('audio');
            audioElement.controls = true;
            const audioSourceElement = document.createElement('source');
            audioSourceElement.src = globalpath+filePath;;
            audioSourceElement.type = 'audio/' + extension;
            audioElement.appendChild(audioSourceElement);
            fileContents.appendChild(audioElement);
            break;

        // case 'mp4':
        // case 'webm':
        //     // Video
        //     const videoElement = document.createElement('video');
        //     videoElement.controls = true;
        //     const videoSourceElement = document.createElement('source');
        //     videoSourceElement.src = "http://localhost/" + filePath;
        //     videoSourceElement.type = 'video/' + extension;
        //     videoElement.appendChild(videoSourceElement);
        //     fileContents.appendChild(videoElement);
        //     break;

        case 'text/csv':

            fetch(globalpath+filePath)
            .then(response => response.text())
            .then(csvData => {
              // Split the CSV data into rows
              const rows = csvData.split('\n');
      
              // Create the table
              const tableElement = document.createElement('table');
      
              // Create the table rows
              rows.forEach(rowData => {
                const tableRow = document.createElement('tr');
      
                // Split the row data into cells
                const cells = rowData.split(';');
      
                // Create the table cells
                cells.forEach(cellData => {
                  const tableCell = document.createElement('td');
                  tableCell.textContent = cellData;
                  tableRow.appendChild(tableCell);
                });
      
                tableElement.appendChild(tableRow);
              });
      
              fileContents.appendChild(tableElement);
            })
            .catch(error => {
              console.error('Error:', error);
            });
            break;

              case 'text/html':
              case 'text/css':
              case 'text/javascript':
              case 'text/xml':
              case 'application/json':
              case 'application/xml':
              case 'application/octet-stream':
              
              fetch(globalpath+filePath)
              .then(response => response.text())
              .then(textContent => {
                console.log(textContent);
                const preElement = document.createElement('pre');
                preElement.textContent = textContent;
                fileContents.appendChild(preElement);
              })
              .catch(error => {
                console.error('Error:', error);
              });
              break;

              case 'image/gif':
            const gifElement = document.createElement('img');
            gifElement.src = globalpath+filePath;
            gifElement.style.width="100%";
            gifElement.style.height="100%";
            fileContents.appendChild(gifElement);
            break;

            case 'video/mp4':
            case 'video/webm':
                  const vidElement = document.createElement('video');
                  vidElement.controls = true;
                  const vidSourceElement = document.createElement('source');
                  vidSourceElement.src = globalpath+filePath;
                  vidSourceElement.type = 'video/' + extension;
                  vidElement.appendChild(vidSourceElement);
                  fileContents.appendChild(vidElement);
                  break;
      default:
        const defaultElement = document.createElement('p');
        defaultElement.textContent = 'This file type is not supported by our website';
        fileContents.appendChild(defaultElement);
        break;
    }


}




