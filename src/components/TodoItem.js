import React from "react";
import "./css/TodoItem.css";

const TodoItem = ({ 
    text="",
    bolded=false,
    checked=false,
    color="color1",
    id=-1, 
    form={},
    userInfo={},
    resetInput=f=>f,
    onAddList=f=>f,
    onEditList=f=>f,
    onCheckToggle=f=>f, 
    onRemoveList=f=>f}) => {
    return(
        <div className={`todo-item ${(form.formState === "edit" && form.id === id) ? "edit-item" : ""}`} 
            onClick={() => 
                onCheckToggle(userInfo, id, !checked)
            }>
            <div className={`remove ${checked ? "checked" : ""}`} onClick={(e) => {
                e.stopPropagation();
                onRemoveList(userInfo, id);
                resetInput('RESET');
            }}><i className="material-icons">delete_forever</i></div>
            <div className={`todo-text ${color} ${checked ? "checked" : ""} ${bolded ? "bold-font" : ""}`}>
                <div>{ text }</div>
            </div>
            {
                checked && (<div className="check-mark"><i className="material-icons">done</i></div>) //checked가 true면 우측 실행, ( 좌측이 true일 경우 )항상 우측이 반환됨
            }
            <div className="edit-btn" onClick={(e) => {
                e.stopPropagation();
                form.formState === "add" ? onEditList(id,text,color,bolded,checked) :
                    form.id === id ? onAddList() : onEditList(id,text,color,bolded,checked);
            }}><i className="material-icons">edit</i></div>
        </div>
    )
}

export default TodoItem;
