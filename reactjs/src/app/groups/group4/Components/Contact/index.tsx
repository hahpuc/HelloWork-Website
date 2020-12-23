import './index.less'
import React from 'react'

import {DataConsumer} from '../../scenes/ListCV/ListCV'


export interface IHeaderProps {
    collapsed?: any;
    toggle?: any;
}

export class Contact extends React.Component<IHeaderProps> {
    render() {
        return(
            <div className="contact-infor-template">
                            <p className = "text-bold">Thông tin liên hệ</p>
                            <label className = "text-bold" htmlFor="">Số điện thoại</label>
                            <DataConsumer>
                                { ({updateInput}) => (
                                    <input name ='phoneNumber' type="text" maxLength={20}  
                                    onChange={(event) => {
                                        updateInput(event.target);
                                    }}/>
                                ) }       
                            </DataConsumer>
                            <label className = "text-bold" htmlFor="">Email</label>
                            <DataConsumer>
                                { ({updateInput}) => (
                                    <input name ='email' type="text" maxLength={50}  
                                    onChange={(event) => {
                                        updateInput(event.target);
                                    }}/>
                                ) }       
                            </DataConsumer>
                            <label className = "text-bold" htmlFor="">Facebook</label>
                            <DataConsumer>
                                { ({updateInput}) => (
                                    <input name ='facebook' type="text" maxLength={50}  
                                    onChange={(event) => {
                                        updateInput(event.target);
                                    }}/>
                                ) }       
                            </DataConsumer>
                            <label className = "text-bold" htmlFor="">Github</label>
                            <DataConsumer>
                                { ({updateInput}) => (
                                    <input name ='github' type="text" maxLength={50}  
                                    onChange={(event) => {
                                        updateInput(event.target);
                                    }}/>
                                ) }       
                            </DataConsumer>
                            <label className = "text-bold" htmlFor="">Twitter</label>
                            <DataConsumer>
                                { ({updateInput}) => (
                                    <input name ='twitter' type="text" maxLength={50}  
                                    onChange={(event) => {
                                        updateInput(event.target);
                                    }}/>
                                ) }       
                            </DataConsumer>
                        </div>
        );
    }
};

export default Contact;