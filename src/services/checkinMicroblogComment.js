import fa from "@/utils/fa";

export default {
    async list(params = {}) {
        return await fa.request(
            {
                url: `checkinmicroblogcomment/list`,
                method: 'GET'
            }, {
                params
            },
        )
    },
    async subList(params = {}) {
        return await fa.request(
            {
                url: `checkinmicroblogcomment/subList`,
                method: 'GET'
            }, {
                params
            },
        )
    },
    async favorit(params = {}) {
        return await fa.request(
            {
                url: `checkinmicroblogcomment/favorit`,
                method: 'POST'
            }, {
                params
            },
        )
    },
    async cancelFavorit(params = {}) {
        return await fa.request(
            {
                url: `checkinmicroblogcomment/cancelFavorit`,
                method: 'POST'
            }, {
                params
            },
        )
    },
    async add(params = {}) {
        return await fa.request(
            {
                url: `checkinmicroblogcomment/release`,
                method: 'POST'
            }, {
                params
            },
        )
    },
    async del(params = {}) {
        return await fa.request(
            {
                url: `checkinmicroblogcomment/del`,
                method: 'POST'
            }, {
                params
            },
        )
    },
}
