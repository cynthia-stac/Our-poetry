// Dark Mode Toggle Function
function toggleDarkMode() {
  const body = document.body;
  const header = document.querySelector('header');
  const footer = document.querySelector('footer');
  const darkModeButton = document.getElementById("dark-mode-toggle");

  body.classList.toggle("dark-mode");
  header.classList.toggle("dark-mode");
  footer.classList.toggle("dark-mode");

  darkModeButton.textContent = body.classList.contains("dark-mode")
    ? "Light Mode"
    : "Dark Mode";
}

// Language Data
const poems = {
  en: [
    '"The sun kisses the sky, a fiery goodbye."',
    '"In the quiet of the night, dreams learn to fly."',
    '"Raindrops tap songs on the window of my soul."'
  ],
  es: [
    '"El sol besa el cielo, un adiós fogoso."',
    '"En la quietud de la noche, los sueños aprenden a volar."',
    '"Las gotas de lluvia tocan canciones en la ventana de mi alma."'
  ],
  fr: [
    '"Le soleil embrasse le ciel, un adieu enflammé."',
    '"Dans le calme de la nuit, les rêves apprennent à voler."',
    '"Les gouttes de pluie tapotent des chansons sur la fenêtre de mon âme."'
  ]
};

const translations = {
  en: {
    siteTitle: "Our Poetry",
    siteDescription: "Welcome to Our Poetry, a place to share and read beautiful poems.",
    videoTitle: "Watch This Poem Video",
    submitTitle: "Submit Your Poem",
    submitButton: "Add Poem",
    languageButton: "Switch Language",
    copyright: "© 2025 Our Poetry. All Rights Reserved.",
    inputPlaceholder: "Write your poem here..."
  },
  es: {
    siteTitle: "Nuestra Poesía",
    siteDescription: "Bienvenido a Nuestra Poesía, un lugar para compartir y leer hermosos poemas.",
    videoTitle: "Mira Este Video de Poema",
    submitTitle: "Envía Tu Poema",
    submitButton: "Agregar Poema",
    languageButton: "Cambiar Idioma",
    copyright: "© 2025 Nuestra Poesía. Todos los derechos reservados.",
    inputPlaceholder: "Escribe tu poema aquí..."
  },
  fr: {
    siteTitle: "Notre Poésie",
    siteDescription: "Bienvenue à Notre Poésie, un lieu pour partager et lire de beaux poèmes.",
    videoTitle: "Regarde Cette Vidéo de Poème",
    submitTitle: "Soumets Ton Poème",
    submitButton: "Ajouter un Poème",
    languageButton: "Changer de Langue",
    copyright: "© 2025 Notre Poésie. Tous droits réservés.",
    inputPlaceholder: "Écris ton poème ici..."
  }
};

const languages = ["en", "es", "fr"];
let currentLanguageIndex = 0;

// Language Switch Function
function toggleLanguage() {
  currentLanguageIndex = (currentLanguageIndex + 1) % languages.length;
  const currentLanguage = languages[currentLanguageIndex];

  // Update poems
  document.getElementById("poem1").textContent = poems[currentLanguage][0];
  document.getElementById("poem2").textContent = poems[currentLanguage][1];
  document.getElementById("poem3").textContent = poems[currentLanguage][2];

  // Update UI labels
  document.getElementById("site-title").textContent = translations[currentLanguage].siteTitle;
  document.getElementById("site-description").textContent = translations[currentLanguage].siteDescription;
  document.getElementById("video-title").textContent = translations[currentLanguage].videoTitle;
  document.getElementById("submit-title").textContent = translations[currentLanguage].submitTitle;
  document.getElementById("submit-button").textContent = translations[currentLanguage].submitButton;
  document.getElementById("language-switcher").textContent = translations[currentLanguage].languageButton;
  document.getElementById("copyright").textContent = translations[currentLanguage].copyright;
  document.getElementById("poem-input").placeholder = translations[currentLanguage].inputPlaceholder;
}

// Add Poem Function
function addPoem() {
  const poemInput = document.getElementById("poem-input");
  const poemText = poemInput.value.trim();
  
  if (poemText) {
    const newPoem = document.createElement("div");
    newPoem.className = "poem";
    
    // Add random image
    const randomImageNum = Math.floor(Math.random() * 3) + 1;
    const poemImage = document.createElement("img");
    poemImage.src = `images/poetry-image${randomImageNum}.jpg`;
    poemImage.alt = "Poetry Image";
    poemImage.className = "poem-image";
    newPoem.appendChild(poemImage);
    
    // Add poem text
    const poemParagraph = document.createElement("p");
    poemParagraph.textContent = `"${poemText}"`;
    newPoem.appendChild(poemParagraph);
    
    // Add to the top of poems container
    document.getElementById("poems").prepend(newPoem);
    
    // Clear input
    poemInput.value = "";
    
    // Show success message
    const successMsg = currentLanguageIndex === 0 ? "Poem added successfully!" : 
                       currentLanguageIndex === 1 ? "¡Poema agregado con éxito!" : 
                       "Poème ajouté avec succès!";
    alert(successMsg);
  } else {
    const errorMsg = currentLanguageIndex === 0 ? "Please write a poem first!" : 
                    currentLanguageIndex === 1 ? "¡Por favor escribe un poema primero!" : 
                    "Veuillez d'abord écrire un poème!";
    alert(errorMsg);
  }
}

// Initialize dark mode button text on load
document.addEventListener('DOMContentLoaded', function() {
  const darkModeButton = document.getElementById("dark-mode-toggle");
  darkModeButton.textContent = document.body.classList.contains("dark-mode") 
    ? "Light Mode" 
    : "Dark Mode";
});