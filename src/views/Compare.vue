<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import { useHostnameStore } from '../stores/host.js'
import Dropdown from 'primevue/dropdown';
import RadioButton from 'primevue/radiobutton';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import { useToast } from 'primevue/usetoast';

const toast = useToast()

const host = useHostnameStore()
const $hostname = host.url // hosturl

const DEFAULT_PROFILE_URL = "/src/assets/blueperson.png"

const searchAddressText = ref('');
const addressData = ref({}); // data after request to get ppl from address

function handleSubmitAddress() {
    const payload = {
        address: searchAddressText.value
    }
    submitAddressData(payload)
}

function submitAddressData(payload) {
    const path = $hostname + '/address'
    axios.post(path, payload)
        .then((res) => {
            addressData.value = res.data
            people.value = addressData.value['categories'][selectedPosition.value]
        })
        .catch((error) => {
            console.log(error);
        })
}

// sim score, default value = 80
const sim_score = ref(80)

// government position selection
const selectedPosition = ref('us_senate')
const positionCategories = ref([
    { name: 'US Senate', key: 'us_senate' },
    { name: 'US Congress', key: 'congressional' },
    { name: 'Governor', key: 'governor' },
    { name: 'Mayor', key: 'mayor' },
    { name: 'School board', key: 'school_board_members' }
])

// profile image tags
const left_img_url = ref(DEFAULT_PROFILE_URL)
const right_img_url = ref(DEFAULT_PROFILE_URL)

// when user selects a different position, dropdown list changes
watch(selectedPosition, (newPosition) => {
    if (addressData.value != {})
        people.value = addressData.value['categories'][newPosition]
})


// dropdown stuff
const selectedPerson1 = ref(null)
const selectedPerson2 = ref(null)
const people = ref([]) // ppl selected to be shown in dropdown

function onPersonSelect(event) {
    if (selectedPerson1.value == null || selectedPerson2.value == null)
        return

    const param = {
        "name_1": selectedPerson1.value['name'],
        "name_2": selectedPerson2.value['name'],
        "type": 'percentage'
    }

    // get info on this person
    const path = $hostname + '/similarity/compare'

    async function fetchData() {
        try {
            const response = await axios.get(path, { params: param })
            const json = response.data
            if (json['status'] == 'failed') {
                toast.add({ severity: 'error', summary: 'Failed', detail: json['message'], life: 2000 })
                return;
            }
            
            // for populating issues/ans stuff
            compare_data.value = json['data']
            // for displaying sim score
            sim_score.value = json['data']['sim_score']
        } catch (error) {
            console.log(error)
        }
    }

    fetchData()
}

// issue/ans stuff
const compare_data = ref({})

function translate_stance(i) {
    let res = ""
    switch(i){
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

// update profile img (left)
watch(selectedPerson1, (newPerson) => {
    left_img_url.value = newPerson['imgSource'] ? newPerson['imgSource'] : "/src/assets/blueperson.png"

})
// update profile img (right)
watch(selectedPerson2, (newPerson) => {
    right_img_url.value = newPerson['imgSource'] ? newPerson['imgSource'] : "/src/assets/blueperson.png"
})

onMounted(() => {
    submitAddressData({
        address: ""
    })

})
</script>

<template>
    <div class="grid">
        <div class="col md:col-6 md:col-offset-3 pt-8">
            <h2 class="uppercase">Enter your address to find your candidates</h2>
            <!-- enter zip code-->
            <form @submit.prevent="handleSubmitAddress">
                <input v-model="searchAddressText" @keyup.enter="submit" class="transparent-input" type="text" id="address"
                    placeholder="Enter address/zipcode here">
            </form>
            <hr />
            <div class="flex flex-wrap gap-3">
                <div v-for="category in positionCategories" :key="category.key" class="flex align-items-center">
                    <RadioButton v-model="selectedPosition" :inputId="category.key" name="position" :value="category.key" />
                    <label :for="category.key" class="ml-2">{{ category.name }}</label>
                </div>
            </div>

            <!-- sim score -->
            <h1 class="sim_score_title flex justify-content-center mt-5">{{ sim_score }}%</h1>

            <div class="grid">
                <div class="col-5 flex flex-column align-items-center">
                    <div class="profile_img">
                        <img class="h-full" :src="left_img_url" alt="Profile image 1">
                    </div>
                    <Dropdown v-model="selectedPerson1" @change="onPersonSelect" :options="people" optionLabel="name"
                        placeholder="Select" class="w-full md:w-14rem mt-5" />
                </div>
                <div class="col-2 flex align-items-center justify-content-center ">
                    <i class="pi pi-arrow-circle-up" style="font-size: 2rem"></i>
                </div>
                <div class="col-5 flex flex-column align-items-center">
                    <div class="profile_img">
                        <img class="h-full" :src="right_img_url" alt="Profile image 2">
                    </div>
                    <Dropdown v-model="selectedPerson2" @change="onPersonSelect" :options="people" optionLabel="name"
                        placeholder="Select" class="w-full md:w-14rem mt-5" />
                </div>
            </div>

            <TabView>
                <TabPanel v-for="(issues, category) in compare_data.issues" :key="category" :header="category">
                    <div class="grid" v-for="issue in issues" :key="issue.issue_id">
                        <div class="col-12">
                            <p class="flex align-items-center justify-content-center text-center">
                                {{ issue.name }}
                            </p>
                        </div>
                        <div class="col-6">
                            <p class="flex align-items-center justify-content-center text-center">{{ translate_stance(issue.stances[0]) }}</p>
                        </div>
                        <div class="col-6">
                            <p class="flex align-items-center justify-content-center text-center">{{ translate_stance(issue.stances[1]) }}</p>
                        </div>
                        <Divider/>
                    </div>
                </TabPanel>
            </TabView>


        </div>
    </div>
    <Toast />
</template>

<style scoped>
.sim_score_title {
    font-family: 'Lato', sans-serif;
    font-weight: 80;
    font-size: 120px;
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