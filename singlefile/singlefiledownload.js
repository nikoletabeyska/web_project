window.addEventListener("load",function() {
    console.log("Downlaod JS on laod")
    var download = document.getElementById('downloadButton');
    const url = new URL(window.location.href);
    const pathParam = encodeURIComponent(url.searchParams.get('file'));
    download.addEventListener('click', function(event){
        console.log("Decoded ID:", url.searchParams.get('file'));
        // window.open('singlefile.php?path'+ pathParam + '_blank');
 //      sendRequest("http://localhost/web_project/singlefile/singlefile.php?file="+pathParam,[] );
        console.log("here:",pathParam);
        window.location = "http://localhost/web_project/singlefile/singlefile.php?file=" + pathParam;
    })
    var shareLink = document.getElementById("shareButton");
    shareLink.href = "http://localhost/web_project/singlefile/singlefile.php?file=" + pathParam;
    shareLink.textContent = "http://localhost/web_project/singlefile/singlefile.php?file=" + pathParam;
})