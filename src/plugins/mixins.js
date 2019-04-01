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
        getAppType(type) {
          var app_type = ["Initial", "Variation", "Renewal"]
          return app_type[type];
        },
        getActStatus(status) {
          var act_status = ["Approved", "Recommend for Compliance", "Denied"]
          return act_status[status]
        },
        getCaseType(type) {
          var case_type = ["License", "Certificate", "Registerd User"]
          return case_type[type]
        },
        numberMask(number){
          var length = number.length
          var final = null
          if(length === 12){
            final = number.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, "$1 - $2 - $3 - $4")
          }else if(length === 11){
            final = number.replace(/(\d{4})(\d{3})(\d{4})/, "($1) - $2 - $3")
          }else if(length === 10){
            final = number.replace(/(\d{2})(\d{4})(\d{4})/, "($1) - $2 - $3")
          }          
          return final
        },
        getTask(task_id) {
          if (this.$store.state.tasks.tasks) {
            console.log('task_id :', task_id + " ::: " + JSON.stringify(this.$store.state.tasks.tasks));
            var task = this.$store.state.tasks.tasks.find(x => {
              return x._id.toString() === task_id;
            });
            console.log("returned task: " + JSON.stringify(task))
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
        getAdminName(admin_id) {
          if (this.$store.state.user_session.admin_user) {
            console.log('admin_id :', admin_id + " ::: " + JSON.stringify(this.$store.state.user_session.admin_user));
            var admin = this.$store.state.user_session.admin_user.find(x => {
              return x._id.toString() === admin_id;
            });
            console.log("returned task: " + JSON.stringify(admin))
            return admin ? admin : {};
          } else {
            return null;
          }
        },
        numberWithCommas(x) {
          return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0.00';
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
          var parts = amount.toString().split(".");
          return (
            parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
            (parts[1] ? "." + parts[1] : "")
          );
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
          console.log('test: ', email, !validate);
          return !validate;
        },
        getRegionName(id) {
          var found = false;
          for (var i = 0; i < this.$store.state.places.regions.length; i++) {
            var region = this.$store.state.places.regions[i]
            if (region._id === id) {
              console.log('###################region :', region);
              return region.name
            }else{
              found = true
            } 
          }
          if(found){
            return "";
          }
        },
        getProvinceName(id) {
          var found = false;
          for (var i = 0; i < this.$store.state.places.provinces.length; i++) {
            var province = this.$store.state.places.provinces[i]
            if (province._id === id) {
              return province.name
            }else{
              found = true
            } 
          }
          if(found){
            return "";
          }
        },
        getCityName(id) {
          var found = false;
          for (var i = 0; i < this.$store.state.places.city.length; i++) {
            var city = this.$store.state.places.city[i]
            if (city._id === id) {
              return city.name
            }else{
              found = true
            } 
          }
          if(found){
            return "";
          }
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
        getModeOfPayment(mode){
          var mode_of_payment = ["Online Payment (Creditcard)", "Cash", "Credit Card (Cashier)", "Check", "Online Payment (EC)"]
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
        logout() {
          this.$store.dispatch("LOGOUT");
          this.$router.push("/login");
        }
      }
    });
  }

}