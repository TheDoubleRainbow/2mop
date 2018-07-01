<template>
    <div class="container">
        <div v-if="loaded" class="columns is-centered ">
            <div class="column is-8">
                <div class="card profileCard columns is-centered">
                    <div class="column is-3 portfolioDataImage">
                        <img class="profilePic card" :src="userData.avatar ? userData.avatar : 'http://bokunozibra.herokuapp.com/userPic.png'" />
                    </div>
                    <div class="column is-8 portfolioDataText">
                        <div class="profileName">
                            <div class="column is-10 profileName">{{userData.name.first}} {{userData.name.last}}</div>
                        </div>
                        <div class="columns">
                            <div class="column is-5 profileContactFist">
                                <div v-if="type != 'company'" class="ContactElement">
                                    <span class="icon"><i class="fas fa-map-marker-alt"></i></span> {{userData.location.formattedAddress ? userData.location.formattedAddress : 'None'}}
                                </div>
                                <div class="ContactElement">
                                    <span class="icon"><i class="fas fa-mobile"></i></span> {{userData.phoneNumber ? userData.phoneNumber : 'None'}}
                                </div>
                            </div>
                            <div class="column is-7 profileContactSecond">
                                <div v-if="type != 'company'" class="ContactElement">
                                    <span class="icon"><i class="fas fa-briefcase"></i></span> {{userData.profession ? userData.profession : 'None'}}
                                </div>
                                <div v-if="type == 'company'" class="ContactElement">
                                    <span class="icon"><i class="fas fa-briefcase"></i></span> {{userData.name ? userData.name : 'None'}}
                                </div>
                                <div class="ContactElement">
                                    <span class="icon"><i class="fas fa-envelope"></i></span> {{userData.email ? userData.email : 'None'}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="userData.description" class="card columns is-centered profileCard">
                    <div class="column is-12">
                        <div class="cardHeader">Description</div>
                        <div class="cardDescription">{{userData.description}}</div>
                    </div>
                </div>
                <div v-if="type != 'company' && userData.skills.length > 0 || type != 'company' && userData.portfolio.length > 0" class="card columns is-centered profileCard">
                    <div v-if="userData.skills.length > 0" class="column is-6 skills">
                        <div class="cardHeader skillHeader">Skills</div>
                        <div class="cardSkillsList">
                            <span class="card tag is-light skillTag" v-for="(skill, i) in userData.skills" :key="i">{{skill.type}}</span>
                        </div>
                    </div>
                    <div v-if="userData.portfolio.length > 0" class="column is-6 portfolio">
                        <div class="cardHeader">Portfolio</div>
                        <div class="cardPortfolioList">
                            <div class="cardPortfolioEl" v-for="(portfolio, i) in userData.portfolio" :key="i"><a :href="portfolio.link">{{portfolio.name}}</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.skillTag{
    margin-left: 20px;
    margin-top: 10px;
}
.cardDescription{
    text-align: left;
    padding: 10px;
}
.card{
    border-radius: 2px;
}
.cardSkill{
}
.cardPortfolioEl{
}
.cardSkillsList, .cardPortfolioList{
    
}
.cardHeader{
    font-size: 18pt;
    margin-bottom: 10px;
}
.ContactElement{
    text-align: left;
}
.ContactElement:nth-child(2){
    margin-top: 20px;
}
.profileName{
    font-size: 18pt;
}
.portfolioDataImage{
    text-align: center;
}
.profilePic{
    border-radius: 100%;
    width: 100pt;
}
.profileCard:first-child{
    margin-top: 40px;
}
.profileCard:last-child{
    margin-bottom: 40px;
}
.profileCard{
    margin-top: 20px;
    margin-bottom: 20px;
}
.skillHeader{
    margin: 0;
}
</style>

<script>
export default {
    name: 'profile',
    data: function(){
       return{ 
           loaded: false,
           type: this.$store.state.auth.userType,
           userData: {
            name: {
                first: 'Neptunia',
                last: 'Neptunen-ko'
            },
            avatar: './../assets/topnep.jpg',
            profession: 'Neppo.inc Developer',
            location: {
                    cityId: 'ididididididiid',
                    formattedAddress: 'Planet Neptunia'
                },
            birthDay: '22.08.1488',
            phoneNumber: '+380228133788',
            description: '',
            email: 'neppunep@cyberdiment.mail',
            skills: ['Paladin', 'Pro nepper', 'Nep nep', 'skill', 'just another skill in the wall', 'pro sgo player'],
            portfolio: [{name: 'paladin 85lvl in nep 4 online', link: 'http://neptunia.jp'},
            {name: 'NepgearFanPage', link: 'http://nep.jp'}]
        }
       }
    },
    methods: {
        getData: function(){
            fetch(`https://bokunozibra.herokuapp.com/api/${this.type}/${this.$store.state.auth.uId}`).then(res=>{
                return res.json()
            }).then(res=>{
                if(res.status === 0){
                    this.userData = res.data;
                    this.loaded = true;
                }else{
                    console.log(res)
                }
            })
        }
    },
    created: function(){
        this.getData()
    }

}
</script>

