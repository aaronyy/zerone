function nav() {
  return `
    <div class="topbar">
      <a class="brand" href="index.html" aria-label="Zerone home">
        <img src="assets/logo.svg" alt="" />
        ZERONE
      </a>
      <a class="btn nav-talk" href="contact.html">Talk to Zerone</a>
    </div>
  `;
}

function footer() {
  return `
    <footer class="footer">
      <div>
        <div class="row">
          <a href="terms.html">Terms</a>
          <a href="privacy.html">Privacy Policy</a>
        </div>
        <a href="index.html" class="brand" style="margin-top:18px"><img src="assets/logo.svg" alt="" /> ZERONE</a>
      </div>
      <div>
        <a href="about.html">About</a>
        <a href="refer.html">Refer</a>
        <a href="faq.html">FAQ</a>
      </div>
      <div>
        <a href="join.html">Join us</a>
        <a href="contact.html">Talk to Zerone</a>
        <p style="color:#5b6470;margin-top:1rem">Healthcare Brand & Patient Experience Consultancy<br>Ho Chi Minh City</p>
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

function reveal() {
  const els = document.querySelectorAll(".person, .step, .quote, .chapter, .big-quote, .faq-item");
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
  mountChrome();
  renderFaq();
  bindForms();
  reveal();
});
