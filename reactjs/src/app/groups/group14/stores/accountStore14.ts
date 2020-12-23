import { action, observable } from 'mobx';
import accountService from '../services/accountService';
import { UpdateAccounInputtDTO } from '../services/dto/accountDTO/UpdateAccountDTO';

export interface IAccountItem {
    id: number,
    name: string,
    email: string,
    personId: string
}

class AccountStore14 {
    @observable account!: IAccountItem;

    @action
    async getAccount() {
        let result = await accountService.getAccount();
        this.account = {
            id: result.id,
            name: result.userName,
            email: result.emailAddress,
            personId: ""
        };
    }

    @action
    async updateAccount(dto: UpdateAccounInputtDTO) {
        let result = await accountService.updateAccount(dto);

        return result;
    }
}

export default AccountStore14;