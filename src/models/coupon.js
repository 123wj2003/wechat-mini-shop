import coupon from "@/services/coupon";

export default {
    namespace: "coupon",
    state: {
        list: {
            result: { list: [], total_number: 0 }
        },
        info: { result: { info: {} } },
        get: { result: {} }
    },

    effects: {
        * list({ payload, callback }, { call, put }) {
            const response = yield call(coupon.list, payload);
            yield put({
                type: "_list",
                payload: response
            });
            if (callback) callback(response);
        },
        * info({ payload, callback }, { call, put }) {
            const response = yield call(coupon.info, payload);
            yield put({
                type: "_info",
                payload: response
            });
            if (callback) callback(response);
        },
        * get({ payload, callback }, { call, put }) {
            const response = yield call(coupon.get, payload);
            yield put({
                type: "_get",
                payload: response
            });
            if (callback) callback(response);
        }
    },
    reducers: {
        _list(state, action) {
            return {
                ...state,
                list: action.payload
            };
        },
        _info(state, action) {
            return {
                ...state,
                info: action.payload
            };
        },
        _get(state, action) {
            return {
                ...state,
                get: action.payload
            };
        }
    }
};
