import { defineStore } from 'pinia';

export const useHostnameStore = defineStore({
    id: 'hostname',
    state: () => ({
        url: 'http://127.0.0.1:5001'
        // url: 'https://vote-easy.azurewebsites.net'
    }),
    getters: {
        getUrl() {
            return this.url
        }
    }
})