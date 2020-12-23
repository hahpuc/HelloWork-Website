import http from 'shared/services/httpService';
import { FilterReUserDTO } from './dto/recruitmentUserDTO/filterReUserDTO';

class RecruitmentUserService{
    public async getAccount() {
        let result = await http.get('/api/services/app/Session/GetCurrentLoginInformations');
        return result.data.result.user; 
    }
    public async getAllRecruitment(id : any){
        let result = await http.get('/api/RecruitmentUser/Get/' + id);
        return result.data.result;
    }
    public async deleteSavedRecruitment(id : any, listID: any[]){
        var list = [];
        for(let i = 0; i < listID.length; i++)
        {
            let s = listID[i].split("+");
            var object = {recruitmentId: s[0], state: s[1]};
            list.push(object);
        }
        let result = await http.delete('/api/RecruitmentUser/Delete/' + id, {
            data: list
        });
        return result.data.result;
    }
    public async cancelRecruitment(id : any, listID: any[]){
        var list = [];
        for(let i = 0; i < listID.length; i++)
        {
            let s = listID[i].split("+");
            var object = {recruitmentId: s[0], state: s[1]};
            list.push(object);
        }

        let result = await http.delete('/api/RecruitmentUser/Delete/' + id, {
            data: list
        });
        return result.data.result;
    }
    public async filter(dto:FilterReUserDTO) {
        let url = '/api/RecruitmentUser/Filter/' + dto.id;
        let flag = false;
        if(dto.maso != null)
        {
            if(flag == false)
            {
                flag = true
                url += '?Maso=' + dto.maso;
            }
            else
            {
                url += '&Maso=' + dto.maso;
            }
            
        }
        if(dto.name != null)
        {
            if(flag == false)
            {
                flag = true
                url += '?Name=' + encodeURIComponent(dto.name);
            }
            else
            {
                url += '&Name=' + encodeURIComponent(dto.name);
            }
        }
        if(dto.position != null)
        {
            if(flag == false)
            {
                flag = true
                url += '?Position=' + dto.position;
            }
            else
            {
                url += '&Position=' + dto.position;
            }
            
        }
        if(dto.wayOfWork != null)
        {
            if(flag == false)
            {
                flag = true
                url += '?WayOfWork=' + dto.wayOfWork;
            }
            else
            {
                url += '&WayOfWork=' + dto.wayOfWork;
            }
            
        }
        if(dto.salary != null)
        {
            if(flag == false)
            {
                flag = true
                url += '?SalaryRange=' + dto.salary;
            }
            else
            {
                url += '&SalaryRange=' + dto.salary;
            }
            
        }
        if(dto.state != null)
        {
            if(flag == false)
            {
                flag = true
                url += '?State=' + dto.state;
            }
            else
            {
                url += '&State=' + dto.state;
            }
            
        }
        if(dto.status != null)
        {
            if(flag == false)
            {
                flag = true
                url += '?Status=' + dto.status;
            }
            else
            {
                url += '&Status=' + dto.status;
            }
            
        }
        if(dto.requirement != null)
        {
            if(flag == false)
            {
                flag = true
                url += '?Recuitment=' + dto.requirement;
            }
            else
            {
                url += '&Recuitment=' + dto.requirement;
            }
            
        }
        let result = await http.get(url);
        return result.data.result;
    }
}
export default new RecruitmentUserService();