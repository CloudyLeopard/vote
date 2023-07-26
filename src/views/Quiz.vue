<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

import { useHostnameStore } from '../stores/host.js'
import { useUserStore } from '../stores/user.js'

import { useToast } from 'primevue/usetoast';

import QuizQuestion from '../components/QuizQuestion.vue'

const toast = useToast();

// define global var
const host = useHostnameStore()
const $hostname = host.url // hosturl
const user = useUserStore()

const QUESTIONS_PER_LOAD = 3

// number of issues loaded for each category
const categorized_issues = ref({})

// issues that will be displayed depending on how many questions are "loaded" in
const categorized_issues_display = ref({})

// increate page number for that category when "load more" is clicked
function onLoadMore(category) {
    const display_arr = categorized_issues_display.value[category]
    const original_arr = categorized_issues.value[category]

    const new_loaded_num = display_arr.length + QUESTIONS_PER_LOAD
    categorized_issues_display.value[category] = original_arr.slice(0, new_loaded_num)
}

// stores the results; linked to the "stance" and "importance" selection via v-model
const results = ref({})

function submitHandler() {
    const params = {
        answers: results.value,
        user_id: user.userId
    }
    const url = $hostname + '/user/newuser'
    axios.post(url, params)
        .then((res) => (res.data)) // parse json
        .then((res) => {
            if (res['status'] == 'success') {
                user.setUserId(res['user_id'])
                toast.add({ severity: 'success', summary: 'Data Added!', detail: 'Successfully created/updated profile', life: 3000 });
            }
        })
}

onMounted(() => {
    // get issue list
    const url = $hostname + '/similarity/issues'
    axios.get(url)
        .then((res) => {
            if (res.data['status'] == 'success') {
                // temporary var for holding the issue list
                const issues = res.data['issue_list']

                // store form's issue_id -> stance(result) pairs 
                results.value = issues.reduce(function (r, a) {
                    // note: a.issue_id should be a string here
                    // due to how js parses JSON data
                    r[a.issue_id] = {
                        stance: null,
                        importance: 3 // default importance value
                    }
                    return r
                }, Object.create(null))

                // "sort" issue list by category into object
                categorized_issues.value = issues.reduce(function (r, a) {
                    r[a.category] = r[a.category] || [];
                    r[a.category].push(a);
                    return r
                }, Object.create(null))

                // init number of questions to be displayed
                const categories = Object.keys(categorized_issues.value);
                categories.forEach((cat) => {
                    categorized_issues_display.value[cat] = categorized_issues.value[cat].slice(0, QUESTIONS_PER_LOAD);
                })
            }
            else
                alert('something went wrong')
        })
})

</script>

<template>
    <Toast />
    <form @submit.prevent="submitHandler">
        <div v-for="(issues, category) in categorized_issues_display" class="category_div" :key="category">
            <h3>{{ category }}</h3>
            <div v-for="issue in issues" class="question_div" :key="issue.issue_id">
                <QuizQuestion :issue="issue" v-model:stance="results[issue.issue_id]['stance']"
                    v-model:importance="results[issue.issue_id]['importance']">
                </QuizQuestion>
            </div>
            <Button @click="onLoadMore(category)" label="Show More" />
        </div>
        <Button type="submit" label="Submit" />
    </form>
</template>