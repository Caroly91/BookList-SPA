<template>
  <div>
    <h1>Detalle del Libro</h1>

    <!--
      v-if:
      - verifica si el libro existe
      - si existe: muestra su información
      - si NO existe: se muestra el v-else
    -->
    <div v-if="libro">

      <!-- MOSTRAR DATOS DEL LIBRO -->
      <h2>{{ libro.titulo }}</h2>

      <!-- Interpolación de datos dinámicos -->
      <p><strong>ID:</strong> {{ libro.id }}</p>
      <p><strong>Autor:</strong> {{ libro.autor }}</p>
      <p><strong>Categoría:</strong> {{ libro.categoria }}</p>
      
      <!-- Mostrar descripción si existe -->
      <p v-if="libro.descripcion">
        <strong>Descripción:</strong> {{ libro.descripcion }}
      </p>

      <!--
        BOTÓN VOLVER
        @click ejecuta la función "volver"
      -->
      <button @click="volver">Volver a la lista</button>

    </div>

    <!--
      Si no se encuentra el libro (por ejemplo ID inválido)
    -->
    <div v-else>
      <p>Libro no encontrado</p>
    </div>

  </div>
</template>

<script setup>

// IMPORTAMOS HERRAMIENTAS DE VUE ROUTER
import { useRoute, useRouter } from 'vue-router'

// IMPORTAMOS EL STORE GLOBAL (Vuex)
import { useStore } from 'vuex'

// IMPORTAMOS computed (reactividad)
import { computed } from 'vue'

/*
  INSTANCIAS
*/
const route = useRoute()   // acceso a la URL actual 
const router = useRouter() // permite navegar programáticamente
const store = useStore()   // acceso al estado global

/*
  OBTENER ID DESDE LA URL

  route.params.id:
  - viene de la ruta dinámica /libros/:id

  parseInt:
  - convierte el id a número (importante para comparación estricta ===)
*/
const id = parseInt(route.params.id)

/*
  BUSCAR EL LIBRO EN EL STORE

  computed:
  - hace que el resultado sea reactivo
  - si cambia el store: se actualiza automáticamente

  find():
  - recorre el arreglo libros
  - devuelve el primer libro que coincida con el id
*/
const libro = computed(() =>
  store.state.libros.find(l => l.id === id)
)

/*
  FUNCIÓN PARA VOLVER

  router.push:
  - navega a otra ruta sin recargar la página
*/
const volver = () => {
  router.push('/libros')
}

</script>