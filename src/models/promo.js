import promo from "@/services/promo";

export default {
    namespace: "promo",
    state: {
        usableCoupons: {
            result: { list: [], total_number: 0 }
        },
        exchangePoints: {
            result: { info: {state :0} }
        },
    },

    effects: {
        * usableCoupons({ payload, callback }, { call, put }) {
            const response = yield call(promo.usableCoupons, payload);
            yield put({
                type: "_usableCoupons",
                payload: response
            });
            if (callback) callback(response);
        },
        * exchangePoints({ payload, callback }, { call, put }) {
            const response = yield call(promo.exchangePoints, payload);
            yield put({
                type: "_exchangePoints",
                payload: response
            });
            if (callback) callback(response);
        },
    },
    reducers: {
        _usableCoupons(state, action) {
            return {
                ...state,
                usableCoupons: action.payload
            };
        },
        _exchangePoints(state, action) {
            return {
                ...state,
                exchangePoints: action.payload
            };
        },
    }
};
