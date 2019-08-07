Component({
    externalClasses: ['mask-class', 'container-class'],
    properties: {
        style: {
            type: Object,
            value: {}
        },
        price: {
            type: String,
            value: 0
        },
        fontSize: {
            type: Number,
            value: 14
        },
        fontColor: {
            type: String,
            value: '#ccc'
        },
    },
    data: {
        _price: []
    },
    observers: {
        'price': function (newVal, oldVal) {
            if (newVal !== oldVal) {
                const _price = `${newVal}`.split(".");
                if (_price.length === 1) {
                    _price.push("00")
                }
                this.setData({
                    _price
                });
            }
        }
    },
    methods: {},
});

