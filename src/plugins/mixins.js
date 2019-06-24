export default {

  install(Vue) {
    Vue.mixin({
      computed: {
        display_name() {
          var display = ""
          if (this.$store.state.user_session.user) {
            if (this.$store.state.user_session.user.name &&
              this.$store.state.user_session.user.name.first &&
              this.$store.state.user_session.user.name.last)
              display = this.$store.state.user_session.user.name.first + ' ' + this.$store.state.user_session.user.name.last;
            else
              display = this.$store.state.user_session.user.username
          }
          return display;
        },
        display_avatar() {
          if (this.$store.state.user_session.user)
            return this.$store.state.user_session.user.avatar.location ?
              this.$store.state.user_session.user.avatar.location :
              "https://avatars.dicebear.com/v2/identicon/" +
              this.$store.state.user_session.user.username +
              ".svg";
          else return ""
        },
      },
      methods: {
        getAppStatus(status) {
          var apps = ["On Process", "Approved", "Compliance", "Denied", "Expired"];
          return apps[status];
        },
        getAppStatusColor(status) {
          var app_status_color = ["fdaOrange", "fdaGreen", "fdaBlueGreen", "red", "red"];
          return app_status_color[status]
        },
        getAppType(type, app) {
          var app_type = [
            ["Initial", "Variation", "Renewal"], // For License
            ["Initial", "Amendment", "Renewal", "Reapplication"] // For Certificate
          ];
          return app_type[app] ? app_type[app][type] ? app_type[app][type] : "N/A" : "N/A"
        },
        getActStatus(status, recommended_task) {
          var act_status = ["Approved", `Recommend for ${recommended_task}`, "Denied"]
          return act_status[status]
        },
        getCaseType(type) {
          var case_type = ["License", "Certificate", "Registerd User"]
          return case_type[type]
        },
        numberMask(number) {
          var length = number.length
          var final = null
          if (length === 12) {
            final = number.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, "$1 - $2 - $3 - $4")
          } else if (length === 11) {
            final = number.replace(/(\d{4})(\d{3})(\d{4})/, "($1) - $2 - $3")
          } else if (length === 10) {
            final = number.replace(/(\d{2})(\d{4})(\d{4})/, "($1) - $2 - $3")
          }
          return final
        },
        getTask(task_id) {
          if (this.$store.state.tasks.tasks) {
            var task = this.$store.state.tasks.tasks.find(x => {
              return x._id.toString() === task_id;
            });
            return task ? task : {};
          } else {
            return null;
          }
        },
        getProduct(product_id) {
          if (this.$store.state.products.productType) {
            var product = null;
            product = this.$store.state.products.productType.find(x => {
              return x._id === product_id
            })
            return product ? product.name : ''
          } else {
            return ''
          }
        },
        getPrimary(primary_id) {
          if (this.$store.state.products.primaryActivity) {
            var primary = null;
            primary = this.$store.state.products.primaryActivity.find(x => {
              return x._id === primary_id
            })
            return primary ? primary.name : ''
          } else {
            return ''
          }
        },
        getAdditionalActivies(activities) {

          var add_acts = '';
          if (activities) {
            activities.forEach(activity => {
              var additional_activity = this.$store.state.products.additional.find(x => {
                return x._id === activity
              })
              add_acts = additional_activity ? add_acts + additional_activity.name + "/" : add_acts;
            })
          }
          return add_acts;

        },
        getDeclared(declared_id) {
          if (this.$store.state.products.declared) {
            var declared = null;
            declared = this.$store.state.products.declared.find(x => {
              return x._id === declared_id
            })
            return declared ? declared.name : ''
          } else {
            return ''
          }
        },
        getProductLine(productLine_id) {
          if (this.$store.state.products.prod_line) {
            var product_line = null;
            product_line = this.$store.state.products.prod_line.find(x => {
              return x._id === productLine_id
            })
            return product_line ? product_line.name : ''
          } else {
            return ''
          }
        },
        getUsername(user_id) {
          if (this.$store.state.user_session) {
            var user = null;
            console.log("store state user session: " + JSON.stringify(this.$store.state.user_session.user))
            user = this.$store.state.user_session.user
            return user.first_name + " " + user.last_name
            // user = this.$store.state.user_session.user.find(x => {
            //   return x._id === user_id
            // })
            // return user ? user.username : ''
          } else {
            return ''
          }
        },
        numberWithCommas(x) {
          if (!x || isNaN(x)) return "0.00"
          return parseFloat(x).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        },
        formatDate: (date, type) => {
          if (!date) {
            return "";
          }
          var dt = new Date(date).toLocaleString("en-US", type ? type : {
            hour12: true,
            year: "numeric",
            month: "long",
            day: "2-digit"
          });
          return dt;
        },
        formatDt(dt) {
          var date = new Date(dt);
          var month = date.getMonth() + 1;
          var newDT = date.getFullYear() + "-" + month + "-" + date.getDate();
          return newDT
        },
        // formatDates(dt){
        //   var date = new Date(dt);
        //   var month = date.getMonth() + 1;
        //   var year = date.getFullYear();
        //   var newDT = {month: month, year: year}
        //   return newDT
        // },
        formatCurrency: amount => {
          if (!amount || isNaN(amount)) return "0.00"
          return parseFloat(amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        },
        isEmpty(str) {
          return !str || str === null || str === "";
        },
        checkPassword(password) {
          var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
          return re.test(password);
        },
        checkEmail(email) {
          var validate = false;
          var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          validate = this.isEmpty(email) || !re.test(email);
          return !validate;
        },
        getEstablishmentType(type) {
          var address_types = ['Head Office', 'Branch', 'Warehouse', 'Plant']
          return address_types[type];
        },
        getRegionName(id) {
          var region = this.$store.state.places.regions.find(x => {
            return x._id === id;
          })
          return region && region.name ? region.name : ""
        },
        getProvinceName(id) {
          var province = this.$store.state.places.provinces.find(x => {
            return x._id === id;
          })
          return province && province.name ? province.name : ""
        },
        getCityName(id) {
          var city = this.$store.state.places.city.find(x => {
            return x._id === id;
          })
          return city && city.name ? city.name : ""
        },
        findProvinces(region) {
          var provinces = [];
          this.$store.state.places.provinces.forEach(province => {
            if (province.region === region) {
              provinces.push(province)
            }
          })
          return provinces;
        },
        findCities(province) {
          var cities = [];
          this.$store.state.places.city.forEach(city => {
            if (city.province === province) {
              cities.push(city)
            }
          })
          return cities;
        },
        getProdLine(id) {
          if (this.$store.state.products.prod_line) {
            var prod_line = {}
            prod_line = this.$store.state.products.prod_line.find(x => {
              return x._id.toString() === id;
            })
            return prod_line ? prod_line : {}
          }
        },
        getPaymentStatus(status) {
          var payment_status = ["Initiate", "Processing", "Paid"]
          return payment_status[status]
        },
        getModeOfPayment(mode) {
          var mode_of_payment = ["Online Payment (Credit Card)", "Cash", "Credit Card (Cashier)", "Check", "Online Payment (ECPay)"]
          return mode_of_payment[mode]
        },
        deepCopy(obj) {
          return JSON.parse(JSON.stringify(obj));
        },
        replaceAll(str, search, replacement) {
          return str.split(search).join(replacement);
        },
        check_avatar(avatar) {
          return avatar ?
            avatar :
            "https://avatars.dicebear.com/v2/identicon/" +
            this.$store.state.user_session.user.username +
            ".svg";
        },
        getDesignation(id) {
          var designations = this.$store.state.references.designations;
          if (!designations) return {}
          var designation = designations.find(x => x._id === id)
          return designation ? designation : {}
        },
        getIdType(id) {
          var id_types = this.$store.state.references.id_types;
          if (!id_types) return {}
          var id_type = id_types.find(x => x._id === id)
          return id_type ? id_type : {}
        },
        logout() {
          this.$store.dispatch("LOGOUT");
          this.$router.push("/login");
        },
        yesNo(data) {
          if (data)
            return "Yes"
          else
            return "No"
        },
        foodProductType(data) {
          var foodProducts = this.$store.state.foodCertificate.food_product
          console.log("MIXIN DATA FOODPRODUCT:" + JSON.stringify(foodProducts))
          console.log('food product data :', data);
          if (!foodProducts || !foodProducts.length) return {}
          var foodProduct = foodProducts.find(x => x._id === data)
          return foodProduct ? foodProduct : {}
        },
        establishmentInfo(data) {
          var establishments = this.$store.state.foodCertificate.company_activity
          console.log("MIXIN DATA ESTABLISHMENTINFO:" + JSON.stringify(establishments))
          console.log('estab info data :', data);
          if (!establishments || !establishments.length) return {}
          var establishment = establishments.find(x => x._id === data)
          return establishment ? establishment : {}
        },
        // establishmentType(data) {
        //   var establishTypes = this.$store.state.foodCertificate.source
        //   console.log("MIXIN DATA ESTABLISHMENTTYPE 1:" + JSON.stringify(establishTypes))
        //   console.log('estab type data :', data);
        //   if (!establishTypes || !establishTypes.length) return {}
        //   var establishTypeSource = establishTypes.find(x => x._id === data)
        //   return establishTypeSource ? establishTypeSource : {}
        // },
        // setEstablishmentType(data){
        //   var establishTypes = this.$store.state.foodCertificate.source
        //   console.log("MIXIN DATA ESTABLISHMENTTYPE:" + JSON.stringify(establishTypes))
        //   if (!establishTypes) return {}
        //   var establishType = establishTypes.find(x => x._id === data)
        //   return establishType ? establishType : {}
        // },

        getEstablishSource(data){
          var sources = this.$store.state.foodCertificate.source
          console.log("MIXIN DATA ESTABLISHMENTSOURCE:" + JSON.stringify(sources))
          if (!sources) return {}
          var source = sources  .find(x => x._id === data)
          return source ? source : {}
        },

        establishplacesOrigin(data){
          var placesOrigin = this.$store.state.places.origin
          console.log("MIXIN DATA ESTABLISHMENTORIGIN:" + JSON.stringify(placesOrigin))
          if (!placesOrigin) return {}
          var placesOrigin = placesOrigin.find(x => x._id === data)
          return placesOrigin ? placesOrigin : {}
        },
        shelfLifeType(data) {
          var shelfLifes = this.deepCopy(this.$store.state.foodCertificate.shelf_life)
          console.log("MIXIN DATA SHELFLIFE:" + JSON.stringify(shelfLifes))
          console.log('shelf type data :', data);
          if (!shelfLifes || !shelfLifes.length) return {}
          var shelfLife = shelfLifes.find(x => x._id === data)
          return shelfLife ? shelfLife : {}
        },
        foodCategory(data) {
          console.log("food category data: " + JSON.stringify(data))
          var foodCategories = this.deepCopy(this.$store.state.foodCertificate.food_category)
          console.log("MIXIN TWO DATA: " + JSON.stringify(foodCategories))
          if (!foodCategories || !foodCategories.length) return {}
          var foodCategory = foodCategories.find(x => x._id === data)
          return foodCategory ? foodCategory : {}
        },
        productSpecs(spec) {
          var prodSpecs = this.deepCopy(this.$store.state.foodCertificate.product_specification)
          if (!prodSpecs || !prodSpecs.length) return {}
          var prodSpec = prodSpecs.find(x => x._id === spec)
          return prodSpec ? prodSpec : {}
        },
        getPhysicalParameter(spec) {
          var phyParams = this.deepCopy(this.$store.state.foodCertificate.physical_parameter)
          if (!phyParams || !phyParams.length) return {}
          var phyParam = phyParams.find(x => x._id === spec)
          return phyParam ? phyParam : spec
        },
        shelfLife(spec) {
          var sLifes = this.deepCopy(this.$store.state.foodCertificate.shelf_life)
          if (!sLifes || !sLifes.length) return {}
          var sLife = sLifes.find(x => x._id === spec)
          return sLife ? sLife : {}
        },
        descNutri(data) {
          var infos= []
          var nutrInfos = this.$store.state.foodCertificate.nutrition_information
          var vitInfos = this.$store.state.foodCertificate.vitamins
          var minInfo = this.$store.state.foodCertificate.minerals
          console.log("nutri: " + JSON.stringify(nutrInfos))
          console.log("vit: " + JSON.stringify(vitInfos))
          console.log("min: " + JSON.stringify(minInfo))
          nutrInfos.forEach(nutri =>{
            // console.log("for each data nutriInfoz:")
            infos.push(nutri)
          })
          vitInfos.forEach(vit =>{
            infos.push(vit)
          })
          minInfo.forEach(min =>{
            infos.push(min)
          })

          console.log("DESC DATA:" + JSON.stringify(infos))
          if (!infos || !infos.length) return {}
          var nutrInfo = infos.find(x => x._id === data)
          return nutrInfo ? nutrInfo : {}
        },
        healthClaims(data) {
          console.log("claims data: " + JSON.stringify(data))
          var claims = this.deepCopy(this.$store.state.foodCertificate.nutrition_health_claims)
          console.log("LOGS CLAIMS:" + JSON.stringify(this.$store.state.foodCertificate.nutrition_health_claims))
          if (!claims || !claims.length) return {}
          var claim = claims.find(x => x._id === data)
          return claim || data
        },
        // Certificate
        getAppTypeCert(type) {
          var app_type = ["Initial", "Ammendment", "Renewal", "Reapplication" ]
          console.log("get app cert type: " + JSON.stringify(type))
          console.log("get app cert type return: " + JSON.stringify(app_type[type]))
          return app_type[type];
        },
        getAppStatusCert(status) {
          var apps = ["On Process", "Active", "Compliance", "Denied", "Expired", "Waiting for Confirmation", "Inactive/Archived/DNP"];
          return apps[status];
        },
        vitMin(data) {
          var minVit = ["Vitamin", "Minerals", "Nutrition"]
          return minVit[data]
        }
      }
    });
  }

}