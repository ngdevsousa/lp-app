<template>
    <h1 class="title">New Operation</h1>
    <article v-if="storeOperations.hasError" class="message is-danger">
        <div class="message-header">
            <p>Error</p>
            <button @click="storeOperations.clearError" class="delete"></button>
        </div>
        <div class="message-body">
            {{ storeOperations.errorMessage }}
        </div>
    </article>
    <div class="field">
        <label class="label">X</label>
        <div class="control">
            <input v-model="formData.x" class="input" type="number" placeholder="First value">
        </div>
    </div>

    <div class="field">
        <label class="label">Y</label>
        <div class="control">
            <input v-model="formData.y" class="input" type="number" placeholder="Second value">

        </div>
    </div>

    <div class="field">
        <label class="label">Type</label>
        <div class="control">
            <div class="select">
                <select v-model="formData.type">
                    <option>addition</option>
                    <option>subtraction</option>
                    <option>multiplication</option>
                    <option>division</option>
                    <option>square_root</option>
                    <option>random_string</option>
                </select>
            </div>
        </div>
    </div>

    <div class="field is-grouped">
        <div class="control">
            <button @click="onSubmit" class="button is-link" :class="{ 'is-loading': storeOperations.isLoading }">
                Create
            </button>
        </div>
        <div class="control">
            <button class="button is-link is-light">Cancel</button>
        </div>
    </div>

    <div>
        <label class="label">Result</label>
        <div class="box">{{ storeOperations.result }}</div>
    </div>
</template>

<script setup lang="ts">
    import { reactive } from 'vue';
    import { useStoreOperations } from '../stores/storeOperations';
    import { INewOperation } from '../types';

    const formData = reactive<INewOperation>({ type: 'addition' })
    const storeOperations = useStoreOperations()
    const onSubmit = async () => {
        await storeOperations.create(formData)
    }
</script>