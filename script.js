// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        // Don't close if it's a dropdown parent link
        if (!link.parentElement.classList.contains('dropdown') && navMenu) {
            navMenu.classList.remove('active');
            if (hamburger) {
                hamburger.classList.remove('active');
            }
            document.body.style.overflow = '';
        }
    });
});

// Mobile dropdown toggle
document.querySelectorAll('.dropdown > .nav-link').forEach(dropdownLink => {
    dropdownLink.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const dropdown = dropdownLink.parentElement;
            dropdown.classList.toggle('active');
        }
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 60;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect (throttled for performance)
let lastScroll = 0;
let ticking = false;
const navbar = document.querySelector('.navbar');

if (navbar) {
    // Lock navbar position immediately on page load
    navbar.style.position = 'fixed';
    navbar.style.top = '0';
    navbar.style.left = '0';
    navbar.style.right = '0';
    navbar.style.width = '100%';
    navbar.style.height = '60px';
    navbar.style.zIndex = '1000';
    
    function updateNavbar() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 1px 3px rgba(139, 111, 94, 0.15)';
        } else {
            navbar.style.boxShadow = '0 1px 3px rgba(139, 111, 94, 0.1)';
        }
        
        lastScroll = currentScroll;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }, { passive: true });
    
    // Ensure navbar stays stable on resize
    window.addEventListener('resize', () => {
        navbar.style.position = 'fixed';
        navbar.style.top = '0';
        navbar.style.left = '0';
        navbar.style.right = '0';
    }, { passive: true });
}

// Prevent layout shifts on page load
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        // Force reflow to ensure navbar is positioned correctly
        navbar.offsetHeight;
        
        // Lock all nav text elements to prevent movement
        const navLinks = navbar.querySelectorAll('.nav-link, .nav-brand h1');
        navLinks.forEach(link => {
            link.style.willChange = 'auto';
            link.style.transform = 'translateZ(0)';
            link.style.backfaceVisibility = 'hidden';
            link.style.webkitBackfaceVisibility = 'hidden';
        });
    }
    
    // Wait for fonts to load and stabilize navbar
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                // Force layout recalculation after fonts load
                navbar.offsetHeight;
                // Lock navbar position
                navbar.style.position = 'fixed';
                navbar.style.top = '0';
                navbar.style.left = '0';
                navbar.style.right = '0';
            }
        });
    }
});

// Prevent text movement during page transitions
window.addEventListener('beforeunload', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.willChange = 'auto';
    }
});

// Form Submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Here you would typically send the form data to a server
    // For now, we'll just show a success message
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .stat-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Counter animation for stats
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + (target.toString().includes('%') ? '%' : '+');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (target.toString().includes('%') ? '%' : '+');
        }
    };
    
    updateCounter();
};

// Observe stats for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const text = statNumber.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            const suffix = text.includes('%') ? '%' : '+';
            
            statNumber.textContent = '0' + suffix;
            animateCounter(statNumber, number, 2000);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// Certificates Carousel
document.addEventListener('DOMContentLoaded', () => {
    const carouselTrack = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const carouselIndicators = document.getElementById('carouselIndicators');
    
    if (!carouselTrack || !prevBtn || !nextBtn) return;
    
    const slides = carouselTrack.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    let currentIndex = 0;
    const slidesToShow = window.innerWidth > 768 ? 3 : 1;
    
    // Create indicators
    for (let i = 0; i < totalSlides; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'carousel-indicator';
        if (i === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(i));
        carouselIndicators.appendChild(indicator);
    }
    
    const indicators = carouselIndicators.querySelectorAll('.carousel-indicator');
    
    function updateCarousel() {
        const slideWidth = slides[0].offsetWidth + 32; // 32px for gap
        const maxIndex = Math.max(0, totalSlides - slidesToShow);
        const translateX = -currentIndex * slideWidth;
        carouselTrack.style.transform = `translateX(${translateX}px)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }
    
    function goToSlide(index) {
        const maxIndex = Math.max(0, totalSlides - slidesToShow);
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        updateCarousel();
    }
    
    function nextSlide() {
        const maxIndex = Math.max(0, totalSlides - slidesToShow);
        currentIndex = (currentIndex + 1) % (maxIndex + 1);
        updateCarousel();
    }
    
    function prevSlide() {
        const maxIndex = Math.max(0, totalSlides - slidesToShow);
        currentIndex = (currentIndex - 1 + (maxIndex + 1)) % (maxIndex + 1);
        updateCarousel();
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto-play carousel (optional)
    let autoPlayInterval;
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Pause on hover
    const carousel = document.querySelector('.certificates-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        updateCarousel();
    });
    
    // Initialize
    updateCarousel();
    startAutoPlay();
});

// OJT Blogs Dropdown Interface
document.addEventListener('DOMContentLoaded', () => {
    const dailyBlogsBtn = document.getElementById('dailyBlogsBtn');
    const weeklyBlogsBtn = document.getElementById('weeklyBlogsBtn');
    const dailyBlogsDropdown = document.getElementById('dailyBlogsDropdown');
    const weeklyBlogsDropdown = document.getElementById('weeklyBlogsDropdown');
    const blogContentArea = document.getElementById('blog-content-area');
    const blogContentTitle = document.getElementById('blog-content-title');
    const blogContentBody = document.getElementById('blog-content-body');
    const backBtn = document.getElementById('backBtn');
    const blogsDropdownContainer = document.querySelector('.blogs-dropdown-container');

    // Toggle Daily Blogs dropdown
    if (dailyBlogsBtn) {
        dailyBlogsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            dailyBlogsBtn.classList.toggle('active');
            dailyBlogsDropdown.classList.toggle('active');
            
            // Close weekly dropdown if open
            if (weeklyBlogsDropdown.classList.contains('active')) {
                weeklyBlogsBtn.classList.remove('active');
                weeklyBlogsDropdown.classList.remove('active');
            }
        });
    }

    // Toggle Weekly Blogs dropdown
    if (weeklyBlogsBtn) {
        weeklyBlogsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            weeklyBlogsBtn.classList.toggle('active');
            weeklyBlogsDropdown.classList.toggle('active');
            
            // Close daily dropdown if open
            if (dailyBlogsDropdown.classList.contains('active')) {
                dailyBlogsBtn.classList.remove('active');
                dailyBlogsDropdown.classList.remove('active');
            }
        });
    }

    // Handle blog item clicks
    const blogItemLinks = document.querySelectorAll('.blog-item-link');
    blogItemLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const type = link.getAttribute('data-type');
            const day = link.getAttribute('data-day');
            const week = link.getAttribute('data-week');
            
            // Hide dropdown container
            if (blogsDropdownContainer) {
                blogsDropdownContainer.style.display = 'none';
            }
            
            // Show content area
            if (blogContentArea) {
                blogContentArea.style.display = 'block';
                
                // Set title
                if (type === 'daily' && day) {
                    blogContentTitle.textContent = `Day ${day} - OJT Blog`;
                    blogContentBody.innerHTML = `
                        <p><strong>Date:</strong> [Enter date for Day ${day}]</p>
                        <p><strong>Activities:</strong></p>
                        <p>[Enter your activities and experiences for Day ${day} here]</p>
                        <p><strong>Learnings:</strong></p>
                        <p>[Enter what you learned on Day ${day} here]</p>
                        <p><strong>Reflection:</strong></p>
                        <p>[Enter your reflection for Day ${day} here]</p>
                    `;
                } else if (type === 'weekly' && week) {
                    blogContentTitle.textContent = `Week ${week} - OJT Blog`;
                    blogContentBody.innerHTML = `
                        <p><strong>Week Period:</strong> [Enter week period for Week ${week}]</p>
                        <p><strong>Summary:</strong></p>
                        <p>[Enter a summary of your week ${week} activities here]</p>
                        <p><strong>Key Learnings:</strong></p>
                        <p>[Enter your key learnings for Week ${week} here]</p>
                        <p><strong>Challenges:</strong></p>
                        <p>[Enter any challenges you faced during Week ${week} here]</p>
                        <p><strong>Reflection:</strong></p>
                        <p>[Enter your reflection for Week ${week} here]</p>
                    `;
                }
                
                // Scroll to content
                blogContentArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Back button functionality
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            // Hide content area
            if (blogContentArea) {
                blogContentArea.style.display = 'none';
            }
            
            // Show dropdown container
            if (blogsDropdownContainer) {
                blogsDropdownContainer.style.display = 'flex';
            }
            
            // Close all dropdowns
            if (dailyBlogsDropdown) {
                dailyBlogsBtn.classList.remove('active');
                dailyBlogsDropdown.classList.remove('active');
            }
            if (weeklyBlogsDropdown) {
                weeklyBlogsBtn.classList.remove('active');
                weeklyBlogsDropdown.classList.remove('active');
            }
            
            // Scroll to top of interface
            const interfaceSection = document.querySelector('.ojt-blogs-interface-section');
            if (interfaceSection) {
                interfaceSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.blog-category-dropdown')) {
            if (dailyBlogsDropdown && dailyBlogsDropdown.classList.contains('active')) {
                dailyBlogsBtn.classList.remove('active');
                dailyBlogsDropdown.classList.remove('active');
            }
            if (weeklyBlogsDropdown && weeklyBlogsDropdown.classList.contains('active')) {
                weeklyBlogsBtn.classList.remove('active');
                weeklyBlogsDropdown.classList.remove('active');
            }
        }
    });
});

// Blog Gallery Pagination
document.addEventListener('DOMContentLoaded', () => {
    const blogGalleryGrid = document.getElementById('blogGalleryGrid');
    const prevPageBtn = document.getElementById('prevPageBtn');
    const nextPageBtn = document.getElementById('nextPageBtn');
    const paginationNumbers = document.getElementById('paginationNumbers');
    
    if (!blogGalleryGrid) return;
    
    const blogsPerPage = 9;
    const totalBlogs = 40;
    const totalPages = Math.ceil(totalBlogs / blogsPerPage);
    let currentPage = 1;
    
    // Generate blog cards data structure
    const blogCards = [];
    const layoutTypes = [1, 2, 3, 4, 5, 6]; // 6 different content block layouts
    
    for (let i = 1; i <= totalBlogs; i++) {
        // Cycle through layouts to ensure variety
        let layoutType = layoutTypes[(i - 1) % layoutTypes.length];
        let images = [];
        
        // Day 1: Use Layout 6 (4 images) with images from Day1 folder
        if (i === 1) {
            layoutType = 6;
            images = [
                'Day1/1.jpg',
                'Day1/2.jpg',
                'Day1/3.jpg',
                'Day1/4.jpg'
            ];
        }
        
        blogCards.push({
            day: i,
            date: `[Date for Day ${i}]`,
            description: `[Blog description for Day ${i} will be added here]`,
            layoutType: layoutType,
            images: images
        });
    }
    
    // Generate content block HTML based on layout type
    function createContentBlock(blog) {
        const layout = blog.layoutType;
        
        switch(layout) {
            case 1:
                // Layout 1: Large image left, text right (4 lines)
                return `
                    <div class="content-block content-block-layout-1" data-day="${blog.day}">
                        <div class="block-image-large">
                            <div class="image-placeholder"></div>
                        </div>
                        <div class="block-content">
                            <div class="block-text-line"></div>
                            <div class="block-text-line"></div>
                            <div class="block-text-line"></div>
                            <div class="block-text-line"></div>
                        </div>
                    </div>
                `;
                
            case 2:
                // Layout 2: Two square images top, text below each (2 lines each)
                return `
                    <div class="content-block content-block-layout-2" data-day="${blog.day}">
                        <div class="block-images-row">
                            <div class="block-image-square">
                                <div class="image-placeholder"></div>
                            </div>
                            <div class="block-image-square">
                                <div class="image-placeholder"></div>
                            </div>
                        </div>
                        <div class="block-text-group">
                            <div class="block-text-item">
                                <div class="block-text-line"></div>
                                <div class="block-text-line"></div>
                            </div>
                            <div class="block-text-item">
                                <div class="block-text-line"></div>
                                <div class="block-text-line"></div>
                            </div>
                        </div>
                    </div>
                `;
                
            case 3:
                // Layout 3: Two small images left stacked, one large right (no text)
                return `
                    <div class="content-block content-block-layout-3" data-day="${blog.day}">
                        <div class="block-images-stacked">
                            <div class="block-image-square">
                                <div class="image-placeholder"></div>
                            </div>
                            <div class="block-image-square">
                                <div class="image-placeholder"></div>
                            </div>
                        </div>
                        <div class="block-image-large">
                            <div class="image-placeholder"></div>
                        </div>
                    </div>
                `;
                
            case 4:
                // Layout 4: Three square images top, text below each (2 lines each)
                return `
                    <div class="content-block content-block-layout-4" data-day="${blog.day}">
                        <div class="block-images-row">
                            <div class="block-image-square">
                                <div class="image-placeholder"></div>
                            </div>
                            <div class="block-image-square">
                                <div class="image-placeholder"></div>
                            </div>
                            <div class="block-image-square">
                                <div class="image-placeholder"></div>
                            </div>
                        </div>
                        <div class="block-text-group">
                            <div class="block-text-item">
                                <div class="block-text-line"></div>
                                <div class="block-text-line"></div>
                            </div>
                            <div class="block-text-item">
                                <div class="block-text-line"></div>
                                <div class="block-text-line"></div>
                            </div>
                            <div class="block-text-item">
                                <div class="block-text-line"></div>
                                <div class="block-text-line"></div>
                            </div>
                        </div>
                    </div>
                `;
                
            case 5:
                // Layout 5: Three images horizontal, text right of each (1 line each)
                return `
                    <div class="content-block content-block-layout-5" data-day="${blog.day}">
                        <div class="block-image-text-item">
                            <div class="block-image-square">
                                <div class="image-placeholder"></div>
                            </div>
                            <div class="block-text-line"></div>
                        </div>
                        <div class="block-image-text-item">
                            <div class="block-image-square">
                                <div class="image-placeholder"></div>
                            </div>
                            <div class="block-text-line"></div>
                        </div>
                        <div class="block-image-text-item">
                            <div class="block-image-square">
                                <div class="image-placeholder"></div>
                            </div>
                            <div class="block-text-line"></div>
                        </div>
                    </div>
                `;
                
            case 6:
                // Layout 6: Four square images top, text below each (1 short line each)
                const layout6Images = blog.images && blog.images.length > 0 
                    ? blog.images.map((img, idx) => 
                        `<div class="block-image-square">
                            <img src="${img}" alt="Day ${blog.day} - Image ${idx + 1}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">
                        </div>`
                      ).join('')
                    : Array(4).fill(0).map(() => 
                        `<div class="block-image-square">
                            <div class="image-placeholder"></div>
                        </div>`
                      ).join('');
                
                return `
                    <div class="content-block content-block-layout-6" data-day="${blog.day}">
                        <div class="block-images-row">
                            ${layout6Images}
                        </div>
                        <div class="block-text-group">
                            <div class="block-text-item">
                                <div class="block-text-line"></div>
                            </div>
                            <div class="block-text-item">
                                <div class="block-text-line"></div>
                            </div>
                            <div class="block-text-item">
                                <div class="block-text-line"></div>
                            </div>
                            <div class="block-text-item">
                                <div class="block-text-line"></div>
                            </div>
                        </div>
                    </div>
                `;
                
            default:
                return createContentBlock({...blog, layoutType: 1});
        }
    }
    
    // Display blogs for current page
    function displayBlogs() {
        const startIndex = (currentPage - 1) * blogsPerPage;
        const endIndex = startIndex + blogsPerPage;
        const blogsToShow = blogCards.slice(startIndex, endIndex);
        
        blogGalleryGrid.innerHTML = blogsToShow.map(blog => createContentBlock(blog)).join('');
        
        updatePagination();
    }
    
    // Update pagination controls
    function updatePagination() {
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages;
        
        paginationNumbers.innerHTML = '';
        
        // Show page numbers with ellipsis
        if (totalPages <= 7) {
            // Show all pages if 7 or fewer
            for (let i = 1; i <= totalPages; i++) {
                const pageBtn = document.createElement('button');
                pageBtn.className = `pagination-number ${i === currentPage ? 'active' : ''}`;
                pageBtn.textContent = i;
                pageBtn.addEventListener('click', () => {
                    currentPage = i;
                    displayBlogs();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
                paginationNumbers.appendChild(pageBtn);
            }
        } else {
            // Show first page
            addPageButton(1);
            
            if (currentPage > 3) {
                addEllipsis();
            }
            
            // Show pages around current page
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);
            
            for (let i = start; i <= end; i++) {
                addPageButton(i);
            }
            
            if (currentPage < totalPages - 2) {
                addEllipsis();
            }
            
            // Show last page
            if (totalPages > 1) {
                addPageButton(totalPages);
            }
        }
    }
    
    function addPageButton(page) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `pagination-number ${page === currentPage ? 'active' : ''}`;
        pageBtn.textContent = page;
        pageBtn.addEventListener('click', () => {
            currentPage = page;
            displayBlogs();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        paginationNumbers.appendChild(pageBtn);
    }
    
    function addEllipsis() {
        const ellipsis = document.createElement('span');
        ellipsis.className = 'pagination-ellipsis';
        ellipsis.textContent = '...';
        paginationNumbers.appendChild(ellipsis);
    }
    
    // Event listeners
    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayBlogs();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
    
    nextPageBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayBlogs();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
    
    // Initialize
    displayBlogs();
});

// Day Blog Pagination System
document.addEventListener('DOMContentLoaded', () => {
    const diaryEntry = document.querySelector('.diary-entry');
    if (!diaryEntry) return;
    
    const totalDays = 40;
    let currentDay = 1;
    
    // Get initial day from URL parameter if present
    const urlParams = new URLSearchParams(window.location.search);
    const dayParam = urlParams.get('day');
    if (dayParam) {
        const dayNum = parseInt(dayParam);
        if (dayNum >= 1 && dayNum <= totalDays) {
            currentDay = dayNum;
        }
    }
    
    // Day 1 blog content
    const day1Content = {
        title: "Day 1 at NCIP",
        date: "December 9, 2025",
        content: `<p>Today was my first day as an intern at NCIP, and it honestly felt like the start of something new and unfamiliar. We were grouped into threes and informed about the system we would be developing during our internship. We were placed under the supervision of Ma'am Zena May P. Dumandos, the Planning Officer II of the NCIP Technical Management Service Division.</p>
                    
                    <div class="diary-image-row">
                        <div class="diary-image-container">
                            <img src="Day1/1.jpg" alt="Arrival at NCIP" class="diary-image">
                        </div>
                        <div class="diary-image-container">
                            <img src="Day1/2.jpg" alt="Lunch Break" class="diary-image">
                        </div>
                    </div>
                    
                    <p>The morning was mostly spent waiting, as Ma'am Zena was still in a meeting. At first, it felt a bit awkward doing nothing, but I realized that this is also part of being in a real office—learning how to wait and follow instructions. By the time her meeting ended, it was already lunch break.</p>
                    
                    <p>We timed in at 1:00 PM, and that's when the discussion finally started. We talked about the flow of the system, and it was decided that it wouldn't be too complex since our internship would only last two months. I appreciated that decision—it felt realistic and less overwhelming. They also showed us sample systems they currently use, which helped us understand their process better.</p>
                    
                    <div class="diary-bottom-section">
                        <div class="diary-image-container diary-image-left">
                            <img src="Day1/3.jpg" alt="System Discussion" class="diary-image">
                        </div>
                        <div class="diary-text-right">
                            <p>Even though Day 1 was calm and slow, it felt meaningful. It reminded me that every beginning starts quietly, and today was just the first step of this journey.</p>
                        </div>
                    </div>
                    
                    <div class="diary-image-container">
                        <img src="Day1/4.jpg" alt="Day 1 Activity" class="diary-image">
                    </div>`
    };
    
    // Load blog entry for specific day
    function loadBlogEntry(day) {
        currentDay = day;
        
        const title = document.querySelector('.diary-title');
        const date = document.querySelector('.diary-date');
        const contentDiv = document.querySelector('.diary-content');
        
        if (!title || !date || !contentDiv) return;
        
        let content;
        
        // Day 1 has actual content
        if (day === 1) {
            content = day1Content;
        } else {
            // For other days, create placeholder content with same structure
            content = {
                title: `Day ${day} at NCIP`,
                date: `[Date for Day ${day}]`,
                content: `<p>[Blog content for Day ${day} will be added here]</p>
                          
                          <div class="diary-image-placeholder">
                              [Insert Image: Day ${day} Activity]
                          </div>
                          
                          <p>[More content will be added later]</p>
                          
                          <div class="diary-image-placeholder">
                              [Insert Image: Day ${day} Activity 2]
                          </div>
                          
                          <p>[Additional content for Day ${day}]</p>`
            };
        }
        
        // Update title and date
        title.textContent = content.title;
        date.textContent = content.date;
        
        // Get existing pagination before clearing content
        const existingPagination = contentDiv.querySelector('.diary-pagination');
        
        // Update content (but keep pagination structure)
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content.content;
        contentDiv.innerHTML = '';
        contentDiv.appendChild(tempDiv);
        
        // Re-add pagination
        if (existingPagination) {
            contentDiv.appendChild(existingPagination);
        } else {
            contentDiv.appendChild(createPaginationHTML());
        }
        
        // Update pagination state
        updatePagination();
        attachEventListeners();
        
        // Update URL without page reload
        const newUrl = window.location.pathname + (day > 1 ? `?day=${day}` : '');
        window.history.pushState({ day: day }, '', newUrl);
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    function createPaginationHTML() {
        const pagination = document.createElement('div');
        pagination.className = 'diary-pagination';
        pagination.innerHTML = `
            <button class="diary-pagination-btn" id="prevDayBtn" ${currentDay === 1 ? 'disabled' : ''}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M15 18l-6-6 6-6"/>
                </svg>
                Previous Day
            </button>
            
            <div class="diary-pagination-info">
                <span id="currentDayDisplay">Day ${currentDay}</span>
                <span class="diary-pagination-separator">of</span>
                <span id="totalDaysDisplay">Day ${totalDays}</span>
            </div>
            
            <div class="diary-pagination-numbers" id="diaryPaginationNumbers">
            </div>
            
            <button class="diary-pagination-btn" id="nextDayBtn" ${currentDay === totalDays ? 'disabled' : ''}>
                Next Day
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 18l6-6-6-6"/>
                </svg>
            </button>
        `;
        return pagination;
    }
    
    // Update pagination controls
    function updatePagination() {
        const prevBtn = document.getElementById('prevDayBtn');
        const nextBtn = document.getElementById('nextDayBtn');
        const currentDisplay = document.getElementById('currentDayDisplay');
        const totalDisplay = document.getElementById('totalDaysDisplay');
        const paginationNumbers = document.getElementById('diaryPaginationNumbers');
        
        if (prevBtn) prevBtn.disabled = currentDay === 1;
        if (nextBtn) nextBtn.disabled = currentDay === totalDays;
        if (currentDisplay) currentDisplay.textContent = `Day ${currentDay}`;
        if (totalDisplay) totalDisplay.textContent = `Day ${totalDays}`;
        
        if (!paginationNumbers) return;
        
        // Update page numbers
        paginationNumbers.innerHTML = '';
        
        // Show page numbers with ellipsis
        const maxVisible = 7;
        let startPage, endPage;
        
        if (totalDays <= maxVisible) {
            startPage = 1;
            endPage = totalDays;
        } else {
            if (currentDay <= 4) {
                startPage = 1;
                endPage = maxVisible;
            } else if (currentDay >= totalDays - 3) {
                startPage = totalDays - maxVisible + 1;
                endPage = totalDays;
            } else {
                startPage = currentDay - 3;
                endPage = currentDay + 3;
            }
        }
        
        // Add first page if not in range
        if (startPage > 1) {
            addDayButton(1, paginationNumbers);
            if (startPage > 2) {
                addEllipsis(paginationNumbers);
            }
        }
        
        // Add visible pages
        for (let i = startPage; i <= endPage; i++) {
            addDayButton(i, paginationNumbers);
        }
        
        // Add last page if not in range
        if (endPage < totalDays) {
            if (endPage < totalDays - 1) {
                addEllipsis(paginationNumbers);
            }
            addDayButton(totalDays, paginationNumbers);
        }
    }
    
    function addDayButton(day, container) {
        const dayBtn = document.createElement('button');
        dayBtn.className = `diary-pagination-number ${day === currentDay ? 'active' : ''}`;
        dayBtn.textContent = day;
        dayBtn.addEventListener('click', () => {
            loadBlogEntry(day);
        });
        container.appendChild(dayBtn);
    }
    
    function addEllipsis(container) {
        const ellipsis = document.createElement('span');
        ellipsis.className = 'diary-pagination-ellipsis';
        ellipsis.textContent = '...';
        container.appendChild(ellipsis);
    }
    
    function attachEventListeners() {
        // Use event delegation on the pagination container
        const paginationContainer = document.querySelector('.diary-pagination');
        if (!paginationContainer) return;
        
        // Remove all existing listeners by cloning the container
        const newContainer = paginationContainer.cloneNode(true);
        paginationContainer.parentNode.replaceChild(newContainer, paginationContainer);
        
        // Attach event listeners to the new container
        const prevBtn = document.getElementById('prevDayBtn');
        const nextBtn = document.getElementById('nextDayBtn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (currentDay > 1) {
                    loadBlogEntry(currentDay - 1);
                }
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (currentDay < totalDays) {
                    loadBlogEntry(currentDay + 1);
                }
            });
        }
    }
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.day) {
            currentDay = event.state.day;
            loadBlogEntry(currentDay);
        }
    });
    
    // Initialize - set up event listeners and load content
    function initialize() {
        // First, attach event listeners to existing buttons
        attachEventListeners();
        
        // Then update pagination
        updatePagination();
        
        // If we need to load a different day from URL, do it
        if (dayParam) {
            loadBlogEntry(currentDay);
        } else {
            // Otherwise, just ensure pagination is set up correctly
            updatePagination();
        }
    }
    
    // Initialize when DOM is ready
    initialize();
});

