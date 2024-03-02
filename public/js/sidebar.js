var dropdown = document.getElementsByClassName("dropdown-btn");
var dropdownLinks = document.getElementsByClassName("dropdown-items");

// Event listener loop for dropdown buttons
for (var i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    var dropdownContent = this.nextElementSibling;

    // Collapse all dropdowns
    for (var j = 0; j < dropdown.length; j++) {
      var otherDropdownContent = dropdown[j].nextElementSibling;
      if (dropdown[j] !== this) {
        dropdown[j].classList.remove("active");
        otherDropdownContent.style.display = "none";
      }
    }

    // Toggle the 'active' class for the currently clicked dropdown button
    this.classList.toggle("active");

    // Toggle the display of the dropdown content
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}

// Event listener loop for dropdown links
for (var k = 0; k < dropdownLinks.length; k++) {
  dropdownLinks[k].addEventListener("click", function() {
    // Toggle the 'active' class for the currently clicked dropdown link
    this.classList.add("active");
  });
}


