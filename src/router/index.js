// IMPORTAMOS FUNCIONES DE VUE ROUTER
// createRouter: crea el sistema de rutas
// createWebHistory: permite URLs limpias (sin #)
import { createRouter, createWebHistory } from 'vue-router'

// IMPORTAMOS LAS VISTAS (PÁGINAS)
import HomeView from '../views/HomeView.vue'
import ListaLibrosView from '@/views/ListaLibrosView.vue'
import DetalleLibroView from '@/views/DetalleLibroView.vue'
import NotfoundView from '@/views/NotfoundView.vue'


/*
ARRAY DE RUTAS
Cada objeto representa una "página" de la aplicación
*/
const routes = [
  {
    path: '/',  // URL
    name: 'home', // nombre interno de la ruta
    component: HomeView // componente que se renderiza
  },
  {
    path: '/libros',
    name: 'libros',
    component: ListaLibrosView
  },
  {
     // Ruta dinámica, :id significa que el valor cambia (ej: /libros/1, /libros/2)
    path: '/libros/:id',
    name: 'detalle-libro',
    component: DetalleLibroView,
    props: true 
  },
  {
    path: '/:pathMatch(.*)*',  // captura cualquier ruta que no exista (ruta 404)
    name: 'notfound',
    component: NotfoundView
  }
]

const router = createRouter({ // creamos el router
  /*
    history:
    - define cómo se manejan las URLs
    - createWebHistory: URLs limpias (ej: /libros)
  */
  history: createWebHistory(process.env.BASE_URL),
  // aquí pasamos todas las rutas definidas arriba
  routes
})

export default router // Exportamos el router para usarlo en main.js