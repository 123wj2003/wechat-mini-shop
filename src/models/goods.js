import goods from "../services/goods";

export default {
    namespace: "goods",
    state: {
        list: {
            result: { list: [], total_number: 0 }
        },
        info: { result: { info: {} } },
        brandList: {
            result: { list: [], total_number: 0 }
        },
        evaluateList: {
            result: { list: [], total_number: 0 }
        },
        similarGoods:{
            result: { list: [], total_number: 0 }
        },
        brandInfo: { result: { info: {} } },
    },

    effects: {
        * list({ payload, callback }, { call, put }) {
            const response = yield call(goods.list, payload);
            yield put({
                type: "_list",
                payload: response
            });
            if (callback) callback(response);
        },
        * info({ payload, callback }, { call, put }) {
            const response = yield call(goods.info, payload);
            yield put({
                type: "_info",
                payload: response
            });
            if (callback) callback(response);
        },
        * brandList({ payload, callback }, { call, put }) {
            const response = yield call(goods.brandList, payload);
            yield put({
                type: "_brandList",
                payload: response
            });
            if (callback) callback(response);
        },
        * evaluateList({ payload, callback }, { call, put }) {
            const response = yield call(goods.evaluateList, payload);
            yield put({
                type: "_evaluateList",
                payload: response
            });
            if (callback) callback(response);
        },
        * similarGoods({ payload, callback }, { call, put }) {
            const response = yield call(goods.similarGoods, payload);
            yield put({
                type: "_similarGoods",
                payload: response
            });
            if (callback) callback(response);
        },
        * brandInfo({ payload, callback }, { call, put }) {
            const response = yield call(goods.brandInfo, payload);
            yield put({
                type: "_brandInfo",
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
        _info(state, action) {
            return {
                ...state,
                info: action.payload
            };
        },
        _brandList(state, action) {
            return {
                ...state,
                brandList: action.payload
            };
        },
        _evaluateList(state, action) {
            return {
                ...state,
                evaluateList: action.payload
            };
        },
        _similarGoods(state, action) {
            return {
                ...state,
                similarGoods: action.payload
            };
        },
        _brandInfo(state, action) {
            return {
                ...state,
                brandInfo: action.payload
            };
        },

    }
};
