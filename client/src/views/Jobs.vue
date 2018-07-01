<template>
    <div class="container">
        <div class="columns is-centered">
        <div class="column is-8">
            <Card type="vacancy" :data="job" v-for="job in data" v-bind:key="job._id" />
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
    },
    data: function(){
        return {
            data: []
        }
    },
    created: function(){
        fetch(`https://bokunozibra.herokuapp.com/api/vacancy/?page=0&perPage=200`, {headers: {'Authorization': this.$store.state.auth.authToken,'content-type': 'application/json'}}).then(res=>{
            return res.json()
        }).then(res=>{
            this.data = res.data;
            console.log(res.data)
        })
    }
}
</script>
