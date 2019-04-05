<template>
  <v-layout row wrap>
    <v-flex xs12 >
      <v-card >
        <!-- <v-card-title primary-title class="headline">Upload files</v-card-title> -->

        <form enctype="multipart/form-data" novalidate>
          <!-- <h1>Upload images</h1> -->
          <div class="dropbox">
            <input
              ref="image"
              type="file"
              multiple
              :name="uploadFieldName"
              :disabled="isSaving"
              @change="onFileChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
              accept="image/*, application/pdf"
              class="input-file"
            >
            <p v-if="uploadedFiles.length === 0">Drag your file(s) here to begin
              <br>or click to browse
            </p>
            <p v-else>Uploaded {{ uploadedFiles.length }} files. Drag files here to upload more.</p>
          </div>
        </form>
      </v-card>
    </v-flex>
    <v-flex v-show="isSuccess" xs12>
      <!--SUCCESS-->
      <v-card>
        <v-toolbar class="title font-weight-light" style="text-transform: uppercase">Preview
          <v-spacer></v-spacer>
           <v-tooltip top>
            <v-btn slot="activator" outline icon color="primary" @click="$refs.image.click()">
              <v-icon>add</v-icon>
            </v-btn>Upload More Files
           </v-tooltip>
          <v-tooltip top>
            <v-btn
              class="elevation-2"
              slot="activator"
              outline
              
              icon
              color="primary"
              @click="reset"
            >
              <v-icon>fas fa-redo-alt</v-icon>
            </v-btn>Reset
          </v-tooltip>
        </v-toolbar>
        <v-container grid-list-sm fluid>
          <v-layout row wrap>
            <v-flex v-for="item in uploadedFiles" :key="item.name" xs3 d-flex>
              <v-card>
                <v-toolbar
                  dark
                  color="fdaGreen"
                  style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)"
                >
                  {{prettify(item.name)}}
                  <!-- <v-spacer></v-spacer>
                    <v-btn dark flat icon>
                        <v-icon>close</v-icon>
                  </v-btn>-->
                </v-toolbar>
                <v-card-text>
                  <v-img
                    v-if="item.type !== 'application/pdf'"
                    :src="item.url"
                    class="grey lighten-2"
                    max-height="400"
                    max-width="200"
                    contain
                  >
                    <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-layout>
                  </v-img>
                  <v-img
                    v-else
                    src="https://www.acts.co.za/shop/wp-content/uploads/2017/11/filetype_pdf-278.png"
                  ></v-img>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;

export default {
  data() {
    return {
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "file",
      formData:new FormData()
    };
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    }
  },
  methods: {
    reset() {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL;
      this.uploadedFiles = [];
      this.uploadError = null;
      this.formData = new FormData();
    },
    onFileChange(fieldName, fileList) {
      // handle file changes
      

      if (!fileList.length) return;

      // append the files to FormData
      Array.from(Array(fileList.length).keys()).map(x => {
        if (
          fileList[x].type === "application/pdf" ||
          fileList[x].type === "image/jpeg" ||
          fileList[x].type === "image/png"
        ) {
          this.formData.append(fieldName, fileList[x], fileList[x].name);
          console.log("fileList[x]: " + fileList[x].type);
          const file = fileList[x];
          this.uploadedFiles.push({
            url: URL.createObjectURL(file),
            name: fileList[x].name,
            type: fileList[x].type
          });
        } else {
          this.$notify({
            message: "Invalid File! " + fileList[x].name,
            color: "error"
          });
        }
      });

      this.currentStatus = STATUS_SUCCESS;
      console.log("formData :", this.formData);
      this.$emit("upload", {formData:this.formData, uploadedFiles:this.uploadedFiles});
    },
    prettify(name) {
      if (name.length > 15) {
        return name.substring(0, 15) + " ...";
      } else {
        return name;
      }
    }
  },
  mounted() {
    this.reset();
  }
};
</script>

<style lang="scss">
.dropbox {
  outline: 1px dashed grey; /* the dash box */
  outline-offset: -5px;
  background: #A7CA56;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px; /* minimum height */
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: #689E48; /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
</style>
