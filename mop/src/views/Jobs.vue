<template>
    <div class="container">
        <div class="columns is-centered">
        <div class="column is-7">
            <Card v-for="i in [1,2,3,4,5,6]" v-bind:key="i" />
        </div>
        </div>
    </div>
</template>

<script>
import Card from './../components/Card/Card'
export default {
    name: 'jobs',
    components: {
        Card
    }
}
</script>
