import { action, observable } from 'mobx';
import { EntityDto } from 'shared/services/dto/entityDto';
import { GetInterviewJSInput } from '../services/dto/stateApplicationDto/interviewDto';
import { CreateStateApplicationInput, UpdateStateApplicationInput, GetStateApplicationByJSInput } from '../services/dto/stateApplicationDto/stateApplicationDto';

import stateApplicationService from '../services/stateApplicationService'

export interface IInterviewRequest {
    idInterview: number,
    interviewTime: Date,
}

export interface IUpdateInterviewRequest {
    id : number,
    idInterview: number,
    interviewTime: string,
}

export interface IStateApplicationItem {
    IDJobSeeker: number,
    IDRecruitment: number,
    State: string,
    id: number
}

export interface IInterviewItem {
    location : string;
    time : string;
    date : string;
    description : string;
}

class StateApplicationStore {

    @observable stateApplication!: IStateApplicationItem;
    @observable interview!: IInterviewItem;
    @observable interviewRequest! : IInterviewRequest;
    @observable IDInterviewRequest ! : number;
    @observable IDInterviewTime! : Date;
    @observable nameCompany! : string;

    @action
    async createStateApplication(createStateApplicationInput: CreateStateApplicationInput) {
        await stateApplicationService.create(createStateApplicationInput);
    }

    @action
    async getStateApplicationByID(dto: EntityDto) {
        let result = await stateApplicationService.getStateApplicationByID(dto);
        this.stateApplication = result;
    }
    @action
    async update(updateUserInput: UpdateStateApplicationInput) {
        let result = await stateApplicationService.update(updateUserInput);
        this.stateApplication = {
            IDJobSeeker: result.idJobSeeker,
            IDRecruitment: result.idRecruitment,
            State: result.state,
            id: result.id,
        }
        console.log(this.stateApplication.State);
    }

    @action
    async updateInterviewRequest(input: IUpdateInterviewRequest) {
       await stateApplicationService.updateInterviewRequest(input);
    }

    @action
    async deleteStateApplication(entityDto: EntityDto) {
        await stateApplicationService.delete(entityDto);
    }
    @action
    async getStateApplicationByJobSeekerRecuitment(getInput: GetStateApplicationByJSInput) {
        console.log(getInput);
        let result = await stateApplicationService.getStateApplicationByJobSeekerRecuitment(getInput);
        this.stateApplication = {
            IDJobSeeker: result.idJobSeeker,
            IDRecruitment: result.idRecruitment,
            State: result.state,
            id: result.id,
        }
        console.log(this.stateApplication.State);

        let input : GetInterviewJSInput = {
            idJobSeeker: getInput.IDJobSeeker,
            idRecruitment: getInput.IDRecruitment,
        }


        let result1 = await stateApplicationService.getInterviewByJobSeekerRecuitment(input);

        this.interview = {
            location : result1.location,
            time : parseTime (result1.interviewTime),
            date : parseDate(result1.interviewTime),
            description : result1.description,
        }

        if (result1.id === undefined) 
            return;
        this.IDInterviewTime = result1.interviewTime;
        
        let input1 : EntityDto = {
            id : + result1.id
        }

        let result2 = await stateApplicationService.getInterviewRequestByID(input1);

        this.IDInterviewRequest = +result2.id;
        
        this.interviewRequest = {
            idInterview: result2.idInterview,
            interviewTime: result2.interviewTime,
        }

        let dto : EntityDto = {
            id : 1
        }
        let result3 = await stateApplicationService.getNameCompanyByID(dto);
        this.nameCompany = result3.name;
        console.log("name company")
        console.log(this.nameCompany);
    }
}

export default StateApplicationStore;

function parseTime(s: string): string {
    let res : string = s.substr(11,5);
    if (s.substr(11,2) <= "12") 
        res += " AM";
    else res += " PM";
    return res;
}

function parseDate(s: string): string {
    let res : string = "";
    res += s.substr(8,2) +"/" + s.substr(5,2) + "/" + s.substr(0,4);
    return res;
}