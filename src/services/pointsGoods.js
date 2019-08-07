import fa from "@/utils/fa";

export default {
    async list(params = {}) {
        return await fa.request(
            {
                url: `pointsmall/goodsList`,
                method: 'GET'
            }, {
                params
            }
        )
    },
}
