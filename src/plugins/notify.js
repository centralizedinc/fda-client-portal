export default {
    install(Vue, store) {


        Vue.prototype.$notify = (notification) => {
            store.commit('ADD_NOTIFICATION', notification);
        }

        Vue.prototype.$notifyError = (errors) => {
            var message = "Oops something went wrong. Please try again."
            var messages = "";
            if (errors && errors.length > 0) {
                errors.forEach(element => {
                    messages = messages + element.message + " <br/>"
                });
            }else if(errors.message){
                message = message +" <br/>" + errors.message
            }else{
                message = message +" <br/>" + errors
            }


            store.commit('ADD_NOTIFICATION', {
                message: messages ? messages : message,
                color: 'error',
            });
        }
    }
}