import { action, observable } from 'mobx';
import { VerifySubmitDTO } from '../services/dto/verifyBusinessDTO/verifySubmitDTO';
import VerifyBusinessService from '../services/verifyBusinessService';

export interface IVerify{
  input:[],
  status: string,
  id: number
}

class VerifyBusinessStore{
    @observable verify!:IVerify;
    @action
    async getAccount()
    {
        let result = await VerifyBusinessService.getAccount();
        if(result!=null)
        {
            this.verify = {
                id : result.id,
                status: "",
                input: []
            }
        }  
    }
    @action
    async getStatus()
    {
        let result = await VerifyBusinessService.getStatus(this.verify.id);
        return result;
    }

    @action
    async verifySubmit(verifyBusiness: VerifySubmitDTO)
    {
        let result = await VerifyBusinessService.verify(this.verify.id, verifyBusiness);
        //console.log(result.data + "có data");
        return result;
    }
}
export default VerifyBusinessStore;