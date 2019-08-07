import fa from "@/utils/fa";

export default {
    async customers(params = {}) {
        return await fa.request(
            {
                url: `distributor/customers`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async promotionOrder(params = {}) {
        return await fa.request(
            {
                url: `distributor/promotionOrder`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async customerDetail(params = {}) {
        return await fa.request(
            {
                url: `distributor/customerDetail`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async ranking(params = {}) {
        return await fa.request(
            {
                url: `distributor/ranking`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async statistics(params = {}) {
        return await fa.request(
            {
                url: `distributor/statistics`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async inviteCustomer(params = {}) {
        return await fa.request(
            {
                url: `distributor/inviteCustomer`,
                method: 'GET'
            }, {
                params
            }
        )
    },
}
