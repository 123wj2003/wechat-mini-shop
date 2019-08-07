import fa from "@/utils/fa";

export default {
    async create(params = {}) {
        return await fa.request(
            {
                url: `assetsrecharge/create`,
                method: 'POST'
            }, {
                params
            }
        )
    },
}
