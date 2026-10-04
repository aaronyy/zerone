function nav(active) {
  const links = [
    ["index.html", "Home"],
    ["work.html", "Work"],
    ["approach.html", "Approach"],
    ["about.html", "About"],
  ];
  return `
    <nav class="site-nav" aria-label="Main navigation">
      <a class="brand" href="index.html" aria-label="Zerone home">
        <img src="assets/logo.svg" alt="" />
        ZERONE
      </a>
      ${links
        .map(
          ([href, label]) =>
            `<a class="nav-link ${active === label ? "is-active" : ""}" href="${href}">${label}</a>`
        )
        .join("")}
      <a class="nav-cta" href="contact.html">Start a conversation</a>
    </nav>
  `;
}

function footer() {
  return `
    <footer class="footer">
      <div>Zerone · Healthcare Brand & Patient Experience Consultancy · Ho Chi Minh City</div>
      <div>
        <a href="work.html">Work</a>
        <a href="about.html">About</a>
        <a href="contact.html">Contact</a>
        <a href="privacy.html">Privacy</a>
      </div>
    </footer>
  `;
}

function mountChrome(active) {
  const top = document.getElementById("chrome-top");
  const bottom = document.getElementById("chrome-bottom");
  if (top) top.innerHTML = nav(active);
  if (bottom) bottom.innerHTML = footer();
}

function bindForms() {
  document.querySelectorAll("form[data-signup]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = form.getAttribute("data-signup");
      const notice = document.querySelector(`[data-notice="${id}"]`);
      if (notice) notice.style.display = "block";
      form.reset();
    });
  });
}

function reveal() {
  const els = document.querySelectorAll(
    ".ova article, .card, .step, .cap, .note, .quote-card, .display, .stat"
  );
  els.forEach((el) => el.classList.add("reveal"));
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.12 }
  );
  els.forEach((el) => io.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
  mountChrome(document.body.dataset.page || "");
  bindForms();
  reveal();
});
