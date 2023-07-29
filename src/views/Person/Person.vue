<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios';

import ApexCharts from "vue3-apexcharts";
import Knob from 'primevue/knob';

import { useHostnameStore } from '@/stores/host.js'

import PersonHeader from './PersonHeader.vue'

const props = defineProps({
    payload: Object,
})

// define global var
const host = useHostnameStore()
const $hostname = host.url // hosturl

// local var
const header_vars = ref({
    name: undefined,
    bio: undefined,
    p_type: undefined,
    party: undefined,
    state: undefined,
    imgSource: undefined
})
const simScore = ref()
const issues = ref({})
const sources = ref({})
const personNotFound = ref(false)


function fetchData(payload) {
    const path = `${$hostname}/person`
    axios.post(path, payload)
        .then((res) => {
            if (res.data.status == 'success') {
                const profile = res.data.data

                header_vars.value.name = profile.name
                header_vars.value.bio = profile.bio
                header_vars.value.p_type = profile.type

                simScore.value = profile.simScore
                issues.value = profile.issues
                sources.value = profile.sources
                personNotFound.value = false
            } else {
                personNotFound.value = true
                // console.log(res.data.message)
            }
        })
        .catch((error) => {
            console.error(error);
        })
}


const series = [{
    data: [540, 580, 690, 1100, 1200, 1380]
}]
const chartOptions = {
    chart: {
        type: 'bar',
        height: 350
    },
    plotOptions: {
        bar: {
            borderRadius: 4,
            horizontal: true,
        }
    },
    dataLabels: {
        enabled: false
    },
    xaxis: {
        categories: [
            'Italy', 'France', 'Japan', 'United States', 'China', 'Germany'
        ],
    }
}

onMounted(() => {
    fetchData(props.payload)

    const chart = ApexCharts;
    chart.render();
});

</script>

<template>
    <div class="bg-white shadow-5">
        <!-- header -->
        <PersonHeader v-bind="header_vars"></PersonHeader>

        <!-- content -->
        <div class="content-container py-5 px-5 lg:px-8">
            <!-- person not found card -->
            <Card v-if="personNotFound" class="mb-3 shadow-3" style="backgroundColor: var(--red-300)">
                <template #title>"{{ payload.id_1 }}" Missing From Database</template>
                <template #content>
                    <p>
                        If you would like to add information to this person's profile, click here
                    </p>
                </template>
            </Card>

            <!-- similarity score card -->
            <Card v-else class="mb-3 shadow-3">
                <template #title> Similarity Score </template>
                <template #content>
                    <div class="grid">
                        <!-- can add similarity description here -->
                        <div class="col-12 lg:col-4">
                            <!-- similarity score display -->
                            <div class="flex w-full h-full">
                                <Knob
                                    class="vertical-align-middle m-auto block flex align-items-center justify-content-center"
                                    v-model="simScore" valueTemplate="{value}%" :size="150" readonly />
                            </div>
                        </div>
                        <div class="col-12 lg:col-8">
                            <!-- horizontal bar graph-->
                            <ApexCharts type="bar" height="350" :options="chartOptions" :series="series" />
                        </div>
                    </div>
                </template>
            </Card>

            <!-- viewpoint breakdown card -->
            <Card v-for="(stance, index) in issues" class="mb-3 shadow-3">
                <template #title>{{ index + 1 }}. {{ stance.issue }}</template>
                <template #subtitle>{{ stance.category }}</template>
                <template #content>
                    <p>
                        Stance: {{ stance.stance }}
                    </p>
                    <p>
                        Reasoning: {{ stance.reasoning }}
                    </p>
                </template>
            </Card>
        </div>
    </div>
</template>

<style scoped>
.profile-img {
    border-radius: 50%;
}

.content-container {
    background-color: #E4EDF1
}
</style>