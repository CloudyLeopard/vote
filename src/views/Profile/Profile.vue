<script setup>
import { inject } from 'vue';
import { storeToRefs } from 'pinia';

import { useUserStore } from '@/stores';
const userStore = useUserStore()
const { profile } = storeToRefs(userStore)

const showProfileSelection = inject('showProfileSelection')

</script>
<template>
    <h1>Current Profile: {{ profile.id }}</h1>
    <Button @click="showProfileSelection" label="Change Profile" icon="pi pi-users" iconPos="right" />
    
</template>