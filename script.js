document.addEventListener("DOMContentLoaded", function() {

    // --- Global Page Navigation Function ---
    const pages = document.querySelectorAll('.page');
    let currentPage = 'cover-page'; // Start with the cover page

    function showPage(targetPageId, direction = 'forward') {
        const currentPageElement = document.getElementById(currentPage);
        const targetPageElement = document.getElementById(targetPageId);

        if (!targetPageElement || currentPageElement === targetPageElement) return;

        // Animate current page out
        if (direction === 'forward') {
            currentPageElement.classList.add('exit-left');
        } else {
            currentPageElement.classList.add('exit-right');
        }
        currentPageElement.classList.remove('active');

        // After animation, hide it completely
        setTimeout(() => {
            currentPageElement.style.display = 'none';
            currentPageElement.classList.remove('exit-left', 'exit-right');

            // Set new page to active and display it
            targetPageElement.style.display = 'flex'; // Ensure it's visible before animating in
            targetPageElement.classList.add('active');
            currentPage = targetPageId;

            // Trigger specific page initializations if needed
            if (targetPageId === 'intro-message-page') {
                startTypingEffect();
            } else if (targetPageId === 'final-page') {
                startConfetti();
            }
        }, 800); // Match CSS transition duration
    }

    // --- Cover Page Logic ---
    const giftBox = document.getElementById('gift-box');
    giftBox.addEventListener('click', function() {
        // Trigger gift opening animation
        document.getElementById('cover-page').classList.add('opened');
        // Transition to the intro message page after gift animation
        setTimeout(() => showPage('intro-message-page'), 1500); // Adjust timing
    });


    // --- Intro Message Page Logic (Typing Effect) ---
    const typingTextElement = document.querySelector('.typing-text');
    const messageContentElement = document.querySelector('.message-content');
    const introMessageBtn = document.getElementById('start-journey-btn');

    const introTitle = "Halo Sayangku...";
    // GANTI PESAN INI DENGAN UCAPAN VERSI KAMU!
    const introMessage = `
        Selamat ulang tahun ya, Beruangggg! Hari ini adalah hari spesial kamu,
        dan aku bersyukur banget bisa jadi bagian dari hidup kamu. Aku harap hari ini
        membawa semua kebahagiaan, cinta, dan tawa buat kamu.
        <br><br>
        Ini sedikit hadiah dari aku, sebuah perjalanan singkat
        melihat kembali kenangan kita yahhh dan merayakan kamu. Aku cinta kamu
        lebih dari kata-kata yang bisa aku tulis...
        <br><br>
        I Love You So Much,<br>
        Panda
    `;

    function typeWriter(text, element, delay = 100, callback) {
        let i = 0;
        element.innerHTML = ''; // Clear content first
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, delay);
            } else if (callback) {
                callback();
            }
        }
        type();
    }

    function startTypingEffect() {
        typeWriter(introTitle, typingTextElement, 80, () => {
            messageContentElement.innerHTML = introMessage; // Set full message instantly or type it too
            messageContentElement.style.opacity = '1'; // Make it visible
            introMessageBtn.style.opacity = '1'; // Show button
            introMessageBtn.style.transform = 'translateY(0)'; // Animate button in
        });
    }

    introMessageBtn.addEventListener('click', () => showPage('gallery-page'));

    // --- Galeri Kenangan Logic (Lightbox) ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-btn');


    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
        lightbox.setAttribute('aria-hidden', 'true');
    });

    lightbox.addEventListener('click', function(e) {
        if (e.target !== lightboxImg && e.target !== lightboxCaption) {
            lightbox.style.display = 'none';
            lightbox.setAttribute('aria-hidden', 'true');
        }
    });

    // Populate gallery (dynamic placeholder example)
    // You'll replace these with your actual image URLs
    const galleryPlaceholderImages = [
        "src/5.jpg",
        "src/4.jpg",
        "src/2.jpg",
        "src/6.jpg",
        "src/1.jpg",
        "src/3.jpg"
    ];

    const galleryGrid = document.querySelector('.gallery-grid');
    galleryGrid.innerHTML = ''; // Clear placeholders if any

    galleryPlaceholderImages.forEach((imgSrc, index) => {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = `Kenangan ${index + 1}`;
        img.classList.add('gallery-item');
        // For full size, you might want to use a higher resolution version
        img.dataset.full = imgSrc.replace("w=500", "w=1000"); // Example: change width for full size
        galleryGrid.appendChild(img);
    });

    // Re-attach lightbox event listeners to newly created items
    const updatedGalleryItems = document.querySelectorAll('.gallery-item');
    updatedGalleryItems.forEach(item => {
        item.addEventListener('click', function() {
            lightbox.style.display = 'block';
            lightbox.setAttribute('aria-hidden', 'false');
            lightboxImg.src = this.dataset.full || this.src;
            lightboxCaption.innerHTML = this.alt;
        });
    });

    // Keyboard support: Esc closes the lightbox
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (lightbox && lightbox.style.display === 'block') {
                lightbox.style.display = 'none';
                lightbox.setAttribute('aria-hidden', 'true');
            }
        }
    });


    // --- Reasons Page Logic ---
    const nextReasonBtn = document.getElementById('next-reason-btn');
    const reasonCard = document.getElementById('reason-card');
    const reasonTextContent = document.querySelector('.reason-text-content');

    // GANTI INI DENGAN ALASAN KAMU!
    const reasons = [
        "Karena kamu selalu bisa bikin aku ketawa, bahkan di hari terburuk aku.",
        "Karena kamu lucuuu, kayak anak kucing kecil.",
        "Karena kamu selalu sabar ngadepin semua gajelas nya aku.",
        "Karena senyummu itu, lho, mengalihkan duniaku.",
        "Karena kamu gak pernah marah marah gajelas tanpa alasan.",
        "Karena kamu selalu support aku dalam segala hal.",
        "Karena kamu gak pernah nuntut aneh aneh dan gak neko neko.",
        "Karena caramu memeluk, rasanya seperti pulang ke rumah.",
        "Karena kamu selalu terima apapun jadinya aku.",
        "Karena kamu kalo kirim foto ke aku selalu menggoda :)."
    ];

    let currentReasonIndex = -1; // -1 agar alasan pertama muncul saat klik pertama

    nextReasonBtn.addEventListener('click', function() {
        // Apply fade-out animation
        reasonCard.classList.remove('fade-in');
        reasonCard.classList.add('fade-out');

        setTimeout(() => {
            currentReasonIndex = (currentReasonIndex + 1) % reasons.length;
            reasonTextContent.textContent = reasons[currentReasonIndex];
            
            // Apply fade-in animation
            reasonCard.classList.remove('fade-out');
            reasonCard.classList.add('fade-in');
            reasonCard.style.transform = 'scale(1)'; // Ensure it's visible if it was scaled to 0
        }, 300); // Duration of fade-out animation
    });

    // --- Secret Message Page Logic ---
    const secretInput = document.getElementById('secret-input');
    const unlockSecretBtn = document.getElementById('unlock-secret-btn');
    const secretContent = document.getElementById('secret-content');

    // GANTI TANGGAL INI DENGAN TANGGAL SPESIAL KALIAN (DDMMYY)
    const specialDate = "080124"; // Contoh: 14 Februari 2023

    unlockSecretBtn.addEventListener('click', function() {
        if (secretInput.value === specialDate) {
            secretContent.classList.remove('hidden');
            // hide the input and button after successful unlock
            secretInput.style.display = 'none';
            unlockSecretBtn.style.display = 'none';
            playSuccessSound(); // Optional sound effect
        } else {
            alert("Kode salah, coba lagi! 😉");
            secretInput.value = ''; // Clear input
        }
    });


    // --- Final Page Logic (Confetti) ---
    function startConfetti() {
        const confettiContainer = document.querySelector('.confetti-animation');
        if (!confettiContainer) return;
        // Clear previous confetti (if any)
        confettiContainer.innerHTML = '';
        const total = 90;
        for (let i = 0; i < total; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            // random horizontal start position
            confetti.style.left = (Math.random() * 100) + 'vw';
            // random fall duration and delay
            const dur = 6 + Math.random() * 4; // 6-10s
            const delay = Math.random() * 1.5; // small stagger
            confetti.style.animation = `confetti-fall ${dur}s linear ${delay}s forwards`;
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;
            confettiContainer.appendChild(confetti);
        }
        // Remove confetti nodes after animation completes to keep DOM clean
        setTimeout(() => { confettiContainer.innerHTML = ''; }, 12000);
    }




    // --- Navigation Buttons (prev/next page) ---
    document.querySelectorAll('.nav-btn').forEach(button => {
        button.addEventListener('click', function() {
            const target = this.dataset.target;
            const direction = this.classList.contains('prev-page') ? 'backward' : 'forward';
            showPage(target, direction);
        });
    });


    // --- Optional: Background Music Toggle ---
    /*
    const musicToggleBtn = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    let isPlaying = false;

    if (musicToggleBtn && backgroundMusic) {
        musicToggleBtn.addEventListener('click', () => {
            if (isPlaying) {
                backgroundMusic.pause();
                musicToggleBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            } else {
                backgroundMusic.play();
                musicToggleBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            }
            isPlaying = !isPlaying;
        });

        // Autoplay (often blocked by browsers, might need user interaction)
        // backgroundMusic.play().catch(e => console.log("Autoplay blocked:", e));
    }
    */

    // --- Optional: Sound Effects ---
    function playSuccessSound() {
        // You can add a short celebratory sound here
        // const audio = new Audio('success.mp3');
        // audio.play();
    }


});
