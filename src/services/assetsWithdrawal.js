import fa from "@/utils/fa";

export default {
    async create(params = {}) {
        return await fa.request(
            {
                url: `assetswithdrawal/create`,
                method: 'POST'
            }, {
                params
            }
        )
    },
    async config(params = {}) {
        return await fa.request(
            {
                url: `assetswithdrawal/config`,
                method: 'GET'
            }, {
                params
            }
        )
    },
}
