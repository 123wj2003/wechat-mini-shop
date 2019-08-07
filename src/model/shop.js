import { api, request } from '@/api';
import Model from '@/utils/model'

export default class Shop extends Model {
    async info(params) {
        try {
            const { result } = await request(api.shop.info, { data: params })
            return result
        } catch (e) {
            this.setException(e)
            return false
        }
    }
}
