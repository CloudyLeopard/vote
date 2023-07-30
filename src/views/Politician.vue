<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import Person from './Person/Person.vue'

const id = ref()
const id_type = ref()

// if url link ending (so name) changes, update site
const route = useRoute()
watch(
    () => route.params.name,
    (cur_name) => {
        id_type.value = "name"
        id.value = cur_name
    },
    { immediate: true }
)
</script>

<template>
    <Person :id="id" :id_type="id_type"></Person>
</template>