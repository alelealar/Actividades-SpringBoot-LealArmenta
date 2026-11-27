import { store } from '../state/store.js';
import { getCharacters } from '../core/api.js';

/**
 * Objeto Dashboard que maneja toda la lógica de la interfaz de usuario.
 */
export const dashboard = {
    // Referencias a elementos del DOM
    elements: {
        grid: document.getElementById('charactersGrid'),
        favoritesList: document.getElementById('favoritesList'),
        search: document.getElementById('characterSearch'),
        filter: document.getElementById('statusFilter'),
        loader: document.getElementById('loader'),
        noResults: document.getElementById('noResults'),
        prevBtn: document.getElementById('prevPage'),
        nextBtn: document.getElementById('nextPage'),
        pageInfo: document.getElementById('pageInfo')
    },

    /**
     * Inicializa la página cargando los eventos y los datos iniciales.
     */
    async init() {
        // TODO: 1. Configurar los escuchadores de eventos llamando a setupEventListeners()
        this.setupEventListeners(); 
        // TODO: 2. Cargar los personajes iniciales llamando a loadCharacters()
        await this.loadCharacters();
        // TODO: 3. Renderizar los favoritos iniciales (si existen en el local storage) llamando a renderFavorites()
        this.renderFavorites();
    },

    /**
     * Configura los escuchadores de eventos para búsqueda, filtro y paginación.
     */
    setupEventListeners() {
        // TODO: 1. Escuchar el evento 'input' en el input de búsqueda (this.elements.search)
        //          - Se sugiere implementar un 'debounce' (retardo) de 500ms para evitar múltiples peticiones seguidas al API.
        //          - Al escribir, actualizar store.state.filters.name con el texto limpio y reiniciar store.state.currentPage a 1.
        //          - Llamar a loadCharacters() para recargar la grilla.
        let timeout;
        this.elements.search.addEventListener('input', (e) =>{
            clearTimeout(timeout);
            timeout = setTimeout(()=>{
                store.state.filters.name = e.target.value.trim();
                store.state.currentPage = 1;
                //cargar los personajes filtrados
                this.loadCharacters();
            }, 500)
        });

        // TODO: 2. Escuchar el evento 'change' en el select de filtros (this.elements.filter)
        //          - Actualizar store.state.filters.status con el valor del select y reiniciar store.state.currentPage a 1.
        //          - Llamar a loadCharacters() para recargar.

        this.elements.filter.addEventListener('change', (e)=>{
            store.state.filters.status = e.target.value;
            store.state.currentPage = 1;
            this.loadCharacters();
        });
    

        //
        // TODO: 3. Escuchar el evento 'click' en el botón de página anterior (this.elements.prevBtn)
        //          - Si store.state.currentPage es mayor que 1, restarle 1.
        //          - Llamar a loadCharacters() y hacer scroll hacia arriba (window.scrollTo({ top: 0, behavior: 'smooth' })).
        //
        // TODO: 4. Escuchar el evento 'click' en el botón de página siguiente (this.elements.nextBtn)
        //          - Si store.state.currentPage es menor que store.state.totalPages, sumarle 1.
        //          - Llamar a loadCharacters() y hacer scroll hacia arriba.
    },

    /**
     * Solicita los personajes a la API según el estado actual de filtros y página.
     */
    async loadCharacters() {
        // TODO: 1. Mostrar el loader (showLoader(true)) y ocultar el mensaje de no resultados (this.elements.noResults)
        this.showLoader(true);
        this.elements.noResults.classList.add("hidden");
        // TODO: 2. Llamar a la función getCharacters importada, pasándole la página y los filtros actuales del store.
        const data = await getCharacters(store.state.currentPage, store.state.filters);
        // TODO: 3. Si la respuesta contiene un error o no tiene resultados (.results), vaciar store.state.characters, poner totalPages en 0 y mostrar el elemento noResults (quitar la clase 'hidden').
        // TODO: 4. Si la respuesta es exitosa, guardar los resultados en store.state.characters y el número total de páginas en store.state.totalPages.
        if(data.error || !data.results){
            store.state.characters = [];
            store.state.totalPages = 0;
            this.elements.noResults.classList.remove("hidden");
        } else {
            store.state.characters = data.results;
            store.state.totalPages = data.info.pages;
        }
        // TODO: 5. Llamar a renderGrid() para pintar los personajes, updatePagination() para actualizar los controles y ocultar el loader (showLoader(false)).
        this.renderGrid();
        this.showLoader(false);
    },

    /**
     * Dibuja la cuadrícula de personajes en el DOM.
     */
    renderGrid() {
        // TODO: 1. Limpiar las tarjetas de personajes anteriores en la grilla (puedes borrar todos los elementos con clase '.character-card').
        const cards = this.elements.grid.querySelectorAll(".character-card");
        cards.forEach(c => c.remove());
        store.state.characters.forEach(char =>{
            const isFav = store.isFavorite(char.id);
            const card = document.createElement("div");
            card.className = "character-card"
            card.innerHTML = `
                <div class="card-image-wrapper">
                    <img src="${char.image}" alt="${char.name}" loading="lazy">
                </div>
                <div class="card-content">
                    <h3 class="character-name">${char.name}</h3>
                    <div class="status-label status-${char.status.toLowerCase()}">
                        <span class="status-indicator"></span>
                        ${char.status}
                    </div>
                    <button class="fav-btn ${ isFav ? 'active': '' }" data-id="${char.id}">
                        <i data-lucide="star"></i>
                        <span>${ isFav ? 'En Favoritos' : "Añadir a Favoritos"}</span>
                    </button>
                </div>  
            `;

            card.querySelector(".fav-btn").addEventListener("click", (e)=>{
                store.toggleFavorite(char);
                this.renderGrid();
                this.renderFavorites();
            });
            this.elements.grid.appendChild(card);
        });
        lucide.createIcons();
    },

    /**
     * Dibuja la lista de personajes favoritos en la barra lateral.
     */
    renderFavorites() {
        const { favoritesList } = this.elements;
        
        // TODO: 1. Si la lista store.state.favorites está vacía:
        //          - Inyectar el HTML para estado vacío (puedes ver la plantilla de vacíos en index.html o usar un div simple con clase 'empty-favorites').
        //          - Terminar la ejecución de la función.
        if (store.state.favorites.length === 0){
            favoritesList.innerHTML = `
                <div class="empty-favorites">
                    <p>No favorites yet</p>
                </div>
            `
            return
        }
        //
        // TODO: 2. Si hay favoritos, vaciar favoritesList.innerHTML.
        favoritesList.innerHTML = "";

        // TODO: 3. Recorrer cada favorito de store.state.favorites.
        store.state.favorites.forEach(f => {
            // TODO: 4. Crear un elemento div con clase 'fav-item' e inyectarle su estructura HTML (usa recursos/resursos.md como guía).
            const favItem = document.createElement("div");
            favItem.className = "fav-item";
            favItem.innerHTML = `
                <img src="${f.image}" alt="${f.name}">
                <div class="fav-item-info">
                    <p class="fav-item-name">${f.name}</p>
                </div>
                <button class="remove-fav" title="Eliminar de favoritos">
                    <i data-lucide="x"></i>
                </button>
            `;
            // TODO: 5. Agregar un escuchador de eventos click en el botón de eliminar favorito (.remove-fav):
            //          - Aquel que llama a store.toggleFavorite(favorito) para quitarlo.
            //          - Llamar de nuevo a renderFavorites() y renderGrid() para que toda la interfaz se actualice.
            favItem.querySelector(".remove-fav").addEventListener("click",()=>{
                store.toggleFavorite(f)
                this.renderFavorites()
                this.renderGrid()
            });
            // TODO: 6. Añadir el elemento creado a favoritesList.
            favoritesList.appendChild(favItem);
        });
        // TODO: 7. Llamar a lucide.createIcons() para pintar el icono de cierre.
        lucide.createIcons();
        
    },

    /**
     * Actualiza el estado de los botones de paginación y el texto informativo.
     */
    updatePagination() {
        // TODO: 1. Deshabilitar o habilitar this.elements.prevBtn si estamos en la página 1 (store.state.currentPage <= 1).
        this.elements.prevBtn.disabled = store.state.currentPage <= 1;
        // TODO: 2. Deshabilitar o habilitar this.elements.nextBtn si estamos en la página máxima (store.state.currentPage >= store.state.totalPages).
        this.elements.nextBtn.disabled = store.state.currentPage >= store.state.totalPages;
        // TODO: 3. Cambiar el textContent de this.elements.pageInfo para mostrar la página actual y el total (Ej: "Página X de Y").
        this.elements.pageInfo.textContent = store.state.totalPages > 0 
            ? `Página ${store.state.currentPage} de ${store.state.totalPages}` 
            : 'Página 0 de 0';
    },

    /**
     * Muestra u oculta el spinner de carga.
     * 
     * @param {boolean} show - True para mostrar, False para ocultar
     */
    showLoader(show) {
        // TODO: Alternar la clase 'hidden' en el contenedor del loader (this.elements.loader) de acuerdo al parámetro 'show'.
        this.elements.loader.classList.toggle("hidden", !show);
    }
};
