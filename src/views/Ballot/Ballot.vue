<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios';

import { useUserStore } from '@/stores'

import BallotAddressForm from './BallotAddressForm.vue'
import BallotList from './BallotList.vue'

// define global variables
const user = useUserStore()

const baseUrl = `${import.meta.env.VITE_API_URL}`;

const searchAddressText = ref('');
const profiles = ref([]); // data after request to get ppl from address
const isDataLoaded = ref(false)

// voting location
const state = ref('')
const county = ref('')
const district = ref('')

function handleSubmitAddress() {
    const payload = {
        address: searchAddressText.value,
        compareId: user.profileId
    }
    submitPoliticianData(payload)
}

async function submitPoliticianData(payload) {
    const path = baseUrl + '/profiles'
    try {
        const response = await axios.get(path, {params: payload})
        const res = response.data

        profiles.value = res.data

        // update voting location for display purposes
        state.value = res.state
        county.value = res.county
        district.value = res.district

        isDataLoaded.value = true
    } catch(error) {
        console.log(error)
    }
}

// government position selection
const selectedPosition = ref('us_senate')
const positionCategories = ref([
    { name: 'US Senate', key: 'us_senate' },
    { name: 'US Congress', key: 'congressional' },
    { name: 'Governor', key: 'governor' },
    { name: 'Mayor', key: 'mayor' },
    { name: 'School board', key: 'school_board_members' }
])

onMounted(() => {
    submitPoliticianData({
        address: "",
        compareId: user.profileId
    })
})

</script>

<template>
    <div class="px-3 md:px-5">
        <!-- address form -->
        <BallotAddressForm v-model="searchAddressText" @submitForm="handleSubmitAddress" />

        <div class="flex flex-wrap gap-3">
            <div v-for="category in positionCategories" :key="category.key" class="flex align-items-center">
                <RadioButton v-model="selectedPosition" :inputId="category.key" name="position" :value="category.key" />
                <label :for="category.key" class="ml-2">{{ category.name }}</label>
            </div>
        </div>

        <!-- voting district information -->
        <div v-if="isDataLoaded" class="text-center">
            <strong>Displaying data for</strong>
            <p>{{ district }}</p>
            <p>{{ county }}</p>
            <p>{{ state }}</p>
        </div>

        <template v-if="isDataLoaded">
            <BallotList :profiles="profiles" :position="selectedPosition"></BallotList>
        </template>
    </div>
</template>

<style scoped></style>