<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card>
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
            <p v-if="uploadedFiles.length === 0">
              Drag your file(s) here to begin
              <br>or click to browse
            </p>
            <p v-else>Uploaded {{ uploadedFiles.length }} files. Drag files here to upload more.</p>
          </div>
        </form>
      </v-card>
    </v-flex>
    <v-flex v-show="isSuccess" xs12>
      <!--SUCCESS-->
      <v-toolbar dark flat color="primary" class="elevation-5">
        <span class="title font-weight-light">Preview</span>
        <v-spacer></v-spacer>
        <v-tooltip top>
          <v-btn slot="activator" outline small icon @click="$refs.image.click()">
            <v-icon>fas fa-plus</v-icon>
          </v-btn>Upload More Files
        </v-tooltip>
        <v-tooltip top>
          <v-btn class="elevation-2" slot="activator" small outline icon @click="reset">
            <v-icon>fas fa-redo-alt</v-icon>
          </v-btn>Reset
        </v-tooltip>
      </v-toolbar>
      <v-card>
        <v-container grid-list-sm fluid>
          <v-layout row wrap>
            <v-flex v-for="item in uploadedFiles" :key="item.name" xs3 d-flex>
              <v-card class="elevation-5">
                <v-card-title primary-title>{{prettify(item.name)}}</v-card-title>
                <!-- <v-toolbar height="40px"
                  dark
                  flat
                >
                {{prettify(item.name)}}-->
                <!-- <v-spacer></v-spacer>
                    <v-btn dark flat icon>
                        <v-icon>close</v-icon>
                </v-btn>-->
                <!-- </v-toolbar> -->
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
                  <div v-else>
                    <pdf v-show="loaded" @loaded="loaded=true" :src="item.url"></pdf>
                    <v-progress-circular v-show="!loaded" indeterminate color="primary"></v-progress-circular>
                  </div>
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
import pdf from "vue-pdf";
const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;

export default {
  components: { pdf },
  data() {
    return {
      loaded: false,
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "file",
      formData: new FormData()
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
  created() {
    this.reset();
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
      this.$emit("upload", {
        formData: this.formData,
        uploadedFiles: this.uploadedFiles
      });
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
  background: #e6e6e6;
  color: black;
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
  background: #cad0a0; /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
</style>
