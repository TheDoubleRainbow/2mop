<template>
    <div class="container">
        <div class="columns is-centered">
        <div class="column is-8">
            <Card type="hakaton" :data="hackathon" v-for="hackathon in hackathons" v-bind:key="hackathon._id" />
        </div>
        </div>
    </div>
</template>

<script>
import Card from './../components/Card/Card'
export default {
    name: 'hackathons',
    components: {
        Card
    },
    data: function(){
        return {
            hackathons: []
        }
    },
    created: function(){
        fetch(`https://bokunozibra.herokuapp.com/api/hakaton/?page=0&perPage=200`, {headers: {'Authorization': this.$store.state.auth.authToken,'content-type': 'application/json'}}).then(res=>{
            return res.json()
        }).then(res=>{
            this.hackathons = res.data;
            console.log(res.data)
        })
    }
}
</script>
