import { action, observable } from 'mobx';
import { EntityDto } from 'shared/services/dto/entityDto';
import StateApplicantService from '../services/StateApplicantService';

export interface IStateApplicant {
    idJobSeeker: number,
    idRecruitment: number,
    state: string,
    id: number;
}
export interface  getState{
    idJobSeeker: number,
    idRecruitment: number,
}
class StateApplicantStore {
    @observable StateApplicant!:IStateApplicant;
    @observable GetStateApplicant!:getState;

    @action
        async getStateApplicantByIDJobSeeker(dto: getState) {
        let result = await StateApplicantService.getStateApplicantByIDJobSeeker(dto);
        this.StateApplicant = {
            idJobSeeker: result.idJobSeeker,
            idRecruitment: result.idRecruitment,
            state: result.state,
            id: result.id,
        };     
    }
    @action
        async getStateApplicantByID(dto: EntityDto) {
        let result = await StateApplicantService.getStateApplicantByID(dto);
        
        this.StateApplicant = {
            idJobSeeker: result.idJobSeeker,
            idRecruitment: result.idRecruitment,
            state: result.state,
            id: result.id,
      };
    }

    @action
  async updateStateApplicant(dto: IStateApplicant) {
    let result = await StateApplicantService.updateStateApplicant(dto);

    
    this.StateApplicant = {
      idJobSeeker: result.idJobSeeker,
            idRecruitment: result.idRercuitment,
            state: result.state,
            id: result.id,
    };
  }
  @action
    async createStateApplicant(dto: EntityDto) {
        let result = await StateApplicantService.createStateApplicant(dto);
        this.StateApplicant = {
          idJobSeeker: result.idJobSeeker,
          idRecruitment: result.idRecruitment,
          state: result.state,
          id: result.id,
        };
    }  
   

}

export default StateApplicantStore;
