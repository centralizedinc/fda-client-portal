export default {

  install(Vue) {
    Vue.mixin({
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
          var app_type = ["Initial", "Variation", "Renewal"];
          return app_type[type];
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
        getUsername(user_id) {
          if (this.$store.state.user_session) {
            var user = null;
            user = this.$store.state.user_session.find(x => {
              return x._id === user_id
            })
            return user ? user.name : ''
          } else {
            return ''
          }
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
          return validate;
        },
        getRegionName(id) {
          for (var i = 0; i < this.$store.state.places.regions.length; i++) {
            var region = this.$store.state.places.regions[i]
            if (region._id === id) {
              return region.name
            }
          }
        },
        getProvinceName(id) {
          for (var i = 0; i < this.$store.state.places.provinces.length; i++) {
            var province = this.$store.state.places.provinces[i]
            if (province._id === id) {
              return province.name
            }
          }
        },
        getCityName(id) {
          for (var i = 0; i < this.$store.state.places.city.length; i++) {
            var city = this.$store.state.places.city[i]
            if (city._id === id) {
              return city.name
            }
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
        logout() {
          this.$store.dispatch("LOGOUT");
          this.$router.push("/login");
        }
      }
    });
  }

}