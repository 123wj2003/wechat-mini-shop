import regeneratorRuntime from '../libs/regenerator-runtime/runtime-module'
import { api, request } from '../api';
import Model from '../utils/model'
import { AreaListInterface, AreaInfoInterface } from '../interface/area'
import Cache from '../utils/cache'
import Arr from '../utils/array'
const _cache = new Cache()

export default class Area extends Model {
    async list(params) {
        try {
            const { result } = await request(api.area.list, { data: params })
            return new AreaListInterface(result)
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async info(params) {
        try {
            const { result } = await request(api.area.info, { data: params })
            return new AreaInfoInterface(result.info)
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async cache() {
        try {
            let areaList = _cache.get("area.list");
            if (!Array.isArray(areaList) || (Array.isArray(areaList) && areaList.length === 0)) {
                const result = await this.list({ level: 2 })
                areaList = result.list
                _cache.set('area.list', areaList)
            }
            return areaList
        } catch (e) {
            this.setException(e)
            return false
        }
    }
    async tree() {
        try {
            return Arr.toTreeFillChildren(await this.cache())
        } catch (e) {
            this.setException(e)
            return false
        }
    }
}
