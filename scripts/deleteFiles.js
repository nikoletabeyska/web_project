  var deleteBtn = document.getElementById("delete-button");
  console.log(deleteBtn);
  deleteBtn.addEventListener('click', (event)=>{
    console.log("hello");
    var checkboxes = document.getElementsByName('file-checkbox');
    var checked = [];
    var elements = [];
    checkboxes.forEach((checkbox) =>{
        if(checkbox.checked){
            var parent = checkbox.parentElement;
            var el = parent.nextElementSibling;
            checked.push(el.textContent);
            elements.push(el.parentElement);
            //send query to php to delete file!
            
        }
    })
    deleteFiles(checked, elements);
  });


  function deleteFiles(names, elements){
    fetch(`http://localhost/web_project/src/deleteFiles.php`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        //'Content-Type': 'application/json',
        },
         body: JSON.stringify(names)
    })
    .then(response => response.json())
    .then(data => {
    // Handle the response from deleteFile.php
        // Assuming the PHP file echoes the success message
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
        // Handle any error that occurred during the request
        console.error('Error:', error);
     });

    
}