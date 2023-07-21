<script setup>
import { computed, toRefs } from 'vue'
import BallotListCard from '../components/BallotListCard.vue'

const props = defineProps({
    politiciansData: Object,
    position: {
        type: String,
    }
})
// adding reactivity to the passed-in props
// so that when its value changes in the parent, this component will get updated
const {politiciansData, position} = toRefs(props)

// politician list in the data that will get looped
const politicians = computed(() => {
    return politiciansData.value['categories'][position.value]
})
// when user selects a different position,  list changes

</script>

<template>
    <!-- need to update key later -->
    <BallotListCard v-for="politician in politicians" :key="politician.name"
        v-bind="politician"></BallotListCard>
</template>