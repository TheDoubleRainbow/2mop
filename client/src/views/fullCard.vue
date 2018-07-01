<template>
    <div class="container">
        <div class="columns is-centered">
            <div class="column is-8">
                <div class="fullCardHeader card fullCard  columns">
                    <div class="column is-3">
                        <img class="fullCardImage card" :src="data.photo ? data.photo : 'http://bokunozibra.herokuapp.com/img/topnep.0e75caa0.jpg'" />
                    </div>
                    <div class="column is-9">
                        <div class="fullCardName">{{data.name}}</div>
                        <div class="columns">
                            <div class="column is-5 profileContactFist">
                                <div class="ContactElement">
                                    <span class="icon"><i class="fas fa-map-marker-alt"></i></span> {{data.location && data.location.formattedAddress ? data.location.formattedAddress : 'None'}}
                                </div>
                                <div class="ContactElement">
                                    <span class="icon"><i class="fas fa-mobile"></i></span> {{compData.phoneNumber ? compData.phoneNumber : 'None'}}
                                </div>
                            </div>
                            <div class="column is-7 profileContactSecond">
                                <div class="ContactElement">
                                    <span class="icon"><i class="fas fa-briefcase"></i></span> {{compData.name ? compData.name : 'None'}}
                                </div>
                                <div class="ContactElement">
                                    <span class="icon"><i class="fas fa-envelope"></i></span> {{compData.email ? compData.email : 'None'}}
                                </div>
                            </div>
                        </div>
                        <div v-if="data.requiredSkills && data.requiredSkills.length > 0" class="fullCardSkills">
                            Skills: 
                            <span class="card tag is-light skillTag fullCardSkillTag" v-for="(skill, i) in data.requiredSkills" :key="i">{{skill}}</span>
                        </div>
                        <div v-if="data.types && data.types.length > 0" class="fullCardSkills">
                            Types: 
                            <span class="card tag is-light skillTag fullCardSkillTag" v-for="(type, i) in data.types" :key="i">{{type}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="data.description" class="columns is-centered">
            <div class="column is-8">
                <div class="card columns is-centered fullCardDesc">
                        <div class="column is-12">
                            <div class="cardHeader">Description</div>
                            <div class="cardDescription">{{data.description}}</div>
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'fullCard',
    created: function(){
        this.type = this.$route.params.type;
        this.id = this.$route.params.id;

        fetch(`https://bokunozibra.herokuapp.com/api/${this.type}/${this.id}`).then(res=>{
            return res.json()
        }).then(res => {
            if(res.status === 0){
                this.data = res.data;
                fetch(`http://bokunozibra.herokuapp.com/api/company/${this.data.ownerId}`).then(res=>{
                    return res.json()
                }).then(res => {
                    if(res.status === 0){
                        this.compData = res.data
                    }
                });
            }
        })
    },
    data: function(){
        return {
            type: '',
            id: '',
            data : {},
            compData: {}
        }
    }
}
</script>

<style scoped>
.fullCardDesc{
    margin-top: 10px;
}
.fullCardName{
    width: 70%;
}
.profileContactSecond{
    text-align: center;
}
.fullCardSkillTag{
    margin-left: 10px;
}
.fullCardSkills{
    text-align: left;
}
.fullCardName{
    font-size: 20px;
}
.fullCardImage{
    height: 100pt;
    max-width: 100%;
    border-radius: 100%;
}
.fullCard{
    margin-top: 40px;
}
</style>


