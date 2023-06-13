import { defineStore } from "pinia";
import api from "../services/api";
import { ICredentials, IUser } from "../types";
import { useStoreBalance } from "./storeBalance";

export const useStoreAuth = defineStore('storeAuth', {
    state: () => {
        return {
            user: {} as IUser
        }
    },
    actions: {
        init() {
            const userString = localStorage.getItem('user') || '{}'
            
            if(userString === '{}')
                return this.router.push('/login')
            
            const userFromStorage: IUser = JSON.parse(userString)
            this.user = userFromStorage
        },
        async login(credentials: ICredentials) {
            try {
                const storeBalance = useStoreBalance()
                const { data } = await api.post('/auth', credentials)
                this.user = {
                    token: data.access_token,
                    username: credentials.username
                }

                localStorage.setItem('user', JSON.stringify(this.user))
                storeBalance.setBalance(data.balance)
                this.router.push('/')
            } catch (error) {
                alert('Invalid credentials')
            }
        },
        logout() {
            localStorage.clear()
            this.router.go(0)
        }
    },
    getters: {
        acessToken: (state) => state.user.token
    }
})