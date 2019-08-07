Component({
    externalClasses: ['mask-class', 'container-class'],
    properties: {
        item: {
            type: Object,
            value: null
        },
        onPress: {
            type: Function,
            value: () => {
            }
        }
    },
    data: {
        canGet: 1,
        stateText: '领取',
    },
    methods: {
        onPress() {

            this.triggerEvent('onPress', {});
        }
    },
    observers: {
        // 'getedIds': function (getedIds) {
        //     const { item } = this.data
        //     const canGet = !Arr.inArray(item.id, getedIds)
        //     const stateText = canGet ? '领取' : '已领取'
        //     this.setData({
        //         canGet,
        //         stateText
        //     });
        // }
    }
});
