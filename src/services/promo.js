import fa from "@/utils/fa";

export default {
    async usableCoupons(params = {}) {
        return await fa.request(
            {
                url: `promo/usableCoupons`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async exchangePoints(params = {}) {
        return await fa.request(
            {
                url: `promo/exchangePoints`,
                method: 'GET'
            }, {
                params
            }
        )
    },
}
