<template>
  <NavBar/>
  
  <div class="container is-max-desktop px-2 py-4">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import NavBar from './components/UI/NavBar.vue';
  import { useStoreAuth } from './stores/storeAuth'
  import { onMounted } from 'vue';
  import { useStoreBalance } from './stores/storeBalance';

  const storeAuth = useStoreAuth()
  const storeBalance = useStoreBalance()

  onMounted(() => {
    storeAuth.init()
    storeBalance.useBalanceFromStorage()
  })

</script>

<style>
  @import 'bulma/css/bulma.min.css';
</style>
