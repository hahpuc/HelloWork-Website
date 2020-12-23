
import http from 'shared/services/httpService';
import { IExpertiseCreate, IExpertiseGet, IExpertiseGetAll } from '../models/expertises';

class ExpertisesService {
  public async getById(id: string): Promise<IExpertiseGet> {
    let result = await http.get(`/api/Expertises/Get/${id}`);
    return result.data.result;
  }

  public async getAll(): Promise<IExpertiseGetAll<IExpertiseGet>> {
    let result = await http.get(`/api/Expertises/Get`);
    return result.data.result;
  }

  public async create(data: IExpertiseCreate) {
    let result = await http.post('/api/Expertises/Create', data);
    return result.data.result;
  }

  public async delete(id: string) {
    let result = await http.delete(`/api/Expertises/Delete/${id}`);
    return result.data.result;
  }

 
}

export default new ExpertisesService();