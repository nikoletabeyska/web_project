window.addEventListener("load",function() {
    console.log("View JS on laod")
    const url = new URL(window.location.href);
    const pathParam = encodeURIComponent(url.searchParams.get('file'));

    var shareViewLink = document.getElementById("shareViewButton");
    shareViewLink.href = "http://localhost/web_project/shareLink/shareLink.php?file=" + pathParam;
    shareViewLink.textContent = "http://localhost/web_project/shareLink/shareLink.php?file=" + pathParam;

    const copyButton = document.getElementById('copyLink');

    copyButton.addEventListener('click', function() {
      const viewableLink = "http://localhost/web_project/shareLink/shareLink.php?file=" + pathParam; // Replace with the actual viewable link
  
      const tempInput = document.createElement('input');
      tempInput.value = viewableLink;
  
      document.body.appendChild(tempInput);
  
      tempInput.select();
  
      document.execCommand('copy');
  
      document.body.removeChild(tempInput);
      shareViewLink.textContent= "  Копирано в буфера!";
      shareViewLink.style.fontSize="16pt";
    });




})




function viewLink(){
    linkField=document.getElementById("shareViewButton");
    linkField.style.visibility="visible";

}