import { ref } from 'vue'
import axios from 'axios'

const baseUrl = `${import.meta.env.VITE_API_URL}`;

/*
returns profile (null if not found)
*/
export async function fetchProfile(id, id_type, compareId = null) {
    let profile = null;
    if (id_type == "name") {
        const { profiles } = await fetchProfileByName(id, compareId)
        if (profiles.length > 0) {
            profile = profiles[0]
        }
    }
    else if (id_type == "id") {
        profile = await fetchProfileById(id, compareId)
    }

    return profile
}

export async function fetchProfileById(id) {
    const url = baseUrl+"/profile/"+id
    try {
        const response = await axios.get(url)
        const profile = response.data
        return profile
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function fetchProfileByName(name, compareId = null) {
    let profiles = []
    let num_of_profile = null
    let error = null

    const path = `${baseUrl}/profile/search`
    const payload = {
        name: name,
        compareId: compareId
    }

    try {
        const response = await axios.get(path, { params: payload })
        const res = response.data

        profiles = res.data // using only the first result
        num_of_profile = res.data.length
    } catch (err) {
        error = err
    }
    return { profiles, num_of_profile, error }
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