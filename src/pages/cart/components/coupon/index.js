import Arr from "@/utils/array"

Component({
    externalClasses: ['mask-class', 'container-class'],
    properties: {
        cartIds: {
            type: Array,
            value: []
        },
        selectId: {
            type: Number,
            value: 0
        }
    },
    data: {
        _selectId: 0,
        _selectCouponInfo: {},
        visible: false,
        stateTabs: [
            {
                id: '1',
                title: `可以用（0）`
            },
            {
                id: '2',
                title: '不可用（0）'
            }
        ],
        state_type: '1',
    },
    methods: {
        onChange(e) {
            this.setData({
                _selectId: e.detail.selectId,
                _selectCouponInfo: e.detail.selectCouponInfo,
            })
        },
        onSubmit() {
            this.close()
            this.triggerEvent('onChange', {
                selectId: this.data._selectId,
                selectCouponInfo: this.data._selectCouponInfo,
            })
        },
        onTabChange(e) {
            this.setData({
                state_type: e.detail,
            })
        },
        onUsableTotalNumberChange(e) {
            let _stateTabs = { ...this.data.stateTabs }
            _stateTabs[0].title = `可以用（${e.detail.totalNumber}）`
            this.setData({
                stateTabs: Arr.objectToArray(_stateTabs)
            })
            this.triggerEvent('onUsableTotalNumberChange',{
                usableTotalNumber:e.detail.totalNumber
            })
        },
        onUnusableTotalNumberChange(e) {
            let _stateTabs = { ...this.data.stateTabs }
            _stateTabs[1].title = `不可用（${e.detail.totalNumber}）`
            this.setData({
                stateTabs: Arr.objectToArray(_stateTabs)
            })
        },
        close() {
            this.setData({
                visible: false
            })
        },
        show() {
            this.setData({
                visible: true
            })
        },
    },
    show() {
        this.setData({
            visible: true
        })
    },
    attached() {
        this.setData({
            _selectId: this.data.selectId
        })
    },
    observers: {
        'selectId': function (selectId) {
            this.setData({
                _selectId: selectId
            })
        }
    }
})
