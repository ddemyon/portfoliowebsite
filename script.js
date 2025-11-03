// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Observe all sections
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".section")
  sections.forEach((section) => {
    observer.observe(section)
  })

  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]')
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        const navHeight = document.querySelector(".nav").offsetHeight
        const targetPosition = targetElement.offsetTop - navHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Add active state to nav links based on scroll position
  const updateActiveNavLink = () => {
    const sections = document.querySelectorAll(".section, .hero")
    const navLinks = document.querySelectorAll(".nav-links a")

    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
      if (window.scrollY >= sectionTop - 100) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  }

  window.addEventListener("scroll", updateActiveNavLink)
  updateActiveNavLink()

  // Keyboard navigation enhancement
  document.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      document.body.classList.add("keyboard-nav")
    }
  })

  document.addEventListener("mousedown", () => {
    document.body.classList.remove("keyboard-nav")
  })
})

// Respect prefers-reduced-motion
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

if (prefersReducedMotion.matches) {
  // Disable animations
  document.documentElement.style.setProperty("--transition", "0s")
}
