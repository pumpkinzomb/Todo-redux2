import C from "./constants";
import axios from 'axios';

export const editInput = (text,color,bolded,formState,id,checked) => {
    let isReset = text === 'RESET';
    if(isReset){
        return { type: C.RESET_INPUT }
    }
    return{
        text,
        color, 
        bolded,
        formState,
        id,
        checked,
        type: C.EDIT_INPUT
    }
}

// export const addList = (id,text,color,bolded) =>({
//     type:C.ADD_LIST,
//     id,
//     text,
//     color,
//     bolded,
//     timestamp: new Date().toString()
// })

export const addList = (userId, addlist, oldtodolists) =>{
    let todolists = [...oldtodolists];
    todolists.push(addlist);
    if(userId){
        axios.put('/api/lists/'+userId._id,{ todolists })
        .then((response)=>{
            todolists = response;
        });
    }
    return{
        type:C.ADD_LIST,
        todolists
    }
}
export const removeList = (userInfo, listId) => {
    let userId = userInfo.userId;
    let todolists = [...userInfo.todolists].reverse(); //출력시 내림차순으로 출력되니 아이디를 다시 배열순으로 맞춰준다.
    // let find = todolists.findIndex(list=>{
    //     return list.id === listId
    // });
    // todolists.splice(find,1);
    // todolists.map((list,i) => {
    //     list.id = i;
    //     return list;
    // });
    todolists.splice(listId,1);
    todolists.map((list,i) => {
        list.id = i;
        return list;
    });
    if(userId){
        axios.put('/api/lists/'+userId._id,{ todolists })
        .then((response)=>{
            todolists = response;
        });
    }
    return{
        type:C.REMOVE_LIST,
        todolists
    }
}
export const checkToggle = (userInfo, id, checked) => {
    let todolists = [...userInfo.todolists];
    let userId = userInfo.userId;
    todolists.map(list=>{
        if(list.id === id){
            list.checked = checked;
        }
        return list;
    });
    if(userId){
        axios.put('/api/lists/'+userId._id,{ todolists })
        .then((response)=>{
            todolists = response;
        });
    }
    return{
        type:C.CHECK_TOGGLE_LIST,
        todolists
    }
}
export const editList = (userId, editlist, oldtodolists) => {
    let todolists = [...oldtodolists];
    let find = todolists.findIndex((list)=>{
        return list.id === editlist.id
    });
    todolists[find] = editlist;
    if(userId){
        axios.put('/api/lists/'+userId._id,{ todolists })
        .then((response)=>{
            todolists = response;
        });
    }
    return {
        type:C.EDIT_LIST,
        todolists
    }
}

export const addState = () => ({
    type:C.ADD_STATE
})
export const editState = (id,text,color,bolded,checked) => ({
    type:C.EDIT_STATE,
    id,
    text,
    color,
    bolded,
    checked
})

export const realignMode = (modeState) =>({
    type:C.REALIGN_MODE,
    modeState
})
export const realignLists_getFid = (fId) =>{
    let isReset = fId === -1;
    if(!isReset){
        return{
            type: C.REALIGN_GET_FID,
            fId
        }
    }else{
        return{
            type: C.REALIGN_FID_RESET
        }
    }
}
export const realignList = (userInfo,fId,lId) =>{
    let todolists = [...userInfo.todolists].reverse(); //출력시 내림차순으로 출력되니 아이디를 다시 배열순으로 맞춰준다.
    let userId = userInfo.userId;
    // const getFirst = todolists.findIndex(list => list.id === fId);
    // const getLast = todolists.findIndex(list => list.id === lId);
    const selectFrom = todolists[fId];
    todolists.splice(fId, 1);
    todolists.splice(lId, 0, selectFrom);
    todolists.map((list,i) => {
        list.id = i;
        return list;
    });
    if(userId){
        axios.put('/api/lists/'+userId._id,{ todolists })
        .then((response)=>{
            todolists = response;
        });
    }
    return {
        type:C.REALIGN_LIST,
        todolists
    }
}

export function loginRequest(userId,password){
    return (dispatch)=>{
        return axios.post('/api/user/signin',{ userId, password })
        .then((response)=>{
            let user = response.data.user;
            let todolists = response.data.todolists;
            dispatch(loginSuccess(user,todolists));
        }).catch((error)=>{
            dispatch(loginFailure(error.response.data.code));
        });
    }
}


export const loginSuccess = (user,todolists) =>{
    return {
        type:C.LOG_IN_SUCCESS,
        user,
        todolists
    }
}
export const loginFailure = (error) =>{
    return {
        type:C.LOG_IN_FAILURE,
        error
    }
}
export const logout = () => {
    return {
        type: C.LOG_OUT_SUCCESS
    }
}

export function signupRequest(userId,password){
    return (dispatch) =>{
        return axios.post('/api/user/signup',{ userId, password })
        .then((response)=>{
            dispatch(signupSuccess(userId));
        }).catch((error)=>{
            dispatch(signupFailure(error.response.data.code));
        });
    }
}

export const signupSuccess = (userId) =>{
    return {
        type: C.SIGN_UP_SUCCESS,
        userId
    }
}

export const signupFailure = (error) =>{
    return {
        type: C.SIGN_UP_FAILURE,
        error
    }
}

export function putTodoLists(userId,todolists){
    return (dispatch) =>{
        return axios.put('/api/lists/'+userId,{ todolists })
        .then((response)=>{
            dispatch(putTodoSuccess(response.data.todolists));
        }).catch((error)=>{
            dispatch(putTodoFailure(error.response.data.code));
        });
    }
}

export const putTodoSuccess = (todolists) =>{
    return{
        type: C.PUT_TODO_SUCCESS,
        todolists
    }
}

export const putTodoFailure = (error)=>{
    return {
        type: C.PUT_TODO_FAILURE,
        error
    }
}