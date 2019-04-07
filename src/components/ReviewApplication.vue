<template>
<v-dialog
    v-model="show"
    scrollable fullscreen 
    persistent :overlay="false"
    transition="dialog-transition"> 
    <v-card>
        <v-toolbar>
            <span class="headline font-weight-light primary--text">Application Summary</span>
            <!-- <v-btn color="primary">accept & submit</v-btn> -->
            <v-spacer></v-spacer>
            <!-- <v-btn outline color="primary" @click="close()">Cancel</v-btn> -->
            
            <v-btn flat icon color="primary" @click="close()">
                <v-icon>close</v-icon>
            </v-btn>
        </v-toolbar>
        <v-card-text>
            
        </v-card-text>
        <v-card-actions>
            <v-btn color="success" block flat outline @click="claim">CLAIM</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style>

</style>
