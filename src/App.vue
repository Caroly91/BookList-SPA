<template>
  <div>

    <!-- TÍTULO GENERAL (se mantiene en todas las vistas) -->
    <h1>Mi BookList</h1>

    <!-- MENÚ DE NAVEGACIÓN -->
    <nav>

      <!-- router-link: permite navegar entre rutas SIN recargar la página (SPA) -->
      <router-link to="/">Inicio</router-link> |
      <router-link to="/libros">Libros</router-link> |

    </nav>

    <!-- TRANSICIÓN ENTRE VISTAS -->
    <!--
      transition: aplica animaciones cuando cambia la ruta
      name="slide": usa las clases CSS definidas abajo
      mode="out-in": primero sale la vista actual y luego entra la nueva
    -->
    <transition name="slide" mode="out-in">
      <!-- router-view: aquí se renderiza la vista activa según la URL -->
      <router-view />
    </transition>

  </div>
</template>

<script setup>
// No utilizado por el momento
</script>

<style>
/* ESTILO DEL MENÚ */
nav {
  margin: 20px;
}

nav a {
  text-decoration: none;
  color: black;
  margin: 0 10px;
}

/* cambia color al pasar el mouse */
nav a:hover {
  color: lightblue;
}

/*
ANIMACIÓN SLIDE (RUTAS)
slide-enter-active:
- cuando una vista ENTRA
slide-leave-active:
- cuando una vista SALE
*/
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease;
}

/*
Vista nueva entra desde la derecha
*/
.slide-enter-from {
  transform: translateX(100%);
}

/*
Vista actual sale hacia la izquierda
*/
.slide-leave-to {
  transform: translateX(-100%);
}

/* LINK ACTIVO */
/*
router-link-active:
- Vue agrega esta clase automáticamente
- indica en qué página estás y le da estilo 
*/
nav a.router-link-active {
  color: blue;
  font-weight: bold;
  border-bottom: 2px solid blue;
}
</style>