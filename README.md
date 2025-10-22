# 🌸 AromArte - Catálogo de Perfumes

Catálogo digital interactivo de perfumes para Dama, Caballero y Ambientales.

## 🎯 Características

- **Catálogo Completo**: Más de 150 perfumes organizados por categoría
- **Búsqueda Inteligente**: Busca por nombre de perfume, diseñador o categoría
- **Filtros por Categoría**: 
  - 👗 Dama
  - 🕴️ Caballero
  - 🌿 Ambiental
- **Diseño Responsive**: Funciona perfectamente en móviles, tablets y desktop
- **Imágenes Duales**: Muestra tanto el envase como las notas de cada perfume
- **Interfaz Moderna**: Diseño elegante con animaciones suaves

## 🚀 Tecnologías Utilizadas

- HTML5
- CSS3 (con variables CSS y Grid Layout)
- JavaScript Vanilla (ES6+)
- CSV para datos

## 📁 Estructura del Proyecto

```
aromartecatalogo/
├── index.html          # Página principal
├── styles.css          # Estilos del catálogo
├── scripts.js          # Lógica de filtros y búsqueda
├── README.md           # Este archivo
└── img/                # Carpeta de imágenes
    ├── Datos.csv       # Base de datos de perfumes
    ├── d-*.png         # Imágenes de perfumes de Dama
    ├── c-*.png         # Imágenes de perfumes de Caballero
    └── a-*.png         # Imágenes de perfumes Ambientales
```

## 🎨 Formato del CSV

El archivo `img/Datos.csv` tiene la siguiente estructura:

```csv
DC,Nombre,Notas,Envase,Diseñador,Perfume
Dama,212AREA D-1,d-212-n.png,d-212-p.png,Carolina Herrera,212 Woman
```

**Columnas:**
- `DC`: Categoría (Dama, Caballero, Ambiental)
- `Nombre`: Nombre interno (no se muestra)
- `Notas`: Nombre del archivo de imagen de las notas
- `Envase`: Nombre del archivo de imagen del envase
- `Diseñador`: Marca o diseñador del perfume
- `Perfume`: Nombre comercial del perfume

## 💻 Uso Local

1. Clona el repositorio
2. Abre `index.html` en tu navegador
3. ¡Explora el catálogo!

**Nota**: Para funcionar correctamente, necesitas un servidor local debido a las restricciones CORS al cargar el CSV. Puedes usar:

```bash
# Python 3
python -m http.server 8000

# Node.js (con http-server)
npx http-server

# VS Code con Live Server extension
```

Luego abre `http://localhost:8000` en tu navegador.

## 🌐 Deploy en GitHub Pages

Este sitio está hosteado en GitHub Pages y es accesible públicamente.

**URL**: `https://eduardoramirez94.github.io/aromartecatalogo/`

## 🔧 Personalización

### Agregar Nuevos Perfumes

1. Agrega las imágenes a la carpeta `img/`
2. Edita el archivo `img/Datos.csv`
3. Agrega una nueva línea con el formato correcto
4. Guarda y recarga la página

### Cambiar Colores

Edita las variables CSS en `styles.css`:

```css
:root {
    --primary-color: #d946ef;      /* Color principal */
    --secondary-color: #a855f7;    /* Color secundario */
    --accent-color: #ec4899;       /* Color de acento */
}
```

## 📱 Compatibilidad

- ✅ Chrome/Edge (últimas versiones)
- ✅ Firefox (últimas versiones)
- ✅ Safari (últimas versiones)
- ✅ Dispositivos móviles iOS y Android

## 📄 Licencia

Este proyecto es de uso privado para AromArte. Todos los derechos de las marcas y diseñadores pertenecen a sus respectivos propietarios.

## 👤 Autor

**AromArte**
- GitHub: [@eduardoramirez94](https://github.com/eduardoramirez94)
- Repositorio: [aromartecatalogo](https://github.com/eduardoramirez94/aromartecatalogo)

---

💜 Hecho con amor por AromArte | © 2025
