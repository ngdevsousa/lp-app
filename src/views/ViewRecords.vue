<template>
    <h1 class="title">Records</h1>
    <div class="field has-addons">
        <div class="control is-expanded">
            <input v-model="queryParams.searchTerm" class="input" type="text" placeholder="Search">
        </div>
        <div class="control ml-4">
            <router-link to="/new-operation" class="button is-info is-rounded">
                New Operation
            </router-link>
        </div>
    </div>
    <Transition>
        <div v-if="storeRecords.records?.length > 0">
            <label class="label">Records Found: {{ storeRecords.count }}</label>
            <Table :records="storeRecords.records" :on-delete="onDelete"></Table>
            <div class="columns">
                <div class="column is-three-quarters">
                    <PaginationNav :pages="storeRecords.pages(queryParams.pageSize)" :page-number="storeRecords.page"
                        :on-click="onPaginationClick" />
                </div>
                <div class="column">
                    <div class="select">
                        <select v-model="queryParams.pageSize">
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                </div>
                <div class="column">
                    <div class="select">
                        <select v-model="queryParams.sort">
                            <option value="ASC">ASC</option>
                            <option value="DESC">DESC</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
    import { debounce } from 'lodash';
    import { onMounted, reactive, watch } from 'vue';
    import { useStoreRecords } from '../stores/storeRecords';
    import { ISearchRecords } from '../types';
    import Table from '../components/Records/Table.vue';
    import PaginationNav from '../components/Records/PaginationNav.vue';

    const queryParams = reactive<ISearchRecords>({ pageNumber: 1, pageSize: 10, sort: 'DESC' })
    const storeRecords = useStoreRecords()
    const searchDebounce = debounce(storeRecords.search, 1000)
    const onPaginationClick = (page: number) => queryParams.pageNumber = page
    const onDelete = async (recordId: number) => await storeRecords.delete(recordId)

    onMounted(() => {
        storeRecords.init()
    })

    watch(queryParams, (queryParams) => {
        searchDebounce(queryParams)
    })
</script>

<style>
    .v-enter-active,
    .v-leave-active {
        transition: opacity 1s ease-in;
    }

    .v-enter-from,
    .v-leave-to {
        opacity: 0;
    }
</style>
