import { api, request } from '@/api';
import Model from '@/utils/model'

export default class Promote extends Model {
    async inviteCustomer(params) {
        try {
             await request(api.promote.inviteCustomer, { data: params })
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }
}
