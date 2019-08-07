import fa from "@/utils/fa";

export default {
    async distributorInfo(params = {}) {
        return await fa.request(
            {
                url: `distribution/distributorInfo`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async configInfo(params = {}) {
        return await fa.request(
            {
                url: `distribution/configInfo`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async goodsSearch(params = {}) {
        return await fa.request(
            {
                url: `distribution/goodsSearch`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async statistics(params = {}) {
        return await fa.request(
            {
                url: `distribution/statistics`,
                method: 'GET'
            }, {
                params
            }
        )
    },
}
