<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import { useUserStore } from '@/stores'

import Person from './Person/Person.vue'

// define global variables
const user = useUserStore()

const payload = ref({})

// if url link ending (so name) changes, update site
const route = useRoute()
watch(
    () => route.params.name,
    (cur_name) => {
        payload.value = {
            op: "profile",
            id_type_1: "name",
            id_1: cur_name,
            id_type_2: "id",
            id_2: user.userId,
        }
    },
    { immediate: true }
)
</script>

<template>
    <Person :payload="payload"></Person>
</template>