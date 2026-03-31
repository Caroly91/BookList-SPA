<template>
  <!-- CONTENEDOR PRINCIPAL DE LA VISTA -->
  <div class="home">

    <!-- TEXTO ANIMADO (se mueve de derecha a izquierda con CSS) -->
    <p class="marquee">
      📚 Bienvenido a BookList - Gestiona tus libros fácilmente
    </p>

    <!-- TÍTULO PRINCIPAL -->
    <h1> Bienvenido a BookList</h1>

    <!-- DESCRIPCIÓN DE LA APP -->
    <p>
      Esta aplicación permite gestionar un catálogo de libros de forma interactiva.
      Puedes agregar, visualizar y eliminar libros fácilmente.
    </p>

    <hr> <!-- línea separadora visual -->

    <!-- RESUMEN DEL SISTEMA -->
    <h2>Resumen</h2>

    <!-- MOSTRAMOS EL TOTAL DE LIBROS DESDE EL STORE -->
    <!-- {{ }} = interpolación, muestra datos dinámicos -->
    <p>Total de libros registrados: {{ totalLibros }}</p>

    <hr>

    <!-- ACCIONES DISPONIBLES PARA EL USUARIO -->
    <h2>¿Qué deseas hacer?</h2>

    <!-- router-link permite navegar sin recargar la página (SPA) -->
    <router-link to="/libros">
      <button>Ir a la lista de libros</button>
    </router-link>

  </div>
</template>

<script setup>
// IMPORTAMOS EL STORE GLOBAL (Vuex)
import { useStore } from 'vuex'

// IMPORTAMOS computed para crear valores reactivos derivados
import { computed } from 'vue'

// CREAMOS INSTANCIA DEL STORE
const store = useStore()

/*
computed:
- crea un valor reactivo
- se actualiza automáticamente cuando cambia el estado

Aquí:
- se accede a store.state.libros
- contamos cuántos libros hay con .length
*/
const totalLibros = computed(() => store.state.libros.length)

</script>

<style scoped>
/* scoped = estos estilos solo afectan a este componente */

.home {
  text-align: center;
  padding: 20px;
}

/* ESTILO DEL BOTÓN */
button {
  margin-top: 10px;
  padding: 10px;
  cursor: pointer;
}

/*
MARQUEE:
- crea efecto de texto en movimiento
- overflow hidden evita que se vea fuera del contenedor
- white-space nowrap evita saltos de línea
*/
.marquee {
  overflow: hidden;
  white-space: nowrap;
  display: block;

  /* animation:
     mover = nombre de la animación
     25s = duración
     linear = velocidad constante
     infinite = se repite siempre
     animation-delay = tarda 2 segundos en aparecer
  */
  animation: mover 25s linear infinite;
}

/*
@keyframes:
define cómo se mueve el elemento
*/
@keyframes mover {

  /* inicio: fuera de la pantalla a la derecha */
  from {
    transform: translateX(100%);
  }

  /* final: sale por la izquierda */
  to {
    transform: translateX(-100%);
  }
}
</style>