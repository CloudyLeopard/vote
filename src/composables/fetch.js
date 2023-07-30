const baseUrl = `${import.meta.env.VITE_API_URL}`;

export async function fetchProfileData(id) {
    const url = baseUrl+"/profile/"+id
    try {
        const response = await axios.get(url)
        return response.data
    } catch (error) {
        console.log(error)
    }
}