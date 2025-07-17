document.addEventListener("DOMContentLoaded", () => {
  const categoryButtons = document.querySelectorAll(".category-button")
  const artSections = document.querySelectorAll(".art-category-section")

  // Lightbox elements
  const lightbox = document.getElementById("lightbox")
  const lightboxImg = document.getElementById("lightbox-img")
  const lightboxClose = document.querySelector(".lightbox-close")
  const lightboxPrev = document.getElementById("lightbox-prev")
  const lightboxNext = document.getElementById("lightbox-next")

  let currentImages = [] // Stores URLs of currently visible images
  let currentIndex = 0 // Current index in the currentImages array

  // Function to update the currentImages array based on active sections
  const updateCurrentImages = () => {
    currentImages = []
    // If "All Art" is active, collect images from all specific art sections
    if (document.getElementById("all-art-section").classList.contains("active")) {
      document.querySelectorAll(".art-category-section:not(#all-art-section) .art-item img").forEach((img) => {
        currentImages.push(img.src)
      })
    } else {
      // Otherwise, collect images only from the currently active specific section
      document.querySelectorAll(".art-category-section.active .art-item img").forEach((img) => {
        currentImages.push(img.src)
      })
    }
  }

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
    updateCurrentImages() // Update image list whenever category changes
  }

  // Add click event listeners to category buttons
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

  // Lightbox functionality: Open on image click
  document.querySelectorAll(".art-item").forEach((item) => {
    item.addEventListener("click", () => {
      const clickedImgSrc = item.querySelector("img").src
      currentIndex = currentImages.indexOf(clickedImgSrc) // Find index of clicked image
      lightboxImg.src = clickedImgSrc
      lightbox.style.display = "flex" // Use flex to center the image
    })
  })

  // Lightbox functionality: Close button
  lightboxClose.addEventListener("click", () => {
    lightbox.style.display = "none"
  })

  // Lightbox functionality: Close when clicking outside the image (on the overlay)
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      lightbox.style.display = "none"
    }
  })

  // Lightbox functionality: Previous image
  lightboxPrev.addEventListener("click", (event) => {
    event.stopPropagation() // Prevent closing lightbox if clicking on arrow
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length
    lightboxImg.src = currentImages[currentIndex]
  })

  // Lightbox functionality: Next image
  lightboxNext.addEventListener("click", (event) => {
    event.stopPropagation() // Prevent closing lightbox if clicking on arrow
    currentIndex = (currentIndex + 1) % currentImages.length
    lightboxImg.src = currentImages[currentIndex]
  })

  // Initial display: show all art and populate initial image list
  showCategory("all")
})