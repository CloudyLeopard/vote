<script setup>
import axios from 'axios'

import { ref } from 'vue'

import { useHostnameStore } from '../stores/host.js'

const host = useHostnameStore()
const $hostname = host.url // hosturl

const summary = ref('')

const genSummaryForm = ref({
    name: '',
    party: '',
    quote: '',
    url: ''
})

function genSummary(payload) {
    const path = `${$hostname}/summary`
    axios.post(path, payload)
        .then((res) => {
            summary.value = res.data.summary
        })
        .catch((error) => {
            console.log(error);
        })
}

function handleGenSummary() {
    summary.value = "loading..."

    const payload = {
        name: genSummaryForm.value.name,
        party: genSummaryForm.value.party,
        quote: genSummaryForm.value.quote,
        url: genSummaryForm.value.url,
    }

    genSummary(payload)
}

</script>

<template>
    <div class="container">
        <div class="row">
            <form @submit.prevent="handleGenSummary">
                <div class="mb-3">
                    <label for="name" class="form-label">Enter name</label>
                    <input v-model="genSummaryForm.name" type="text" class="form-control" id="name" placeholder="Bob Joe">
                </div>
                <div class="mb-3">
                    <label for="party" class="form-label">Enter party</label>
                    <input v-model="genSummaryForm.party" type="text" class="form-control" id="party" placeholder="Republican">
                </div>
                <div class="mb-3">
                    <label for="quote" class="form-label">Enter quote</label>
                    <textarea v-model="genSummaryForm.quote" class="form-control" id="quote" rows="3"></textarea>
                </div>
                <div class="mb-3">
                    <label for="url" class="form-label">Enter URL</label>
                    <input v-model="genSummaryForm.url" type="text" class="form-control" id="url" placeholder="https://www.google.com">
                </div>
                <div class="mb-3">
                    <label for="output" class="form-label">Important Viewpoints</label>
                    <textarea readonly class="form-control" id="output" rows="10"
                        style="background-color: gainsboro;">{{ summary }}</textarea>
                </div>
                <button type="submit" class="btn btn-primary" id="submit">Submit</button>
            </form>
        </div>
    </div>
</template>