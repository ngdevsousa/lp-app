<template>
    <nav class="navbar is-link" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <div class="navbar-item is-size-3 is-family-monospace">
                Arithmetic Calculator
            </div>
        </div>

        <div class="navbar-menu">
            <div v-if="storeAuth.user.username" class="navbar-start">
                <router-link to="/" class="navbar-item">
                    Home
                </router-link>

                <router-link to="/new-operation" class="navbar-item">
                    Operations
                </router-link>
            </div>
            <div v-if="storeAuth.user.username" class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <button 
                            class="button is-rounded is-success is-light mr-4"
                            :class="{ 'is-loading': storeBalance.isLoading }">
                            Balance: ${{ storeBalance.balance }}
                        </button>
                        <button @click="storeAuth.logout"
                            class="button is-rounded is-danger is-light">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
    import { useStoreAuth } from '../../stores/storeAuth';
    import { useStoreBalance } from '../../stores/storeBalance';


    const storeAuth = useStoreAuth()
    const storeBalance = useStoreBalance()
</script>