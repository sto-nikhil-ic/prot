document.addEventListener("DOMContentLoaded", () => {
  const categoryButtons = document.querySelectorAll(".category-button")
  const artSections = document.querySelectorAll(".art-category-section")

  // Lightbox elements
  const lightbox = document.getElementById("lightbox")
  const lightboxImg = document.getElementById("lightbox-img")
  const lightboxClose = document.querySelector(".lightbox-close")
  const artItems = document.querySelectorAll(".art-item") // Select the art item container

  // Function to show/hide art sections
  const showCategory = (categoryName) => {
    artSections.forEach((section) => {
      section.classList.remove("active") // Hide all sections
    })

    if (categoryName === "all") {
      // Show all individual art sections
      document.getElementById("pencil-art-section").classList.add("active")
      document.getElementById("pen-art-section").classList.add("active")
      document.getElementById("color-art-section").classList.add("active")
    } else {
      // Show only the selected section
      const targetSection = document.getElementById(`${categoryName}-art-section`)
      if (targetSection) {
        targetSection.classList.add("active")
      }
    }
  }

  // Add click event listeners to buttons
  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      categoryButtons.forEach((btn) => btn.classList.remove("active"))
      // Add active class to the clicked button
      button.classList.add("active")

      const category = button.dataset.category
      showCategory(category)
    })
  })

  // Lightbox functionality
  artItems.forEach((item) => {
    item.addEventListener("click", () => {
      const imgSrc = item.querySelector("img").src
      lightbox.style.display = "flex" // Use flex to center the image
      lightboxImg.src = imgSrc
    })
  })

  lightboxClose.addEventListener("click", () => {
    lightbox.style.display = "none"
  })

  // Close lightbox when clicking outside the image (on the overlay)
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      lightbox.style.display = "none"
    }
  })

  // Initial display: show all art
  showCategory("all")
})
