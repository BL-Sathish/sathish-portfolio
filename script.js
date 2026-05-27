/**
 * ========================================================================
 * SATHISH N - PORTFOLIO INTERACTION ENGINE
 * Vanilla ES6 JavaScript - Custom Effects
 * ========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. THEME SWITCH ENGINE ---
    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    const currentTheme = localStorage.getItem("theme") || "dark";
    
    document.documentElement.setAttribute("data-theme", currentTheme);
    
    themeToggleBtn.addEventListener("click", () => {
        let theme = document.documentElement.getAttribute("data-theme");
        if (theme === "dark") {
            theme = "light";
            themeToggleBtn.querySelector(".moon-icon").style.display = "none";
            themeToggleBtn.querySelector(".sun-icon").style.display = "block";
        } else {
            theme = "dark";
            themeToggleBtn.querySelector(".moon-icon").style.display = "block";
            themeToggleBtn.querySelector(".sun-icon").style.display = "none";
        }
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    });

    // --- 2. TERMINAL PRELOADER COMPILE SIMULATION ---
    const preloader = document.getElementById("preloader");
    const preloaderLogs = document.getElementById("preloader-logs");
    
    const mockLogs = [
        { text: "sathish_n_portfolio_init.sh: Executing backend handshake...", type: "info" },
        { text: "Connecting to spring-boot-context (port 8080)... [CONNECTED]", type: "success" },
        { text: "Scanning packages: com.sathishn.portfolio.* ... [OK]", type: "info" },
        { text: "Initializing Hibernate JpaTransactionManager...", type: "info" },
        { text: "Auto-binding driver: com.mysql.cj.jdbc.Driver ... [OK]", type: "success" },
        { text: "Parsing repository schemas (User, Task, Project, Attendance) ...", type: "info" },
        { text: "Database connection pools established. Active connections: 8", type: "success" },
        { text: "Injecting authorization filters via Spring Security 6...", type: "info" },
        { text: "Resolving assets mapping resource locations...", type: "info" },
        { text: "Loading custom CSS variables & glassmorphism themes...", type: "info" },
        { text: "Compiling typescript elements to vanilla ES6 script.js...", type: "success" },
        { text: "Portfolio context initialized successfully in 1.28s.", type: "success" },
        { text: "Launching Sathish N Portfolio viewport...", type: "info" }
    ];

    let logIndex = 0;
    
    function printLogs() {
        if (logIndex < mockLogs.length) {
            const log = mockLogs[logIndex];
            const p = document.createElement("p");
            p.className = "log-line";
            
            let promptSpan = document.createElement("span");
            promptSpan.className = "log-prompt";
            promptSpan.textContent = "[SYSTEM] ";
            p.appendChild(promptSpan);
            
            let textSpan = document.createElement("span");
            if (log.type === "success") {
                textSpan.className = "log-success";
            }
            textSpan.textContent = log.text;
            p.appendChild(textSpan);
            
            preloaderLogs.appendChild(p);
            preloaderLogs.scrollTop = preloaderLogs.scrollHeight;
            
            logIndex++;
            setTimeout(printLogs, 90);
        } else {
            // End Preloader
            setTimeout(() => {
                preloader.style.opacity = "0";
                preloader.style.transition = "opacity 0.5s ease-out";
                setTimeout(() => {
                    preloader.style.display = "none";
                    // Initialize countup animations
                    startCounterObserver();
                }, 500);
            }, 600);
        }
    }
    
    // Start printing log compilation
    setTimeout(printLogs, 200);

    // --- 3. DYNAMIC INTERACTIVE CUSTOM CURSOR ---
    const cursor = document.getElementById("custom-cursor");
    const follower = document.getElementById("custom-cursor-follower");
    
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener("mousemove", (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
        
        cursor.style.left = cursorX + "px";
        cursor.style.top = cursorY + "px";
    });
    
    // Custom smooth trailing animation loop
    function updateFollower() {
        // Linear interpolation for smooth lag follower
        followerX += (cursorX - followerX) * 0.12;
        followerY += (cursorY - followerY) * 0.12;
        
        follower.style.left = followerX + "px";
        follower.style.top = followerY + "px";
        
        requestAnimationFrame(updateFollower);
    }
    requestAnimationFrame(updateFollower);
    
    // Mouse hover detections
    const interactiveElements = document.querySelectorAll("a, button, input, textarea, .glass-card, .project-card");
    interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
            document.body.classList.add("cursor-hover");
        });
        el.addEventListener("mouseleave", () => {
            document.body.classList.remove("cursor-hover");
        });
    });

    // --- 4. HIGH-PERFORMANCE DYNAMIC PARTICLES BACKGROUND ---
    const canvas = document.getElementById("particles-canvas");
    const ctx = canvas.getContext("2d");
    
    let particlesArray = [];
    const colors = ["#2563eb", "#06b6d4", "#8b5cf6"]; // Primary, Accent, Purple

    // Fit canvas to window
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.4 - 0.2;
            this.speedY = Math.random() * 0.4 - 0.2;
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Wall collisions
            if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
            if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        // Adaptive count based on screensize
        const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 18000), 70);
        for (let i = 0; i < particleCount; i++) {
            particlesArray.push(new Particle());
        }
    }
    initParticles();
    window.addEventListener("resize", initParticles);

    // Draw connection lines between particles
    function connectParticles() {
        let opacityValue = 1;
        const maxDistance = 110;
        
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let dx = particlesArray[a].x - particlesArray[b].x;
                let dy = particlesArray[a].y - particlesArray[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    opacityValue = 1 - (distance / maxDistance);
                    // Determine connection lines color
                    ctx.strokeStyle = `rgba(6, 182, 212, ${opacityValue * 0.12})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        connectParticles();
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // --- 5. TYPEWRITER EFFECT FOR HERO SUBTITLE ---
    const typingSpan = document.getElementById("typing-text");
    const roles = [
        "Java Backend Developer",
        "Spring Boot Specialist",
        "Full Stack Developer",
        "Database Architect"
    ];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function handleTypewriter() {
        const currentRole = roles[roleIdx];
        
        if (isDeleting) {
            charIdx--;
            typingSpeed = 50; // Deleting is faster
        } else {
            charIdx++;
            typingSpeed = 120;
        }

        typingSpan.textContent = currentRole.substring(0, charIdx);

        if (!isDeleting && charIdx === currentRole.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at full word
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
            typingSpeed = 500; // Pause at empty
        }

        setTimeout(handleTypewriter, typingSpeed);
    }
    
    // Launch typewriter loop
    setTimeout(handleTypewriter, 1500);

    // --- 6. SCROLL PROGRESS & STICKY NAVIGATION STYLING ---
    const header = document.getElementById("navbar-header");
    const progressBar = document.getElementById("scroll-progress-bar");
    const scrollToTopBtn = document.getElementById("scroll-to-top");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section");

    window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // Dynamic sticky navigation styling
        if (scrollPosition > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
        
        // Scroll Progress Bar width
        if (totalHeight > 0) {
            const progress = (scrollPosition / totalHeight) * 100;
            progressBar.style.width = progress + "%";
        }
        
        // Scroll To Top button visibility
        if (scrollPosition > 500) {
            scrollToTopBtn.classList.add("visible");
        } else {
            scrollToTopBtn.classList.remove("visible");
        }
        
        // Dynamic Active nav highlight
        let currentSectionId = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 140;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute("id");
            }
        });
        
        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    });

    scrollToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // --- 7. MOBILE RESPONSIVE NAV MENU TOGGLER ---
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navMenu = document.getElementById("nav-menu");
    
    hamburgerBtn.addEventListener("click", () => {
        hamburgerBtn.classList.toggle("open");
        navMenu.classList.toggle("open");
    });
    
    // Close menu when clicking nav links
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            hamburgerBtn.classList.remove("open");
            navMenu.classList.remove("open");
        });
    });

    // --- 8. DYNAMIC GITHUB COMMIT GRID CONSTRUCTION ---
    const githubGrid = document.getElementById("github-contribution-grid");
    
    if (githubGrid) {
        const totalDays = 53 * 7; // Approx 371 grid items to cover a year neatly
        
        for (let i = 0; i < totalDays; i++) {
            const square = document.createElement("div");
            square.className = "github-day";
            
            // Dynamic random commits levels generation (weighted to look realistic)
            const randomVal = Math.random();
            let commitLevel = 0;
            
            if (randomVal > 0.85) commitLevel = 4;      // Dense commits
            else if (randomVal > 0.65) commitLevel = 3; // Active commits
            else if (randomVal > 0.45) commitLevel = 2; // Moderate commits
            else if (randomVal > 0.15) commitLevel = 1; // Light commits
            
            square.classList.add(`level-${commitLevel}`);
            
            // Simple dynamic hover title detail showing simulated commit numbers
            const commitCount = commitLevel === 0 ? 0 : Math.floor(Math.random() * (commitLevel * 4)) + 1;
            const mockDate = new Date();
            mockDate.setDate(mockDate.getDate() - (totalDays - i));
            const formattedDate = mockDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
            
            square.setAttribute("title", `${commitCount === 0 ? 'No' : commitCount} commit${commitCount === 1 ? '' : 's'} on ${formattedDate}`);
            
            githubGrid.appendChild(square);
        }
    }

    // --- 9. INTERACTIVE SKILLS BAR TRANSITION ON SCROLL ---
    const skillsSection = document.getElementById("skills");
    const skillBars = document.querySelectorAll(".skill-bar-fill");
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                skillBars.forEach((bar) => {
                    const percent = bar.getAttribute("data-percent");
                    bar.style.width = percent;
                });
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // --- 10. STATISTICS INCREMENT DIGIT COUNTER SYSTEM ---
    const statsSection = document.getElementById("stats");
    const counterElements = document.querySelectorAll(".stat-number");
    
    function startCounterObserver() {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    counterElements.forEach((counter) => {
                        const target = parseInt(counter.getAttribute("data-target"), 10);
                        const duration = 2000; // Counter increments duration in ms
                        const frameRate = 1000 / 60; // 60 FPS
                        const totalFrames = Math.round(duration / frameRate);
                        let currentFrame = 0;
                        
                        const countUp = () => {
                            currentFrame++;
                            // Simple smooth progress easing out
                            const progress = currentFrame / totalFrames;
                            const easeOutQuad = progress * (2 - progress);
                            const currentValue = Math.floor(easeOutQuad * target);
                            
                            counter.textContent = currentValue;
                            
                            if (currentFrame < totalFrames) {
                                requestAnimationFrame(countUp);
                            } else {
                                counter.textContent = target; // Ensure exact last number
                            }
                        };
                        
                        countUp();
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.25 });
        
        if (statsSection) {
            statsObserver.observe(statsSection);
        }
    }

    // --- 11. CONTACT FORM PROCESSING AND TOAST DISPLAY ---
    const contactForm = document.getElementById("contact-form");
    const formToast = document.getElementById("form-toast");
    const submitBtn = document.getElementById("contact-btn-submit");
    
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Set dynamic button sending state
            submitBtn.disabled = true;
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = `<span>Dispatching...</span> <i class="fa-solid fa-spinner fa-spin btn-icon"></i>`;
            
            // Extract input values
            const name = document.getElementById("contact-name").value.trim();
            const email = document.getElementById("contact-email").value.trim();
            const subject = document.getElementById("contact-subject").value.trim();
            const message = document.getElementById("contact-message").value.trim();
            
            // Simulated validation check
            if (!name || !email || !subject || !message) {
                showToast("Please compile all form parameters correctly.", "error");
                resetSubmitBtn();
                return;
            }
            
            // Simulated asynchronous API network delay (mocking REST call to /api/v1/profile/hire)
            setTimeout(() => {
                showToast(`Handshake successful! Thank you, ${name}. Message received successfully.`, "success");
                contactForm.reset();
                resetSubmitBtn();
            }, 1800);
        });
        
        function showToast(msg, type) {
            formToast.textContent = msg;
            formToast.className = `form-toast ${type}`;
            
            // Scroll to toast message smoothly
            formToast.scrollIntoView({ behavior: "smooth", block: "nearest" });
            
            // Automatically clear toast message after 5 seconds
            setTimeout(() => {
                formToast.style.opacity = "0";
                formToast.style.transition = "opacity 0.5s ease";
                setTimeout(() => {
                    formToast.style.display = "none";
                    formToast.style.opacity = "1";
                }, 500);
            }, 5000);
        }
        
        function resetSubmitBtn() {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<span>Dispatch Connection</span> <i class="fa-solid fa-paper-plane btn-icon"></i>`;
        }
    }
});
