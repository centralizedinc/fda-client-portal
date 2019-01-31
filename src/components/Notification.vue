<template>
    <v-layout row wrap>
        <v-flex v-for="notif in notifications" :key="notif.id">
            <v-snackbar multi-line top right :value="notif.show" :color="notif.data.color" :timeout="5000">
                <v-icon dark class="pr-3" v-if="notif.data.icon">{{notif.data.icon}}</v-icon>
                <v-icon dark class="pr-3" v-else>error_outline</v-icon>
                <span class="font-weight-light">{{notif.data.message}}</span>
                <v-btn small flat icon dark @click.native="notif.show=false">
                    <v-icon dark small>close</v-icon>
                </v-btn>        
            </v-snackbar>
        </v-flex>
    </v-layout>        
</template>

<script>
export default {
    data(){
        return {
            // show:true
        }
    },
    methods:{
       close(){

       } 
    },
    computed:{
        notifications(){
            // console.log(JSON.stringify(this.$store.state.notifications.notifications))

            return this.$store.state.notifications.notifications
        }
    }
}
</script>

<style>

</style>
