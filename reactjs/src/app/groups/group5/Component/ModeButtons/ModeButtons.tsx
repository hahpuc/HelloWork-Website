import React from 'react'
import '../../styles.less'
import AppComponentBase from 'app/shared/components/AppComponentBase'
import {Button} from "antd";

interface ModeButtonsProps {
    isEditing : boolean,
    onClickEdit : () => void,
    onClickAdd : () => void,
    onClickDone : () => void
}

interface ModeButtonsState {
    
}

export default class ButtonsEditAndDelete extends AppComponentBase<ModeButtonsProps, ModeButtonsState> {
    constructor(props : any) {
        super(props);
    }

    render() {
        if(this.props.isEditing) {
            return (
                <div style={{marginRight: 16}}>
                    <Button className="btnUpdate" type={"primary"} icon="check"
                        onClick={this.props.onClickDone}>Hoàn tất
                    </Button>
                </div>
            )
        }
        return (
            <div style={{marginRight: 16}}>
                <Button className="btnUpdate" type={"default"} icon="edit" 
                    onClick={this.props.onClickEdit}>Chỉnh sửa
                </Button>
                <Button className="btnUpdate" type={"primary"} icon="plus"
                    onClick={this.props.onClickAdd}>Thêm mới
                </Button>
            </div>
        )
    }
}