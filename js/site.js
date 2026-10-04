const tickerItems = [
  "Confirmed 42 appointments",
  "Posted $12,430 in payments",
  "Booked 8 hygiene recalls",
  "Rescheduled 3 appointments",
  "Called Cigna for claim status",
  "Completed Humana enrollment",
  "Closed the books for March",
];

const faqs = [
  [
    "What can Zerone help me with?",
    "Zerone takes on the admin that keeps a practice moving: enrollments, posting, reconciliation, appeals, reporting, and follow-up.",
  ],
  [
    "How do I get started?",
    "Book a demo. We'll look at how your office runs today, then show where Zerone can take work off your plate.",
  ],
  [
    "Do I need to change my existing systems?",
    "No. Zerone is built to sit alongside the way your practice already runs. On the first call we confirm your setup and what we can automate.",
  ],
  [
    "What does my team still handle?",
    "Your team stays in control. Zerone does the repetitive admin and flags exceptions when something needs a person.",
  ],
  [
    "How long does onboarding take?",
    "If you already receive electronic payments, most offices are live in one to two weeks. If you still get paper checks, full auto-posting can take up to about eight weeks.",
  ],
  [
    "What does Zerone cost?",
    "Zerone is paid when it does work for your office. Once we understand your volume and workflows, we'll show you pricing.",
  ],
  [
    "Is Zerone secure?",
    "Yes. Zerone is built for healthcare practices, signs HIPAA business associate agreements, and follows standard healthcare data-handling expectations. We share security details on the demo.",
  ],
];

function nav(active) {
  const links = [
    ["stories.html", "Stories"],
    ["company.html", "Company"],
    ["login.html", "Login"],
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
            `<a class="nav-link ${label === "Login" ? "nav-login" : ""} ${active === label ? "is-active" : ""}" href="${href}">${label}</a>`
        )
        .join("")}
      <a class="nav-demo" href="demo.html">Demo</a>
    </nav>
  `;
}

function footer() {
  return `
    <footer class="footer">
      <div>
        <h3>AI that runs the doctor's office</h3>
        <a class="btn-lime" href="demo.html">Get started</a>
      </div>
      <div class="footer-cols">
        <div>
          <b>Company</b>
          <a href="demo.html">Get started</a>
          <a href="mailto:hello@zerone.example">Call us</a>
          <a href="company.html">Careers</a>
        </div>
        <div>
          <b>Socials</b>
          <a href="#">Instagram</a>
          <a href="#">X</a>
          <a href="#">LinkedIn</a>
        </div>
        <div>
          <b>Legal</b>
          <a href="privacy.html">Privacy Policy</a>
          <a href="terms.html">Terms of Service</a>
        </div>
      </div>
      <div class="footer-photo" role="img" aria-label="Yellow wildflowers"></div>
      <p class="legal">© ${new Date().getFullYear()} Zerone. All rights reserved. Made for GitHub Pages.</p>
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
