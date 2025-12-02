// script.js
document.addEventListener("DOMContentLoaded", () => {
  // ===== FITUR 6: TYPEWRITER MULTIPLE LINES =====
  const typewriterElement = document.getElementById("typewriter-dynamic");
  const texts = ["Mahasiswa Informatika UPN Jatim", "Frontend Developer"];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    // Pastikan elemen ada sebelum menjalankan fungsi
    if (!typewriterElement) return;

    const currentText = texts[textIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Kecepatan hapus
    } else {
      typewriterElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100; // Kecepatan mengetik
    }

    // Jika teks selesai ditulis
    if (!isDeleting && charIndex === currentText.length) {
      typingSpeed = 2000; // Jeda sebelum mulai menghapus
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length; // Pindah ke teks berikutnya
      typingSpeed = 500; // Jeda sebelum mulai mengetik lagi
    }

    setTimeout(type, typingSpeed);
  }

  // Mulai efek typewriter hanya jika elemen ada
  if (typewriterElement) {
    type();
  }

  // ===== FITUR 8: SCROLL PROGRESS BAR =====
  const scrollProgressBar = document.querySelector(".scroll-progress-bar");

  window.addEventListener("scroll", () => {
    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${scrolled}%`;
    }
  });

  // ===== FITUR 2: SCROLL REVEAL ANIMATIONS (Ditingkatkan) =====
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          // Hentikan observasi setelah animasi aktif untuk performa
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1, // Memicu saat 10% elemen terlihat
      rootMargin: "0px 0px -50px 0px", // Memicu sedikit lebih awal
    }
  );

  const hiddenElements = document.querySelectorAll(".reveal");
  hiddenElements.forEach((el) => revealObserver.observe(el));

  // ===== FITUR 9: STATISTICS COUNTER =====
  const setupCounters = () => {
    const statCounters = document.querySelectorAll(".stat-counter");

    // Pastikan ada elemen counter sebelum melanjutkan
    if (statCounters.length === 0) {
      return;
    }

    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseFloat(counter.getAttribute("data-target"));
            const isFloat = !Number.isInteger(target); // Cara lebih aman untuk cek desimal
            let count = 0;
            // Kecepatan animasi, disesuaikan agar tidak terlalu lambat/cepat
            const increment = target / 250;

            const updateCount = () => {
              if (count < target) {
                count += increment;
                // Tampilkan angka dengan 2 desimal jika float, bulatkan ke atas jika integer
                counter.innerText = isFloat
                  ? count.toFixed(2)
                  : Math.ceil(count);
                requestAnimationFrame(updateCount); // Gunakan requestAnimationFrame untuk animasi yang lebih halus
              } else {
                // Pastikan angka akhir tepat sesuai target
                counter.innerText = isFloat ? target.toFixed(2) : target;
                // Hentikan observasi setelah animasi selesai
                observer.unobserve(counter);
              }
            };

            updateCount();
          }
        });
      },
      { threshold: 0.5 }
    ); // Trigger saat 50% elemen terlihat

    statCounters.forEach((counter) => {
      counterObserver.observe(counter);
    });
  };

  // Jalankan fungsi setup counter
  setupCounters();

  // ... (kode lainnya tidak berubah) ...

  // ===== FITUR 3: IMAGE LAZY LOAD WITH BLUR =====
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.addEventListener("load", () => {
          img.classList.add("loaded");
        });
        imageObserver.unobserve(img);
      }
    });
  });

  const lazyImages = document.querySelectorAll(".lazy-load");
  lazyImages.forEach((img) => imageObserver.observe(img));

  // ===== FITUR 5: HOVER 3D TILT CARDS =====
  const tiltCards = document.querySelectorAll(".tilt-card");

  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
    });
  });

  // ===== FITUR 10: ANIMATED BACKGROUND PARTICLES/DOTS =====
  const canvas = document.getElementById("particles-canvas");
  // Pastikan canvas ada sebelum menjalankan script partikel
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let particlesArray = [];

    // Set ukuran canvas
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particlesArray = [];
      const numberOfParticles = (canvas.width * canvas.height) / 15000; // Kepadatan partikel
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    };

    const connectParticles = () => {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const distance = Math.sqrt(
            Math.pow(particlesArray[a].x - particlesArray[b].x, 2) +
              Math.pow(particlesArray[a].y - particlesArray[b].y, 2)
          );
          if (distance < 100) {
            // Jarak maksimal untuk menghubungkan partikel
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 100})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      connectParticles();
      requestAnimationFrame(animateParticles);
    };

    initParticles();
    animateParticles();
  }

  // ===== FITUR 7: CURSOR TRAIL EFFECT =====
  const cursorTrail = [];
  const maxTrailLength = 20;

  document.addEventListener("mousemove", (e) => {
    const dot = document.createElement("div");
    dot.className = "cursor-trail-dot";
    dot.style.left = `${e.clientX}px`;
    dot.style.top = `${e.clientY}px`;
    document.body.appendChild(dot);

    cursorTrail.push(dot);

    if (cursorTrail.length > maxTrailLength) {
      const oldDot = cursorTrail.shift();
      oldDot.remove();
    }

    setTimeout(() => {
      dot.remove();
      const index = cursorTrail.indexOf(dot);
      if (index > -1) {
        cursorTrail.splice(index, 1);
      }
    }, 1000); // Waktu hidup dot
  });

  // ===== SCROLL TO TOP BUTTON (Fitur yang sudah ada) =====
  const scrollTopBtn = document.createElement("button");
  scrollTopBtn.className = "scroll-top";
  scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollTopBtn.setAttribute("aria-label", "Scroll to top");
  document.body.appendChild(scrollTopBtn);

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 200) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});
