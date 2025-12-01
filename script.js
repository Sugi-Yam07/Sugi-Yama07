/* ------------------ TEMA ESCURO / CLARO c/ ÍCONE + PERSISTÊNCIA ------------------ */
const themeToggleBtn = document.getElementById("themeToggle");
const THEME_KEY = "preferredTheme"; // 'light' or 'dark'

// Função para aplicar tema (true => light, false => dark)
function applyTheme(isLight) {
    if (isLight) {
        document.body.classList.add("light");
        themeToggleBtn.textContent = "☀️";
        themeToggleBtn.title = "Tema claro (clique para alternar)";
        themeToggleBtn.setAttribute("aria-pressed", "true");
    } else {
        document.body.classList.remove("light");
        themeToggleBtn.textContent = "🌙";
        themeToggleBtn.title = "Tema escuro (clique para alternar)";
        themeToggleBtn.setAttribute("aria-pressed", "false");
    }
}

// Determinar preferência inicial:
// 1) localStorage
// 2) preferência do sistema (prefers-color-scheme)
// 3) fallback: modo escuro
function getInitialThemeIsLight() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "light") return true;
    if (stored === "dark") return false;

    // fallback para preferência do sistema
    const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    if (prefersLight) return true;

    return false; // padrão: dark
}

// Inicializa tema ao carregar
document.addEventListener("DOMContentLoaded", () => {
    const initialIsLight = getInitialThemeIsLight();
    applyTheme(initialIsLight);

    // Caso a preferência do sistema mude enquanto o usuário está vendo a página,
    // só aplicamos automaticamente se o usuário não tiver uma preferência salva.
    if (!localStorage.getItem(THEME_KEY) && window.matchMedia) {
        const mq = window.matchMedia("(prefers-color-scheme: light)");
        mq.addEventListener?.("change", (e) => {
            // só altera automaticamente se não houver preferência salva
            if (!localStorage.getItem(THEME_KEY)) applyTheme(e.matches);
        });
    }
});

// Toggle com persistência
themeToggleBtn.addEventListener("click", () => {
    const isLightNow = document.body.classList.contains("light");
    const newIsLight = !isLightNow;
    applyTheme(newIsLight);
    localStorage.setItem(THEME_KEY, newIsLight ? "light" : "dark");
});


/* ------------------ TROCA DE IDIOMA ------------------ */
const translations = {
    pt: {
        logo: "Seu Nome",
        menuSobre: "Sobre",
        menuSkills: "Skills",
        menuProjetos: "Projetos",
        menuContato: "Contato",
        heroTitle: "Olá! Eu sou <span>Seu Nome</span>",
        heroSubtitle: "Desenvolvedor • Cientista de Dados • Criador de Projetos",
        heroBtn: "Ver Projetos",
        sobreTitulo: "Sobre Mim",
        sobreTexto:
            "Sou estudante de Ciência de Dados no CEDUP e atuo na criação de dashboards, websites, modelos de machine learning e análises de dados.",
        skillsTitulo: "Habilidades",
        skillsHard: "Hard Skills",
        skillsSoft: "Soft Skills",
        projetosTitulo: "Projetos",
        proj1: "Modelo ARIMA e LSTM para previsão de preços futuros.",
        proj2: "EDA e regressão linear para prever despesas médicas.",
        proj3: "Classificação de textos usando Naive Bayes.",
        proj4: "Dashboard com API Open-Meteo.",
        projVer: "Ver Projeto",
        contatoTitulo: "Contato",
        linkedin: "LinkedIn:",
        telefone: "Telefone:"
    },

    en: {
        logo: "Your Name",
        menuSobre: "About",
        menuSkills: "Skills",
        menuProjetos: "Projects",
        menuContato: "Contact",
        heroTitle: "Hello! I am <span>Your Name</span>",
        heroSubtitle: "Developer • Data Scientist • Project Creator",
        heroBtn: "View Projects",
        sobreTitulo: "About Me",
        sobreTexto:
            "I am a Data Science student working with dashboards, websites, machine learning models and data analysis.",
        skillsTitulo: "Skills",
        skillsHard: "Hard Skills",
        skillsSoft: "Soft Skills",
        projetosTitulo: "Projects",
        proj1: "ARIMA and LSTM models for price forecasting.",
        proj2: "EDA and linear regression to predict medical expenses.",
        proj3: "Text classification using Naive Bayes.",
        proj4: "Dashboard using Open-Meteo API.",
        projVer: "View Project",
        contatoTitulo: "Contact",
        linkedin: "LinkedIn:",
        telefone: "Phone:"
    }
};

document.getElementById("languageSwitch").addEventListener("change", function () {
    const lang = this.value;
    document.querySelectorAll("[data-lang]").forEach(el => {
        const key = el.getAttribute("data-lang");
        // Proteção caso não exista a chave no objeto de tradução
        if (translations[lang] && translations[lang][key] !== undefined) {
            el.innerHTML = translations[lang][key];
        }
    });
});


/* ------------------ ROLAGEM SUAVE ------------------ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        const section = document.querySelector(link.getAttribute("href"));
        if (section) section.scrollIntoView({ behavior: "smooth" });
    });
});
