import {createSlice} from '@reduxjs/toolkit' ;

export const userSlice = createSlice({
    name : "user",
    initialState :
     {value:{
        numberOfPlayers: 1,
        reservationDate: '',
        startTime: '',
        endTime: '',
        

    }},
    reducers : {
        login : (state,action)=>{
            state.value=action.payload
        },
     
    }
});
export const {login} =userSlice.actions;
export default userSlice.reducer;