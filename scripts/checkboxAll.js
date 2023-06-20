var checkAllCheckbox = document.getElementById('checkAll');
  
  // Get all other checkboxes on the page
var otherCheckboxes = document.getElementsByName('file-checkbox');
  
  // Add a change event listener to the "Check All" checkbox
 checkAllCheckbox.addEventListener('change', function() {
    console.log(otherCheckboxes);
    // Check or uncheck all other checkboxes based on the state of the "Check All" checkbox
    for (var i = 0; i < otherCheckboxes.length; i++) {
      otherCheckboxes[i].checked = this.checked;
    }
});