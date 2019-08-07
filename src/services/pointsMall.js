import fa from "@/utils/fa";

export default {
    async pagePortal(params = {}) {
        return await fa.request(
            {
                url: `pointsmall/pagePortal`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async pageRule(params = {}) {
        return await fa.request(
            {
                url: `pointsmall/pageRule`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async stateList(params = {}) {
        return await fa.request(
            {
                url: `pointsmall/stateList`,
                method: 'GET'
            }, {
                params
            }
        )
    },
}
