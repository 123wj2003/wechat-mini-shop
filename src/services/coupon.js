import fa from "@/utils/fa";
export default {
    async list(params = {}) {
        return await fa.request(
            {
                url: `coupon/list`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async info(params = {}) {
        return await fa.request(
            {
                url: `coupon/info`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async get(params = {}) {
        return await fa.request(
            {
                url: `coupon/get`,
                method: 'POST'
            }, {
                params
            }
        )
    },
}
