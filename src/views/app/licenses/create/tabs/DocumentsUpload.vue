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
            
        }
    },
    methods:{
        upload(formData){
            console.log('uploading files: ' + formData)
            this.$emit('upload', formData)
        }
    }

}
</script>

<style>

</style>
