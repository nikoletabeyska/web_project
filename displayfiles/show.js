function openOverlay() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'flex';
}

function closeOverlay() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
}

function openResultPopup(fileCount) {
    const resultOverlay = document.getElementById('result-overlay');
    const resultPopup = document.getElementById('result-popup');
    const uploadResult = document.getElementById('upload-result');
    //попълваме
    resultOverlay.style.display = 'flex';
    resultPopup.style.display = 'block';
}
  