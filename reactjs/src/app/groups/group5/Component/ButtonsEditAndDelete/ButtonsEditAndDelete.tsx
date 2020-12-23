import React from 'react'
import '../../styles.less'
import AppComponentBase from 'app/shared/components/AppComponentBase'
import {Button} from "antd";

interface ButtonsEditAndDeleteProps {
    isEditing : boolean,
    onClickEdit : () => void,
    onClickDelete : () => void
}

interface ButtonsEditAndDeleteState {
    
}

export default class ButtonsEditAndDelete extends AppComponentBase<ButtonsEditAndDeleteProps, ButtonsEditAndDeleteState> {
    constructor(props : any) {
        super(props);
    }

    render() {
        if(this.props.isEditing) {
            return (
                <div style={{justifyItems: "center"}}>
                    <Button 
                        type="primary" shape="circle" icon="edit" 
                        onClick={this.props.onClickEdit}>
                    </Button>
                    <Button 
                        type="danger" icon="delete" style={{borderRadius: 4, marginLeft: 8}}
                        onClick={this.props.onClickDelete}>
                    </Button>
                </div>
            )
        }
        return (
            <div style={{justifyItems: "center"}}></div>
        )
    }
}