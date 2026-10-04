const tickerItems = [
  "Research",
  "Positioning",
  "Proposition",
  "Brand narrative",
  "Clinic identity",
  "Patient journey",
  "Service principles",
  "Touchpoints",
  "Specialist team leadership",
  "Quality review",
];

const faqs = [
  [
    "Who does Zerone work with?",
    "Doctors building a name, founders opening a new clinic, and business owners whose existing clinic needs a stronger brand and patient experience.",
  ],
  [
    "Why does brand matter for a clinic?",
    "Patients can choose from many qualified doctors and clinics. Clinical expertise earns trust in the doctor. A clear position, a recognisable brand and a consistent experience build trust beyond the individual.",
  ],
  [
    "How does an engagement work?",
    "Four steps: diagnose the business and the problem, define strategy and priorities, create the brand and experience system, then deliver with a specialist team under one accountable lead.",
  ],
  [
    "Do you offer training?",
    "Yes. Positioning, communication and reputation workshops for professionals, and patient experience and frontline training for clinic teams. Delivered within projects or standalone.",
  ],
  [
    "What does it cost?",
    "Scope is tailored to each engagement, so pricing is set after we understand your goals. Start a conversation and we'll take it from there.",
  ],
  [
    "Where are you based?",
    "Ho Chi Minh City, Vietnam.",
  ],
];

function nav(active) {
  const links = [
    ["work.html", "Case study"],
    ["about.html", "About"],
  ];
  return `
    <nav class="site-nav" aria-label="Main navigation">
      <a class="brand" href="index.html" aria-label="Zerone home">
        <img src="assets/logo.svg" alt="" />
        Zerone
      </a>
      ${links
        .map(
          ([href, label]) =>
            `<a class="nav-link ${active === label ? "is-active" : ""}" href="${href}">${label}</a>`
        )
        .join("")}
      <a class="nav-demo" href="contact.html">Contact</a>
    </nav>
  `;
}

function footer() {
  return `
    <footer class="footer">
      <div>
        <h3>Healthcare brand &amp; patient experience</h3>
        <a class="btn-lime" href="contact.html">Start a conversation</a>
      </div>
      <div class="footer-cols">
        <div>
          <b>Zerone</b>
          <a href="about.html">About</a>
          <a href="work.html">Case study</a>
          <a href="contact.html">Contact</a>
        </div>
        <div>
          <b>Based in</b>
          <a href="contact.html">Ho Chi Minh City, Vietnam</a>
        </div>
        <div>
          <b>Legal</b>
          <a href="privacy.html">Privacy Policy</a>
          <a href="terms.html">Terms of Service</a>
        </div>
      </div>
      <div class="footer-photo" role="img" aria-label="Yellow wildflowers"></div>
      <p class="legal">© ${new Date().getFullYear()} Zerone. Healthcare Brand &amp; Patient Experience Consultancy.</p>
    </footer>
  `;
}

function signup(id) {
  return `
    <form class="signup" data-signup="${id}">
      <input type="email" name="email" placeholder="Your email" required aria-label="Your email" />
      <button type="submit">Get started</button>
    </form>
    <p class="notice" data-notice="${id}">Thanks. We'll be in touch.</p>
  `;
}

function mountChrome(active) {
  const top = document.getElementById("chrome-top");
  const bottom = document.getElementById("chrome-bottom");
  if (top) top.innerHTML = nav(active);
  if (bottom) bottom.innerHTML = footer();
}

function bindSignups() {
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

function renderTicker() {
  const el = document.getElementById("ticker-track");
  if (!el) return;
  const items = [...tickerItems, ...tickerItems]
    .map((t) => `<span>${t}</span>`)
    .join("");
  el.innerHTML = items;
}

function renderFaq() {
  const el = document.getElementById("faq-list");
  if (!el) return;
  el.innerHTML = faqs
    .map(
      ([q, a], i) => `
      <div class="faq-item" data-faq="${i}">
        <button type="button" aria-expanded="false">${q}<span>+</span></button>
        <p>${a}</p>
      </div>`
    )
    .join("");
  el.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const item = btn.parentElement;
    const open = item.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(open));
    btn.querySelector("span").textContent = open ? "–" : "+";
  });
}

function testimonials() {
  const slides = [...document.querySelectorAll(".testimonial")];
  if (!slides.length) return;
  let i = 0;
  const show = (n) => {
    slides.forEach((s, idx) => s.classList.toggle("is-on", idx === n));
  };
  show(0);
  setInterval(() => { i = (i + 1) % slides.length; show(i); }, 6000);
  document.querySelector("[data-next]")?.addEventListener("click", () => {
    i = (i + 1) % slides.length;
    show(i);
  });
  document.querySelector("[data-prev]")?.addEventListener("click", () => {
    i = (i - 1 + slides.length) % slides.length;
    show(i);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  mountChrome(document.body.dataset.page || "");
  document.querySelectorAll("[data-mount-signup]").forEach((el) => {
    el.innerHTML = signup(el.getAttribute("data-mount-signup"));
  });
  bindSignups();
  renderTicker();
  renderFaq();
  testimonials();
  reveal();
});

function reveal() {
  const els = document.querySelectorAll(".feature, .work-card, .stat-block, .tile, .ui-card, .faq-item, .display, .cta-band h2, .story-card");
  els.forEach((el) => el.classList.add("reveal"));
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
    { threshold: 0.15 }
  );
  els.forEach((el) => io.observe(el));
}
