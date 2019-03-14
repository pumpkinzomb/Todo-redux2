import C from '../actions/constants';
import update from 'react-addons-update';

export const form = (input={},action) => {
    switch (action.type){
        case C.EDIT_INPUT:
            return{
                text:action.text,
                bolded:action.bolded,
                color:action.color,
                formState:action.formState,
                id:action.id,
                checked:action.checked
            }
        case C.ADD_STATE:
            return{
                text:"",
                bolded:false,
                color:"color1",
                formState:"add",
                id:-1,
                checked:false
            }
        case C.EDIT_STATE:
            return{
                text:action.text,
                bolded:action.bolded,
                color:action.color,
                formState:"edit",
                id:action.id,
                checked:action.checked
            }
        case C.RESET_INPUT:
            return{
                text:"",
                bolded:false,
                color:"color1",
                formState:"add",
                id:-1,
                checked:false
            }
        default :
            return input
    }
}


// export const list = (list={},action) => {
//     switch (action.type) {
//         case C.ADD_LIST:
//             return{
//                 id:action.id,
//                 text:action.text,
//                 bolded:action.bolded,
//                 color:action.color,
//                 timestamp:action.timestamp,
//                 checked:false
//             }
//         case C.EDIT_LIST:
//             return {
//                     id:action.id,
//                     text:action.text,
//                     checked:action.checked,
//                     bolded:action.bolded,
//                     color:action.color,
//                     timestamp:action.timestamp
//                 }
//         case C.CHECK_TOGGLE_LIST:
//             return (list.id !== action.id) ? 
//             list :
//             {
//                 ...list,
//                 checked:action.checked
//             }
//         default :
//             return list
//     }
// }
// export const lists = (lists=[],action) => {
//     switch (action.type){
//         case C.ADD_LIST :
//             return update(
//                 lists,{$push:[list({},action)]}
//             )
//         case C.CHECK_TOGGLE_LIST :
//             return update(lists,{
//                 [action.id]: { checked: { $set: action.checked} }
//             })
//         case C.EDIT_LIST :
//             return update(lists,{
//                 [action.id]: { $set: list({},action) }
//             });
//         case C.REMOVE_LIST :
//             return update(lists,{
//                 $splice : [[ action.id, 1 ]]
//             }).map((list,i) => {
//                 list.id = i;
//                 return list;
//             });
//         case C.REALIGN_LIST :
//             const getFirst = lists.findIndex(list => list.id === action.fId);
//             const getLast = lists.findIndex(list => list.id === action.lId);
//             return update(lists,{
//                 $splice : [[getFirst,1], [getLast, 0, lists[getFirst]]]
//             }).map((list,i) => {
//                 list.id = i;
//                 return list;
//             });
//         default:
//             return lists
//     }
// }

export const realignmentMode = (realignmentMode={},action) => {
    switch (action.type) {
        case C.REALIGN_MODE :
            return {
                modeState:action.modeState,
                fId:-1,
                lId:-1
            }
        case C.REALIGN_GET_FID :
            return {
                modeState:true,
                fId:action.fId,
                lId:-1
            }
        case C.REALIGN_FID_RESET :
            return {
                modeState:true,
                fId:-1,
                lId:-1
            }
        default :
            return realignmentMode
    }
}

const initialUser={
    userId: false,
    status:'INIT',
    todolists: []
}
export const userInfo = (user=initialUser, action) =>{
    switch(action.type){
        case C.ADD_LIST :
            return update(user,{
                    todolists: {
                        $set: action.todolists
                    }
                });
        case C.CHECK_TOGGLE_LIST :
            return update(user,{
                    todolists: {
                        $set: action.todolists
                    }
                });
        case C.EDIT_LIST :
            return update(user,{
                todolists: {
                    $set: action.todolists
                }
            });
        case C.REMOVE_LIST :
            return update(user,{
                todolists: {
                    $set : action.todolists
                }
            })
        case C.REALIGN_LIST :
            return update(user,{
                todolists: {
                    $set: action.todolists
                }
            })

        case C.LOG_IN_SUCCESS:
            return update(user,{
                userId: { $set: action.user },
                status: { $set: 'LOGGED_IN' },
                todolists: { $set: action.todolists }
            })
        case C.LOG_IN_FAILURE:
            return update(user,{
                status: { $set: 'LOGIN_FAILED'}
            })
        case C.LOG_OUT_SUCCESS:
            return update(user,{
                userId: { $set: false },
                status: { $set: 'INIT' },
                todolists: { $set: JSON.parse(localStorage["backup-todo"]) }
            })
        case C.SIGN_UP_SUCCESS:
            return update(user,{
                status: { $set: 'SIGNUP_SUCCESS' }
            })
        case C.SIGN_UP_FAILURE:
            return update(user,{
                status: { $set: 'SIGNUP_FAILED'}
            })
        case C.PUT_TODO_SUCCESS:
            return update(user,{
                todolists: { $set: action.todolists }
            })
        case C.PUT_TODO_FAILURE:
            return update(user,{
                status: { $set: 'PUT_TODO_FAILED' + action.error }
            })
        default:
            return user
    }
}

