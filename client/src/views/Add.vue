<template>
    <div class="container">
        <div class="columns is-centered">
            <div class="column is-6 card creationCard">
                <div class="buttons has-addons is-centered">
                    <span @click="changeType('course')" class="switchButton button" v-bind:class="type === 'course' ? 'is-link' : ''">Course</span>
                    <span @click="changeType('hackathon')" class="switchButton button" v-bind:class="type === 'hackathon' ? 'is-link' : ''">Hackathon</span>
                    <span @click="changeType('excursion')" class="switchButton button" v-bind:class="type === 'excursion' ? 'is-link' : ''">Excursion</span>
                    <span @click="changeType('work')" class="switchButton button" v-bind:class="type === 'work' ? 'is-link' : ''">Work</span>
                </div>
                <form @submit.prevent = "sendForm(data)">
                    <div class="field">
                        <label class="label">Name</label>
                        <div class="control ">
                            <input v-model="data.name" class="input" type="text" placeholder="Name" />
                            
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Description</label>
                        <div class="control ">
                            <textarea v-model="data.description" class="input descInput" type="text" placeholder="Description"></textarea>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Location</label>
                        <div class="control has-icons-left ">
                            <vue-google-autocomplete
                                ref="address"
                                id="map"
                                classname="input"
                                autocomplete="nope"
                                placeholder="Enter your location"
                                v-on:placechanged="getAddressData"
                                country=""
                                types="(cities)">
                            </vue-google-autocomplete>
                            <span class="icon is-small is-left">
                                <i class="fas fa-map-marker-alt"></i>
                            </span>
                        </div>
                    </div>
                    <div v-if="type != 'work'" class="field">
                        <label class="label">Date from</label>
                        <div class="control ">
                            <input v-model="dateRaw.from" @change="formatDate" class="input" type="date" placeholder="Date from" />
                        </div>
                    </div>
                    <div v-if="type != 'work'"  class="field">
                        <label class="label">Date to</label>
                        <div class="control ">
                            <input v-model="dateRaw.to" @change="formatDate" class="input" type="date" placeholder="Date to" />
                        </div>
                    </div>
                    <div v-if="type == 'work'"  class="field">
                        <label class="label">Skills</label>
                        <div class="control ">
                            <input v-model="rawSkills" @change="toArray" class="input" type="text" placeholder="skill1, skill2, skill3" />
                            
                        </div>
                    </div>
                    <div v-if="type == 'hackathon' || type == 'course'" class="field">
                        <label class="label">Types</label>
                        <div class="control ">
                            <input v-model="rawTypes" @change="toArray" class="input" type="text" placeholder="type1, type2, type3" />
                            
                        </div>
                    </div>
                    <button class="button is-dark">Add</button>
                    <div v-if="success" class="success">Successfully created</div>
                </form>
            </div> 
        </div>
    </div>
</template>

<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete'
export default {
    name: 'add',
    components: {
        VueGoogleAutocomplete
    },
    data: function(){
        return {
            data: {
                name: "",
                photo: "",
                description: "",
                requiredSkills: [],
                placeId: "",
                formattedAddress: "",
                types: [],
                date: {
                    from: 0,
                    to: 0
                }
            },
            type: 'work',
            rawSkills: '',
            rawTypes: '',
            success: false,
            dateRaw: {
                from: '',
                to: ''
            }
        }
    },
    methods: {
        changeType: function(type){
            this.type = type;
        },
        getAddressData: function (addressData, placeResultData) {
                this.data.placeId = placeResultData.place_id;
                this.data.formattedAddress = addressData.locality
        },
        toArray: function(){
            this.data.requiredSkills = this.rawSkills.split(', ')
            if(this.rawTypes != ''){
                this.data.types = this.rawTypes.split(', ')
            }
        },
        formatDate: function(){
            this.data.date.from = new Date(this.dateRaw.from).getTime()
            this.data.date.to = new Date(this.dateRaw.to).getTime()
        },
        sendForm(data){
            console.log(data)
            if(this.type == 'work'){
                fetch(`https://bokunozibra.herokuapp.com/api/vacancy`, {method: 'POST', headers: {'Authorization': this.$store.state.auth.authToken,'content-type': 'application/json'}, body: JSON.stringify(this.data)}).then(res=>{
                    return res.json()
                }).then(res => {
                    if(res.status === 0){
                        this.success = true;
                        setTimeout(()=>{
                            this.success = false;
                        }, 4000)
                    }
                })
            } else if(this.type == 'excursion'){
                fetch(`https://bokunozibra.herokuapp.com/api/excursion`, {method: 'POST', headers: {'Authorization': this.$store.state.auth.authToken,'content-type': 'application/json'}, body: JSON.stringify(this.data)}).then(res=>{
                    return res.json()
                }).then(res => {
                    if(res.status === 0){
                        this.success = true;
                        setTimeout(()=>{
                            this.success = false;
                        }, 4000)
                    }
                })
            }else if(this.type == 'hackathon'){
                fetch(`https://bokunozibra.herokuapp.com/api/hakaton`, {method: 'POST', headers: {'Authorization': this.$store.state.auth.authToken,'content-type': 'application/json'}, body: JSON.stringify(this.data)}).then(res=>{
                    return res.json()
                }).then(res => {
                    if(res.status === 0){
                        this.success = true;
                        setTimeout(()=>{
                            this.success = false;
                        }, 4000)
                    }
                })
            }else if(this.type == 'course'){
                fetch(`https://bokunozibra.herokuapp.com/api/course`, {method: 'POST', headers: {'Authorization': this.$store.state.auth.authToken,'content-type': 'application/json'}, body: JSON.stringify(this.data)}).then(res=>{
                    return res.json()
                }).then(res => {
                   if(res.status === 0){
                        this.success = true;
                        setTimeout(()=>{
                            this.success = false;
                        }, 4000)
                    }
                })
            }
        }
    }
}
</script>

<style>
.descInput{
    min-height: 80pt;
}
.field .label{
    text-align: left;
}
.creationCard{
    margin-top: 40px;
}
</style>

