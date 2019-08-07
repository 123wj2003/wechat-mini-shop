import fa from "@/utils/fa";

export default {
    async list(params = {}) {
        return await fa.request(
            {
                url: `microblogcomment/list`,
                method: 'GET'
            }, {
                params
            },
        )
    },
    async subList(params = {}) {
        return await fa.request(
            {
                url: `microblogcomment/subList`,
                method: 'GET'
            }, {
                params
            },
        )
    },
    async favorit(params = {}) {
        return await fa.request(
            {
                url: `microblogcomment/favorit`,
                method: 'POST'
            }, {
                params
            },
        )
    },
    async cancelFavorit(params = {}) {
        return await fa.request(
            {
                url: `microblogcomment/cancelFavorit`,
                method: 'POST'
            }, {
                params
            },
        )
    },
    async add(params = {}) {
        return await fa.request(
            {
                url: `microblogcomment/release`,
                method: 'POST'
            }, {
                params
            },
        )
    },
    async del(params = {}) {
        return await fa.request(
            {
                url: `microblogcomment/del`,
                method: 'POST'
            }, {
                params
            },
        )
    },
}
