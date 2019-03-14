import React, { Component } from 'react'
import './css/Warning.css';
class Warning extends Component {
    constructor(props){
        super(props)
        this.state={
            closing: false
        }
    }
    componentWillReceiveProps(nextProps){
        if(this.props.visible && !nextProps.visible){
            // visible props is changing from true -> false
            this.setState({
                closing:true
            });
            setTimeout(()=>{
                this.setState({
                    closing:false
                });
            },1000);
        }
    }
    render() {
        const { visible, message } = this.props;
        const { closing } = this.state;
        if(!visible && !closing) return null;
        return (
            <div className="warning-wrapper">
                <div className={`warning ${closing? 'bounceOutUp' : 'bounceIn'} animated`}>
                    { message }
                </div>
            </div>
            
        )
    }
}
export default Warning;