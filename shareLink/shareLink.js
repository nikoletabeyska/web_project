window.addEventListener("load",function() {
    console.log("View JS on laod")
    const url = new URL(window.location.href);
    const pathParam = encodeURIComponent(url.searchParams.get('file'));


    var absolutePath= new URL("../shareLink/shareLink.php?file=", document.baseURI).href;
    var shareViewLink = document.getElementById("shareViewButton");
    shareViewLink.href = absolutePath + pathParam;
    shareViewLink.textContent = absolutePath + pathParam;


    const copyButton = document.getElementById('copyLink');

    copyButton.addEventListener('click', function() {
      const viewableLink = absolutePath + pathParam; // Replace with the actual viewable link
  
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