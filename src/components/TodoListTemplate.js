import React,{ Component } from "react";
import { connect } from 'react-redux';
import "./css/TodoListTemplate.css";
import Form from './Form';
import TodoList from './TodoItemList';
import Warning from './Warning';
import { loginRequest, signupRequest, logout, editInput } from '../actions';


class TodoListTemplate extends Component{
    constructor(props){
        super(props);
        this.state = {
            formStatus: false,
            warning: {
                status: false,
                message: ''
            }
        }
        this.openLogin = this.openLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.openSignup = this.openSignup.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.openHome = this.openHome.bind(this);
        this.showWarning = this.showWarning.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }
    openLogin(e){
        e.preventDefault();
        this.setState({
            formStatus: 'login'
        },()=>{
            this.idInput.focus();
        });
    }
    openSignup(e){
        e.preventDefault();
        this.setState({
            formStatus: 'signup'
        },()=>{
            this.idInput.focus();
        });
    }
    handleLogout(e){
        e.preventDefault();
        this.props.logout();
        this.setState({
            formStatus: false
        },()=>{
            this.props.resetInput('RESET');
        })
    }
    openHome(e){
        e.preventDefault();
        this.setState({
            formStatus: false
        })
    }
    handleLogin(){
        let id = this.idInput.value;
        let pw = this.pwInput.value;
        localStorage["backup-todo"] = JSON.stringify(this.props.userInfo.todolists);
        this.props.loginRequest(id,pw).then(()=>{
            if(this.props.userInfo.status === 'LOGGED_IN'){
                this.setState({
                    formStatus:false,
                });
                this.showWarning(`Welcome, ${this.props.userInfo.userId.userId}`);
                
            }else{
                this.showWarning(`Log-in Request Failed.`);
            }
        });
    }
    handleSignup(){
        let id = this.idInput.value;
        let pw = this.pwInput.value;
        this.props.signupRequest(id,pw).then(()=>{
            if(this.props.userInfo.status === 'SIGNUP_SUCCESS'){
                this.setState({
                    formStatus:false,
                });
                this.showWarning(`${id} Successfully Joined.`);
            }else{
                this.showWarning(`Sign-up Request Failed.`);
            }
        });
    }
    showWarning(message){
        this.setState({
            warning:{
                status:true,
                message:message
            }
        });
        setTimeout(()=>{
            this.setState({
                warning:{
                    status:false,
                    message:message
                }
            });
        },1500);
    }
    onChange(e){
        if(e.target.value.length>0){
            e.target.classList.add('on');
        }else{
            e.target.classList.remove('on');
        }
    }
    onKeyPress(e){
        if(e.key === 'Enter'){
            if(this.state.formStatus === 'signup'){
                this.handleSignup();
            }else if(this.state.formStatus === 'login'){
                this.handleLogin();
            }
        }
    }
    render(){
        const loginStatus = this.props.userInfo.status === 'LOGGED_IN' ;
        const loginBtn = (<a href="/" className="btn" onClick={this.openLogin}><i className="material-icons">vpn_key</i></a>)
        const logoutBtn = (<a href="/" className="btn" onClick={this.handleLogout}><i className="material-icons">lock_open</i></a>)
        const authWrapper = (
            <div className="auth-wrapper">
                { loginStatus ? (<div><span>{`[ ${this.props.userInfo.userId.userId} ]`}</span> {logoutBtn}</div>) : loginBtn }
            </div>
        )
        const defaultMode = (
            <div>
                <section className="form-wrapper">
                    <Form />
                </section>
                <section className="todos-wrapper">
                    <TodoList />
                </section>
            </div>
        )
        const loginMode = (
            <section className="sign-wrapper">
                <form>
                    <div >
                        <input type="text" onChange={this.onChange} 
                        ref={ref=> this.idInput = ref} />
                        <label>id</label>
                    </div>
                    <div>
                        <input type="password" 
                            onChange={this.onChange}
                            ref={ref=> this.pwInput = ref} 
                            onKeyPress={this.onKeyPress} />
                        <label>password</label>
                    </div>
                    <button type="button" onClick={this.handleLogin}>LOG IN</button>
                </form>
                <div className="footer">
                    New Here? <a href="/" onClick={this.openSignup}>Create an account</a>
                </div>
            </section>
        )
        const signupMode = (
            <section className="sign-wrapper">
                <form>
                    <div>
                        <input type="text" onChange={this.onChange} 
                        ref={ref=> this.idInput = ref} />
                        <label>id</label>
                    </div>
                    <div>
                        <input type="password" 
                            onChange={this.onChange} 
                            ref={ref=> this.pwInput = ref} 
                            onKeyPress={this.onKeyPress} />
                        <label>password</label>
                    </div>
                    <button type="button" onClick={this.handleSignup}>CREATE</button>
                </form>
            </section>
        )
        return(
            <div className="todo-list-template">
                <header className="header">
                    <h1 className="title"><a href="/" onClick={this.openHome}>To do List</a></h1>
                    {
                        !this.state.formStatus ? authWrapper : undefined
                    }
                </header>
                {
                    !this.state.formStatus ? defaultMode : this.state.formStatus === 'login' ? loginMode : signupMode
                }
                <Warning visible={this.state.warning.status} message={this.state.warning.message} />
            </div>
        );
    }
}
const mapStateToProps = (state) =>{
    return {
      userInfo: state.userInfo
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        loginRequest: (userId,password) =>{
            return dispatch(loginRequest(userId,password));
        },
        signupRequest: (userId,password) =>{
            return dispatch(signupRequest(userId,password));
        },
        logout: () =>{
            dispatch(logout());
        },
        resetInput: (reset)=>{
            dispatch(editInput(reset));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoListTemplate);