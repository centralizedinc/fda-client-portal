<template>
  <v-layout row wrap>
    <v-flex xs12>
      <uploader @upload="upload"></uploader>
    </v-flex>      
  </v-layout>
     
</template>

<script>

import Uploader from '@/components/Uploader'

export default {
    components:{
        Uploader
    },
    data(){
        return {
            uploads:false
        }
    },
    methods:{
        upload(data){
            this.$emit('upload', data)
            this.uploads = true;
        },
        validate(){
            return this.uploads
        }
    }

}
</script>

<style>

</style>
