import './index.less'
import React from 'react'
import { DataConsumer } from '../../scenes/ListCV/ListCV';

export interface IHeaderProps {
    collapsed?: any;
    toggle?: any;
}

export class Skill extends React.Component {
    render() {
        return(
            <div className='skill'>

                <p className = "text-bold">Kỹ năng</p>
                <label className = "text-bold" htmlFor="">Kỹ năng 1</label>
                <DataConsumer>
                                { ({updateInputArray}) => (
                                    <input name ='skillName' type="text" maxLength={20}  
                                    onChange={(event) => {
                                        updateInputArray('skillDetails', 0, event.target);
                                    }}/>
                                ) }    
                        </DataConsumer>
                <label className = "text-bold" htmlFor="">Kỹ năng 2</label>
                <DataConsumer>
                                { ({updateInputArray}) => (
                                    <input name ='skillName' type="text" maxLength={20}  
                                    onChange={(event) => {
                                        updateInputArray('skillDetails', 1, event.target);
                                    }}/>
                                ) }    
                        </DataConsumer>
                <label className = "text-bold" htmlFor="">Kỹ năng 3</label>
                <DataConsumer>
                                { ({updateInputArray}) => (
                                    <input name ='skillName' type="text" maxLength={20}  
                                    onChange={(event) => {
                                        updateInputArray('skillDetails', 2, event.target);
                                    }}/>
                                ) }    
                        </DataConsumer>
                <label className = "text-bold" htmlFor="">Kỹ năng 4</label>
                <DataConsumer>
                                { ({updateInputArray}) => (
                                    <input name ='skillName' type="text" maxLength={20}  
                                    onChange={(event) => {
                                        updateInputArray('skillDetails', 3, event.target);
                                    }}/>
                                ) }    
                        </DataConsumer>
                <label className = "text-bold" htmlFor="">Kỹ năng 5</label>
                <DataConsumer>
                                { ({updateInputArray}) => (
                                    <input name ='skillName' type="text" maxLength={20}  
                                    onChange={(event) => {
                                        updateInputArray('skillDetails', 4, event.target);
                                    }}/>
                                ) }    
                        </DataConsumer>
            </div>
        );
    }
};

export default Skill;