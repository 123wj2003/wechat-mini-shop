Component({
    externalClasses: ['mask-class', 'container-class'],
    properties: {
        dataSource: {
            type: Object,
            value: null
        }
    },
    data: {
        itemWidth: 0
    },
    methods: {
        onClick(e) {
            this.triggerEvent('click', { index: e.currentTarget.dataset.index, dataSource: this.data.dataSource });
        }
    },
    attached() {
        const systemInfo = wx.getSystemInfoSync()
        this.setData({
            itemWidth: (systemInfo.windowWidth - 30) / this.data.dataSource.options.each_row_display
        })
    }
});
