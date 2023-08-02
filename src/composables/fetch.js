import { ref } from 'vue'
import axios from 'axios'

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export async function fetchProfileById(id) {
    const url = baseUrl+"/profile/"+id
    try {
        const response = await axios.get(url)
        const profile = response.data
        return profile
    } catch (error) {
        console.log(error)
    }
}

export async function fetchProfileByName(name, compareId) {
    const path = `${baseUrl}/profile/search`
    const payload = {
        name: name,
        compareId: compareId
    }

    try {
        const response = await axios.get(path, { params: payload })
        const res = response.data

        if (res.data.length > 0) {
            const profile = res.data[0] // using only the first result
            return profile
        }
        else {
            return null
        }
    } catch (error) {
        console.log(error)
    }
}

export async function fetchSimilarity(id1, id2) {
    const simScore = ref(null)
    const p1_stances = ref(null)
    const p2_stances = ref(null)
    const error = ref(null)

    const path = `${baseUrl}/similarity`
    const payload = {
        id1: id1,
        id2: id2
    }
    try {
        const response = await axios.post(path, payload)
        const res = response.data

        simScore.value = res.simScore
        p1_stances.value = res.data[0]
        p2_stances.value = res.data[1]
    } catch (err) {
        console.log(err)
        error.value = err
    }
    return {simScore, p1_stances, p2_stances, error}
}