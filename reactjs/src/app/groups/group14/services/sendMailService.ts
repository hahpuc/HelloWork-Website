import http from 'shared/services/httpService';
import { SendMailDTO } from './dto/jobTypeDTO/sendMailDTO';
import { VerifyMailDTO } from './dto/jobTypeDTO/VerifyMailDTO';

class SendMailService{
    public async getAccount() {
        let result = await http.get('/api/services/app/Session/GetCurrentLoginInformations');
        return result.data.result.user; 
    }
    public async sendMail(sendEmail : SendMailDTO){
        let result = await http.put('/api/InfoLogin/SendMail', sendEmail);
        return result.data;
    }
    public async verifyMail(verifyMail : VerifyMailDTO){
        let result = await http.post('/api/InfoLogin/ConfirmMail', verifyMail);
        return result.data;
    }
}
export default new SendMailService();