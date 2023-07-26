import { ref, watchEffect } from 'vue'
import { useHostnameStore } from '../stores/host.js'

// define global var
const host = useHostnameStore()
const $hostname = host.url // hosturl

export function useFetchPersonData(payload) {
    const person_data = ref()
    const personNotFound = ref()
    const error = ref()

    const path = `${$hostname}/person`
    axios.post(path, payload)
        .then((res) => (res.data)) // parse json
        .then((res) => {
            if (res.status == 'success') {
                person_data.value = res.data
                personNotFound.value = false
            } else {
                personNotFound.value = true
                // console.log(res.message)
            }
        })
        .catch((err) => {
            error.value = err
        })
    
    return {person_data, personNotFound, error}
}