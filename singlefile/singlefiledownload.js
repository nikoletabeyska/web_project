window.onload = (function() {
    console.log("Downlaod JS on laod")
    var download = document.getElementById('downloadButton');
    download.addEventListener('click', function(event){
        const url = new URL(window.location.href); 
        const pathParam =decodeURIComponent(url.searchParams.get('file'));
        console.log(pathParam);
        // window.open('singlefile.php?path'+ pathParam + '_blank');
        window.location = "http://localhost/web_project/singlefile/singlefile.php?file=" + pathParam;
    })
})