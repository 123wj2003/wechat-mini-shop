import { api, request } from '@/api';
import Model from '@/utils/model'

export default class Checkin extends Model {
    async info(params) {
        try {
            return await request(api.checkin.info, { data: params })
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async microblogList(params) {
        try {
            return await request(api.checkin.microblogList, { data: params })
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async userCheckinInfo(params) {
        try {
            return await request(api.checkin.userCheckinInfo, { data: params })
        } catch (e) {
            this.setException(e)
            return false
        }
    }
}
