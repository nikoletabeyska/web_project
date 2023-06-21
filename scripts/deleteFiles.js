var deleteBtn = document.getElementById("delete-button");

  deleteBtn.addEventListener('click', (event)=>{

    var checkboxes = document.getElementsByName('file-checkbox');
    var checked = [];
    var elements = [];
    checkboxes.forEach((checkbox) =>{
        if(checkbox.checked){
            var parent = checkbox.parentElement;
            var el = parent.nextElementSibling;
            checked.push(el.textContent);
            elements.push(el.parentElement);
        }
    })

    deleteFiles(checked, elements);
  });


  function deleteFiles(names, elements){
    fetch(`http://localhost/web_project/src/deleteFiles.php`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        },
         body: JSON.stringify(names)
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