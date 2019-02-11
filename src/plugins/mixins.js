
export default {

    install(Vue){
        Vue.mixin({
            methods: {
              getAppType(type) {
                if (type === "I") {
                  return "Initial";
                } else if (type === "R") {
                  return "Renewal";
                } else if (type === "V") {
                  return "Variation";
                }
              },
              getProduct(product_id){
                var product = this.$store.state.product.productType;
                console.log("all product data: " + JSON.stringify(product))
                var index = product.find(x => {
                  return x._id === product_id
                })
                return index.name
              },             
              formatDate: (date, type) => {
                if (!date) {
                  return "";
                }
                var format = {
                  hour12: true,
                  year: "numeric",
                  month: "long",
                  day: "2-digit"
                };
                if (!type) {
                  format.hour = "2-digit";
                  format.minute = "2-digit";
                }
                var dt = new Date(date).toLocaleString("en-US", format);
                return dt;
              },
              formatDt(dt){
                var date = new Date(dt);
                var month = date.getMonth() + 1;
                var newDT = date.getFullYear() + "-" + month + "-" + date.getDate();
                return newDT
              },
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
              logout() {
                this.$store.dispatch("LOGOUT");
                this.$router.push("/");
              }
            }
          });
    }

}