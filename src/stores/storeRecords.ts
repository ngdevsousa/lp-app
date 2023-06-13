import { defineStore } from "pinia";
import api from "../services/api";
import { IRecord, IRecordsResponse, ISearchRecords } from "../types";

export const useStoreRecords = defineStore('storeRecords', {
    state: () => {
        return {
            records: [] as IRecord[],
            count: 0,
            page: 1,
            isLoading: false
        }
    },
    actions: {
        async init() {
            this.isLoading = true
            const { data: { records, page_number, total_count } } = await api.get<IRecordsResponse>('/records?page_size=10')
            if(total_count === 0) {
                this.isLoading = false
                return
            }

            this.records = records
            this.count = total_count
            this.page = page_number

            this.isLoading = false
        },
        async search(options: ISearchRecords) {
            let url = `/records?search=${options.searchTerm || ''}`
            if (options.pageNumber)
                url += `&page_number=${options.pageNumber}`
            if (options.pageSize)
                url += `&page_size=${options.pageSize}`
            if (options.sort)
                url += `&sort=${options.sort}`

            const { data: { records, total_count, page_number } } = await api
                .get<IRecordsResponse>(url)
            this.records = records
            this.count = total_count
            this.page = page_number
        },
        async delete(recordId: number) {
            const url = `/records/${recordId}`
            await api.delete(url)
            this.records = this.records.filter(record => record.id !== recordId)
        }
    },
    getters: {
        pages: (state) => (pageSize: number) => Math.ceil(state.count / pageSize)
    }
})