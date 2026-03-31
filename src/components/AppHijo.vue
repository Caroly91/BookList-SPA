<template>
<h1>Componente Hijo</h1>
<p>Valor del Contador: {{ store.state.contador }}</p>
<div>
    <button @click="incrementar">Incrementar</button>
    <button @click="decrementar">Decrementar</button>
</div>
</template>

<script setup>
/* eslint-disable */
import { useStore } from 'vuex';
//Crear una instancia del Store
const store = useStore();
//Función local llamada al ocurrir el evento Click
function incrementar() {
    //Aquí llamamos a la acción correspondiente
    store.dispatch('incrementar')
}
function decrementar() {
    //Aquí llamamos a la acción correspondiente con dispatch
    store.dispatch('decrementar')
}
</script>

<style scoped>

</style>