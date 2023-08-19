<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router';

import { useUserStore, useProfilesStore } from '@/stores'
import { fetchProfileById } from '@/composables'

import { useToast } from 'primevue/usetoast';

import CustomInput from '@/components/CustomInput.vue'
import QuizQuestion from './QuizQuestion.vue'
const toast = useToast();

// define global var
const baseUrl = `${import.meta.env.VITE_API_URL}`;
const user = useUserStore()
const profiles = useProfilesStore()
const route = useRoute()

const QUESTIONS_PER_LOAD = 3

// 0. Trivial questions
const user_name = ref(user.profileName)
const email = ref("")

// 1. list of issues fetched from server; also will store results with "stance" and "importance" keys
const issue_list = ref([])

// 2. list of issues organized into categories
const categorized_issues = ref({})

// 3. issues that will be displayed depending on how many questions are "loaded" in
const categorized_issues_display = ref({})

// function to increment page number for that category when "load more" is clicked
function onLoadMore(category) {
    const display_arr = categorized_issues_display.value[category]
    const original_arr = categorized_issues.value[category]

    const new_loaded_num = display_arr.length + QUESTIONS_PER_LOAD
    categorized_issues_display.value[category] = original_arr.slice(0, new_loaded_num)
}

// for creating profile
async function formSubmit() {
    const params = {
        name: user_name.value,
        email: email.value,
        issueStances: issue_list.value,
        type: "user"
    }
    if (route.query.id) {
        await updateProfile(params, route.query.id)
    } else if (profiles.custom_profile.id) {
        await updateProfile(params, profiles.custom_profile.id)
    }
    else {
        await createProfile(params)
    }
}

async function createProfile(params) {
    const url = baseUrl + '/profile/create'

    try {
        const response = await axios.post(url, params)
        const res = response.data

        const prof = profiles.setCustomProfile(res)
        user.setProfile(prof)
        toast.add({ severity: 'success', summary: 'Data Added!', detail: 'Id: ' + user.profileId, life: 5000 });
    } catch (error) {
        console.log(error)
    }
}

async function updateProfile(params, id) {
    const url = baseUrl + '/profile/' + id

    try {
        const response = await axios.post(url, params)
        const res = response.data

        const prof = profiles.setCustomProfile(res)
        user.setProfile(prof)
        toast.add({ severity: 'success', summary: 'Data Updated!', detail: 'Id: ' + user.profileId, life: 5000 });
    } catch (error) {
        console.log(error)
    }
}

async function getIssueList() {
    const url = baseUrl + '/issues'
    const params = {}

    let id; // vote easy id we are using
    let existing_custom_prof; // custom profile of id
    if (route.query.id) {
        // if there is an id in url, use that
        id = route.query.id
    } else if (profiles.custom_profile.id) {
        // if not, but a custom profile is set, use that id instead
        id = profiles.custom_profile.id
    }

    console.log("ID: " + id)

    if (id) {
        existing_custom_prof = await fetchProfileById(id)
        if (existing_custom_prof) {
            params["id"] = existing_custom_prof["id"]
            // fill in values in form
            email.value = existing_custom_prof["email"]
            user_name.value = existing_custom_prof["name"]
        }
    }
    try {
        const response = await axios.get(url, { params: params })
        const res = response.data

        issue_list.value = res.data.map(issue => {
            if ("stance" in issue) // autofill form if value exists
                return issue
            else
                return {
                    ...issue,
                    stance: null,
                    importance: 3
                }
        })
        if ("email" in res)
            email.value = res.data.email

        // "sort" issue list by category into object
        categorized_issues.value = issue_list.value.reduce(function (r, a) {
            r[a.category] = r[a.category] || [];
            r[a.category].push(a); // shallow copy of a
            return r
        }, Object.create(null))

        // init number of questions to be displayed
        const categories = Object.keys(categorized_issues.value);
        categories.forEach((cat) => {
            categorized_issues_display.value[cat] = categorized_issues.value[cat].slice(0, QUESTIONS_PER_LOAD);
        })
    } catch (error) {
        console.log(error)
    }
}

onMounted(async () => {
    // future use cases. e.g. parsing /profile/quiz?id=xxxx
    console.log(route.query.id)
    // get issue list
    await getIssueList()
})

</script>

<template>
    <Toast />
    <form @submit.prevent="formSubmit">
        <CustomInput v-model="user_name" placeholder="Name"></CustomInput>
        <CustomInput v-model="email" placeholder="Email"></CustomInput>
        <div v-for="(issues, category) in categorized_issues_display" class="category_div" :key="category">
            <h3>{{ category }}</h3>
            <div v-for="issue in issues" class="question_div" :key="issue.issue_id">
                <QuizQuestion :issue="issue" v-model:stance="issue['stance']" v-model:importance="issue['importance']">
                </QuizQuestion>
            </div>
            <Button @click="onLoadMore(category)" label="Show More" />
        </div>
        <Button type="submit" label="Submit" />
    </form>
</template>