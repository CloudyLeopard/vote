import { defineStore } from 'pinia';
import axios from 'axios'

import { useHostnameStore } from './host';

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
        localStorage.setItem('userId', id)
      },
      setUserName(name) {
        this.userName = name;
        localStorage.setItem('userName', name)
      },
      async fetchUserData() {
        const hostname = useHostnameStore()
        const path = `${hostname.getUrl}/user`
        const response = await axios.get(path, {
            params: {
                userId: this.userId,
            }
        })
        return response.data
      }
    },
  });
  