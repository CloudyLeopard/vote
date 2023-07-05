<script setup>
import { ref, inject, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios';

import Fieldset from 'primevue/fieldset';
import Breadcrumb from 'primevue/breadcrumb';

import TheProfileSelection from '../components/TheProfileSelection.vue'
import HomeAddressForm from '../components/HomeAddressForm.vue'
import HomePolCard from '../components/HomePolCard.vue'

// define global variables
const $hostname = inject('$hostname')

// setup router for redirection
const router = useRouter()

const breadcrumbItems = ref([
    { label: "Home", url: ""},
])

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
        })
        .catch((error) => {
            console.log(error);
        })
}

function handleContenderRedirect(contenderName) {
    const decodedName = decodeURIComponent(contenderName);
    router.push({name: 'Contender', params: { name: decodedName }})
}


onMounted(() => {
    submitAddressData({
        address: ""
    })
})

</script>

<template>
    <Breadcrumb :home="home" :model="breadcrumbItems" />
    <div class="container px-3 md:px-5">
        <!-- header -->
        <div class="grid">
            <div class="col-12 md:col-8">
                <h1>LOREM IPSUM</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore
                    magna aliqua. Turpis nunc eget lorem dolor sed viverra. Quis imperdiet massa tincidunt nunc pulvinar
                    sapien.
                    Vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt. Blandit turpis cursus in
                    hac
                    habitasse platea. Est ultricies integer quis auctor. Ipsum consequat nisl vel pretium lectus quam.
                    Dignissim
                    suspendisse in est ante in nibh mauris. Et malesuada fames ac turpis. Cum sociis natoque penatibus et
                    magnis.
                    Mauris ultrices eros in cursus. Tempor nec feugiat nisl pretium fusce id velit ut tortor. Platea
                    dictumst
                    quisque sagittis purus sit amet volutpat consequat mauris. Purus non enim praesent elementum facilisis.
                </p>
            </div>
            <div class="col-12 md:col-4 relative">
                <TheProfileSelection />
            </div>
        </div>

        <!-- address form -->
        <HomeAddressForm v-model="searchAddressText" @submitForm="handleSubmitAddress" />

        <!-- Different position categories-->
        <Fieldset v-for="(positionData, positionName) in addressData.categories" :legend="positionName" :toggleable="true">
            <div class="grid">
                <div v-for="(person, index) in positionData" :key=index class="col-12 md:col-6 lg:col-4">
                    <HomePolCard v-bind="person" @redirectPage="handleContenderRedirect"/>
                </div>
            </div>
        </Fieldset>




    </div>
</template>

<style scoped>
.container {
    margin-left: 10%;
    margin-right: 10%;
    background-color: white;
}
</style>