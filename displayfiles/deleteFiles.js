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
            
            checked.push(fileId);
            elements.push(el.parentElement);
        }
    })

    deleteFiles(checked, elements);
  });


  function deleteFiles(fileIds, elements){
    fetch(`http://localhost/web_project/displayfiles/deleteFiles.php`, {
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