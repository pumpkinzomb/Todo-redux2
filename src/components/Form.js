import React, { Component } from "react";
import "./css/Form.css";
import Palette from "./Palette";
import { connect } from 'react-redux';
import { 
    editInput, 
    addList,
    editList, 
    realignMode
} from '../actions';

class Form extends Component{
    componentDidUpdate(prevProps){
        if(prevProps.form.text !== this.props.form.text){
            this.inputText.value = this.props.form.text;
        }
    }
    toggleRealignMode = () =>{
        this.props.onRealignMode(!this.props.realignmentMode.modeState);
        this.props.onEdit('RESET');
    }
    submit = (e) => {
        e.preventDefault();

        const form = this.props.form;
        const lists = this.props.userInfo.todolists;
        const text = this.inputText.value;
        const userId = this.props.userInfo.userId;
        if(text.length < 1){
            return;
        }
        if(form.formState === "add"){
            let newId = lists.length;
            let newList = {
                id: newId,
                text: text,
                bolded: form.bolded,
                color: form.color,
                checked: false,
                timestamp: new Date().toString()
            }
            this.props.onAdd(userId, newList, lists);
        }else{
            let editList = {
                id: form.id,
                text: text,
                bolded: form.bolded,
                color: form.color,
                checked: form.checked,
                timestamp: new Date().toString()
            }
            this.props.onEditSubmit(userId, editList, lists);
        }
        this.props.onEdit("RESET"); // IT MEANS RESET
        this.inputText.value = "";
        this.inputText.className = "";
        this.inputText.focus();
    }
    render(){
        const inputData = this.props.form;
        const AddForm = (
            <form className="form" 
                onSubmit={this.submit}>
                <input 
                    className={`${inputData.color} ${inputData.bolded ? "bold-font" : ""}`} 
                    ref={(ref)=>{ this.inputText = ref }}
                />
                <button className="create-button"><i className="material-icons">edit</i></button>
            </form>
        );
        const EditForm = (
            <form className="form" onSubmit={this.submit}>
                <input 
                    className={`${inputData.color} ${inputData.bolded ? "bold-font" : ""}`}
                    defaultValue={inputData.text}
                    ref={(ref)=>{ this.inputText = ref }}   
                    />
                <button className="edit-button"><i className="material-icons">edit</i></button>
            </form>
        );
        let input = '';
        return(
            <div className="todo-form">
                <div className="palette-with-btns">
                    <div className="sort-btn" onClick={this.toggleRealignMode}><i className="fa fa-reorder"></i></div>
                    <Palette input={this.props.form} onEdit={this.props.onEdit} />
                </div>
                {
                    this.props.form.formState === "add" ? 
                    AddForm :
                    EditForm
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
        onEdit(text,color,bolded,formState,id,checked){
            dispatch(editInput(text,color,bolded,formState,id,checked));
        },
        onAdd(userId, newList, todoLists){
            dispatch(addList(userId, newList, todoLists));
        },
        onEditSubmit(userId, newList, todoLists){
            dispatch(editList(userId, newList, todoLists));
        },
        onRealignMode(modeState){
            dispatch(realignMode(modeState));
        }
    })

)(Form);