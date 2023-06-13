<template>
    <nav class="pagination is-centered" role="navigation" aria-label="pagination">
        <a class="pagination-previous">Previous</a>
        <a class="pagination-next">Next page</a>
        <ul class="pagination-list">
            <li v-for="n in props.pages">
                <a @click="() => props.onClick(n)" class="pagination-link"
                    :class="{ 'is-current': n === props.pageNumber }">{{ n }}</a>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
    interface IPaginationProps {
        pages: number
        pageNumber: number
        onClick: Function
    }

    const props = defineProps<IPaginationProps>()
</script>