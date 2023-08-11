<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import Person from '@/components/Person/Person.vue'

const id = ref()
const id_type = ref()

// if url link ending (so name) changes, update site
const route = useRoute()
watch(
    () => route.params.id,
    (cur_id) => {
        id_type.value = "id"
        id.value = cur_id
    },
    { immediate: true }
)
</script>

<template>
    <Person :id="id" :id_type="id_type"></Person>
</template>