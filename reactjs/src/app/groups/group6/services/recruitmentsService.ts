
import http from 'shared/services/httpService';
import { IRecruiterInfo, IRecruitments, IRecruitmentsGet, IRecruitmentsUpdate, ISavedRecruitment } from '../models/recruitments';
import { message } from 'antd';
class RecruitmentsService {
  public async getById(id: string): Promise<IRecruitmentsGet> {
    let result = await http.get(`/api/Recruitments/Get/${id}`);
    return result.data.result;
  }

  public async create(createRecruitmentInput: IRecruitments) {
    let result = await http.post('/api/Recruitments/Create', createRecruitmentInput);
    if (result.data.success) {
      message.config({
        top: 10,
      })
      message.success('Thêm tin tuyển dụng thành công');
    }
    return result.data.result;
  }

  public async update(dataUpdate: IRecruitmentsUpdate) {
    let result = await http.put('/api/Recruitments/Update', dataUpdate);
    if (result.data.success) {
      message.config({
        top: 50,
      })
      message.success('Cập nhật tin tuyển dụng thành công');
    }
    return result.data.result;
  }

  public async savedRecruitment(savedRecruitmentInput: ISavedRecruitment) {
    let result = await http.post('/api/SavedRecruitments/Create', savedRecruitmentInput);
    if (result.data.success) {
      message.config({
        top: 10,
      })
      message.success('Lưu tin tuyển dụng thành công');
    }
    return result.data.result;
  }

  public async getInfoRecruiter(idRecruiter: number): Promise<IRecruiterInfo> {
    let result = await http.get(`/api/UserInfos/Get/${idRecruiter}`);
    return result.data.result;
  }
}

export default new RecruitmentsService();