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
        logo: "Portifólio Profissional",
        menuSobre: "Sobre",
        menuSkills: "Skills",
        menuProjetos: "Projetos",
        menuContato: "Contato",
        heroTitle: "Olá! Eu sou <span>Erick Sugiyama</span>",
        heroSubtitle: "Desenvolvedor • Cientista de Dados • Criador de Projetos",
        heroBtn: "Ver Projetos",
        sobreTitulo: "Sobre Mim",
        sobreTexto:
            "Sou técnico em Ciência de Dados, formado no CEDUP, com um curso de 2 anos de duração. Atuo na criação de dashboards, websites, modelos de machine learning, aplicativos e análises de dados. Já desenvolvi diversos projetos fictícios e reais acerca do assunto. Possuo alto domínio do uso de inteligências artíficiais, sabendo como utilizar de forma rápida e otimizada os prompts mais adequados.",
        skillsTitulo: "Habilidades",
        skillsHard: "Hard Skills",
        skillsSoft: "Soft Skills",
        projetosTitulo: "Projetos",
        proj1: "Projeto de Análise Exploratória de Dados (AED)",
        desc1: "Análise fictícia de Categorias de Produtos em uma Loja de Comércio Eletrônico Objetivo.",
        proj2: "Gerenciado de Lean Tasks",
        desc2: "Site para identificar e eliminar desperdícios na gestão de tarefas.",
        proj3: "Projeto sobre Piezoeletricidade",
        desc3: "Site para apresentação de projeto.",
        proj4: "Projeto de análise de dados e visualização - Tendências do uso de Tecnologias",
        desc4: "Exploração fictícia da tendência de popularidade das linguagens de programação.",
        projVer: "Ver Projeto",
        contatoTitulo: "Contato",
        linkedin: "LinkedIn:",
        telefone: "Telefone:"
    },

    en: {
        logo: "Professional Portfolio",
        menuSobre: "About",
        menuSkills: "Skills",
        menuProjetos: "Projects",
        menuContato: "Contact",
        heroTitle: "Hello! I am <span>Erick Sugiayama</span>",
        heroSubtitle: "Developer • Data Scientist • Project Creator",
        heroBtn: "View Projects",
        sobreTitulo: "About Me",
        sobreTexto:
            "I am a Data Science Technician, graduated from CEDUP, with a 2-year course. I work in the creation of dashboards, websites, machine learning models, applications and data analysis. I have developed several fictional and real projects on the subject. I have a high level of expertise in the use of artificial intelligence, knowing how to quickly and efficiently use the most appropriate prompts.",
        skillsTitulo: "Skills",
        skillsHard: "Hard Skills",
        skillsSoft: "Soft Skills",
        projetosTitulo: "Projects",
        proj1: "Exploratory Data Analysis (EDA)",
        desc1: "Project Fictitious Analysis of Product Categories in an E-commerce Store.",
        proj2: "Lean Tasks Management",
        desc2: "Website to identify and eliminate waste in task management.",
        proj3: "Piezoelectricity Project",
        desc3: "Website for project presentation.",
        proj4: "Data Analysis and Visualization Project - Technology Usage Trends",
        desc4: "Fictitious exploration of the popularity trend of programming languages.",
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

/* ------------------ SCROLL REVEAL AVANÇADO ------------------ */
function revealOnScroll() {
    const reveals = document.querySelectorAll(".reveal");

    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const revealPoint = 120;

        if (elementTop < windowHeight - revealPoint) {
            el.classList.add("visible");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
