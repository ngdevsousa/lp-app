<template>
    <table class="table 
        is-bordered 
        is-fullwidth 
        is-hoverable 
        is-striped">
        <thead>
            <tr>
                <th>id</th>
                <th>operation</th>
                <th>amount</th>
                <th>balance</th>
                <th>response</th>
                <th>date</th>
                <th>action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="record in props.records" :key="record.id">
                <td>{{ record.id }}</td>
                <td>{{ record.operation.type }}</td>
                <td>{{ record.amount }}</td>
                <td>{{ record.user_balance }}</td>
                <td>{{ record.operation_response }}</td>
                <td>{{ record.date }}</td>
                <td>
                    <button @click="() => props.onDelete(record.id)" 
                        class="button is-rounded is-small is-danger">
                        delete
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import { IRecord } from '../../types';

    interface ITableProps {
        records: IRecord[]
        onDelete: Function
    }

    const props = defineProps<ITableProps>()
</script>