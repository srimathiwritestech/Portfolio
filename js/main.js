document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", () => {
      if (header) window.scrollTo({ top: window.scrollY, behavior: "smooth" });
    });
  });
});