<script setup>
import { ref, inject, watch, onMounted } from 'vue'
import axios from 'axios';
import { useRoute } from 'vue-router'

import ApexCharts from "vue3-apexcharts";
import Knob from 'primevue/knob';

// define global variables
const $hostname = inject('$hostname')

// local var
const stances = ref({})
const sources = ref({})
const personNotFound = ref(false)

// if url link ending (so name) changes, update site
const route = useRoute()
watch(
    () => route.params.name,
    (cur_name) => {
        fetchData(cur_name)
    },
    { immediate: true }
)

function fetchData(name) {
    const path = `${$hostname}/person`
    axios.get(path, {
        params: {
            name: name
        }
    })
        .then((res) => {
            if (res.data.status == 'success') {
                stances.value = res.data.data.stances
                sources.value = res.data.data.sources
            } else {
                personNotFound.value = true
                console.log(res.data.message)
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

const knobValue = ref(50);

onMounted(() => {
    const chart = ApexCharts;
    chart.render();
});

</script>

<template>
    <div class="mx-0 md:mx-8 bg-white shadow-8">
        <!-- header -->
        <div class="py-5 px-5">
            <div class="grid p-1">
                <div class="col-12 md:col-4">
                    <div class="flex w-full h-full">
                        <img class="profile-img vertical-align-middle w-10rem m-auto block"
                            src="/src/assets/blueperson.png">
                    </div>

                </div>
                <div class="col-12 md:col-6">
                    <div class="profile-info">
                        <h2 class="profile-name">
                            {{  route.params.name }}
                        </h2>
                        <p class="profile-subtext">
                            Party | State
                        </p>
                        <p class="profile-description">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error
                            repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione
                            quam perferendis esse, cupiditate neque quas!
                        </p>
                        <div class="flex column-gap-3">
                            <i class="pi pi-facebook"></i>
                            <i class="pi pi-twitter"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- content -->
        <div class="content-container py-5 px-5 lg:px-8">
            <!-- person not found card -->
            <Card class="mb-3 shadow-3" style="backgroundColor: var(--red-300)">
                <template #title>"{{ route.params.name }}" Missing From Database</template>
                <template #content>
                    <p>
                        If you would like to add information to this person's profile, click here
                    </p>
                </template>
            </Card>

            <!-- similarity score card -->
            <Card class="mb-3 shadow-3">
                <template #title> Similarity Score </template>
                <template #content>
                    <div class="grid">
                        <div class="col-12">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error
                                repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa
                                ratione quam
                                perferendis esse, cupiditate neque
                                quas!
                            </p>
                        </div>
                        <div class="col-12 lg:col-4">
                            <!-- similarity score display -->
                            <div class="flex w-full h-full">
                                <Knob
                                    class="vertical-align-middle m-auto block flex align-items-center justify-content-center"
                                    v-model="knobValue" valueTemplate="{value}%" :size="150" readonly />
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
            <Card v-for="(stance, index) in stances" class="mb-3 shadow-3">
                <template #title>{{ index+1 }}. {{ stance.issue }}</template>
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