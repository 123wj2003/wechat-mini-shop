import fa from "@/utils/fa";

export default {
    async list(params = {}) {
        return await fa.request(
            {
                url: `seckill/list`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async info(params = {}) {
        return await fa.request(
            {
                url: `seckill/info`,
                method: 'GET'
            }, {
                params
            },
        )
    },
    async skuInfo(params = {}) {
        return await fa.request(
            {
                url: `seckill/skuInfo`,
                method: 'GET'
            }, {
                params
            },
        )
    },
    async calculate(params = {}) {
        return await fa.request(
            {
                url: `seckillbuy/calculate`,
                method: 'POST'
            }, {
                params
            },
        )
    },
    async create(params = {}) {
        return await fa.request(
            {
                url: `seckillbuy/create`,
                method: 'POST'
            }, {
                params
            },
        )
    },
}
