function nav() {
  return `
    <div class="topbar">
      <div class="nav-pill">
        <a class="brand" href="index.html" aria-label="Zerone home">zerone</a>
        <button class="menu-btn" type="button" data-menu>Menu</button>
      </div>
      <a class="btn" href="contact.html">Talk to Zerone</a>
    </div>
    <div class="overlay" id="menu">
      <div class="overlay-top">
        <a class="brand" href="index.html">zerone</a>
        <button class="menu-btn" type="button" data-menu>Close</button>
      </div>
      <a href="about.html">About</a>
      <a href="refer.html">Refer</a>
      <a href="faq.html">FAQ</a>
      <a href="join.html">Join us</a>
      <a href="contact.html">Talk to Zerone</a>
    </div>
  `;
}

function footer() {
  return `
    <footer class="footer">
      <div>
        <a href="terms.html">Terms</a>
        <a href="privacy.html">Privacy Policy</a>
      </div>
      <div>
        <a href="about.html">About</a>
        <a href="refer.html">Refer</a>
        <a href="faq.html">FAQ</a>
      </div>
      <div>
        <a href="join.html">Join us</a>
        <a href="contact.html">Talk to Zerone</a>
      </div>
    </footer>
  `;
}

const faqs = [
  [
    "What is Zerone, and how do they help?",
    "Zerone is a healthcare brand and patient experience consultancy. We help doctors, founders and clinic owners turn what they want to be known for into what patients can actually see, feel and trust — across brand, space, service, content and digital.",
  ],
  [
    "Who is this for?",
    "Doctors building a professional name. Founders opening a first clinic. Owners whose clinic looks like everyone else’s, or whose patients know the doctor but not the business.",
  ],
  [
    "Do I need to change my clinical work?",
    "No. Clinical expertise already earns trust in the doctor. Zerone works on the layer around it: a clear position, a recognisable brand, and a consistent patient experience.",
  ],
  [
    "How do you work?",
    "Diagnose the business and the problem. Define positioning and priorities. Create the brand and experience system. Deliver with a specialist team Zerone leads for that project.",
  ],
  [
    "How long does a typical engagement take?",
    "Scope is tailored. A professional identity engagement is shorter than a full clinic launch or a multi-touchpoint transformation. We set the path after the first conversation.",
  ],
  [
    "Where are you based?",
    "Ho Chi Minh City, Vietnam. Work is founder-led by Thao Nguyen Tran, with specialist teams contracted per project.",
  ],
];

function mountChrome() {
  const top = document.getElementById("chrome-top");
  const bottom = document.getElementById("chrome-bottom");
  if (top) top.innerHTML = nav();
  if (bottom) bottom.innerHTML = footer();
  document.querySelectorAll("[data-menu]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.getElementById("menu")?.classList.toggle("open");
    });
  });
}

function renderFaq() {
  const el = document.getElementById("faq-list");
  if (!el) return;
  el.innerHTML = faqs
    .map(
      ([q, a]) => `
      <div class="faq-item">
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

document.addEventListener("DOMContentLoaded", () => {
  mountChrome();
  renderFaq();
  bindForms();
});
