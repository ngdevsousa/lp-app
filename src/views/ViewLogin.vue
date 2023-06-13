<template>
    <div class="container is-centered box mt-6 custom-form">
        <p class="title has-text-centered">Login</p>

        <form @submit="onSubmit">
            <div class="field">
                <label class="label">Username</label>
                <div class="control">
                    <input v-model="credentials.username" class="input" type="email" placeholder="e.g. foo@example.com">
                </div>
            </div>

            <div class="field">
                <label class="label">Password</label>
                <div class="control">
                    <input v-model="credentials.password" class="input" type="password" placeholder="********">
                </div>
            </div>

            <button class="button is-primary">Login</button>
        </form>
    </div>
</template>

<script setup lang="ts">
    import { reactive } from 'vue';
    import { useStoreAuth } from '../stores/storeAuth';
    import { ICredentials } from '../types';

    const storeAuth = useStoreAuth()
    const credentials = reactive<ICredentials>({
        username: '',
        password: ''
    })

    const clearCredentials = () => {
        credentials.username = ''
        credentials.password = ''
    }

    const onSubmit = async () => {
        await storeAuth.login(credentials)
        clearCredentials()
    }
</script>

<style>
    .custom-form {
        max-width: 500px;
    }
</style>