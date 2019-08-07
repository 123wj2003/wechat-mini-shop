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
        },
        onChange: {
            type: Function,
            value: () => {
            }
        },
        onTotalNumberChange:{
            type:Function,
            value:0
        }
    },
    data: {
        list: [],
    },
    methods: {
        onPress({ currentTarget: { dataset: { item } } }) {
            if(this.data.selectId === item.coupon_user_id){
                this.triggerEvent('onChange', {
                    selectId: 0,
                    selectCouponInfo: {}
                });
            }else{
                this.triggerEvent('onChange', {
                    selectId: item.coupon_user_id,
                    selectCouponInfo: item.coupon
                });
            }

        }
    },
    attached: function () {
        const { cartIds } = this.data
        const app = getApp()
        app._store.dispatch({
            type: 'promo/usableCoupons',
            payload: {
                cart_ids: cartIds,
                page: 1,
                rows: 100
            },
            callback: (e) => {
                if (e.code === 0) {
                    const { list, total_number } = e.result
                    this.triggerEvent('onTotalNumberChange', {
                        totalNumber: total_number,
                    });
                    this.setData({
                        list,
                    })
                }
            }
        })
    },
});
