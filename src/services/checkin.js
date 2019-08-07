import fa from "@/utils/fa";

export default {
    async list(params = {}) {
        return await fa.request(
            {
                url: `checkin/list`,
                method: 'GET'
            }, {
                params
            },
        )
    },
    async microblogAdd(params = {}) {
        return await fa.request(
            {
                url: `checkinmicroblog/add`,
                method: 'POST'
            }, {
                params
            },
        )
    },
    async info(params = {}) {
        return await fa.request(
            {
                url: `checkin/info`,
                method: 'GET'
            }, {
                params
            },
        )
    },
    async calendar(params = {}) {
        return await fa.request(
            {
                url: `checkin/calendar`,
                method: 'GET'
            }, {
                params
            },
        )
    },
    async userState(params = {}) {
        return await fa.request(
            {
                url: `checkin/userState`,
                method: 'GET'
            }, {
                params
            },
        )
    },
    async medals(params = {}) {
        return await fa.request(
            {
                url: `checkin/medals`,
                method: 'GET'
            }, {
                params
            },
        )
    },
    async userMedals(params = {}) {
        return await fa.request(
            {
                url: `checkin/userMedals`,
                method: 'GET'
            }, {
                params
            },
        )
    },
    async setDefaultMedal(params = {}) {
        return await fa.request(
            {
                url: `checkin/setDefaultMedal`,
                method: 'POST'
            }, {
                params
            },
        )
    },
    async statistics(params = {}) {
        return await fa.request(
            {
                url: `checkin/statistics`,
                method: 'GET'
            }, {
                params
            },
        )
    },
    async shareInfo(params = {}) {
        return await fa.request(
            {
                url: `checkin/shareInfo`,
                method: 'GET'
            }, {
                params
            },
        )
    },
    async shareAdd(params = {}) {
        return await fa.request(
            {
                url: `checkin/shareAdd`,
                method: 'POST'
            }, {
                params
            },
        )
    },
}
