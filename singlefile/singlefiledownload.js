window.onload = (function() {
    console.log("Downlaod JS on laod")
    var download = document.getElementById('downloadButton');
    download.addEventListener('click', function(event){
        const url = new URL(window.location.href); 
        const pathParam =encodeURIComponent(url.searchParams.get('file'));
        console.log(pathParam);
        console.log("Decoded ID:", url.searchParams.get('file'));
        // window.open('singlefile.php?path'+ pathParam + '_blank');
 //      sendRequest("http://localhost/web_project/singlefile/singlefile.php?file="+pathParam,[] );
        window.location = "http://localhost/web_project/singlefile/singlefile.php?file=" + pathParam;
    })
})