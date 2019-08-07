import comment from "@/services/comment";

export default {
    namespace: "comment",
    state: {
        list: {
            result: { list: [], total_number: 0 }
        },
        subList: {
            result: { list: [], total_number: 0 }
        },
        add: {
            result: {}
        },
        del: {
            result: {}
        },
        favorit: {
            result: {}
        },
        cancelFavorit: {
            result: {}
        },
        onChangeCommentFavoritState: {
            result: {}
        },
    },

    effects: {
        * list({ payload, callback }, { call, put }) {
            const response = yield call(comment.list, payload);
            yield put({
                type: "_list",
                payload: response
            });
            if (callback) callback(response);
        },
        * subList({ payload, callback }, { call, put }) {
            const response = yield call(comment.subList, payload);
            yield put({
                type: "_subList",
                payload: response
            });
            if (callback) callback(response);
        },
        * add({ payload, callback }, { call, put }) {
            const response = yield call(comment.add, payload);
            yield put({
                type: "_add",
                payload: response
            });
            if (callback) callback(response);
        },
        * del({ payload, callback }, { call, put }) {
            const response = yield call(comment.del, payload);
            yield put({
                type: "_del",
                payload: response
            });
            if (callback) callback(response);
        },
        * favorit({ payload, callback }, { call, put }) {
            const response = yield call(comment.favorit, payload);
            yield put({
                type: "_favorit",
                payload: response
            });
            if (callback) callback(response);
        },
        * cancelFavorit({ payload, callback }, { call, put }) {
            const response = yield call(comment.cancelFavorit, payload);
            yield put({
                type: "_cancelFavorit",
                payload: response
            });
            if (callback) callback(response);
        },
        * onChangeCommentFavoritState({ payload: { is_favorit, id }, callback }, { call, put }) {
            if (is_favorit) {
                yield put({
                    type: "cancelFavorit",
                    payload: { id },
                    callback
                });
            } else {
                yield put({
                    type: "favorit",
                    payload: { id },
                    callback
                });
            }
        },
    },
    reducers: {
        _list(state, action) {
            return {
                ...state,
                list: action.payload
            };
        },
        _subList(state, action) {
            return {
                ...state,
                subList: action.payload
            };
        },
        _add(state, action) {
            return {
                ...state,
                add: action.payload
            };
        },
        _del(state, action) {
            return {
                ...state,
                del: action.payload
            };
        },
        _favorit(state, action) {
            return {
                ...state,
                favorit: action.payload
            };
        },
        _cancelFavorit(state, action) {
            return {
                ...state,
                cancelFavorit: action.payload
            };
        },
    }
};
