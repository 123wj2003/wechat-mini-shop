Component({
    externalClasses: ['mask-class', 'container-class'],
    properties: {
        body: {
            type: Array,
            value: []
        }
    },
    methods: {
        onGoodsClick(e) {
            this.triggerEvent('goods-click', e);
        },
        onImageClick(e) {
            this.bodyImagePreview(e)
            this.triggerEvent('image-click', e);
        },
        bodyImagePreview({ currentTarget }) {
            let images = []
            this.data.body.forEach(function (item) {
                if (item.type === 'image') {
                    images.push(item.value.url)
                }
            });
            wx.previewImage({
                current: currentTarget.dataset.url,
                urls: images
            })
        },
    }
});
