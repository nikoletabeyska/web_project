window.addEventListener("load",function() {
    console.log("Downlaod JS on laod")
    var download = document.getElementById('downloadButton');
    const url = new URL(window.location.href);
    const pathParam = encodeURIComponent(url.searchParams.get('file'));
    //console.log(url.searchParams.get('email'));
 
    download.addEventListener('click', function(event){
        console.log("Decoded ID:", url.searchParams.get('file'));
        // window.open('singlefile.php?path'+ pathParam + '_blank');
 //      sendRequest("http://localhost/web_project/singlefile/singlefile.php?file="+pathParam,[] );
        console.log("here:",pathParam);
        window.location = "../singlefile/singlefile.php?file=" + pathParam + "&email=" + encodeURIComponent(url.searchParams.get('email')) ;
    })
    window.onload=()=>{
    var absolutePathn= new URL("../singlefile/singlefile.php?file=", document.baseURI).href;
    var shareLink = document.getElementById("shareButton");
    shareLink.href = absolutePathn + pathParam;
    shareLink.textContent = absolutePathn + pathParam;
    }
})