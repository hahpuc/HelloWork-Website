import React from "react";
import './ModalEducation.less'

//by Nguyen Van Dong
//delete icon
// import gray_delete_icon from 'assets/images/gray_delete_icon.png'
import red_delete_icon from 'assets/images/red_delete_icon.png'
import confirmation_icon from 'assets/images/confirmation_management_icon.png'
import success_management_icon from 'assets/images/success_management_icon.png'
import fail_management_icon from 'assets/images/fail_management_icon.png'

export default class ModalEducation extends React.Component {

    //to use this component:
    //shadow = {true} if you want to have a back ground fullscreen after your modal/
    //custom = {true} 
    //type = "confirmation" => you will have a confirmation icon in component 
    //but, you must to code footer and handler event in your parent component
    //type = "alert" => not to code any more, only set title and text
    //type = "custom" if you want to custom yout modal by code in children

    //tilte = "String": title of 
    //text = "String": main text

    render() {

        if (!this.props.open) {
            return null;
        }
        return (
            <div>
                {this.props.shadow ? <div className="Custom_Modal_Out_Shadow3" /> : <></>}

                <div className="Custom_Modal_Out_Layout3">
                    <div className="Custom_Modal_Wrapper3">
                        {!(this.props.type === "custom") ?
                            <>
                                <div className="Custom_Modal_Header3">
                                    <div> {this.props.title} </div>
                                    <img className="Custom_Modal_Close_Button3" alt="header" src={red_delete_icon}
                                        onClick={() => this.props.closeModal()} />
                                </div>

                                <div className="Custom_Modal_Body3">
                                    {(this.props.type === "alert_success") ?
                                        <img  src={success_management_icon} alt="icon" />
                                        : <></>
                                    }
                                    {(this.props.type === "alert_fail") ?
                                        <img src={fail_management_icon} alt="icon" />
                                        : <></>
                                    }
                                    {(this.props.type === "confirmation") ?
                                        <img src={confirmation_icon} alt="icon" />
                                        : <></>
                                    }
                                    <div className="Custom_Modal_Main_Content_Layout3">
                                        <div className="Custom_Modal_Main_Text3">
                                            {this.props.text}
                                        </div>
                                    </div>
                                </div>

                                {(this.props.type === "confirmation") ?
                                    <div className="Custom_Modal_Footer3">
                                        {this.props.children}
                                    </div>
                                    : <></>
                                }

                                {(this.props.type === "alert_success" || this.props.type === "alert_fail") ?
                                    <div className="Custom_Modal_Footer3">
                                        <div className="Simple_Blue_Button3" style={{ margin: "auto" }} onClick={() => this.props.closeModal()} >OK</div>
                                    </div>
                                    : <></>
                                }
                            </>
                            :
                            <>
                                <div className="Custom_Modal_Header3">
                                    <div> {this.props.title} </div>
                                    <img className="Custom_Modal_Close_Button3" alt="header" src={red_delete_icon}
                                        onClick={() => this.props.closeModal()} />
                                </div>
                                {this.props.children}
                            </>}
                    </div>
                </div>
            </div>
        );
    }
}