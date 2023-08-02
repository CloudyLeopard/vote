<script setup>
import { ref, provide, defineAsyncComponent, onMounted } from 'vue';

import HomeBanner from './HomeBanner.vue'
import HomeIntroduction from './HomeIntroduction.vue'
import Menubar from 'primevue/menubar';
import Dialog from 'primevue/dialog';
import DynamicDialog from 'primevue/dynamicdialog';
import { useDialog } from 'primevue/usedialog';
const ProfileSelect = defineAsyncComponent(() => import('@/components/ProfileSelect.vue'))

// FOR CHILD COMPONENTS
provide('showProfileSelection', showProfile) // function to open profile selection dialog

// nav bar item
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

// init modal visibility
const visible = ref(true)

// function for show profile selection menu dialog
const dialog = useDialog();
function showProfile() {
    const dialogRef = dialog.open(ProfileSelect, {
        props: {
            header: 'Profile Selection',
            style: {
                width: '50vw',
                'max-height': '60vw'
            },
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
            modal: true
        }
    });
}

onMounted(() => {
    // showProfile()
})
</script>

<template>
    <HomeBanner></HomeBanner>
    <Menubar :model="menuitems" class="navbar">
        <template #end>
            <router-link to="/profile"><i class="pi pi-user"></i></router-link>
        </template>
    </Menubar>

    <!-- <Dialog v-model:visible="visible" modal :style="{ width: '50vw' }" header="Select your viewing mode">
        <HomeIntroduction></HomeIntroduction>
    </Dialog> -->

    <DynamicDialog />

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