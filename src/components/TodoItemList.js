import React, { Component } from "react";
import TodoItem from "./TodoItem";
import RealignmentItem from "./RealignmentItem";
import { connect } from 'react-redux';
import { 
    removeList, 
    checkToggle, 
    editState, 
    addState, 
    realignLists_getFid, 
    realignList,
    editInput
} from '../actions';

class TodoItemList extends Component{ 
    render(){
        const realignmentMode = this.props.realignmentMode;
        const todolists = this.props.userInfo.todolists.sort((a,b)=>{
                return b["id"] - a["id"];
            });
        return (
            <div>
                {
                    todolists.map(list => (
                        realignmentMode.modeState === false ? 
                        <TodoItem 
                            form = {this.props.form}
                            userInfo = {this.props.userInfo}
                            {...list}
                            onRemoveList={this.props.onRemoveList}
                            onAddList={this.props.onAddList}
                            onEditList={this.props.onEditList}
                            onCheckToggle={this.props.onCheckToggle}
                            key={list.id}
                            resetInput = {this.props.resetInput}
                        /> :

                        <RealignmentItem 
                            {...list} 
                            key={list.id}
                            userInfo = {this.props.userInfo}
                            realignmentMode={realignmentMode}
                            onRealign_Fid={this.props.onRealign_Fid}
                            onRealignList={this.props.onRealignList}
                        />
                    ))
                }
            </div>
        )
    }
}

export default connect(
        state =>({
            form:state.form,
            userInfo:state.userInfo,
            realignmentMode:state.realignmentMode
        }),
        dispatch => ({
            onEditList(id,text,color,bolded,checked){
                dispatch(editState(id,text,color,bolded,checked))
            },
            onAddList(){
                dispatch(addState())
            },
            onRemoveList(userInfo, id){
                dispatch(removeList(userInfo, id))
            },
            onCheckToggle(userInfo, id, checked){
                dispatch(checkToggle(userInfo, id, checked))
            },
            onRealign_Fid(fId){
                dispatch(realignLists_getFid(fId))
            },
            onRealignList(userInfo,fId,lId){
                dispatch(realignList(userInfo,fId,lId))
            },
            resetInput(reset){
                dispatch(editInput(reset));
            }
        })
)(TodoItemList);
