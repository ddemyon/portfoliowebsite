"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function Portfolio() {
  const [typedText, setTypedText] = useState("")
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const fullText = "Cognitive Science × Business Management Economics"

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (reduceMotion) {
      setTypedText(fullText)
      setIsTypingComplete(true)
    } else {
      let currentIndex = 0
      const typingInterval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setTypedText(fullText.slice(0, currentIndex))
          currentIndex++
        } else {
          clearInterval(typingInterval)
          setIsTypingComplete(true)
        }
      }, 50)

      return () => clearInterval(typingInterval)
    }
  }, [])

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (reduceMotion) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("show"))
      document.querySelectorAll(".section h2").forEach((el) => el.classList.add("show"))
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("show")
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.14 },
      )

      document.querySelectorAll(".reveal").forEach((el) => observer.observe(el))
      document.querySelectorAll(".section h2").forEach((el) => observer.observe(el))

      return () => {
        document.querySelectorAll(".reveal").forEach((el) => observer.unobserve(el))
        document.querySelectorAll(".section h2").forEach((el) => observer.unobserve(el))
      }
    }
  }, [])

  useEffect(() => {
    const handleNavClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === "A" && target.getAttribute("href")?.startsWith("#")) {
        e.preventDefault()
        setIsMobileMenuOpen(false)
        const targetId = target.getAttribute("href")
        const targetElement = document.querySelector(targetId!)

        if (targetElement) {
          const navHeight = document.querySelector(".nav")?.clientHeight || 0
          const targetPosition = (targetElement as HTMLElement).offsetTop - navHeight

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })
        }
      }
    }

    document.addEventListener("click", handleNavClick)

    return () => {
      document.removeEventListener("click", handleNavClick)
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll(".panel, .about-card, .resume-card")

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect()
        const cardCenterX = rect.left + rect.width / 2
        const cardCenterY = rect.top + rect.height / 2

        // Calculate distance from cursor to card center
        const deltaX = e.clientX - cardCenterX
        const deltaY = e.clientY - cardCenterY

        // Move card opposite to cursor (2-3px max)
        const moveX = -(deltaX / rect.width) * 3
        const moveY = -(deltaY / rect.height) * 3
        ;(card as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`
      })
    }

    const handleMouseLeave = () => {
      const cards = document.querySelectorAll(".panel, .about-card, .resume-card")
      cards.forEach((card) => {
        ;(card as HTMLElement).style.transform = "translate(0, 0)"
      })
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <>
      {/* Navigation */}
      <header className="nav">
        <div className="inner container">
          <a className="brand" href="#hero">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Oct%2023%2C%202025%2C%2011_50_14%20PM-TRssKwTW5Vtg3CVYIeOxv4Mi532AVC.png"
              alt="Delaney Demyon"
              width={50}
              height={50}
            />
            <strong>Delaney Demyon</strong>
          </a>
          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className={`hamburger ${isMobileMenuOpen ? "open" : ""}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
          <nav className={`menu ${isMobileMenuOpen ? "mobile-open" : ""}`} aria-label="Primary">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#resume">My Experience</a>
            <a href="#skills">Skills</a>
            <a href="#connect">Connect</a>
          </nav>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)} aria-hidden="true" />
      )}

      <main>
        {/* Hero Section */}
        <section id="hero" className="hero section">
          <svg className="brainwave-bg" viewBox="0 0 1200 400" xmlns="http://www.w3.org/2000/svg">
            <path
              className="brainwave-line wave-1"
              d="M0,200 Q50,180 100,200 T200,200 T300,200 T400,200 T500,200 T600,200 T700,200 T800,200 T900,200 T1000,200 T1100,200 T1200,200"
              fill="none"
              stroke="rgba(254, 255, 232, 0.08)"
              strokeWidth="1.5"
            />
            <path
              className="brainwave-line wave-2"
              d="M0,240 Q60,210 120,240 T240,240 T360,240 T480,240 T600,240 T720,240 T840,240 T960,240 T1080,240 T1200,240"
              fill="none"
              stroke="rgba(254, 255, 232, 0.06)"
              strokeWidth="1.2"
            />
            <path
              className="brainwave-line wave-3"
              d="M0,160 Q40,145 80,160 T160,160 T240,160 T320,160 T400,160 T480,160 T560,160 T640,160 T720,160 T800,160 T880,160 T960,160 T1040,160 T1120,160 T1200,160"
              fill="none"
              stroke="rgba(254, 255, 232, 0.05)"
              strokeWidth="1"
            />
          </svg>
          <div className="container">
            <div className="hero-content reveal">
              <div className="hero-image-wrapper">
                <Image
                  src="/assets/headshot.jpg"
                  alt="Delaney Demyon"
                  width={200}
                  height={200}
                  className="hero-headshot"
                />
              </div>
              <h1 className="hero-title uppercase gradient-sweep">Delaney Demyon</h1>
              <p className="hero-subtitle typewriter-text">
                {typedText}
                {!isTypingComplete && <span className="typewriter-cursor">|</span>}
              </p>
              <p className="hero-description">
                Third-year student at UC Santa Cruz | Dean's List 2024 | Passionate about data visualization, UX
                research, and human-centered design
              </p>
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">3.5</span>
                  <span className="stat-label">GPA</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">2027</span>
                  <span className="stat-label">Expected Graduation</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">2+</span>
                  <span className="stat-label">Research Projects</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section reveal" data-delay="1">
          <div className="container">
            <div className="eyebrow">My Story</div>
            <h2>About Delaney</h2>
            <div className="about-content-centered">
              <div className="about-card">
                <p>
                  Hi! I'm Delaney, a third-year student at UC Santa Cruz pursuing a dual B.A. in Cognitive Science and
                  Business Management Economics. I'm fascinated by the intersection of human behavior, data, and design.
                </p>
              </div>

              <div className="about-card">
                <p>
                  My academic journey combines analytical thinking with human-centered perspectives. I love exploring
                  how people think, make decisions, and interact with technology. Whether it's analyzing survey data on
                  music preferences or creating data visualizations for business insights, I'm driven by curiosity and a
                  desire to understand the "why" behind the numbers.
                </p>
              </div>

              <div className="about-card">
                <p>
                  Outside of academics, I enjoy working with people, whether that's serving customers at a boba shop,
                  tutoring kids, or collaborating on sustainability initiatives. I believe the best solutions come from
                  truly understanding the people you're designing for.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section reveal" data-delay="2">
          <div className="container">
            <div className="eyebrow">Projects</div>
            <h2>Selected Work</h2>

            {/* Project panel 1 */}
            <div className="panel flip">
              <div>
                <span className="tag">Research</span>
                <h3>Openness to Experience & Music Tastes</h3>
                <p>
                  Survey-driven analysis connecting Big Five <em>Openness</em> with genre preferences among university
                  students. Used statistical analysis (Pearson correlation, Cronbach's alpha) to demonstrate a
                  significant positive association.
                </p>
                <div className="actions">
                  <a
                    className="button"
                    href="https://drive.google.com/file/d/1D5tto8fHlwcTosAe-gdq_A4-GmGSsVAB/view?usp=sharing"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    View PDF
                  </a>
                </div>
              </div>
              <div className="frame">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-10-27%20at%202.42.53%20PM-BiVBeY67Zq4349ZYHgpTFQQz5F4RBs.png"
                  alt="Openness to Experience and Music Tastes Research Paper"
                  width={600}
                  height={400}
                  className="project-preview-image"
                />
              </div>
            </div>

            {/* Project panel 2 */}
            <div className="panel">
              <div className="frame">
                <Image
                  src="/assets/tata-revenue-map.png"
                  alt="TATA Data Visualization Global Revenue Map"
                  width={600}
                  height={400}
                  className="project-preview-image"
                />
              </div>
              <div>
                <span className="tag">Data Visualization</span>
                <h3>TATA Data Visualization: Empowering Business with Effective Insights</h3>
                <p>
                  Developed comprehensive Tableau dashboards as part of the TATA Data Visualization certification,
                  demonstrating data cleaning, analysis, and visualization skills. Created four key visualizations:
                  Global Revenue Distribution Map, Monthly Revenue Trend (2011), Top 10 Countries by Revenue (Excluding
                  UK), and Top 10 Customers by Revenue (Q3). These dashboards provided actionable insights into business
                  growth trends, key markets, and high-value customers through geospatial, temporal, and customer-based
                  analyses.
                </p>
                <div className="actions">
                  <a
                    className="button"
                    href="https://drive.google.com/file/d/1uXiN2rVru5utPqsrKnQTD4U82SXAltZv/view?usp=sharing"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    View PDF
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Resume Section */}
        <section id="resume" className="section reveal" data-delay="3">
          <div className="container">
            <div className="eyebrow">Resume</div>
            <h2>My Experience</h2>
            <div className="resume-card">
              <div className="resume-preview">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-10-27%20at%202.46.24%20PM-PHJf1xFVJxSFrVzfHu44vPcXPegx5f.png"
                  alt="Delaney Demyon Resume Preview"
                  width={600}
                  height={776}
                  className="resume-preview-image"
                />
              </div>
              <div className="resume-content">
                <h3 className="resume-title">My Resume</h3>
                <p className="resume-description">
                  View my complete resume including education, work experience, leadership roles, technical skills, and
                  certifications. Highlights include Dean's List achievement, data visualization certification from Tata
                  Group, and proficiency in Python, Stata, Tableau, and Figma.
                </p>
                <div className="resume-buttons">
                  <a
                    href="https://drive.google.com/file/d/1461uW5VAf1raAnVmXDBbA8uNQ-JgZOw0/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button"
                  >
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    View Resume
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="section reveal">
          <div className="container">
            <div className="eyebrow">Skills</div>
            <h2>What I Use</h2>
            <div className="pills">
              <span className="pill">Python</span>
              <span className="pill">Stata</span>
              <span className="pill">Tableau</span>
              <span className="pill">Figma</span>
              <span className="pill">Microsoft 365 (Excel, PowerPoint, Word)</span>
              <span className="pill">Google Drive Suites</span>
              <span className="pill">Social Media Marketing</span>
            </div>
          </div>
        </section>

        {/* Connect Section */}
        <section id="connect" className="section cta reveal">
          <div className="container">
            <h2>Let's get in touch!</h2>
            <p>Reach out for UX case studies, data viz collaborations, or consulting projects.</p>
            <div className="actions">
              <a
                className="button"
                href="https://www.linkedin.com/in/delaneydemyon/"
                target="_blank"
                rel="noreferrer noopener"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Connect on LinkedIn
              </a>
              <a className="button secondary" href="mailto:ddemyon@ucsc.edu">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Email me
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer section">
        <div className="container footer-content">
          <span>
            © <span id="yr">{new Date().getFullYear()}</span> Delaney Demyon
          </span>
          <span className="footer-separator"> </span>
          <a className="footer-link" href="#hero">
            Back to top ↑
          </a>
        </div>
      </footer>
    </>
  )
}
