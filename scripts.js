// ========================================
// VARIABLES GLOBALES
// ========================================
let allPerfumes = [];
let filteredPerfumes = [];
let currentFilter = 'todos';

// ========================================
// INICIALIZACIÓN
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    loadPerfumes();
    setupEventListeners();
});

// ========================================
// CARGAR Y PARSEAR CSV
// ========================================
async function loadPerfumes() {
    try {
        showLoading(true);
        // Agregar versión para evitar caché
        const version = '1.0.3';
        const response = await fetch(`img/Datos.csv?v=${version}`);
        const csvText = await response.text();
        allPerfumes = parseCSV(csvText);
        filteredPerfumes = [...allPerfumes];
        updateCounts();
        renderPerfumes(filteredPerfumes);
        showLoading(false);
    } catch (error) {
        console.error('Error cargando perfumes:', error);
        showLoading(false);
        showError();
    }
}

function parseCSV(text) {
    const lines = text.trim().split('\n');
    const headers = lines[0].split(',');
    const perfumes = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (!line.trim()) continue;

        // Parsear CSV respetando comillas
        const values = parseCSVLine(line);
        
        if (values.length >= 6) {
            perfumes.push({
                categoria: values[0].trim(),
                nombre: values[1].trim(),
                notas: values[2].trim(),
                envase: values[3].trim(),
                diseñador: values[4].trim(),
                perfume: values[5].trim()
            });
        }
    }

    // Ordenar primero por categoria (Dama, Caballero, Ambiental, Presentacion), luego por perfume (alfabético)
    const categoriaOrden = { Dama: 0, Caballero: 1, Ambiental: 2, Presentacion: 3 };
    perfumes.sort((a, b) => {
        const catA = categoriaOrden[a.categoria] ?? 99;
        const catB = categoriaOrden[b.categoria] ?? 99;
        if (catA !== catB) return catA - catB;
        return a.perfume.localeCompare(b.perfume, 'es', { sensitivity: 'base' });
    });

    return perfumes;
}

function parseCSVLine(line) {
    const values = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            values.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    
    values.push(current);
    return values;
}

// ========================================
// RENDERIZAR PERFUMES
// ========================================
function renderPerfumes(perfumes) {
    const grid = document.getElementById('productsGrid');
    const noResults = document.getElementById('noResults');
    const resultsCount = document.getElementById('resultsCount');

    resultsCount.textContent = perfumes.length;

    if (perfumes.length === 0) {
        grid.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';
    
    grid.innerHTML = perfumes.map((perfume, idx) => createPerfumeCard(perfume, idx)).join('');

    // Solo en PC: agregar eventos para abrir modal
    if (window.innerWidth > 900) {
        document.querySelectorAll('.product-card').forEach((card, idx) => {
            card.addEventListener('click', () => openPerfumeModal(filteredPerfumes[idx]));
        });
    }
}

function createPerfumeCard(perfume, idx) {
    const categoryClass = perfume.categoria.toLowerCase();
    const categoryIcon = getCategoryIcon(perfume.categoria);
    
    const categoriaTitle = perfume.categoria === 'Presentacion' ? 'Presentación' : perfume.categoria;
    return `
        <div class="product-card" data-category="${perfume.categoria}" data-idx="${idx}">
            <div class="product-category ${categoryClass}">
                ${categoryIcon} ${categoriaTitle}
            </div>
            <div class="product-images">
                <img src="img/${perfume.envase}" 
                     alt="${perfume.perfume}" 
                     class="product-image"
                     onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22/%3E%3Crect fill=%22%23f0f0f0%22 width=%22100%22 height=%22100%22/%3E%3Ctext fill=%22%23999%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3EEnvase%3C/text%3E%3C/svg%3E'">    
                <img src="img/${perfume.notas}" 
                     alt="${perfume.perfume} - Notas" 
                     class="product-image-notas"
                     onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22100%22 height=%22100%22/%3E%3Ctext fill=%22%23999%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3ENotas%3C/text%3E%3C/svg%3E'">
            </div>
            <div class="product-info">
                <h3 class="product-name">${perfume.perfume}</h3>
                <p class="product-designer">${perfume.diseñador}</p>
                <span class="product-label">${perfume.categoria}</span>
            </div>
        </div>
    `;
}

// =============================
// MODAL PERFUME (solo PC)
// =============================
function openPerfumeModal(perfume) {
    const modal = document.getElementById('perfumeModal');
    const content = document.getElementById('modalPerfumeContent');
    if (!modal || !content) return;

    // Construir el contenido del modal
    content.innerHTML = `
        <div style="text-align:center;">
            <div style="margin-bottom:1rem;">
                <img src="img/${perfume.envase}" alt="${perfume.perfume}" style="max-width:160px;max-height:160px;object-fit:contain;">
            </div>
            <div style="margin-bottom:1rem;">
                <img src="img/${perfume.notas}" alt="${perfume.notas}" style="max-width:160px;max-height:160px;object-fit:contain;">
            </div>
            <h2 class="product-name">${perfume.perfume}</h2>
            <div class="product-designer">${perfume.diseñador}</div>
            <div style="margin-bottom:0.5rem;"><span class="product-label">${perfume.categoria}</span></div>
            
        </div>
    `;
    modal.classList.add('show');
    modal.style.display = 'flex';

    // Cerrar modal al hacer click en la X
    document.getElementById('modalCloseBtn').onclick = closePerfumeModal;
    // Cerrar modal al hacer click fuera del contenido
    modal.onclick = function(e) {
        if (e.target === modal) closePerfumeModal();
    };
    // Cerrar con ESC
    document.onkeydown = function(e) {
        if (e.key === 'Escape') closePerfumeModal();
    };
}

function closePerfumeModal() {
    const modal = document.getElementById('perfumeModal');
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
    }
    document.onkeydown = null;
}

function getCategoryIcon(category) {
    const icons = {
        'Dama': '👗',
        'Caballero': '🎩',
        'Ambiental': '🌿',
        'Presentacion': '✨'
    };
    return icons[category] || '✨';
}

// ========================================
// FILTROS Y BÚSQUEDA
// ========================================
function setupEventListeners() {
    // Filtros por categoría
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            currentFilter = filter;
            applyFilters();
        });
    });

    // Búsqueda
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', debounce(() => {
        // Cambiar el filtro a "todos" cuando se escribe en el buscador
        if (searchInput.value.trim() !== '') {
            currentFilter = 'todos';
            const filterButtons = document.querySelectorAll('.filter-btn');
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-filter') === 'todos') {
                    btn.classList.add('active');
                }
            });
        }
        applyFilters();
    }, 300));
}

function applyFilters() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    filteredPerfumes = allPerfumes.filter(perfume => {
        // Filtro por categoría
        const matchesCategory = currentFilter === 'todos' || 
                               perfume.categoria === currentFilter;
        
        // Filtro por búsqueda
        const matchesSearch = searchTerm === '' ||
                             perfume.perfume.toLowerCase().includes(searchTerm) ||
                             perfume.diseñador.toLowerCase().includes(searchTerm) ||
                             perfume.categoria.toLowerCase().includes(searchTerm);
        
        return matchesCategory && matchesSearch;
    });

    renderPerfumes(filteredPerfumes);
}

function updateCounts() {
    const counts = {
        todos: allPerfumes.length,
        Dama: allPerfumes.filter(p => p.categoria === 'Dama').length,
        Caballero: allPerfumes.filter(p => p.categoria === 'Caballero').length,
        Ambiental: allPerfumes.filter(p => p.categoria === 'Ambiental').length,
        Presentacion: allPerfumes.filter(p => p.categoria === 'Presentacion').length
    };

    document.getElementById('count-todos').textContent = counts.todos;
    document.getElementById('count-dama').textContent = counts.Dama;
    document.getElementById('count-caballero').textContent = counts.Caballero;
    document.getElementById('count-ambiental').textContent = counts.Ambiental;
    document.getElementById('count-presentacion').textContent = counts.Presentacion;
}

// ========================================
// UTILIDADES
// ========================================
function showLoading(show) {
    const spinner = document.getElementById('loadingSpinner');
    const grid = document.getElementById('productsGrid');
    
    if (show) {
        spinner.style.display = 'block';
        grid.style.display = 'none';
    } else {
        spinner.style.display = 'none';
        grid.style.display = 'grid';
    }
}

function showError() {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = `
        <div class="no-results-content" style="grid-column: 1/-1;">
            <span class="no-results-icon">⚠️</span>
            <h3>Error al cargar los perfumes</h3>
            <p>Por favor, verifica que el archivo Datos.csv esté en la carpeta img/</p>
        </div>
    `;
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========================================
// ANIMACIONES
// ========================================
// Agregar animación suave al hacer scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
    } else {
        header.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
    }
});