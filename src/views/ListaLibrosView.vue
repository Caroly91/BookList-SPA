<template>
  <div>
    <h1>Mis Libros disponibles</h1>

    <!-- Muestra la cantidad total de libros de forma reactiva desde Vuex -->
    <p>Total de libros: {{ totalLibros }}</p>

    <!-- SECCIÓN DE RESULTADOS FILTRADOS -->
    <!-- Permite buscar libros por título, autor o categoría -->
    <section class="resultados-filtrados">
      <h2>Buscar Libro</h2>
      <input v-model="filtro" placeholder="Filtrar por título, autor o categoría" />

      <!-- Mostrar libros filtrados solo si hay coincidencias -->
      <div v-if="librosFiltrados.length > 0">
        <Libro v-for="libro in librosFiltrados" :key="libro.id" :libro="libro" @ver-detalle="verDetalle"
          @eliminar-libro="eliminar" @mouseenter="hoverLibro = libro.titulo" @mouseleave="hoverLibro = ''" />
      </div>

      <!-- Mensaje si no hay resultados en el filtro -->
      <p v-else-if="filtro.trim() !== '' && librosFiltrados.length === 0">
        No se encontraron libros con el filtro ingresado.
      </p>
    </section>

    <!-- Mensaje dinámico al pasar mouse sobre un libro -->
    <p v-if="hoverLibro">📌 Estás sobre: {{ hoverLibro }}</p>

    <!-- Mensajes generales de disponibilidad de libros -->
    <!-- v-show: mantiene el elemento en el DOM aunque esté oculto -->
    <!-- v-if: renderiza solo si la condición es verdadera -->
    <p v-show="libros.length > 0">Listado disponible</p>
    <p v-if="libros.length === 0">No hay libros disponibles</p>

    <!-- Lista completa de libros disponibles -->
    <!-- Se muestra solo si hay libros -->
    <ul v-else>
      <Libro v-for="libro in libros" :key="libro.id" :libro="libro" @ver-detalle="verDetalle" @eliminar-libro="eliminar"
        @mouseenter="hoverLibro = libro.titulo" @mouseleave="hoverLibro = ''" />
    </ul>

    <!-- FORMULARIO DE AGREGAR LIBRO -->
    <h2>Agregar Libro</h2>
    <!-- Mensaje temporal visible siempre -->
    <p v-if="mensajeAgregado" style="color: green;">{{ mensajeAgregado }}</p>

    <!-- Inputs conectados a variables reactivas mediante v-model -->
    <form @submit.prevent="agregarLibro">
      <input v-model="titulo" @keyup.enter="agregarLibro" placeholder="Título" required />
      <input v-model="autor" @keyup.enter="agregarLibro" placeholder="Autor" required />
      <textarea v-model="descripcion" placeholder="Descripción del libro"></textarea>
      <select v-model="categoria" required>
        <option disabled value="">Seleccione categoría</option>
        <option>Novela</option>
        <option>Fantasía</option>
        <option>Infantil</option>
        <option>Clásico</option>
      </select>
      <button type="submit">Agregar</button>
    </form>
    <h3>Vista previa</h3>

    <!-- VISTA PREVIA DEL LIBRO -->
    <!-- Cuadro que muestra en tiempo real lo que se va escribiendo -->
    <!-- Mostrar título, autor y categoría si hay datos -->
    <!-- Mostrar descripción si hay datos -->
    <div class="vista-previa">
      <p v-if="titulo || autor || categoria">
        <strong>{{ titulo }}</strong> - {{ autor }} ({{ categoria }})
      </p>
      <p v-if="descripcion">{{ descripcion }}</p>
    </div>
  </div>

</template>

<script setup>
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import Libro from '@/components/Libro.vue'


// VARIABLES REACTIVAS
const store = useStore()        // Acceso al store de Vuex
const router = useRouter()      // Acceso al router para navegación

const titulo = ref('')          // Título del libro a agregar
const autor = ref('')           // Autor del libro a agregar
const categoria = ref('')       // Categoría seleccionada
const descripcion = ref('')     // Descripción opcional
const filtro = ref('')          // Filtro de búsqueda

const hoverLibro = ref('')      // Guarda el título del libro que se pasa el mouse encima
const mensajeAgregado = ref('') // Mensaje temporal al agregar libro


// COMPUTED
// Lista de libros desde Vuex (reactiva)
const libros = computed(() => store.state.libros)
// Contador total de libros
const totalLibros = computed(() => store.state.libros.length)

// Filtrado dinámico de libros por título, autor o categoría
const librosFiltrados = computed(() => {
  if (!filtro.value.trim()) return [] // Si no hay filtro, devolver array vacío
  const busqueda = filtro.value.toLowerCase()
  return libros.value.filter(libro =>
    libro.titulo.toLowerCase().includes(busqueda) ||
    libro.autor.toLowerCase().includes(busqueda) ||
    libro.categoria.toLowerCase().includes(busqueda)
  )
})


// FUNCIONES

// Navegación a la página de detalle del libro
const verDetalle = id => router.push(`/libros/${id}`)

// Eliminar libro con confirmación
const eliminar = id => {
  if (confirm('¿Seguro que deseas eliminar este libro?')) {
    store.dispatch('eliminarLibro', id)
  }
}

// Agregar libro al store y mostrar mensaje temporal
const agregarLibro = async () => {
  // Validación básica de campos obligatorios
  if (!titulo.value || !autor.value || !categoria.value) {
    alert('Por favor completa todos los campos')
    return
  }

  // Simula un pequeño retraso
  await new Promise(resolve => setTimeout(resolve, 500))

  // Crear objeto libro con id único
  const nuevoLibro = {
    id: Date.now(),
    ...{ titulo: titulo.value, autor: autor.value, categoria: categoria.value, descripcion: descripcion.value }
  }

  // Enviar acción al store para agregar libro
  store.dispatch('agregarLibro', nuevoLibro)

  // Mostrar mensaje temporal visible por 3 segundos
  mensajeAgregado.value = '📚 Libro agregado correctamente'
  setTimeout(() => { mensajeAgregado.value = '' }, 3000)

  // Limpiar formulario
  titulo.value = ''
  autor.value = ''
  categoria.value = ''
  descripcion.value = ''
}
</script>

// ESTILOS 
<style scoped>
.vista-previa {
  border: 2px solid #4CAF50;
  padding: 10px;
  border-radius: 8px;
  background-color: #f9fff9;
  margin-top: 10px;
  min-height: 60px;
  transition: background-color 0.3s ease;
}
</style>