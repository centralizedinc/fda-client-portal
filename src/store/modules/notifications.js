
var state = {
    notifications:[],
    id:0,
}

var mutations = {
    ADD_NOTIFICATION: (state, payload)=>{
        //reset
        //MD doesn't recommend multiple snackbar
        state.notifications = [];
        state.notifications.push({
            id: state.id++,
            data: payload,
            show:true
        })
    },
    REMOVE_NOTIFICATION: (state, payload)=>{
        for(var i=0; i<state.notifications.length; i++){
            if(state.notifications[i].id === payload.id){
                state.notifications.splice(i,1);
                break;
            }
        }
    }
}



export default {
    state,
    mutations
  };