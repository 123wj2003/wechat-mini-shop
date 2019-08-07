import gift from "@/services/gift";

export default {
    namespace: "gift",
    state: {
        grantList: {
            result: { list: [], total_number: 0 }
        },
        skuInfo: { result: { info: {} } },
        calculate: { result: { info: {} } },
        create: { result: { info: {} } },
    },

    effects: {
        * grantList({ payload, callback }, { call, put }) {
            const response = yield call(gift.grantList, payload);
            yield put({
                type: "_grantList",
                payload: response
            });
            if (callback) callback(response);
        },
        * skuInfo({ payload, callback }, { call, put }) {
            const response = yield call(gift.skuInfo, payload);
            yield put({
                type: "_skuInfo",
                payload: response
            });
            if (callback) callback(response);
        },
        * calculate({ payload, callback }, { call, put }) {
            const response = yield call(gift.calculate, payload);
            yield put({
                type: "_calculate",
                payload: response
            });
            if (callback) callback(response);
        },
        * create({ payload, callback }, { call, put }) {
            const response = yield call(gift.create, payload);
            yield put({
                type: "_create",
                payload: response
            });
            if (callback) callback(response);
        },
    },
    reducers: {
        _list(state, action) {
            return {
                ...state,
                list: action.payload
            };
        },
        _skuInfo(state, action) {
            return {
                ...state,
                skuInfo: action.payload
            };
        },
        _calculate(state, action) {
            return {
                ...state,
                calculate: action.payload
            };
        },
        _create(state, action) {
            return {
                ...state,
                create: action.payload
            };
        }
    }
};
