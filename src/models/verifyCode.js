import { api, request } from '@/api';
import Model from '@/utils/model'

export default class VerifyCode extends Model {
    constructor(){
        super(null)
    }

    async add(params) {
        try {
            await request(api.verifyCode.add, { data: params })
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }
}
