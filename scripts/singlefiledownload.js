window.onload = (function() {
    console.log("Downlaod JS on laod")
    var download = document.getElementById('downloadButton');
    download.addEventListener('click', function(event){
        const url = new URL(window.location.href); 
        const pathParam = url.searchParams.get('path');
        // window.open('singlefile.php?path'+ pathParam + '_blank');
        window.location = "http://localhost/web_project/src/singlefile.php?path=" + pathParam;
    })
})