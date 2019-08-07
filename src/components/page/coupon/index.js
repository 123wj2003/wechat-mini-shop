import validate from "@/utils/validate"
import apiServices from "@/services/coupon";
import Arr from "@/utils/array"
import fa from "@/utils/fa"
import navigation from "@/utils/navigation"

Component({
    externalClasses: ['mask-class', 'container-class'],
    properties: {
        data: {
            type: Object,
            value: null
        },
        login: {
            type: Boolean,
            value: false
        },
    },
    data: {
        noMore: false,
        page: 1,
        ids: [],
        statetext: '',
        // 用于存已经领取的优惠券，领过的下次加载将不会再出现，此处仅为设置优惠券组件内的状态显示
        getedIds: [],
    },
    observers: {
        'data': function (newVal, oldVal) {
            if (newVal !== oldVal) {
                this.setData(this.getDefaultResponseInfo())
            }
        }
    },
    methods: {
        getDefaultResponseInfo() {
            const { data: { data, options: { display_num, source_type } } } = this.data
            return {
                page: 1,
                noMore: false,
                // 用于存已经领取的优惠券，领过的下次加载将不会再出现，此处仅为设置优惠券组件内的状态显示
                getedIds: [],
                rows: source_type === 'choose' ? 200 : display_num,
                ids: source_type === 'choose' && Array.isArray(data) ? data.map((s) => s.id) : []
            }
        },

        onPullDownRefresh() {

        },
        getResponseInfo(defaultResponseInfo = false) {
            const { page, rows, ids } = defaultResponseInfo === true ? this.getDefaultResponseInfo() : this.properties
            let params = { page, rows }
            if (ids.length > 0) {
                params["ids"] = ids
            }
            return params
        },
        getRequest(defaultResponseInfo = false) {
            const { data: { options: { source_type } } } = this.properties
            if (source_type === 'choose' && Array.isArray(data) && data.length === 0) {
                return {
                    code: 0,
                    result: {
                        list: [],
                        total_number: 0
                    },
                    msg: ""
                }
            } else {
                return apiServices.list(this.getResponseInfo(defaultResponseInfo))
            }
        },
        async onReachBottom() {
            if (this.properties.noMore === false) {
                this.setData({
                    page: this.properties.page + 1
                }, async () => {
                    const { data } = this.properties
                    const response = await this.getRequest()
                    if (response.code === 0 && response.result.list.length > 0) {
                        let _data = { ...data }
                        _data["data"] = Arr.merge(data.data, response.result.list)
                        this.triggerEvent('onChange', { data: _data });
                    } else {
                        this.setData({
                            noMore: true
                        })
                    }
                })
            }
        },
        async onPress(e) {
            const { index } = e.currentTarget.dataset
            const { login } = this.properties
            if (login === true) {
                const { data:{data} } = this.properties;
                const {id} = data[index]

                if (!Arr.inArray(id, this.properties.getedIds)) {
                    let getedIds = [...this.properties.getedIds]
                    getedIds.push(id)
                    this.setData({
                        getedIds
                    })
                    const e = await apiServices.get({ id })
                    if (e.code !== 0) {
                        fa.toast.show({ title: e.msg })
                    }
                }
            } else {
                navigation.navigate('user/login')
            }
        }
    },

});
