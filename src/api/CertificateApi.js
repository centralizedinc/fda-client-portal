import axios from 'axios';

// axios.defaults.headers.common['access_token'] = store.state.user

export default class CertificateAPI {
  constructor(token) {
    axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI;
    axios.defaults.headers.common['Content-Type'] = 'application/json'
    axios.defaults.headers.common['access_token'] = token;
  }

  saveCertificate(data) {
    console.log("save licenses data: " + JSON.stringify(data))
    return axios.post('certificates/', data)
  }

  getCertificates(cb) {
    axios.get('certificates/')
      .then(result => {
        if (result.data.success) {
          cb(result.data.model)
        }
      })
      .catch(err => {
        console.log(JSON.stringify(err));
        cb(null, err)
      });
  }

  getCertificateByCaseNo(case_no) {
    axios.get('certificates/case_no/' + case_no)
      .then((result) => {
        if (result.data.success) {
          console.dir(b(result.data.model));
        }
      }).catch((err) => {
        console.log(JSON.stringify(err));
        cb(null, err)
      });
  }

  saveCertificate(data) {
    console.log("save licenses data: " + JSON.stringify(data))
    axios.post('certificates/', data).then(result => {
      console.log("save certificates: " + JSON.stringify(result))
      return result
    })
  }

  getCertificates(cb) {
    axios.get('certificates/')
      .then(result => {
        if (result.data.success) {
          cb(result.data.model)
        }
      })
      .catch(err => {
        console.log(JSON.stringify(err));
        cb(null, err)
      });
  }

  getComplyCertificate() {
    console.log("SAVE_COMPLY_CERTIFICATE api")
    return axios.get('certificates/case/compliance')
  }

  submitComplianceCertificate(compliance) {
    console.log('compliance :' + JSON.stringify(compliance));
    return axios.post("certificates/case/compliance", compliance)
  }

  applyCertificate(cert_data) {
    var save_certificate = {}
    var cert_case = {}
    console.log("apply certificate data: " + JSON.stringify(cert_data))
    return new Promise((resolve, reject) => {
      var output_files = this.deepCopy(cert_data.output_files)
      cert_data.output_files = []
      axios.post('certificates/', cert_data)
        .then(save_cert => {
          if (save_cert.data.success) {
            cert_case = save_cert.data.model.case_details
            save_certificate = save_cert.data.model.certificate
            var docs = []
            console.log("save cert data sucess!!!: " + JSON.stringify(cert_case))
            // for (var i = 0; i <= 5; i++){
            // console.log("file!!!: " + JSON.stringify(save_certificate.output_files[i].form_data))
            // console.log('save_certificate.output_files[0] :', cert_data.output_files[0]);
            // docs.push(axios.post('documents/uploads?account_id=' + cert_case.case_no, cert_data.output_files[0].form_data))
            // }
            output_files.forEach(file => {
              docs.push(axios.post('documents/uploads?account_id=' + cert_case.case_no, file.form_data))
              // output_files.push({
              //   type: file.type
              // })
            })
            console.log("this docs data: " + JSON.stringify(docs))
            return axios.all(docs)
          } else {
            console.log("save cert data failed!!!")
            resolve(save_cert.data)
          }
        })
        .then(axios.spread(function (result1, result2, result3, result4, result5, result6) {
          var uploads = []
          for (var x = 0; x <= output_files.length; x++) {
            if (x === 0) {
              result1.data.model.forEach(element => {
                console.log("this element data 1: " + JSON.stringify(output_files[x].type))
                // element.type = output_files[x].type
                // element.originalname = output_files[x].originalname
                // element.mimetype = output_files[x].mimetype
                // element.contentType = output_files[x].mimetype
                // element.location = output_files[x].location
                // element.key = output_files[x].key
                save_certificate.uploaded_files.push({
                  file_type: output_files[x].type,
                  originalname: element.originalname,
                  mimetype: element.mimetype,
                  contentType: element.contentType,
                  location: element.location,
                  key: element.key,
                })
              });
              // save_certificate.uploaded_files.push(result1.data.model)
              // result1.data.type = output_files[x].type
            } else if (x === 1) {
              result2.data.model.forEach(element => {
                console.log("this element data 2: " + JSON.stringify(element))
                // element.type = output_files[x].type
                save_certificate.uploaded_files.push({
                  // file_type: output_files[x].type,
                  // originalname: output_files[x].originalname,
                  // mimetype: output_files[x].mimetype,
                  // contentType: output_files[x].mimetype,
                  // location: output_files[x].location,
                  // key: output_files[x].key,
                  file_type: output_files[x].type,
                  originalname: element.originalname,
                  mimetype: element.mimetype,
                  contentType: element.contentType,
                  location: element.location,
                  key: element.key,
                })
              });
              // save_certificate.uploaded_files.push(result2.data.model)
              // result2.data.type = output_files[x].type
            } else if (x === 2) {
              result3.data.model.forEach(element => {
                console.log("this element data 3: " + JSON.stringify(element))
                // element.type = output_files[x].type
                save_certificate.uploaded_files.push({
                  // file_type: output_files[x].type,
                  // originalname: output_files[x].originalname,
                  // mimetype: output_files[x].mimetype,
                  // contentType: output_files[x].mimetype,
                  // location: output_files[x].location,
                  // key: output_files[x].key,
                  file_type: output_files[x].type,
                  originalname: element.originalname,
                  mimetype: element.mimetype,
                  contentType: element.contentType,
                  location: element.location,
                  key: element.key,
                })
              });
              // save_certificate.uploaded_files.push(result3.data.model)
              // result3.data.type = output_files[x].type
            } else if (x === 3) {
              result4.data.model.forEach(element => {
                console.log("this element data 4: " + JSON.stringify(element))
                // element.type = output_files[x].type
                save_certificate.uploaded_files.push({
                  // file_type: output_files[x].type,
                  // originalname: output_files[x].originalname,
                  // mimetype: output_files[x].mimetype,
                  // contentType: output_files[x].mimetype,
                  // location: output_files[x].location,
                  // key: output_files[x].key,
                  file_type: output_files[x].type,
                  originalname: element.originalname,
                  mimetype: element.mimetype,
                  contentType: element.contentType,
                  location: element.location,
                  key: element.key,
                })
              });
              // save_certificate.uploaded_files.push(result4.data.model)
            } else if (x === 4) {
              result5.data.model.forEach(element => {
                console.log("this element data 5: " + JSON.stringify(element))
                // element.type = output_files[x].type
                save_certificate.uploaded_files.push({
                  // file_type: output_files[x].type,
                  // originalname: output_files[x].originalname,
                  // mimetype: output_files[x].mimetype,
                  // contentType: output_files[x].mimetype,
                  // location: output_files[x].location,
                  // key: output_files[x].key,
                  file_type: output_files[x].type,
                  originalname: element.originalname,
                  mimetype: element.mimetype,
                  contentType: element.contentType,
                  location: element.location,
                  key: element.key,
                })
              });
              // save_certificate.uploaded_files.push(result5.data.model)
            } else if (x === 5) {
              result6.data.model.forEach(element => {
                console.log("this element data 6: " + JSON.stringify(element))
                // element.type = output_files[x].type
                save_certificate.uploaded_files.push({
                  // file_type: output_files[x].type,
                  // originalname: output_files[x].originalname,
                  // mimetype: output_files[x].mimetype,
                  // contentType: output_files[x].mimetype,
                  // location: output_files[x].location,
                  // key: output_files[x].key,
                  file_type: output_files[x].type,
                  originalname: element.originalname,
                  mimetype: element.mimetype,
                  contentType: element.contentType,
                  location: element.location,
                  key: element.key,
                })
              });
              // save_certificate.uploaded_files.push(result6.data.model)
            }
          }
          console.log("uploads data: " + JSON.stringify(uploads))
          // console.log('result1.data :', result1.data);
          // console.log('result2.data :', result2.data);
          // console.log('result3.data :', result3.data);
          // console.log('result4.data :', result4.data);
          // console.log('result5.data :', result5.data);
          // console.log('result6.data :', result6.data);

          console.log("this is certificates data: " + JSON.stringify(save_certificate))
          return axios.post('certificates/' + save_certificate._id, save_certificate)
        }))
        .then(new_cert => {
          console.log("this is new cert data: " + JSON.stringify(new_cert))
        })
        .catch((err) => {
          reject(err)
        });
    })
  }

  variateCertificate(form) {
    return axios.post('certificates/variation', form);
  }

  renewCertificate(form) {
    return axios.post('certificates/renewal', form)
  }

  uploadCertificateFiles(case_no, form_data) {
    return axios.post('documents/uploads?account_id=' + case_no, form_data)
  }

  updateCertificate(id, certificate) {
    return axios.post('certificates/' + id, certificate)
  }

  addDocuments(certificate, formData) {
    return new Promise((resolve, reject) => {
      axios.post('documents/uploads?account_id=' + certificate.case_no, formData)
        .then(result => {
          console.log(JSON.stringify(result))
          var files = result.data.model
          var output_files = certificate.output_files.concat(files)
          if (result.data.success) {
            return axios.post('certificates/' + certificate._id, {
              output_files
            })
          } else {
            reject()
            return
          }
        })
        .then(updated => {
          console.log(JSON.stringify(updated))
          if (updated) {
            resolve(updated)
          } else {
            reject()
          }
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  }

}