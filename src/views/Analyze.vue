<script setup>
import axios from 'axios';

import { ref } from "vue";

const hideTextcontent = ref([]) // matches formContent.value.sources

const formContent = ref({
    name: "",
    party: "",
    state: "",
    sources: [],
    query: ""
})

const responseObject = ref({
    "result": '',
    "sources": []
})

const formIsSubmitted = ref(false)
const formIsLoaded = ref(false)

function toggleTextArea(event, index) {
    const button = event.target
    hideTextcontent.value[index] = !hideTextcontent.value[index]
    const textarea = button.closest('div').previousElementSibling // DOM traversal

    textarea.style.height = `${textarea.scrollHeight}px`; // resize text area
    textarea.focus()
}

function resizeTextArea(event) {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
}


function addSource(event) {
    const textarea = event.target;
    if (textarea.value != '') { // if empty textarea, do nothing
        formContent.value.sources.push(textarea.value);
        hideTextcontent.value.push(true);
        textarea.value = ''
    }
    // resize textarea after entering data (expand to fit source)
    resizeTextArea(event)
}

function editSource(event, index) {
    const textarea = event.target;
    if (textarea.value != '') { // if empty textarea, do nothing
        formContent.value.sources[index] = textarea.value;
        hideTextcontent.value[index] = true;
    }

    // resize textarea to one row height
    textarea.style.height = 'auto';
}

function handleSubmitForm() {
    // checking for empty values
    if (formContent.value.sources.length == 0)
        return;
    if (formContent.value.query.length == 0)
        return;

    // display loading area
    formIsSubmitted.value = true;
    formIsLoaded.value = false;

    window.scrollTo(0, document.body.scrollHeight); // scroll to bottom


    const payload = {
        name: formContent.value.name,
        party: formContent.value.party,
        state: formContent.value.state,
        sources: formContent.value.sources,
        query: formContent.value.query
    }

    submitForm(payload)
}

function submitForm(payload) {
    const path = 'http://localhost:5001/qa'
    axios.post(path, payload)
        .then((res) => {
            responseObject.value.result = res.data.result;
            responseObject.value.sources = res.data.sources;
            formIsLoaded.value = true
        })
        .catch((error) => {
            console.log(error);
        })
}

</script>

<template>
    <div class="wrapping-container">
        <h1>Basic Information</h1>
        <p>Background information on the politician</p>

        <div class="box-container">
            <div class="row">
                <label class="col-5 icon-with-text" for="politicianName">
                    <font-awesome-icon class="icon" icon="fa-regular fa-user" />
                    <span>Name</span>
                </label>
                <div class="col-7 d-flex align-items-end">
                    <input v-model="formContent.name" class="transparent-input" type="text" id="politicianName"
                        placeholder="Enter here">
                </div>
            </div>
            <hr />

            <div class="row">
                <label class="col-5 icon-with-text" for="politicianParty">
                    <font-awesome-icon class="icon" icon="fa-regular fa-flag" />
                    <span>Party</span>
                </label>
                <div class="col-7 d-flex align-items-end">
                    <input v-model="formContent.party" class="transparent-input" type="text" id="politicianParty"
                        placeholder="Enter here">
                </div>
            </div>
            <hr />

            <div class="row">
                <label class="col-5 icon-with-text" for="politicianState">
                    <font-awesome-icon class="icon" icon="fa-regular fa-map" />
                    <span>State</span>
                </label>
                <div class="col-7 d-flex align-items-end">
                    <input v-model="formContent.state" class="transparent-input" type="text" id="politicianState"
                        placeholder="Enter here">
                </div>
            </div>
        </div>

        <h1>Sources</h1>
        <p>Things said by the politician that reflects their point of view (press ENTER to save)</p>

        <div class="box-container">
            <div v-for="(src, index) in formContent.sources" :key="index">
                <div class="row">
                    <div class="col-5 icon-with-text">
                        <font-awesome-icon class="icon" icon="fa-regular fa-comment" />
                        <span>Source {{ index + 1 }}</span>
                    </div>
                    <div class="col-7 d-flex align-items-end">
                        <textarea class="transparent-input auto-expand" placeholder="Enter here" rows="1" :value="src" :readonly="hideTextcontent[index]"
                            @input="resizeTextArea" @keydown.enter.prevent @keyup.enter="editSource($event, index)"></textarea>
                        <div style="font-size: 16px;">
                            <font-awesome-icon v-if="hideTextcontent[index]" @click="toggleTextArea($event, index)" icon="fa-regular fa-pen-to-square"/>
                        </div>
                    </div>
                </div>
                <hr />
            </div>

            <div class="row">
                <div class="col-5 icon-with-text" for="politicianName">
                    <font-awesome-icon class="icon" icon="fa-regular fa-comment" />
                    <span>Source {{ formContent.sources.length + 1 }}</span>
                </div>
                <div class="col-7 d-flex align-items-end">
                    <textarea class="transparent-input auto-expand" id="politicianSource" placeholder="Enter here" rows="1"
                        @input="resizeTextArea" @keydown.enter.prevent @keyup.enter="addSource"></textarea>
                </div>
            </div>
        </div>

        <h1>Question</h1>
        <p>See how a politician will respond to a question</p>

        <div class="box-container">
            <input v-model="formContent.query" class="transparent-input" type="text" id="question"
                placeholder="e.g. How will Bob react to Alice stealing his apple?">
        </div>

        <button @click="handleSubmitForm" class="btn-64"><span>Ask now</span></button>

        <div v-if="formIsSubmitted" class="response-container">
            <h1>Response</h1>
            <p>A GPT generated answer based on your given sources and question</p>

            <div class="box-container">
                <div v-if="formIsLoaded">
                    <p>A: {{ responseObject.result }}</p>
                    <div v-for="(src, index) in responseObject.sources" :key="index">
                        <hr />
                        <div class="row">
                            <div class="col-5 icon-with-text">
                                <font-awesome-icon class="icon" icon="fa-regular fa-bookmark" />
                                <span>Source {{ index + 1 }}</span>
                            </div>
                            <div class="col-7 d-flex align-items-end">
                                <p class="mb-0">{{ src }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else>
                    <div class="d-flex justify-content-center align-items-center">
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="css" src="../assets/btn-64.css">
/* import button css */
</style>

<style scoped>
.wrapping-container {
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 100px;
    padding-left: 20px;
    padding-right: 20px;
    font-family: Mali;
}

.wrapping-container h1 {
    color: #c68e17;
}


.box-container {
    background-color: white;
    padding-left: 50px;
    padding-right: 50px;
    padding-top: 55px;
    padding-bottom: 55px;
    margin-bottom: 50px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    font-family: Roboto;
    color: #555555;
}

.icon-with-text {
    display: inline-flex;
    align-items: center;
    font-size: 20px;
}

.icon {
    margin-right: 10px;
    vertical-align: middle;
    color: #00A67E;
}

.transparent-input {
    width: 100%;
    background-color: transparent;
    border: none;
    outline: none;
    padding-bottom: 0px
}

.auto-expand {
    resize: none;
    overflow: hidden;
}
</style>