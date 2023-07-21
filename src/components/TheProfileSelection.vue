<script setup>
import { ref, computed } from 'vue';

import Menu from 'primevue/menu';
import Avatar from 'primevue/avatar';
import { useToast } from 'primevue/usetoast';

const props = defineProps({
    currentProfile: String,
    demographics: {
        type: Array,
        default: ['Demographic 1', 'Demographic 2']
    },
    customProfiles: {
        type: Array,
        default: []
    }
})

// menu items for demographics
const demMenuItems = []
for (const name of props.demographics) {
    demMenuItems.push({
        label: name,
        icon: 'pi pi-user',
        command: () => {
            toast.add({ severity: 'success', summary: 'Selected', detail: 'Profile successfully selected!' })
        }
    })
}

// menu items for the custom ones (user can enter)
const cusMenuItems = []
for (const name of props.customProfiles) {
    demMenuItems.push({
        label: name,
        icon: 'pi pi-users',
        command: () => {
            toast.add({ severity: 'success', summary: 'Selected', detail: 'Profile successfully selected!', life: 1000 })
        }
    })
}
cusMenuItems.push(
    {
        label: 'Add new profile',
        icon: 'pi pi-user-plus',
        to: '/test'
    }
)

const currProfile = computed(() => {
    return props.currentProfile ? props.currentProfile : "Choose a Profile"
})
// for the profile Avatar
const currProfileLetter = computed(() => {
    return props.currentProfile ? props.currentProfile.charAt(0) : "?"
})

const toast = useToast();
const menu = ref();
const items = ref([
    {
        label: 'Demographics',
        items: demMenuItems
    },
    {
        label: 'Custom Profile',
        items: cusMenuItems
    }
])

// toggle function for menu
const toggle = (event) => {
    menu.value.toggle(event);
}

</script>

<template>
    <span class="absolute top-0 right-0 flex align-items-center p-2 pl-3 text-color mt-4" @click="toggle">
        <Avatar :label="currProfileLetter" class="mr-2" shape="circle" />
        <div class="flex flex-column align mr-2">
            <span class="font-bold">{{ currProfile }}</span>
            <span class="text-sm">Someone</span>
        </div>
        <i class="pi pi-chevron-down hover:surface-200"></i>
    </span>
    <Menu ref="menu" id="overlay_menu" :model="items" :popup="true">
    </Menu>
    <Toast />
</template>

<style scoped></style>