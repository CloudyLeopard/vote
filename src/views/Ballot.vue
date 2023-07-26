<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios';

import { useUserStore } from '../stores/user.js'
import { useHostnameStore } from '../stores/host.js'

import BallotAddressForm from '../components/BallotAddressForm.vue'
import BallotList from './BallotList.vue'

// define global variables
const user = useUserStore()

const host = useHostnameStore()
const $hostname = host.url // hosturl

const searchAddressText = ref('');
const politicianData = ref({}); // data after request to get ppl from address
const isDataLoaded = ref(false)

// voting location
const state = ref('')
const county = ref('')
const district = ref('')

function handleSubmitAddress() {
    const payload = {
        address: searchAddressText.value,
        user_id: user.userId
    }
    submitPoliticianData(payload)
}

function submitPoliticianData(payload) {
    const path = $hostname + '/address'
    axios.post(path, payload)
        .then((res) => {
            politicianData.value = res.data
            isDataLoaded.value = true

            // update voting location for display purposes
            state.value = politicianData.value.state
            county.value = politicianData.value.county
            district.value = politicianData.value.district
        })
        .catch((error) => {
            console.log(error);
        })
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
        user_id: user.userId
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
            <BallotList :politiciansData="politicianData" :position="selectedPosition"></BallotList>
        </template>
    </div>
</template>

<style scoped></style>