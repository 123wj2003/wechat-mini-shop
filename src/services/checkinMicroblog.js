import fa from "@/utils/fa";

export default {
    async list(params = {}) {
        return await fa.request(
            {
                url: `checkinmicroblog/list`,
                method: 'GET'
            }, {
                params
            },
        )
    },
    async info(params = {}) {
        return await fa.request(
            {
                url: `checkinmicroblog/info`,
                method: 'GET'
            }, {
                params
            },
        )
    },
    async favorit(params = {}) {
        return await fa.request(
            {
                url: `checkinmicroblog/favorit`,
                method: 'POST'
            }, {
                params
            }
        )
    },
    async cancelFavorit(params = {}) {
        return await fa.request(
            {
                url: `checkinmicroblog/cancelFavorit`,
                method: 'POST'
            }, {
                params
            }
        )
    },
    async collect(params = {}) {
        return await fa.request(
            {
                url: `checkinmicroblog/collect`,
                method: 'POST'
            }, {
                params
            }
        )
    },
    async cancelCollect(params = {}) {
        return await fa.request(
            {
                url: `checkinmicroblog/cancelCollect`,
                method: 'POST'
            }, {
                params
            }
        )
    },
    async tagList(params = {}) {
        return await fa.request(
            {
                url: `checkinmicroblog/tagList`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async tagInfo(params = {}) {
        return await fa.request(
            {
                url: `checkinmicroblog/tagInfo`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async add(params = {}) {
        return await fa.request(
            {
                url: `checkinmicroblog/add`,
                method: 'POST'
            }, {
                params
            }
        )
    },
    async userInfo(params = {}) {
        return await fa.request(
            {
                url: `checkinmicroblog/userInfo`,
                method: 'GET'
            }, {
                params
            },
        )
    },
}
