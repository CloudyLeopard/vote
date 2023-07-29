<script setup>
import { inject } from 'vue';
import { storeToRefs } from 'pinia';

import { useUserStore } from '@/stores';
const userStore = useUserStore()
const { current_profile } = storeToRefs(userStore)

const showProfileSelection = inject('showProfileSelection')

</script>
<template>
    <h1>Current Profile: {{ current_profile.name }}</h1>
    <Button @click="showProfileSelection" label="Change Profile" icon="pi pi-users" iconPos="right" />
    
</template>