
var initialState = {
    notifications:[],
    id:0
}

const state = JSON.parse(JSON.stringify(initialState))

var mutations = {
    ADD_NOTIFICATION: (state, payload)=>{
        //reset
        //MD doesn't recommend multiple snackbar
        state.notifications = [];
        var expiry = null;
        if(!payload.timeout){
            expiry = (new Date()).getTime() + 6000;
        }else{
            expiry = (new Date()).getTime() + payload.timeout;
        }
        state.notifications.push({
            data: payload,
            expiry:expiry,
            show:true
        })
    },
    REMOVE_NOTIFICATION: (state, payload)=>{
        state.notifications = [];
    },
    CLEAR_DATA(state) {
      Object.keys(initialState).forEach(key => {
        state[key] = initialState[key]
      })
    }
}



export default {
    state,
    mutations
  };