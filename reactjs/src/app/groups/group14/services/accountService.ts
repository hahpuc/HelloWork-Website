import http from 'shared/services/httpService';
import { UpdateAccounInputtDTO } from './dto/accountDTO/UpdateAccountDTO';

class AccountService {
    public async getAccount() {
        let result = await http.get('/api/services/app/Session/GetCurrentLoginInformations');
        return result.data.result.user; 
    }

    public async updateAccount(dto:UpdateAccounInputtDTO) {
        let result = await http.put('/api/InfoLogin/Update', dto);
        return result;
    }
}


export default new AccountService();