<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import Dropdown from 'primevue/dropdown';
import RadioButton from 'primevue/radiobutton';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import { useToast } from 'primevue/usetoast';
import { useUserStore } from '@/stores'
import { useRoute } from 'vue-router'

import { fetchProfile, fetchProfileById, fetchSimilarity } from "@/composables"

const toast = useToast()

const baseUrl = `${import.meta.env.VITE_API_URL}`;
const user = useUserStore()
const route = useRoute()

const DEFAULT_PROFILE_URL = "/src/assets/blueperson.png"

// profile image tags
const left_img_url = ref(DEFAULT_PROFILE_URL)
const right_img_url = ref(DEFAULT_PROFILE_URL)
/* temporarily commenting this out
// update profile img (left)
watch(leftProfile, (newPerson) => {
    left_img_url.value = newPerson['imgSource'] ? newPerson['imgSource'] : "/src/assets/blueperson.png"

})
// update profile img (right)
watch(rightProfile, (newPerson) => {
    right_img_url.value = newPerson['imgSource'] ? newPerson['imgSource'] : "/src/assets/blueperson.png"
})
*/


// sim score, default value = 0
const sim_score = ref(0)
const left_stances = ref([])
const right_stances = ref([])

// dropdown stuff
const leftProfile = ref(null)
const rightProfile = ref(null)

const searchLeft = ref("")
const searchRight = ref("")
async function onSearch(position) {
    if (position == 'left') {
        leftProfile.value = await fetchProfile(searchLeft.value, "name")
    } else {
        rightProfile.value = await fetchProfile(searchRight.value, "name")
    }
}

async function selectMe(position) {
    const profile = await fetchProfileById(user.profileId)
    if (position == 'left')
        leftProfile.value = profile
    else
        rightProfile.value = profile
}

async function calculateSim() {
    if (leftProfile.value && rightProfile.value) {
        const { simScore, p1_stances, p2_stances } = await fetchSimilarity(leftProfile.value.id, rightProfile.value.id)
        sim_score.value = simScore.value
        left_stances.value = p1_stances.value
        right_stances.value = p2_stances.value
    }
}

function translate_stance(i) {
    let res = ""
    switch (i) {
        case -1:
            res = "strongly disagree"
            break
        case -0.5:
            res = "disagree"
            break
        case 0:
            res = "neutral/indifferent"
            break
        case 0.5:
            res = "agree"
            break
        case 1:
            res = "strongly agree"
            break
        default:
            res = "?"
            break
    }
    return res
}
onMounted(async () => {
    // cuz i'm lazy

    if (route.query.id1) {
        const id_1 = route.query.id1
        leftProfile.value = await fetchProfile(id_1, "id")
        
    } else if (route.query.name1) {
        const name_1 = route.query.name1
        leftProfile.value = await fetchProfile(name_1, "name")
    } else {
        leftProfile.value = await fetchProfile("Joe Biden", "name")
    }
    
    if (route.query.id2) {
        const id_2 = route.query.id2
        rightProfile.value = await fetchProfile(id_2, "id")
    } else if (route.query.name2) {
        const name_2 = route.query.name2
        rightProfile.value = await fetchProfile(name_2, "name")
    } else {
        rightProfile.value = await fetchProfile("Joe Biden", "name")
    }

})
</script>

<template>
    <div class="grid">
        <div class="col md:col-6 md:col-offset-3 pt-8">
            <div class="grid">
                <div class="col-6 flex flex-column align-items-center">
                    <div class="profile_img">
                        <img class="h-full" :src="left_img_url" alt="Profile image 1">
                    </div>
                    <form @submit.prevent="onSearch('left')">
                        <label for="leftSearch">Search name</label>
                        <input type="text" id="leftSearch" v-model="searchLeft" @keyup.enter="submit">
                        <button type="submit">Search</button>
                    </form>
                    <button type="button" @click="selectMe('left')">Me</button>
                    <div v-if="leftProfile" class="profile_info text-center">
                        <p>{{ leftProfile.name }}</p>
                        <p>{{ leftProfile.id }}</p>
                    </div>
                    <div v-else class="profile_info text-center">
                        <p>Not found</p>
                    </div>
                </div>
                <div class="col-6 flex flex-column align-items-center">
                    <div class="profile_img">
                        <img class="h-full" :src="right_img_url" alt="Profile image 2">
                    </div>
                    <form @submit.prevent="onSearch('right')">
                        <label for="rightSearch">Search name</label>
                        <input type="text" id="rightSearch" v-model="searchRight" @keyup.enter="submit">
                        <button type="submit">Search</button>
                    </form>
                    <button type="button" @click="selectMe('right')">Me</button>
                    <div v-if="rightProfile" class="profile_info text-center">
                        <p>{{ rightProfile.name }}</p>
                        <p>{{ rightProfile.id }}</p>
                    </div>
                    <div v-else class="profile_info text-center">
                        <p>Not found</p>
                    </div>
                </div>
            </div>
            <div class="flex align-items-center justify-content-center ">
                <button type="button" @click="calculateSim">Get Similarity</button>
            </div>
            <!-- sim score -->
            <h1 class="simScore_title flex justify-content-center">{{ sim_score }}%</h1>

            <div v-for="(item, index) in left_stances" class="grid text-center">
                <div class="col-12">
                    <p>{{ left_stances[index].issue_id }}. {{ left_stances[index].issue }}</p>
                </div>
                <div class="col-6">
                    {{ translate_stance(left_stances[index].stance) }}
                </div>
                <div class="col-6">
                    {{ translate_stance(right_stances[index].stance) }}
                </div>
            </div>
        </div>
    </div>
    <Toast />
</template>

<style scoped>
.simScore_title {
    font-family: 'Lato', sans-serif;
    font-weight: 80;
    font-size: 60px;
}

.transparent-input {
    width: 100%;
    background-color: transparent;
    border: none;
    outline: none;
    padding-bottom: 0px
}

.profile_img {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10rem;
}
</style>