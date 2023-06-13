import { defineStore } from "pinia";
import api from "../services/api";
import { INewOperation, INewOperationResponse } from "../types";
import { useStoreBalance } from "./storeBalance";

export const useStoreOperations = defineStore('storeOperations', {
    state: () => {
        return {
            result: '...',
            isLoading: false,
            errorMessage: ''
        }
    },
    actions: {
        async create(payload: INewOperation) {
            try {
                this.isLoading = true
                
                const storeBalance = useStoreBalance()
                const res = await api.post<INewOperationResponse>('/operations', payload)
                
                storeBalance.setBalance(res.data.user_balance)
                this.result = res.data.operation_response
                this.clearError()
                this.isLoading= false
            } catch (error: any) {
                this.errorMessage = error.response.data.message
                this.isLoading = false
            }
        },
        clearError() {
            this.errorMessage = ''
        }
    },
    getters: {
        hasError: (state) => state.errorMessage !== ''
    }
})