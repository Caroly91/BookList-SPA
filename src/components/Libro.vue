<!-- eslint-disable vue/multi-word-component-names -->
<!-- Desactiva la regla que exige nombres de componentes con más de una palabra -->

<template>

    <!--
      Este componente representa UN SOLO LIBRO dentro de la lista
      Se usa dentro de un v-for en el componente padre
    -->
    <li class="libro">

        <!-- MOSTRAR INFORMACIÓN DEL LIBRO -->
        <span>
            <!-- Interpolación de datos dinámicos -->
            📘 {{ libro.titulo }} - {{ libro.autor }} ({{ libro.categoria }})
        </span>

        <!-- BOTONES DE ACCIÓN -->
        <div class="acciones">

            <!--
              @click:
              - captura el evento click

              $emit:
              - envía un evento al componente padre

              'ver-detalle':
              - nombre del evento

              libro.id:
              - dato que se envía al padre
            -->
            <button @click="$emit('ver-detalle', libro.id)">
                Ver detalle
            </button>

            <!--
              Otro evento hacia el padre para eliminar
            -->
            <button @click="$emit('eliminar-libro', libro.id)">
                Eliminar
            </button>

        </div>
    </li>
</template>

<script setup>
/* eslint-disable */

/*
defineProps:
- define las propiedades que recibe el componente
- en este caso recibe un objeto "libro"
*/
defineProps({
    libro: {
        type: Object,   // debe ser un objeto
        required: true  // es obligatorio
    }
})

/*
defineEmits:
- define los eventos que este componente puede enviar al padre
*/
defineEmits([
    'ver-detalle',   // para navegar al detalle
    'eliminar-libro' // para eliminar el libro
])

</script>

<style scoped>
/*
Estilos solo para este componente
(scoped evita que afecte a otros)
*/

.libro {
    margin: 10px 0;

    /* Flexbox para ordenar contenido */
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* Separación entre botones */
.acciones button {
    margin-left: 5px;
    cursor: pointer;
}
</style>