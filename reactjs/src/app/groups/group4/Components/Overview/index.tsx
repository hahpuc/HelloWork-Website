import './index.less'
import React from 'react'
import {DataConsumer} from '../../scenes/ListCV/ListCV'

export interface IHeaderProps {
    collapsed?: any;
    toggle?: any;
}

interface OverviewProps {}
interface OverviewState {
    name: string,
    bio: string
}

export class Overview extends React.Component <OverviewProps, OverviewState> {
    render() {
        return(
                        <div className="overview-template">
                            <p className = "text-bold">Tổng quan</p>
                            <label className = "text-bold" htmlFor="">Tên</label>
                            <DataConsumer>
                                { ({updateInput}) => (
                                    <input className = "name-text-box" name ='name' type="text" maxLength={50}  
                                    onChange={(event) => {
                                        updateInput(event.target);
                                    }}/>
                                ) }    
                            </DataConsumer>
                            
                            <label className = "text-bold" htmlFor="">Tên công việc</label>

                            <DataConsumer>
                                { ({updateInput}) => (
                                    <input className = "name-text-box" name = 'job' type="text" maxLength={50}  
                                    onChange={(event) => {
                                        updateInput(event.target);
                                    }}/>                                    
                                ) }    
                            </DataConsumer>
                        </div>
        );
    }
};

export default Overview;