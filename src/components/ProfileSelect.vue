<script setup>
import { ref, inject } from 'vue'
import { storeToRefs } from 'pinia';

import { useUserStore, useProfilesStore } from '@/stores';

import DataTable from 'primevue/datatable';
import { FilterMatchMode } from 'primevue/api';
import Column from 'primevue/column';
import ProgressSpinner from 'primevue/progressspinner';

// ***** DYANAMIC DIALOG
const dialogRef = inject('dialogRef');
const closeDialog = () => {
    dialogRef.value.close();
}
// *****

const userStore = useUserStore();

const profilesStore = useProfilesStore();
const { all_profiles } = storeToRefs(profilesStore);

// **** DATA TABLE RELATED ****
const loading = ref(true)
loading.value = !profilesStore.getAll() // get all profiles; if successful, getAll() returns true


const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});

const selectedProfile = ref({})
function changeProfile() {
    userStore.setProfile(selectedProfile.value)
    closeDialog()
}

/*
https://jasonwatmore.com/post/2022/07/25/vue-3-pinia-user-registration-and-login-example-tutorial#list-vue
*/
</script>

<template>
    <DataTable v-model:selection="selectedProfile" v-model:filters="filters" :value="all_profiles" paginator :rows="5"
        selectionMode="single" stripedRows dataKey="id" filterDisplay="row" :loading="loading">
        <template #loading>
            <ProgressSpinner />
        </template>
        <Column>
            <template #body="{ data }">
                <i class="pi pi-user"></i>
            </template>
        </Column>
        <Column header="Name" field="name" filterField="name">
            <template #body="{ data }">
                {{ data.name }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"
                    placeholder="Search by name" />
            </template>
        </Column>
        <Column header="link" field="to">
            <template #body="{ data }">
                <router-link :to="data.to" target="_blank"><i class="pi pi-link"></i></router-link>
            </template>
        </Column>
    </DataTable>
    <div class="flex justify-content-end flex-wrap gap-2">
        <Button @click="closeDialog" label="Cancel" severity="secondary" />
        <Button @click="changeProfile" label="Change Profile" />
    </div>
</template>