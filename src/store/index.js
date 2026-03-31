/* eslint-disable */
// Desactiva advertencias

// FUNCIÓN PARA CARGAR LIBROS DESDE LOCALSTORAGE
function cargarLibros() {
  const data = localStorage.getItem('libros')

  /*
    Si hay datos:
    - los convierte de texto (string) a objeto con JSON.parse

    Si NO hay:
    - retorna null
  */
  return data ? JSON.parse(data) : null
}

import { createStore } from 'vuex'
// Importamos Vuex para crear el store (estado global de la app)

/*
  createStore:
  - crea un almacén global de datos
  - cualquier componente puede acceder/modificar estos datos
*/
export default createStore({

  /* =========================
     STATE (DATOS GLOBALES)
     ========================= */
  state: {

    // Variable simple (la dejamos por estructura del curso)
    contador: 0,

    /*
      USO CORRECTO DE LOCALSTORAGE

      cargarLibros():
      - intenta obtener libros guardados

      || (OR lógico):
      - si NO hay datos → usa libros por defecto
    */
    libros: cargarLibros() || [
      {
        id: 1,
        titulo: 'El Principito',
        autor: 'Antoine de Saint-Exupéry',
        categoria: 'Infantil'
      },
      {
        id: 2,
        titulo: 'Cien años de soledad',
        autor: 'Gabriel García Márquez',
        categoria: 'Novela'
      },
      {
        id: 3,
        titulo: 'Don Quijote',
        autor: 'Miguel de Cervantes',
        categoria: 'Clásico'
      }
    ]
  },

  /*  GETTERS (VALORES DERIVADOS) */
  getters: {

    /*
      contadorPlus:
      - NO modifica el state
      - solo calcula un valor basado en el state
    */
    contadorPlus: state => state.contador * 5
  },

  /* MUTATIONS (CAMBIOS DIRECTOS) */
  /* Las mutations SON las únicas que deben modificar el state directamente */
  mutations: {
    /* ---------- CONTADOR ---------- */
    incrementar(state) {
      state.contador++
    },

    decrementar(state) {
      state.contador--
    },

    /* ---------- LIBROS ---------- */
    agregarLibro(state, libro) {
      /*
        push():
        - agrega un elemento al final del arreglo
      */
      state.libros.push(libro)

      /*
        GUARDAR EN LOCALSTORAGE

        JSON.stringify():
        - convierte el arreglo en texto

        localStorage.setItem():
        - guarda en el navegador
      */
      localStorage.setItem('libros', JSON.stringify(state.libros))
    },

    eliminarLibro(state, id) {
      /*
        filter():
        - crea un nuevo arreglo sin el libro eliminado
      */
      state.libros = state.libros.filter(libro => libro.id !== id)

      /*
        ACTUALIZAR LOCALSTORAGE
      */
      localStorage.setItem('libros', JSON.stringify(state.libros))
    }
  },

  /* ACTIONS (INTERMEDIARIOS) */
  actions: {

    /*
      IMPORTANTE:
      - Las actions NO modifican directamente el state
      - llaman a mutations con commit
    */

    /* ---------- CONTADOR ---------- */

    decrementar({ commit }) {
      commit('decrementar')
    },

    incrementar({ commit }) {
      commit('incrementar')
    },

    /* ---------- LIBROS ---------- */

    agregarLibro({ commit }, libro) {
      commit('agregarLibro', libro)
    },

    eliminarLibro({ commit }, id) {
      commit('eliminarLibro', id)
    }
  },

  modules: {
    /*
      Para proyectos grandes se divide el store (no estoy usando en este proyecto)
    */
  }
})