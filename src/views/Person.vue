<script setup>
import { ref, onMounted } from 'vue'

import ApexCharts from "vue3-apexcharts";
import Knob from 'primevue/knob';

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
                            src="https://cdn.schoolboardwatchlist.org/be/2021/08/09124556/Screen-Shot-2021-08-09-at-12.45.39-PM.png">
                    </div>

                </div>
                <div class="col-12 md:col-6">
                    <div class="profile-info">
                        <h2 class="profile-name">
                            Someone random
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
            <Card class="mb-3 shadow-3">
                <template #title> 1. What is ...</template>
                <template #content>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error
                        repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa
                        ratione quam
                        perferendis esse, cupiditate neque
                        quas!
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