import axios from 'axios';


export default class RegionType {
    constructor(token) {
        axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }
    //REGION
    getRegion(cb) {
        axios.get('core/regions').then((result) => {
                console.log("###API:REGION###")
                if (result.data.success) {
                    cb(result.data.errors, result.data.model)
                } else {
                    cb(result.data.errors)
                }
            })
            .catch(err => {
                cb(err)
            });
    }
    //PROVINCE

    getProvince(region_id, cb) {
        axios.get('core/provinces/' + region_id).then((result) => {
                console.log("###API:PROVINCE###")
                if (result.data.success) {
                    cb(result.data.errors, result.data.model)
                } else {
                    cb(result.data.errors)
                }
            })
            .catch(err => {
                cb(err)
            })
    }
    //CITY
    getCity(province_id, cb) {
        axios.get('core/city' + province_id).then((result) => {
                console.log("###API:CITY###")
                if (result.data.success) {
                    cb(result.data.errors, result.data.model)
                } else {
                    cb(result.data.errors)
                }
            })
            .catch(err => {
                cb(err)
            })
    }

    //country of origin certificate

    origin(cb) {
        console.log("Places API!!!")
        axios.get('core/origin')
          .then(result => {
              console.log("country of origin result: " + JSON.stringify(result))
            if (result.data.success) {
              cb(result.data.model)
            }
          })
          .catch(err => {
            console.log(JSON.stringify(err));
            cb(null, err)
          });
      }


    /**
     * @description promised based method for retrieving regions
     * @returns {Promise}
     */
    getRegions() {
        return axios.get('core/regions')
    }

    /**
     * @description promised based method for retrieving provinces
     * @returns {Promise}
     */
    getProvinces() {
        return axios.get('core/provinces')
    }

    /**
     * @description promised based method for retrieving cities
     * @returns {Promise}
     */
    getCities() {
        return axios.get('core/city')
    }
}