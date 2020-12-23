import { EntityDto } from 'shared/services/dto/entityDto';
import http from 'shared/services/httpService';
import { CreateStateApplicationInput, UpdateStateApplicationInput, GetStateApplicationByJSInput} from './dto/stateApplicationDto/stateApplicationDto';
import {GetInterviewJSInput} from './dto/stateApplicationDto/interviewDto';

interface IInterviewRequest {
  idInterview: number,
  interviewTime: Date,
}

interface IUpdateInterviewRequest {
  id : number,
  idInterview: number,
  interviewTime: string,
}

interface IInterviewRequestUpdate {
  id : number,
  idInterview: number,
  interviewTime: string,
}

class StateApplicationService {

  public async create(createStateApplicationInput: CreateStateApplicationInput) {
    let result = await http.post('/api/StateApplications/Create', createStateApplicationInput);
    return result.data.result;
  }

  public async update(updateStateApplicationInput: UpdateStateApplicationInput) {
    let result = await http.put('/api/StateApplications/Update', updateStateApplicationInput);
    return result.data.result;
  }

  public async delete(entityDto: EntityDto) { 
    let result = await http.delete('api/StateApplications/Delete/' + entityDto.id);
    return result.data;
  }

  public async getStateApplicationByID(entityDto: EntityDto) {
    let result = await http.get('/api/StateApplications/Get/' + entityDto.id);
    return result.data.result;
  }

  public async getNameCompanyByID(entityDto: EntityDto) {
    let result = await http.get('/api/Company/Get/' + entityDto.id);
    return result.data.result;
  }
  public async getStateApplicationByJobSeekerRecuitment(getStateApplicationByJSInput: GetStateApplicationByJSInput) {
    let result = await http.put("/api/StateApplications/GetByJS", getStateApplicationByJSInput);
    return result.data.result;
  }

  public async getInterviewByJobSeekerRecuitment(getInterviewByJSInput: GetInterviewJSInput) {
    let result = await http.put("/api/Interviews/GetByJS", getInterviewByJSInput);
    return result.data.result;
  }

  public async getInterviewRequestByID(entityDto: EntityDto) {
    let result = await http.get('/api/InterviewRequest/Get/' + entityDto.id);
    return result.data.result.items[0];
  }

  public async createInterviewRequest(input: IInterviewRequest) {
    let result = await http.post('/api/InterviewRequest/Create', input);
    return result.data.result;
  }

  public async updateInterviewRequest(input: IUpdateInterviewRequest) {
    let input1 : IInterviewRequestUpdate = {
      id : input.id,
      idInterview: input.idInterview,
      interviewTime: input.interviewTime,
    }
    let result = await http.put('/api/InterviewRequest/Update', input1);
    return result.data.result;
  }
}

export default new StateApplicationService();