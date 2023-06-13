import { defineStore } from "pinia";
import api from "../services/api";
import { IUserBalanceResponse } from "../types";

export const useStoreBalance = defineStore('storeBalance', {
    state: () => {
        return {
            balance: 0,
            isLoading: false
        }
    },
    actions: {
        async init() {
            this.isLoading = true
            
            const { data: { balance } } = await api.get<IUserBalanceResponse>('/users/balance')

            this.setBalance(balance)

            this.isLoading = false
        },
        setBalance(newBalance: number) {
            this.balance = newBalance
            localStorage.setItem('balance', this.balance.toString())
        },
        useBalanceFromStorage() {
            const balance = localStorage.getItem('balance') || ''
            if (balance === '')
                this.balance = 0
            this.balance = parseInt(balance)
        }
    },
    getters: { }
})