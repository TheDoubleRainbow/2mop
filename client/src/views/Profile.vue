<template>
    <div class="container">
        <div class="columns is-centered ">
            <div class="column is-8">
                <div class="card profileCard columns is-centered">
                    <div class="column is-3 portfolioDataImage">
                        <img class="profilePic card" src="./../assets/topnep.jpg" />
                    </div>
                    <div class="column is-8 portfolioDataText">
                        <div class="profileName">
                            <div class="column is-10 profileName">{{userData.name.first}} {{userData.name.last}}</div>
                        </div>
                        <div class="columns">
                            <div class="column is-5 profileContactFist">
                                <div class="ContactElement">
                                    <span class="icon"><i class="fas fa-map-marker-alt"></i></span> {{userData.location.formattedAddress}}
                                </div>
                                <div class="ContactElement">
                                    <span class="icon"><i class="fas fa-mobile"></i></span> {{userData.phoneNumber}}
                                </div>
                            </div>
                            <div class="column is-7 profileContactSecond">
                                <div class="ContactElement">
                                    <span class="icon"><i class="fas fa-briefcase"></i></span> {{userData.profession}}
                                </div>
                                <div class="ContactElement">
                                    <span class="icon"><i class="fas fa-envelope"></i></span> {{userData.email}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card columns is-centered profileCard">
                    <div class="column is-12">
                        <div class="cardHeader">Description</div>
                        <div class="cardDescription">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a erat lacinia, dignissim arcu a, commodo ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis nibh ac odio vehicula feugiat nec quis magna. Ut et condimentum quam, id facilisis diam. Integer sagittis tempus massa, vel venenatis tortor tincidunt ac. Cras vitae magna placerat, sagittis erat et, consequat massa. Duis ipsum nulla, vestibulum ac urna in, malesuada condimentum nibh.

Quisque ac sollicitudin massa. Mauris dignissim eu sem et lacinia. Donec suscipit leo neque, ac porttitor libero sollicitudin a. Donec eget ipsum odio. Nunc interdum massa augue, quis pharetra est varius iaculis. Suspendisse et vehicula diam. Ut sed consequat neque, vel gravida eros. Maecenas a cursus urna. Suspendisse facilisis blandit.</div>
                    </div>
                </div>
                <div v-if="userData.skills.length > 0 || userData.portfolio.length > 0" class="card columns is-centered profileCard">
                    <div v-if="userData.skills.length > 0" class="column is-6 skills">
                        <div class="cardHeader">Skills</div>
                        <div class="cardSkillsList">
                            <span class="tag is-light" v-for="(skill, i) in userData.skills" :key="i">{{skill}}</span>
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
</style>

<script>
export default {
    name: 'profile',
    data: function(){
       return{ userData: {
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
            email: 'neppunep@cyberdiment.mail',
            skills: ['Paladin', 'Pro nepper', 'Nep nep'],
            portfolio: [{name: 'paladin 85lvl in nep 4 online', link: 'http://neptunia.jp'},
            {name: 'NepgearFanPage', link: 'http://nep.jp'}]
        }
       }
    }

}
</script>

