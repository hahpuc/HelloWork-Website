import { action, observable } from 'mobx';
import { SendMailDTO } from '../services/dto/jobTypeDTO/sendMailDTO';
import { VerifyMailDTO } from '../services/dto/jobTypeDTO/VerifyMailDTO';
import sendMailService from '../services/sendMailService';

export interface ISendMail{
  userName: string,
  emailAddress: string,
  password: string,
  isEmailConfirmed: boolean,
  emailConfirmationCode: string,
  id: number
}

class SendMailStore{
    @observable sendMail!:ISendMail;
    @action
    async getAccount()
    {
        let result = await sendMailService.getAccount();
        if(result!=null)
        {
            this.sendMail = {
                id : result.id,
                userName: "",
                emailAddress: result.emailAddress,
                password: "",
                isEmailConfirmed: false,
                emailConfirmationCode: ""
            }
        }  
        else
        {
            this.sendMail ={
                id : 0,
                userName: "",
                emailAddress: "",
                password: "",
                isEmailConfirmed: false,
                emailConfirmationCode: ""
            } 
        }
    }
    @action
    async sendMailCode(sendEmail: SendMailDTO)
    {
        let result = await sendMailService.sendMail(sendEmail);
        return result;
    }

    @action
    async verifyMail(verifyMail: VerifyMailDTO)
    {
        let result = await sendMailService.verifyMail(verifyMail);
        return result;
    }
}
export default SendMailStore;