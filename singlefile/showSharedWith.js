
var showButton = document.getElementById("sharedWith");

showButton.addEventListener('click', function(){
    showList("showSharedWith.php", "email-list", "Файлът не е споделен с никого!","shared");
});


