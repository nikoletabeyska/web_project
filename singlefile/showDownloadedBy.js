var seenByButton = document.getElementById("downloadedBy");
seenByButton.addEventListener('click', function(){
    showList("showDownloadedBy.php","download-email-list", "Файлът не е изтеглен от никого!","download");

})