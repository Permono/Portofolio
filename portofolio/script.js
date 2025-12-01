// script.js
document.addEventListener("DOMContentLoaded", () => {
  // ===== REVEAL ANIMATION =====
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Tambahkan delay sebelum menampilkan popup
          setTimeout(() => {
            entry.target.classList.add("active");
          }, 500); // 500 ms = 0.5 detik delay
        }
      });
    },
    {
      threshold: 0.1, 
    }
  );

  // Amati semua elemen dengan class .reveal
  const hiddenElements = document.querySelectorAll(".reveal");
  hiddenElements.forEach((el) => observer.observe(el));

  // ===== SCROLL TO TOP BUTTON =====
  // Buat tombol scroll to top
  const scrollTopBtn = document.createElement("button");
  scrollTopBtn.className = "scroll-top";
  scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollTopBtn.setAttribute("aria-label", "Scroll to top");
  document.body.appendChild(scrollTopBtn);

  // Show/hide tombol saat scroll
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 200) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  });

  // Fungsi scroll to top
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});
