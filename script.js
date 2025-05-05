const defaultPoems = [
  {
    id: 1,
    title: "Sunset",
    author: "Anonymous",
    date: "2025-05-05",
    text: "The sun kisses the sky, a fiery goodbye.",
    img: "images/poetry-image1.jpg",
    likes: 5,
  },
  {
    id: 2,
    title: "Night Whispers",
    author: "Anonymous",
    date: "2025-05-05",
    text: "In the quiet of the night, dreams learn to fly.",
    img: "images/poetry-image2.jpg",
    likes: 10,
  },
  {
    id: 3,
    title: "Rain Melody",
    author: "Anonymous",
    date: "2025-05-05",
    text: "Raindrops tap songs on the window of my soul.",
    img: "images/poetry-image3.jpg",
    likes: 30,
  },
];

const translations = {
  en: {
    siteTitle: "Our Poetry",
    siteDescription:
      "Welcome to Our Poetry, a place to share and read beautiful poems.",
    videoTitle: "Watch This Poem Video",
    submitTitle: "Submit Your Poem",
    submitButton: "Add Poem",
    languageButton: "Switch Language",
    titlePlaceholder: "Title",
    authorPlaceholder: "Author",
    datePlaceholder: "", // native <input type="date"> shows its own hint
    poemPlaceholder: "Write your poem here...",
    darkBtnLight: "Light Mode",
    darkBtnDark: "Dark Mode",
    successAdd: "Poem added successfully!",
    errorEmpty: "Please fill in at least Title & Poem!",
  },

  fr: {
    siteTitle: "Nos Poemes",
    siteDescription:
      "Bienvenue sur Nos Poemes, un espace pour partager et lire de beaux poemes.",
    videoTitle: "Regardez cette video de poeme",
    submitTitle: "Soumettre votre poeme",
    submitButton: "Ajouter le poeme",
    languageButton: "Changer de langue",
    titlePlaceholder: "Titre",
    authorPlaceholder: "Auteur",
    datePlaceholder: "",
    poemPlaceholder: "Ecrivez votre poeme ici...",
    darkBtnLight: "Mode clair",
    darkBtnDark: "Mode sombre",
    successAdd: "Poeme ajoute avec succes !",
    errorEmpty: "Veuillez saisir au moins le titre et le texte du poeme !",
  },
};

const languages = ["en", "fr"];
let currentLang = languages[0];

let poems = JSON.parse(localStorage.getItem("poems") || "null") || [
  ...defaultPoems,
];

const darkBtn = document.getElementById("dark-mode-toggle");

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  document.querySelector("header").classList.toggle("dark-mode");
  document.querySelector("footer").classList.toggle("dark-mode");

  darkBtn.textContent = document.body.classList.contains("dark-mode")
    ? translations[currentLang].darkBtnLight
    : translations[currentLang].darkBtnDark;
}

function applyTranslations() {
  const t = translations[currentLang];
  document.getElementById("site-title").textContent = t.siteTitle;
  document.getElementById("site-description").textContent = t.siteDescription;
  document.getElementById("video-title").textContent = t.videoTitle;
  document.getElementById("submit-title").textContent = t.submitTitle;
  document.getElementById("submit-button").textContent = t.submitButton;
  document.getElementById("language-switcher").textContent = t.languageButton;
  document.getElementById("title-input").placeholder = t.titlePlaceholder;
  document.getElementById("author-input").placeholder = t.authorPlaceholder;
  document.getElementById("poem-input").placeholder = t.poemPlaceholder;

  darkBtn.textContent = document.body.classList.contains("dark-mode")
    ? t.darkBtnLight
    : t.darkBtnDark;
}

function toggleLanguage() {
  const idx = (languages.indexOf(currentLang) + 1) % languages.length;
  currentLang = languages[idx];
  applyTranslations();
}

const poemsDiv = document.getElementById("poems");

function makeCard(p) {
  const card = document.createElement("div");
  card.className = "poem";
  card.dataset.id = p.id;

  const img = document.createElement("img");
  img.src = p.img;
  img.alt = "Poem image";
  img.className = "poem-image";
  card.appendChild(img);

  const title = document.createElement("h3");
  title.textContent = p.title;
  card.appendChild(title);

  const snippet = document.createElement("p");
  snippet.textContent = `"${p.text.slice(0, 60)}${
    p.text.length > 60 ? "..." : ""
  }"`;
  card.appendChild(snippet);

  card.addEventListener("click", () => openModal(p.id));
  return card;
}

function renderPoems() {
  poemsDiv.innerHTML = "";
  poems.forEach((p) => poemsDiv.appendChild(makeCard(p)));
}

function addPoem() {
  const t = translations[currentLang];
  const title = document.getElementById("title-input").value.trim();
  const author =
    document.getElementById("author-input").value.trim() || "Anonymous";
  const date =
    document.getElementById("date-input").value ||
    new Date().toISOString().split("T")[0];
  const text = document.getElementById("poem-input").value.trim();

  if (!title || !text) {
    return alert(t.errorEmpty);
  }

  const id = (poems.at(-1)?.id || 0) + 1;
  const img = `images/poetry-image${Math.floor(Math.random() * 3) + 1}.jpg`;

  poems.unshift({ id, title, author, date, text, img, likes: 0 });

  persist();
  renderPoems();
  document.getElementById("new-poem-form").reset?.();

  alert(t.successAdd);
}
window.addPoem = addPoem;

const modal = document.getElementById("poem-modal");
const mTitle = document.getElementById("modal-title");
const mMeta = document.getElementById("modal-meta");
const mImg = document.getElementById("modal-image");
const mText = document.getElementById("modal-text");
const likeBtn = document.getElementById("like-button");
const likeCount = document.getElementById("like-count");

function openModal(id) {
  const p = poems.find((po) => po.id === +id);
  if (!p) return;

  mTitle.textContent = p.title;
  mMeta.textContent = `By ${p.author} on ${p.date}`;
  mImg.src = p.img;
  mText.textContent = p.text;
  likeCount.textContent = p.likes;

  likeBtn.onclick = () => {
    p.likes += 1;
    likeCount.textContent = p.likes;
    persist();
  };

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

document.getElementById("modal-close").onclick = closeModal;
modal.addEventListener("click", (e) => e.target === modal && closeModal());
document.addEventListener(
  "keydown",
  (e) => e.key === "Escape" && modal.classList.contains("open") && closeModal(),
);

function persist() {
  localStorage.setItem("poems", JSON.stringify(poems));
}

document.addEventListener("DOMContentLoaded", () => {
  applyTranslations();
  renderPoems();
});

