<script setup>
import HomeBanner from '../components/HomeBanner.vue'
import HomeIntroduction from '../components/HomeIntroduction.vue'
import Menubar from 'primevue/menubar';
import Dialog from 'primevue/dialog';

import { ref } from 'vue';

const menuitems = ref([
    {
        label: 'Home',
        to: '/'
    },
    {
        label: 'Elected Officials',
        to: '/ballot'
    },
    {
        label: '2024 Ballot',
        to: '/ballot'
    },
    {
        label: 'Compare',
        to: '/compare'
    }
])

const visible = ref(true) // for modal visibility
</script>

<template>
    <HomeBanner></HomeBanner>
    <Menubar :model="menuitems" class="navbar">
        <template #start>
            <img alt="logo" src="/usflag.ico" height="40" class="mr-2" />
        </template>
        <template #end>
            <router-link to="/profile"><i class="pi pi-user"></i></router-link>
        </template>
    </Menubar>

    <Dialog v-model:visible="visible" modal :style="{ width: '50vw' }" header="Select your viewing mode">
        <HomeIntroduction></HomeIntroduction>
    </Dialog>

    <div class="container">
        <router-view></router-view>
    </div>
</template>

<style>
.container {
    margin-left: 10vw;
    margin-right: 10vw;
}

@media screen and (max-width: 600px) {

    /* For screens with width up to 600px (e.g., phone size) */
    .container {
        margin-left: 1vw;
        margin-right: 1vw;
    }
}</style>