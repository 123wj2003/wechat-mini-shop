import withdrawal from "@/services/withdrawal";

export default {
    namespace: "withdrawal",
    state: {
        info: {
            result: { info: {} }
        },
    },

    effects: {
        * info({ payload, callback }, { call, put }) {
            const response = yield call(withdrawal.info, payload);
            yield put({
                type: "_info",
                payload: response
            });
            if (callback) callback(response);
        },
    },
    reducers: {
        _info(state, action) {
            return {
                ...state,
                info: action.payload
            };
        },
    }
};
