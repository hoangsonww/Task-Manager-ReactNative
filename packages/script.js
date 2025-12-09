// ========================================
// TaskNexus Wiki - Interactive Features
// ========================================

(function () {
  "use strict";

  // ========================================
  // Theme Management
  // ========================================
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.querySelector(".theme-icon");
  const html = document.documentElement;

  // Initialize theme from localStorage or system preference
  function initTheme() {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");

    setTheme(initialTheme, false);
  }

  // Set theme and update UI
  function setTheme(theme, animate = true) {
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    // Update icon
    themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";

    // Add animation class
    if (animate) {
      document.body.style.transition =
        "background-color 0.3s ease, color 0.3s ease";
      setTimeout(() => {
        document.body.style.transition = "";
      }, 300);
    }
  }

  // Toggle theme
  function toggleTheme() {
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);

    // Add rotation animation to icon
    themeIcon.style.transform = "rotate(360deg)";
    setTimeout(() => {
      themeIcon.style.transform = "";
    }, 300);
    
    // Re-render mermaid diagrams with new theme
    setTimeout(() => {
      reRenderMermaid();
    }, 350);
  }

  // Event listener for theme toggle
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  // Listen for system theme changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    });

  // ========================================
  // Mobile Menu Toggle
  // ========================================
  const hamburgerMenu = document.getElementById("hamburgerMenu");
  const navCenter = document.querySelector(".nav-center");
  const navLinks = document.getElementById("navLinks");

  if (hamburgerMenu && navCenter && navLinks) {
    hamburgerMenu.addEventListener("click", function (e) {
      e.stopPropagation();
      hamburgerMenu.classList.toggle("active");
      navCenter.classList.toggle("active");
    });

    // Close menu when clicking on a link
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", function () {
        hamburgerMenu.classList.remove("active");
        navCenter.classList.remove("active");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
      if (
        !hamburgerMenu.contains(e.target) &&
        !navCenter.contains(e.target)
      ) {
        hamburgerMenu.classList.remove("active");
        navCenter.classList.remove("active");
      }
    });
  }

  // ========================================
  // Smooth Scrolling
  // ========================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");

        // Skip if it's just "#"
        if (href === "#") return;

        e.preventDefault();
        const targetId = href.substring(1);
        const target = document.getElementById(targetId);

        if (target) {
          const navHeight =
            document.querySelector(".navbar")?.offsetHeight || 0;
          const targetPosition = target.offsetTop - navHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      });
    });
  }

  // ========================================
  // Back to Top Button
  // ========================================
  const backToTopButton = document.getElementById("backToTop");

  function handleScroll() {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add("visible");
    } else {
      backToTopButton.classList.remove("visible");
    }
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  if (backToTopButton) {
    window.addEventListener("scroll", handleScroll);
    backToTopButton.addEventListener("click", scrollToTop);
  }

  // ========================================
  // Enhanced Navbar Scroll Effect
  // ========================================
  const navbar = document.querySelector(".navbar");
  let lastScrollTop = 0;
  let ticking = false;

  function handleNavbarScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        // Add scrolled class for enhanced shadow
        if (scrollTop > 20) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }

        lastScrollTop = scrollTop;
        ticking = false;
      });

      ticking = true;
    }
  }

  if (navbar) {
    window.addEventListener("scroll", handleNavbarScroll);

    // Initial check
    handleNavbarScroll();
  }

  // ========================================
  // Responsive Layout Handler
  // ========================================
  function handleResize() {
    const hamburgerMenu = document.getElementById("hamburgerMenu");
    const navCenter = document.querySelector(".nav-center");
    
    if (window.innerWidth > 768) {
      // Desktop view - close mobile menu
      if (hamburgerMenu) {
        hamburgerMenu.classList.remove("active");
      }
      if (navCenter) {
        navCenter.classList.remove("active");
      }
    }
  }

  window.addEventListener("resize", handleResize);
  handleResize(); // Initial check

  // ========================================
  // Lazy Loading Images
  // ========================================
  function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              img.src = img.src; // Trigger load
              img.classList.add("fade-in");
              observer.unobserve(img);
            }
          });
        },
        {
          rootMargin: "50px",
        },
      );

      images.forEach((img) => imageObserver.observe(img));
    }
  }

  // ========================================
  // Scroll Animations
  // ========================================
  function initScrollAnimations() {
    const elements = document.querySelectorAll(
      ".overview-card, .feature-card, .screenshot-item, .tech-detail-card",
    );

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("fade-in");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -50px 0px",
        },
      );

      elements.forEach((el) => observer.observe(el));
    }
  }

  // ========================================
  // Code Block Copy Functionality
  // ========================================
  function initCodeCopy() {
    document.querySelectorAll(".code-block").forEach((block) => {
      // Create copy button
      const copyButton = document.createElement("button");
      copyButton.className = "copy-button";
      copyButton.innerHTML = "📋 Copy";
      copyButton.setAttribute("aria-label", "Copy code to clipboard");

      // Style the button
      copyButton.style.cssText = `
                position: absolute;
                top: 10px;
                right: 10px;
                padding: 0.5rem 1rem;
                background-color: var(--primary-color);
                color: var(--text-inverse);
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-size: 0.85rem;
                font-weight: 600;
                transition: all 0.2s ease;
                opacity: 0;
            `;

      // Make code block relative for positioning
      block.style.position = "relative";

      // Show button on hover
      block.addEventListener("mouseenter", () => {
        copyButton.style.opacity = "1";
      });

      block.addEventListener("mouseleave", () => {
        if (!copyButton.classList.contains("copied")) {
          copyButton.style.opacity = "0";
        }
      });

      // Copy functionality
      copyButton.addEventListener("click", async () => {
        const code = block.querySelector("code").textContent;

        try {
          await navigator.clipboard.writeText(code);
          copyButton.innerHTML = "✓ Copied!";
          copyButton.classList.add("copied");

          setTimeout(() => {
            copyButton.innerHTML = "📋 Copy";
            copyButton.classList.remove("copied");
          }, 2000);
        } catch (err) {
          console.error("Failed to copy code:", err);
          copyButton.innerHTML = "✗ Failed";
          setTimeout(() => {
            copyButton.innerHTML = "📋 Copy";
          }, 2000);
        }
      });

      block.appendChild(copyButton);
    });
  }

  // ========================================
  // Initialize Mermaid Diagrams
  // ========================================
  let mermaidInitialized = false;
  
  function initMermaid() {
    if (typeof mermaid !== "undefined") {
      const theme = html.getAttribute("data-theme") || "light";

      mermaid.initialize({
        startOnLoad: false,
        theme: theme === "dark" ? "dark" : "default",
        themeVariables: {
          primaryColor: "#4CAF50",
          primaryTextColor: "#fff",
          primaryBorderColor: "#388E3C",
          lineColor: "#2196F3",
          secondaryColor: "#2196F3",
          tertiaryColor: "#FF6B6B",
          fontSize: "14px",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        },
        flowchart: {
          useMaxWidth: true,
          htmlLabels: true,
          curve: "basis",
        },
        sequence: {
          useMaxWidth: true,
          mirrorActors: true,
        },
      });

      renderMermaidDiagrams();
      mermaidInitialized = true;
    }
  }

  function renderMermaidDiagrams() {
    if (typeof mermaid === "undefined") return;
    
    const mermaidElements = document.querySelectorAll('.mermaid');
    mermaidElements.forEach((element, index) => {
      // Store original content
      if (!element.dataset.originalContent) {
        element.dataset.originalContent = element.textContent.trim();
      }
      
      // Clear previous rendering
      element.innerHTML = element.dataset.originalContent;
      element.removeAttribute('data-processed');
      
      // Set unique ID for each diagram
      element.id = `mermaid-diagram-${index}`;
    });
    
    // Render all diagrams
    mermaid.run({
      querySelector: '.mermaid',
    }).catch(err => {
      console.error('Mermaid rendering error:', err);
    });
  }

  function reRenderMermaid() {
    if (mermaidInitialized && typeof mermaid !== "undefined") {
      const theme = html.getAttribute("data-theme") || "light";
      
      // Re-initialize with new theme
      mermaid.initialize({
        startOnLoad: false,
        theme: theme === "dark" ? "dark" : "default",
        themeVariables: {
          primaryColor: "#4CAF50",
          primaryTextColor: "#fff",
          primaryBorderColor: "#388E3C",
          lineColor: "#2196F3",
          secondaryColor: "#2196F3",
          tertiaryColor: "#FF6B6B",
          fontSize: "14px",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        },
        flowchart: {
          useMaxWidth: true,
          htmlLabels: true,
          curve: "basis",
        },
        sequence: {
          useMaxWidth: true,
          mirrorActors: true,
        },
      });
      
      // Re-render all diagrams
      renderMermaidDiagrams();
    }
  }



  // ========================================
  // Performance Monitoring
  // ========================================
  function logPerformance() {
    if (window.performance && window.performance.timing) {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log(`📊 Page Load Time: ${pageLoadTime}ms`);
    }
  }

  // ========================================
  // Keyboard Navigation
  // ========================================
  function initKeyboardNav() {
    document.addEventListener("keydown", (e) => {
      // Alt + T: Toggle theme
      if (e.altKey && e.key === "t") {
        e.preventDefault();
        toggleTheme();
      }

      // Alt + Arrow Up: Scroll to top
      if (e.altKey && e.key === "ArrowUp") {
        e.preventDefault();
        scrollToTop();
      }

      // Escape: Close mobile menu if open
      if (e.key === "Escape") {
        const hamburgerMenu = document.getElementById("hamburgerMenu");
        const navCenter = document.querySelector(".nav-center");
        if (navCenter && navCenter.classList.contains("active")) {
          navCenter.classList.remove("active");
          if (hamburgerMenu) hamburgerMenu.classList.remove("active");
        }
      }
    });
  }

  // ========================================
  // Screenshot Modal (Image Viewer)
  // ========================================
  function initImageModal() {
    const images = document.querySelectorAll(
      ".screenshot-item img, .demo-item img, .demo-item-full img",
    );

    // Create modal
    const modal = document.createElement("div");
    modal.className = "image-modal";
    modal.style.cssText = `
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.9);
            z-index: 9999;
            justify-content: center;
            align-items: center;
            cursor: zoom-out;
        `;

    const modalImg = document.createElement("img");
    modalImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
        `;

    modal.appendChild(modalImg);
    document.body.appendChild(modal);

    // Click to open modal
    images.forEach((img) => {
      img.style.cursor = "zoom-in";
      img.addEventListener("click", (e) => {
        e.stopPropagation();
        modalImg.src = img.src;
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
      });
    });

    // Click to close modal
    modal.addEventListener("click", () => {
      modal.style.display = "none";
      document.body.style.overflow = "";
    });

    // ESC to close modal
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.style.display === "flex") {
        modal.style.display = "none";
        document.body.style.overflow = "";
      }
    });
  }

  // ========================================
  // Smooth Scroll Progress Indicator
  // ========================================
  function initProgressIndicator() {
    const progressBar = document.createElement("div");
    progressBar.className = "scroll-progress";
    progressBar.id = "scrollProgress";
    document.body.appendChild(progressBar);

    let ticking = false;

    function updateProgress() {
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (window.pageYOffset / windowHeight) * 100;
      progressBar.style.width = Math.min(scrolled, 100) + "%";
      ticking = false;
    }

    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    });

    // Initial update
    updateProgress();
  }

  // ========================================
  // Active Navigation Link Highlighting
  // ========================================
  function initActiveNavigation() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    if (sections.length === 0 || navLinks.length === 0) return;

    let ticking = false;

    function updateActiveLink() {
      const scrollPosition = window.pageYOffset + 100; // Offset for navbar height

      let currentSection = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          currentSection = section.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("active");
        const href = link.getAttribute("href");
        if (href === `#${currentSection}`) {
          link.classList.add("active");
        }
      });

      ticking = false;
    }

    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveLink);
        ticking = true;
      }
    });

    // Initial update
    updateActiveLink();
  }

  // ========================================
  // Easter Egg: Konami Code
  // ========================================
  function initKonamiCode() {
    const konamiCode = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let konamiIndex = 0;

    document.addEventListener("keydown", (e) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          activateEasterEgg();
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    });
  }

  function activateEasterEgg() {
    // Create confetti effect
    const colors = ["#4CAF50", "#2196F3", "#FF6B6B", "#FFC107", "#9C27B0"];

    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement("div");
      confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background-color: ${colors[Math.floor(Math.random() * colors.length)]};
                top: -10px;
                left: ${Math.random() * 100}%;
                animation: fall ${2 + Math.random() * 2}s linear forwards;
                z-index: 9999;
                border-radius: 50%;
            `;

      document.body.appendChild(confetti);

      setTimeout(() => confetti.remove(), 4000);
    }

    // Add animation keyframes
    if (!document.getElementById("confetti-animation")) {
      const style = document.createElement("style");
      style.id = "confetti-animation";
      style.textContent = `
                @keyframes fall {
                    to {
                        transform: translateY(100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
      document.head.appendChild(style);
    }

    alert(
      "🎉 Congratulations! You found the secret! 🎉\n\nYou're now a TaskNexus power user!",
    );
  }

  // ========================================
  // Initialize All Features
  // ========================================
  function init() {
    console.log("🚀 TaskNexus Wiki Initializing...");

    initTheme();
    initSmoothScroll();
    initLazyLoading();
    initScrollAnimations();
    initCodeCopy();
    initMermaid();
    initKeyboardNav();
    initImageModal();
    initProgressIndicator();
    initActiveNavigation();
    initKonamiCode();

    // Log performance after page load
    window.addEventListener("load", () => {
      logPerformance();
      console.log("✅ TaskNexus Wiki Ready!");
    });
  }

  // Run initialization when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // ========================================
  // Expose useful functions globally
  // ========================================
  window.TaskNexusWiki = {
    toggleTheme,
    scrollToTop,
    version: "1.0.0",
  };
})();
