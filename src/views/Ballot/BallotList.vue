<script setup>
import { ref, computed, toRefs } from 'vue'
import BallotListCard from './BallotListCard.vue'

const props = defineProps({
    profiles: Array,
    position: {
        type: String,
    }
})
// adding reactivity to the passed-in props
// so that when its value changes in the parent, this component will get updated
const {profiles, position} = toRefs(props)

// politician list in the data that will get looped
// when user selects a different position,  list changes
const politicians = computed(() => {
    return profiles.value.filter(p => p.position == position.value)
})

function sortLeastToMost(profileA, profileB) {
    return profileA.simScore - profileB.simScore
}

function sortMostToLeast(profileA, profileB) {
    return profileB.simScore - profileA.simScore
}

const SORT_LABELS = ['Most to least similar', 'Least to most similar']
const SORT_FUNCTIONS = [sortMostToLeast, sortLeastToMost]
const sortMethodNumber = ref(0)

// sort the array
const sortedPoliticians = computed(() => {
    return [...politicians.value].sort(SORT_FUNCTIONS[sortMethodNumber.value])
})

const sortButtonLabel = computed(() => {
    return SORT_LABELS[(sortMethodNumber.value + 1) % SORT_LABELS.length]
})

function sortMethodChange() {
    sortMethodNumber.value = (sortMethodNumber.value + 1) % SORT_LABELS.length
}

</script>

<template>
    <Button @click="sortMethodChange" :label="sortButtonLabel" icon="pi pi-sort-alt" iconPos="right" />
    <!-- need to update key later -->
    <BallotListCard v-for="politician in sortedPoliticians" :key="politician.name"
        v-bind="politician"></BallotListCard>
</template>