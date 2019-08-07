import fa from "@/utils/fa";

export default {
    async grantList(params = {}) {
        return await fa.request(
            {
                url: `gift/grantList`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async skuInfo(params = {}) {
        return await fa.request(
            {
                url: `gift/skuInfo`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async calculate(params = {}) {
        return await fa.request(
            {
                url: `gift/calculate`,
                method: 'POST'
            }, {
                params
            }
        )
    },
    async create(params = {}) {
        return await fa.request(
            {
                url: `gift/create`,
                method: 'POST'
            }, {
                params
            }
        )
    },
}
