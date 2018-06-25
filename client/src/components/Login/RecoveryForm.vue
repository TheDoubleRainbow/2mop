<template>
    <div class = "login-form column is-4 card">
        <div class="column is-12">
            <div class="formHeader">Password recovery</div>
        </div>
        <form @submit.prevent="recover(email)">
            <div class="field">
                <label class="label">Email</label>
                <div class="control has-icons-left ">
                    <input v-model="email" class="input" type="email" placeholder="Email input" />
                    <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                    </span>
                </div>
            </div>
            <div class="loginButtonWrap">
                <button class="recoverButton button is-dark">Recover my password</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'RecoveryForm',
    props:{
        recover: Function
    },
    data: function() {
        return {
            email: ''
        }
    }
}
</script>

