<script setup>
import { inject } from 'vue';
import { storeToRefs } from 'pinia';

import { useUserStore } from '@/stores';
const user = useUserStore()
const { profileId, profileName } = storeToRefs(user)

const showProfileSelection = inject('showProfileSelection')

</script>
<template>
    <h1>Current Profile: {{ profileName }}</h1>
    <Button @click="showProfileSelection" label="Change Profile" icon="pi pi-users" iconPos="right" />
    
    <router-link :to="user.profile.to">Edit your custom profile</router-link>
</template>