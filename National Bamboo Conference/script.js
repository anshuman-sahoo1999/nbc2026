document.addEventListener('DOMContentLoaded', () => {
    // 1. MOBILE MENU
    const hamburger = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    if(hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('toggle');
        });
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => { navLinks.classList.remove('active'); });
        });
    }

    // 2. ANIMATIONS & COUNTER
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) { entry.target.classList.add('visible'); }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.hero-content, .bamboo-stat-card, .feature-card, .part-card').forEach(el => {
        el.style.opacity = "0"; el.style.transform = "translateY(20px)"; el.style.transition = "all 0.8s ease";
        observer.observe(el);
    });
    const styleSheet = document.createElement("style");
    styleSheet.innerText = ".visible { opacity: 1 !important; transform: translateY(0) !important; }";
    document.head.appendChild(styleSheet);

    const counter = document.getElementById('visitor-count');
    if(counter) {
        let count = localStorage.getItem('visitCount') || 5678;
        count++;
        localStorage.setItem('visitCount', count);
        counter.innerText = count;
    }

    // 3. SLIDESHOW
    const slides = document.querySelectorAll('.slide');
    if(slides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000);
    }
});

// 4. SDG (Full Descriptions)
const bambooData = {
    1: "Goal 1: No Poverty - Bamboo cultivation provides a secure and sustainable source of income for millions of rural families in developing countries. Its rapid growth and low input requirements make it an accessible cash crop, offering a vital pathway out of poverty for smallholder farmers and marginalized communities.",
    2: "Goal 2: Zero Hunger - Bamboo shoots provide a highly nutritious food source rich in protein, fiber, and essential vitamins, contributing to food security in many Asian and African regions. Furthermore, bamboo agroforestry systems protect soil health and improve crop yields, ensuring sustainable agricultural practices.",
    3: "Goal 3: Good Health & Well-Being - Bamboo leaves and extracts have been used for centuries in traditional medicine and are now being integrated into modern pharmaceuticals for their anti-oxidant, anti-inflammatory, and anti-bacterial properties. Additionally, bamboo forests improve air quality, promoting better respiratory health.",
    6: "Goal 6: Clean Water & Sanitation - Bamboo charcoal is an excellent, low-cost natural filter for purifying water, removing impurities and pathogens. Bamboo forests also play a critical role in watershed protection, preventing soil erosion into rivers and maintaining the quality of groundwater reserves.",
    7: "Goal 7: Affordable & Clean Energy - Bamboo biomass and charcoal provide a sustainable, renewable, and cleaner alternative to firewood and fossil fuels for cooking and heating. Bamboo pellets and briquettes are emerging as a viable source of bioenergy, reducing reliance on non-renewable resources.",
    8: "Goal 8: Decent Work & Economic Growth - The bamboo value chain is a massive employment generator, creating millions of jobs ranging from cultivation and harvesting to processing, craftsmanship, and industrial manufacturing. It fosters inclusive economic growth, particularly in rural and semi-urban areas.",
    9: "Goal 9: Industry, Innovation & Infrastructure - Bamboo is a high-performance material driving innovation in sustainable architecture, textiles, and composite materials. Its high tensile strength and flexibility make it an ideal resource for developing resilient infrastructure and eco-friendly industrial applications.",
    11: "Goal 11: Sustainable Cities & Communities - Bamboo is a premier material for green construction and affordable housing. Its use in buildings reduces the carbon footprint of cities, while bamboo landscaping mitigates the urban heat island effect, creating more resilient and livable urban environments.",
    12: "Goal 12: Responsible Consumption & Production - Bamboo is a rapidly renewable resource that can replace single-use plastics, slow-growing timber, and energy-intensive materials. Its fast regeneration cycle promotes a circular economy and responsible consumption patterns globally.",
    13: "Goal 13: Climate Action - Bamboo is a powerhouse for climate action, absorbing carbon dioxide at a rate significantly higher than many tree species and releasing 35% more oxygen. It acts as a crucial carbon sink, helping to mitigate the impacts of global warming.",
    15: "Goal 15: Life on Land - Bamboo forests are vital for restoring degraded lands and preventing desertification due to their extensive root systems. They also provide essential habitats for diverse wildlife, including endangered species like the Giant Panda and Mountain Gorilla, supporting terrestrial biodiversity."
};

function showBambooInfo(id) {
    const titleBox = document.getElementById('goal-title');
    const textBox = document.getElementById('goal-text');
    const infoBox = document.getElementById('bamboo-info-box');
    const displayIcon = document.getElementById('display-icon');
    if (bambooData[id]) {
        titleBox.innerText = bambooData[id].split(" - ")[0];
        textBox.innerText = bambooData[id].split(" - ")[1];
        displayIcon.src = `images/${id}.png`;
        displayIcon.classList.remove('rotate-default');
        infoBox.style.backgroundColor = "#f0fdf4";
        setTimeout(() => { infoBox.style.backgroundColor = "#ffffff"; }, 300);
        if(window.innerWidth < 768) infoBox.scrollIntoView({behavior: "smooth", block: "nearest"});
    }
}

// 5. RESOURCE PERSONS PROFILES
const rpData = {
    1: "Mr. Sanjay Singh is the Partner and Principal Consultant at Green Solutions India, with 27 years of professional experience in sustainable materials engineering. He specializes in wood, wood-based developments, composites, and bamboo engineering, and has worked extensively on integrating natural materials into structurally sound and environmentally responsible projects. Known for his strategic insight and hands-on approach, he has contributed to advancing sustainable construction practices across diverse applications.",
    2: "Mr. Sanjeev S. Karpe is the Founder and Director of Konkan Bamboo & Cane Development Centre (KONBAC), with over 22 years of experience delivering bamboo-based projects across India. He is Co-founder and Director of JANS Bamboo Products Pvt. Ltd., which executed India’s largest bamboo construction project, and of woodygrass.com. He also serves as Director at Centre for Indian Bamboo Resource and Technology and contributes to global standards through INBAR and ISO TC-165.",
    3: "Mr. V. P. Soni has been working in bamboo technology and machinery since 1999, with extensive experience across bamboo processing, furniture, boards, charcoal, toys, treatment, and drying. A bamboo technologist by passion, he has developed advanced tools and carbide cutters suited to hard Indian bamboo conditions, now exported globally. He is the CEO of Prashant Bamboo Machine Pvt. Ltd., which offers India’s widest range of bamboo machinery with pan-India and international presence.",
    4: "Mr. Ghani Zaman is a master bamboo artisan, trainer, and entrepreneur with over 25 years of professional work in bamboo construction and more than four decades in creative practice. He began bamboo structures as a full-time profession in 1997 and has since trained hundreds of architecture students through workshops and on-site programs across India. A former visiting lecturer at Piloo Mody College of Architecture, Cuttack, he is an active member of the World Bamboo Congress and continues to work with government agencies, NGOs, and architectural firms on bamboo-based livelihoods and sustainable construction.",
    5: "Mr. Pranab Nath is an agricultural biotechnologist with over 10 years of experience across bioenergy supply chains, agricultural extension, community mobilisation, and microbial technologies. He currently works with Assam Bio Ethanol Private Limited, focusing on developing sustainable bamboo feedstock supply chains and local enterprises. His expertise includes biomass supply chain management, energy farming systems, lignocellulosic biofuels, and bio-input and microbial formulations for sustainable agriculture.",
    6: "Dr. Ajay Thakur is Scientist ‘G’ and former Head of the G&T I Division at the Forest Research Institute, with over 28 years of experience in bamboo and tree improvement, forest biotechnology, and genetic resource conservation. A Commonwealth Fellow with a PhD from the University of Oxford and Bangor University, he serves on national advisory bodies including the National Bamboo Mission and NITI Aayog.",
    7: "Ms. Kirti Jalan is an architect and furniture designer, Founder of Kirti Jalan Design Studio and Co-founder of QX Design. An alumna of CEPT University, she works across furniture, installations, interiors, and architecture. Her practice blends traditional crafts with contemporary design, focusing on contextual, participatory, and human-centric approaches while empowering local artisans and craft communities across India.",
    8: "Dr. Nirakar Bhol is Associate Professor and Head, Department of Silviculture & Agroforestry at the Odisha University of Agriculture and Technology. With 28 years of experience in forestry education, research, and extension, he specializes in bamboo production technology and agroforestry. A PhD from the Forest Research Institute, he has worked for over 25 years on improving commercial bamboo productivity and actively supports bamboo growers and entrepreneurs in Odisha.",
    9: "Mr. Laurent Fournier is an architectural consultant trained at the School of Architecture of Paris-Belleville, France, with over two decades of experience in bioclimatic and low-impact construction. Based in India, his work integrates bamboo, mud, brick domes, and local materials across housing, schools, factories, and community buildings, particularly in eastern India and the Sundarbans. He has contributed extensively to bamboo-based structural design, construction processes, and hands-on training, bridging traditional knowledge with contemporary architecture.",
    10: "Ar. Neelam Manjunath is the Founder, Chairman, and CEO of the Centre for Green Building Materials and Technology and a pioneering force in bamboo architecture in India. A practicing architect since 1991, she is internationally recognised for projects such as Bamboo Symphony and House of Five Elements, showcasing bamboo as a primary structural material. She also initiated the Bamboo Application Technology (BAT) course and worked with the Council of Architecture to mainstream bamboo education nationwide.",
    11: "Dr. Rebecca Reubens is the founder of Rhizome and a globally recognised voice in sustainable craft and design. An alumna of the National Institute of Fashion Technology and the National Institute of Design, she holds a PhD from the Delft University of Technology. A World Bamboo Ambassador with the World Bamboo Organization, she is also an educator and author of The Routledge Handbook of Craft and Sustainability in India.",
    12: "Dr. V. B. Sreekumar has over two decades of research experience in floristics, plant systematics, phylogenetics, ecological restoration, and seed dispersal, with deep expertise in palms and bamboos. He has conducted extensive fieldwork across the Western Ghats, Northeast India, and the Andaman & Nicobar Islands. He has contributed to programmes supported by UNDP, DST, and the National Bamboo Mission, and currently serves as Coordinator of its Bamboo Technical Support Group.",
    13: "Dr. Ashok Kumar Mohapatra is a senior agronomist and former Professor at the College of Agriculture, Odisha University of Agriculture and Technology, currently serving at the Institute of Agricultural Sciences, SOA University. His expertise spans soil fertility management, agroforestry, integrated farming systems, and watershed management. He has led research and extension work in coastal agroforestry and contributed to projects under the National Bamboo Mission, while mentoring postgraduate and doctoral scholars.",
    14: "Er. Ashok Basa is a distinguished structural engineer and NIT Rourkela alumnus, renowned for expertise in bridges, hydraulic structures, and heritage rehabilitation. His landmark works include major bridges over the Mahanadi and Brahmani rivers and key urban flyovers in Odisha. A recipient of multiple national honors, he has served as President of the Institution of Engineers (India) and currently holds global leadership roles with the World Federation of Engineering Organisations.",
    15: "Dr. Anil Kumar Sethy is Scientist-F at the Institute of Wood Science and Technology, Bengaluru, with over two decades of research experience in wood science and bamboo engineering. A PhD from the University of Melbourne, he specializes in wood quality assessment, wood modification, wood composites, bamboo lumber, and mass timber. He has published extensively in peer-reviewed journals and has received multiple international research fellowships and awards."
};

function openModal(type) {
    if(type === 'privacy') document.getElementById('privacy-modal').style.display = 'flex';
    else if (type === 'terms') document.getElementById('terms-modal').style.display = 'flex';
    else if (type === 'bharateeyam') document.getElementById('bharateeyam-modal').style.display = 'flex';
}
function openBio(id) {
    const modal = document.getElementById('bio-modal');
    if(rpData[id]) {
        document.getElementById('modal-name').innerText = "Profile";
        document.getElementById('modal-bio').innerText = rpData[id];
        modal.style.display = 'flex';
    }
}
function closeModal(type) {
    if(type === 'bio') document.getElementById('bio-modal').style.display = 'none';
    if(type === 'privacy') document.getElementById('privacy-modal').style.display = 'none';
    if(type === 'terms') document.getElementById('terms-modal').style.display = 'none';
    if(type === 'bharateeyam') document.getElementById('bharateeyam-modal').style.display = 'none';
}
window.onclick = function(event) {
    if (event.target.classList.contains('modal-overlay')) event.target.style.display = "none";

}
// 6. TEASER VIDEO LOGIC
window.addEventListener('load', () => {
    // Check if user has already seen the video in this session (optional)
    // Remove the if-statement if you want it to show EVERY time
    if (!sessionStorage.getItem('videoSeen')) {
        setTimeout(() => {
            const videoModal = document.getElementById('video-modal');
            if (videoModal) {
                videoModal.style.display = 'flex';
            }
        }, 1000); // 1 second delay before popup
        sessionStorage.setItem('videoSeen', 'true');
    }
});

function closeVideoModal() {
    const modal = document.getElementById('video-modal');
    const iframe = document.getElementById('teaser-iframe');
    
    if (modal) {
        modal.style.display = 'none';
        
        // Stop YouTube video playback by resetting the src attribute
        if (iframe) {
            const iframeSrc = iframe.src;
            iframe.src = iframeSrc; 
        }
    }
}

// Update existing window.onclick to include closing video modal on background click
const existingWindowOnClick = window.onclick;
window.onclick = function(event) {
    // Run existing logic
    if (typeof existingWindowOnClick === 'function') {
        existingWindowOnClick(event);
    }
    
    // Add Video Modal background click logic
    if (event.target.id === 'video-modal') {
        closeVideoModal();
    }
}



