import Time from "@/utils/time";

Component({
    externalClasses: ['mask-class', 'container-class'],
    properties: {
        item: {
            type: Object,
            value: {}
        },
        onPress: {
            type: Function,
            value: () => {

            }
        },
    },
    attached() {
        const { item } = this.data;
        this.setData({
            overdue: Time.overdue(item.expire_time)
        });
    },
    data: {
        overdue: false
    },
    methods: {
        onReceivePress(){
            this.triggerEvent('onReceivePress', this.data.item);
        },
        onPress(){
            this.triggerEvent('onPress', this.data.item);
        }
    }
});
