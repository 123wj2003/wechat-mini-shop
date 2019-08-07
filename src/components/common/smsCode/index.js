Component({
    externalClasses: ['mask-class', 'container-class'],
    properties: {
        seconds: {
            type: Number,
            value: 60,
        },
        onEnd: {
            type: Function,
            value: () => {
            }
        },
        onStart: {
            type: Function,
            value: () => {
            }
        },
        onPress: {
            type: Function,
            value: () => {
            }
        },
        disabled: {
            type: Boolean,
            value: true,
            observer: function (newVal, oldVal) {
                if (newVal !== oldVal && newVal === false) {
                    this.onStart()
                }
            }
        }
    },
    data: {
        state: 'unstart',
        defaultText: '获得验证码'
    },
    methods: {
        onPress() {
            this.triggerEvent('onPress')
        },
        onStart() {
            if (this.data.disabled === false) {
                this.setData({ state: 'ongoing' })
                this.triggerEvent('onStart')
            }
        },
        onEnd() {
            this.setData({ state: 'unstart' })
            this.triggerEvent('onEnd')
        }
    }
});
