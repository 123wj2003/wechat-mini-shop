Component({
    externalClasses: ['mask-class', 'container-class'],
    properties: {
        cartIds:{
            type:Array,
            value:[]
        },
        onPress: {
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
        onPress() {
            this.triggerEvent('onPress', {});
        }
    },
    attached: function () {
        const { cartIds } = this.data
        const app = getApp()
        app._store.dispatch({
            type: 'promo/unusableCoupons',
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
