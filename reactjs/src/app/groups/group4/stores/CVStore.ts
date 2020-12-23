import { action, observable } from 'mobx';
import { ICv, ICvGet } from '../models/cv';

import CVService from '../services/CVService'

class CVStore {

    @observable cvList!: ICvGet;

    @action
    async getCVById(id: string) {
        let result = await CVService.getById(id);
        
        // console.log("TAG",result)
        this.cvList = result;

        //console.log("TAG",this.cvList)
    }


    @action
    async createCV(createJobTypeInput: ICv) {
        let result = await CVService.createCV(createJobTypeInput);
        console.log("Hoan thanh save")
        console.log(result)
        //this.cvList.items.push(result);
    }
}

export default CVStore