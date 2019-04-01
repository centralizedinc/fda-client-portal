export default {
    install(Vue, store) {

        Vue.prototype.$showCC = (payment_details) => {            
            store.commit('SHOW_CC_DIALOG', payment_details)
        }

        Vue.prototype.$hideCC = () => {            
            store.commit('HIDE_CC_DIALOG')
        }
        
    }
}