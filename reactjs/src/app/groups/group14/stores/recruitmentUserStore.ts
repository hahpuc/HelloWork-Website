import { action, observable } from 'mobx';
import recruitmentUserService from '../services/recruitmentUserService';
import { FilterReUserDTO } from '../services/dto/recruitmentUserDTO/filterReUserDTO';

export interface IRecruitmentUserItem {
    id: number,
    name: string,
    position: string,
    wayOfWork: string,
    urgentLevel: string,
    description: string,
    requirement: string,
    contactEmail: string,
    state: string,
    creatorUserId: number,
    status: string,
    salaryRange: number
}

export interface IAccountItem {
    id: number,
    name: string,
    email: string,
    personId: string
}

class RecruitmentUserStore {
    @observable allRecruitmentUser!: IRecruitmentUserItem[];
    @observable account!: IAccountItem;

    @action
    async getAccount() {
        let result = await recruitmentUserService.getAccount();
        this.account = {
            id: result.id,
            name: result.userName,
            email: result.emailAddress,
            personId: ""
        };
    }

    @action
    async getallRecruitmentUser() {
        console.log(this.account.id);
        let result = await recruitmentUserService.getAllRecruitment(this.account.id);
        this.allRecruitmentUser = result;
    }

    @action
    async filterRecruitmentUser(dto: FilterReUserDTO) {
        dto.id = this.account.id;
        console.log(dto.name);
        let result = await recruitmentUserService.filter(dto);
        this.allRecruitmentUser = result;
    }

    @action
    async deleteSavedRecruitment(listID: any[]) {
        let result = await recruitmentUserService.deleteSavedRecruitment(this.account.id, listID);
        this.allRecruitmentUser = result;
    }

    @action
    async cancelRecruitment(listID: any[]) {
        let result = await recruitmentUserService.cancelRecruitment(this.account.id, listID);
        this.allRecruitmentUser = result;
    }
}

export default RecruitmentUserStore;