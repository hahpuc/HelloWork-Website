import http from 'shared/services/httpService';
import { VerifySubmitDTO } from './dto/verifyBusinessDTO/verifySubmitDTO';

class VerifyBusinessService {
  public async getAccount() {
    let result = await http.get('/api/services/app/Session/GetCurrentLoginInformations');
    return result.data.result.user;
  }
  public async verify(id: number, verifyBusiness: VerifySubmitDTO) {
    //console.log("nônp"+ verifyBusiness.input[0]);
    let flag = true;
    if (verifyBusiness.input.length > 0) {
      let formData = new FormData();
      for (var i in verifyBusiness.input) {
        formData = new FormData();
        formData.append('input', verifyBusiness.input[i]);
        //console.log(verifyBusiness.input[i]);
        let result = await http.post('/api/InfoLogin/ConfirmBusiness?id=' + id, formData);
        if (result == null) {
          flag = false;
          break;
        }
      }
    }
    else
        flag = false;
    if (flag == true) return true;
    else return false;
  }
  public async getStatus(id: number) {
    let result = await http.get('/api/InfoLogin/GetStateBusiness/' + id);
    return result.data.result;
  }
}
export default new VerifyBusinessService();
