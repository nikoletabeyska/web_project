var deleteBtn = document.getElementById("delete-button");

  deleteBtn.addEventListener('click', (event)=>{

    var checkboxes = document.getElementsByName('file-checkbox');
    var checked = [];
    var elements = [];
    checkboxes.forEach((checkbox) =>{
        if(checkbox.checked){
            var parent = checkbox.parentElement;
            var el = parent.nextElementSibling.firstChild;
            var hrefValue = el.getAttribute('href');
            var startIndex = hrefValue.indexOf('file=') + 'file='.length;
            var fileId = hrefValue.substring(startIndex);
            console.log("Encoded in URI format:", fileId)
            fileId = decodeURIComponent(fileId);
            console.log("Decoded from URI format:",fileId);
            
            checked.push(fileId);
            elements.push(el.parentElement.parentElement);
        }
    })

    deleteFiles(checked, elements);
  });


  function deleteFiles(fileIds, elements){
    fetch("../deleteFiles/deleteFiles.php", {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        },
         body: JSON.stringify(fileIds)
    })
    .then(response => response.json())
    .then(data => {

        if(data.success){
            var checkbox = document.getElementById('checkAll');
            checkbox.checked = false;
            console.log(data);
            elements.forEach(function(el){
                el.remove();
            })

        }
    })
    .catch(error => {
        console.error('Error:', error);
     });


}