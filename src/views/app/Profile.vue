<template>
    <v-layout row wrap>
        <v-flex xs12 md4 pa-2>
            <v-card>
                <!-- <v-card-title primary-title>
                                    Company
                                </v-card-title> -->
                <v-toolbar dark color="primary" style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)">
                    <span class="title font-weight-light">Company Details</span>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                    <v-text-field label="Name of Establishment" :disabled="true"></v-text-field>
                    <v-text-field label="Establishment Owner"></v-text-field>
                    <v-text-field label="TIN" mask="###-###-###-###"></v-text-field>
                    <v-textarea label="Office Address"></v-textarea>
                    <v-select :items="items" label="Region"></v-select>
                    <v-select :items="items" label="Province"></v-select>
                    <v-select :items="items" label="City/Town"></v-select>
                    <v-text-field label="Zip code"></v-text-field>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs12 md4 pa-2>
            <v-card>
                <v-toolbar dark color="primary" style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)">
                    <span class="title font-weight-light">User Details</span>
                </v-toolbar>
                <v-divider></v-divider>
                <!-- <v-card-text>
                            <v-text-field label="Last Name"   v-model="account.name.last"></v-text-field>
                            <v-text-field label="First Name"   v-model="account.name.first"></v-text-field>
                            <v-text-field label="Middle Name"   v-model="account.name.middle"></v-text-field>
                            <v-text-field label="TIN"   v-model="account.tin" mask="###-###-###-###"></v-text-field>
                            <v-text-field label="Email Address"   v-model="account.email"></v-text-field>
                            <v-text-field label="Phone Number"></v-text-field>
                            <v-text-field label="Mobile Number"></v-text-field>
                        </v-card-text> -->
                <v-card-text>
                    <v-text-field label="Last Name"></v-text-field>
                    <v-text-field label="First Name"></v-text-field>
                    <v-text-field label="Middle Name"></v-text-field>
                    <v-text-field label="TIN" mask="###-###-###-###"></v-text-field>
                    <v-text-field label="Email Address"></v-text-field>
                    <v-text-field label="Phone Number"></v-text-field>
                    <v-text-field label="Mobile Number"></v-text-field>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs12 md4 pa-2>
            <v-card>
                <v-toolbar dark color="primary" style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)">
                    <span class="title font-weight-light">User Account</span>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                    <v-layout align-center justify-center>
                        <v-avatar class="elevation-5 chooseAvatar" size="100" v-if="imageUrl" @click="pickFile">
                            <img :src="imageUrl" alt="avatar">
                            <input type="file" style="display: none" ref="image" accept="image/*" @change="onFilePicked">
                        </v-avatar>
                    </v-layout>
                    <v-layout align-center justify-center>
                        <v-flex xs12 class="text-xs-center">
                            <v-btn small flat ripple color="primary" @click="pickFile">
                                Choose avatar
                            </v-btn>
                            <input type="file" style="display: none" ref="image" accept="image/*" @change="onFilePicked">
                        </v-flex>
                    </v-layout>
                    <v-text-field label="Username"></v-text-field>
                    <v-text-field label="Password" type="password" :disabled="true" value="12345678"></v-text-field>
                </v-card-text>
            </v-card>
        </v-flex>
        <!-- <v-spacer></v-spacer>
                        <v-btn style="bottom: 40px"
                        color="blue darken-2"
                        dark
                        fab
                        bottom
                        right
                        absolute
                      >
                        <v-icon>save</v-icon>
                      </v-btn> -->
        <v-layout column class="fab-container">
            <v-tooltip top>
                <v-btn slot="activator" large fab color="success" @click="save()">
                    <v-icon>save</v-icon>
                </v-btn>
                Save Changes
            </v-tooltip>
        </v-layout>
    </v-layout>
</template>

<script>
    export default {
        props: ["user"],
        data: () => ({
            items: "",
            imageName: "",
            imageUrl: "",
            imageFile: "",
        }),
        created() {
            this.imageUrl = this.user.avatar;
        },
        methods: {
            pickFile() {
                this.$refs.image.click();
            },
            onFilePicked(e) {
                const files = e.target.files;
                if (files[0] !== undefined) {
                    this.imageName = files[0].name;
                    if (this.imageName.lastIndexOf(".") <= 0) {
                        return;
                    }
                    const fr = new FileReader();
                    fr.readAsDataURL(files[0]);
                    fr.addEventListener("load", () => {
                        this.imageUrl = fr.result;
                        this.imageFile = files[0];
                        this.$emit("upload", this.imageFile);
                    });
                } else {
                    this.imageName = "";
                    this.imageFile = "";
                    this.imageUrl = "";
                }
            },
        }
    };
</script>

<style>
    .chooseAvatar:hover {
        cursor: pointer;
    }
</style>
