<script setup>
import { ref, toRef } from 'vue'
import Rating from 'primevue/rating';

const props = defineProps({
    issue: {
        type: Object,
        default: {
            issue: "some question",
            issue_id: "0",
            category: "some category",
        }
    },
    stance: Number,
    importance: Number
})
const emit = defineEmits(['update:stance', 'update:importance'])

const stance = toRef(props.stance)
const importance = toRef(props.importance)

const options = ref([
    { name: 'strongly disagree', value: -1 },
    { name: 'disagree', value: -0.5 },
    { name: 'neutral', value: 0 },
    { name: 'agree', value: 0.5 },
    { name: 'strongly agree', value: 1 },
])

function stanceChange() {
    emit('update:stance', stance.value);
}

function importanceChange() {
    emit('update:importance', importance.value)
}

// hide importance UNLESS it's a pre-filled in question
const showImportance = ref(props.stance != null)

function loadImportance() {
    showImportance.value = true
}

</script>

<template>
    <p>{{ issue.issue }}</p>
    <div v-for="option in options" class="option_div" :key="option.name">
        <RadioButton @change="stanceChange" @change.once="loadImportance" v-model="stance" :inputId="issue.issue_id + option.name"
            :value="option.value" />
        <label :for="issue.issue_id + option.name" class="ml-2">{{ option.name }}</label>
    </div>
    <Rating v-if="showImportance" @change="importanceChange" v-model="importance" :cancel="false" />
</template>