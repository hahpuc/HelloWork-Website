import { action, observable } from 'mobx';
import moment from 'moment';
import RecruitmentsService from '../services/recruitmentsService'
import { IRecruiterInfo, IRecruitments, IRecruitmentsGet, IRecruitmentsUpdate, ISavedRecruitment } from '../models/recruitments';

class RecruitmentsStore {

    @observable recruitment!: IRecruitmentsGet;
    @observable recruiterInfo!: IRecruiterInfo;

    @action
    async getRecruitmentById(id: string) {
        let result = await RecruitmentsService.getById(id);
        this.recruitment = result;
    }

    @action
    async getRecruitmentNull() {
        this.recruitment = {
            id: '',
            name: '',
            finishDate: moment(new Date).format("YYYY-MM-DD"),
            wayOfWork: 'fulltime',
            salaryRange: 'thuongluong',
            expertises: [],
            urgentLevel: 'normal',
            description: '',
            requirement: '',
            contactEmail: '',
            state: 'temp',
            creationTime: '',
            creatorUserId: 1
        };
    }

    @action
    async createRecruitment(createJobTypeInput: IRecruitments) {
        await RecruitmentsService.create(createJobTypeInput);
    }

    @action
    async updateRecruitment(dataUpdate: IRecruitmentsUpdate) {
        await RecruitmentsService.update(dataUpdate);
    }

    @action
    async saveRecruitment(dataSave: ISavedRecruitment) {
        await RecruitmentsService.savedRecruitment(dataSave);
    }

    @action
    async getInfoRecruiter(idRecruiter: number) {
        let result = await RecruitmentsService.getInfoRecruiter(idRecruiter);
        this.recruiterInfo = result;
    }

}

export default RecruitmentsStore;
