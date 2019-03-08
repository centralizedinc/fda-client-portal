<template>
    <v-container grid-list-xl fluid fill-height>
        <v-layout row wrap child-flex>
            
            <v-flex xs12 md4 lg4 pa-2>
                <v-card>
                    <v-tooltip top>
                        <v-btn
                            slot="activator"
                            color="success"
                            dark absolute top
                            right fab small
                            @click="$router.push('/app/certificates')">
                            <v-icon>call_made</v-icon>
                        </v-btn>Go to Certificates
                    </v-tooltip>
                    <dashboard-card
                        class="dcard"
                        icon="fas fa-certificate"
                        title="Certificates"
                        description="Count"
                        details="9"
                        color="fdaGold">
                    </dashboard-card>
                </v-card>
            </v-flex>
            <v-flex xs12 md4 lg4 pa-2>
                <v-card>
                    <v-tooltip top>
                        <v-btn
                            slot="activator"
                            color="success"
                            dark absolute top
                            right fab small
                            @click="$router.push('/app/notification')">
                            <v-icon>call_made</v-icon>
                        </v-btn>Go to Product Notification
                    </v-tooltip>
                    <dashboard-card
                        class="dcard"
                        icon="fas fa-file-invoice"
                        title="Product Notification"
                        description="Count"
                        details="2"
                        color="fdaOrange">
                    </dashboard-card>
                </v-card>
            </v-flex>
            <v-flex xs12 md4 lg4 pa-2>
                <v-card>
                    <v-tooltip top>
                        <v-btn
                            slot="activator"
                            color="success"
                            dark absolute top
                            right fab small
                            @click="$router.push('/app/payments')">
                            <v-icon>call_made</v-icon>
                        </v-btn>Go to Payments
                    </v-tooltip>
                    <dashboard-card
                        class="dcard"
                        icon="fas fa-credit-card fa-xs"
                        title="Payments"
                        description="Count"
                        details="0"
                        color="fdaBlueGreen">
                    </dashboard-card>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    components: {
        DashboardCard: () => import("./DashboardCards")
    }
}
</script>

<style>
.dcard {
  -webkit-box-reflect: below 6px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(70%, transparent), to(rgba(250, 250, 250, 0.1)));
}
</style>
