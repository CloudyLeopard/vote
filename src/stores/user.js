import { defineStore } from 'pinia';
import axios from 'axios'

// define global variables
const $hostname = inject('$hostname')

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
      userId: localStorage.getItem('userId'), // for persist data. set to null if DNE
      userName: localStorage.getItem('userName')
    }),
    getters: {
      getUserId() {
        return this.userId;
      },
      getUserName() {
        return this.userName;
      }
    },
    actions: {
      setUserId(id) {
        this.userId = id;
        localStorage.setItem('userId', userId)
      },
      setUserName(name) {
        this.userName = name;
        localStorage.setItem('userName', userName)
      },
      async fetchUserData() {
        const path = `${$hostname}/user`
        const response = await axios.get(path, {
            params: {
                userId: this.userId,
            }
        })
        return response.data
      }
    },
  });
  