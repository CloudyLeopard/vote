<script setup>
import { ref } from 'vue'
import HomeIntroCard from './HomeIntroCard.vue'

const items = ref([
    {
        id: 1,
        heading: 'Browse',
        subtext: 'Immediately access the site without any profile. Cannot see similarity score.',
        icon: 'pi pi-search',
        to: '/'
    },
    {
        id: 2,
        heading: 'Demo',
        subtext: 'Choose from a list of pre-set profiles.',
        icon: 'pi pi-users',
        to: '/'
    },
    {
        id: 3,
        heading: 'Customize',
        subtext: 'Create or log into your own profile by answering a few questions to identify your political viewpoints',
        icon: 'pi pi-user',
        to: '/'
    }
])
</script>
<template>
    <div class="grid">
        <div v-for="item in items" :keys="item.id" class="col-12 md:col-4">
            <HomeIntroCard v-bind="item"></HomeIntroCard>
        </div>
    </div>
</template>