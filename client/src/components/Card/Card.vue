<template>
    <div class="columns is-12 card cardFull mainCard" @click="$router.push(`/fullCard/${type}/${data._id}`)">
        <div class="column is-4 cardLeft">
            <div class="card  cardImageWrap"><img class=" cardImage" :src="data.photo ? data.photo : 'http://bokunozibra.herokuapp.com/placeh.png'" /></div>
            <div class="column is-12 cardDetailsWrap">
                <div v-if="data.date" class="cardDetail">{{data.date.from | formatDate}}</div>
                <div v-if="data.location" class="cardDetail">{{data.location.formattedAddress}}</div>
                <div v-if="data.types" class="cardDetail">{{data.types.join(', ')}}</div>
                <div v-if="data.requiredSkills" class="cardDetail">{{data.requiredSkills.slice(0,5).join(', ')}}</div>
            </div>
        </div>
        <div class="column is-8">
            <div class="cardName">{{data.name}}</div>
            <div class="cardDesc"><p>{{data.description}}</p></div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    name: 'card',
    props: {
        data: Object,
        type: String
    },
    filters: {
        formatDate: function(value) {
            if (value) {
                return moment(String(new Date(value))).format('DD.MM.YYYY')
            }
        }
    }
}
</script>

<style scoped>

.cardName{
    font-weight: bold;
}
.cardDesc{
    text-align: left;
    font-size: 16px;
    display: -webkit-box;
    -webkit-line-clamp: 8;
    overflow: hidden;
    line-height: 20px;
	-webkit-box-orient: vertical;
}
.cardDesc p{
    margin: 10px 0 0 0;
}
.cardImage{
    max-width: 80px;
    max-height: 80px;
}
.cardLeft{
    border-right: 1px solid #999;
    height: 100%;
}
.cardFull{
    margin: 1rem;
}
.card {
  background: #fff;
  border-radius: 2px;
  position: relative;
  /* box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23); */
}
.mainCard{
  cursor: pointer;
  height: 230px;
}

.cardImage{
    border-radius: 100%;
}
.cardImageWrap{
    height: 80px;
    width: 80px;
    border-radius: 100%;
    margin: 0 auto;
}
</style>


