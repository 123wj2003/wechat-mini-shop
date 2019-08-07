import fa from "@/utils/fa";

export default {
    async list(params = {}) {
        return await fa.request(
            {
                url: `microblog/list`,
                method: 'GET'
            }, {
                params
            },
        )
    },
    async info(params = {}) {
        return await fa.request(
            {
                url: `microblog/info`,
                method: 'GET'
            }, {
                params
            },
        )
    },
    async favorit(params = {}) {
        return await fa.request(
            {
                url: `microblog/favorit`,
                method: 'POST'
            }, {
                params
            }
        )
    },
    async cancelFavorit(params = {}) {
        return await fa.request(
            {
                url: `microblog/cancelFavorit`,
                method: 'POST'
            }, {
                params
            }
        )
    },
    async collect(params = {}) {
        return await fa.request(
            {
                url: `microblog/collect`,
                method: 'POST'
            }, {
                params
            }
        )
    },
    async cancelCollect(params = {}) {
        return await fa.request(
            {
                url: `microblog/cancelCollect`,
                method: 'POST'
            }, {
                params
            }
        )
    },
    async tagList(params = {}) {
        return await fa.request(
            {
                url: `microblog/tagList`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async tagInfo(params = {}) {
        return await fa.request(
            {
                url: `microblog/tagInfo`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async add(params = {}) {
        return await fa.request(
            {
                url: `microblog/add`,
                method: 'POST'
            }, {
                params
            }
        )
    },
    async userInfo(params = {}) {
        return await fa.request(
            {
                url: `microblog/userInfo`,
                method: 'GET'
            }, {
                params
            },
        )
    },
    async surplusNum(params = {}) {
        return await fa.request(
            {
                url: `microblog/surplusNum`,
                method: 'GET'
            }, {
                params
            }
        )
    },
}
