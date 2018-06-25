<template>
    <div class="columns is-12 card mainCard">
        <div class="column is-4 cardLeft">
            <div class="column is-12 cardImageWrap"><img class="cardImage" src="./../../assets/logo.png" /></div>
            <div class="column is-12 cardDetailsWrap">
                <div class="cardDetail">22.01.2018</div>
                <div class="cardDetail">Vinnytsa</div>
                <div class="cardDetail">WEB</div>
            </div>
        </div>
        <div class="column is-8">
            <div class="cardName">Vinntytsa Only pro Hackathon 2228</div>
            <div class="cardDesc">Description. Description. Description. Description. Description. Description. Description. Description. Description. Description. Description. Description. Description. Description. Description. Description. Description. Description. Description. </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'card'
}
</script>

<style scoped>
.cardName{
    font-weight: bold;
}
.cardDesc{
    padding: 20px 10px 10px 10px;
}
.cardImage{
    max-width: 80px;
    max-height: 80px;
}
.cardLeft{
    border-right: 1px solid #999;
    height: 100%;
}
.card {
  background: #fff;
  border-radius: 2px;
  margin: 1rem;
  position: relative;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}
.mainCard{
  height: 230px;
}
</style>


