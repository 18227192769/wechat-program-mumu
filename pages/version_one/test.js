// pages/test/test.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title: "查快递 上云创",
        index: 0,
        comList: [
            { id: 0, name: "请选择快递公司", comImg: "http://img2.imgtn.bdimg.com/it/u=426605109,2382879281&fm=26&gp=0.jpg"},
            { id: "ZTO", name: "中通快递", comImg: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=507253202,432852348&fm=26&gp=0.jpg"},
            { id: "YTO", name: "圆通快递", comImg: "http://img4.imgtn.bdimg.com/it/u=2773573127,545639471&fm=26&gp=0.jpg"},
            { id: "YD", name: "韵达快递", comImg:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1827322598,1355791935&fm=26&gp=0.jpg"},
            { id: "HTKY",name: "百世快递",comImg:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2365163695,1398936926&fm=26&gp=0.jpg"},
            { id: "STO", name: "申通快递",comImg:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2094549095,500995799&fm=26&gp=0.jpg"},
            { id: "EMS", name: "EMS", comImg: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3035993250,4177272649&fm=26&gp=0.jpg"},
            { id: "HHTT", name: "天天快递",comImg:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=596223883,4187382690&fm=26&gp=0.jpg"},
            { id: "JD", name: "京东物流", comImg:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3781135636,226646988&fm=26&gp=0.jpg"},
            { id: "SF", name: "顺丰速运", comImg:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3686880424,2733328531&fm=26&gp=0.jpg"},
            { id: "UC", name: "优速快递",comImg: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4152600397,1606210619&fm=26&gp=0.jpg"},
            { id: "DBL", name: "德邦快递",comImg:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2206244949,3034547706&fm=26&gp=0.jpg"},
            { id: "FAST", name:"快捷快递",comImg:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2606135791,2322423378&fm=26&gp=0.jpg"},
            { id: "ZJS", name: "宅急送", comImg: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2368272838,2628760205&fm=26&gp=0.jpg"},
            { id: "TNT", name: "TNT快递",comImg:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1032908084,1933230116&fm=26&gp=0.jpg"},
            { id: "UPS", name: "UPS", comImg: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2689604106,3149393171&fm=26&gp=0.jpg"},
            { id: "DHL", name: "DHL", comImg: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1680635049,572755945&fm=26&gp=0.jpg"},
            { id:"FEDEX",name:"FEDEX联邦(国内件)",comImg:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=765274938,2897295652&fm=15&gp=0.jpg"},
            { id: "FEDEX_GJ", name: "FEDEX联邦(国际件)", comImg: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=765274938,2897295652&fm=15&gp=0.jpg"}
        ],
        oderID: '',
        traces: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
    },
    // 提示信息
    alertInfo () {
        wx.showModal({
            title: '提示框',
            content: '该功能尚未实现'
        })
    },
    // 选择快递公司
    selectedEvent (e) {
        const index = e.detail.value;
        this.setData({
            index
        })
    },
    // 扫描二维码
    getScanCode () {
        console.log(11);
        wx.scanCode({
            success: (res) => {
                this.setData({
                    oderID: res.result
                })
            },
            fail: (res) => {
                console.log(res);
                if (res.errMsg === 'scanCode:fail') {
                    wx.showToast({
                        title: '扫描二维码失败, 请确定图片类型',
                        icon: 'none'
                    })
                }
            }
        })
    },
    setOderID (e) {
        console.log(e);
        this.setData({
            oderID: e.detail.value
        })
    },
    getData () {
        // 获取快递单号
        const oderID = this.data.oderID;
        // 获取快递公司
        const expressID = this.data.comList[this.data.index].id
        console.log(oderID, expressID);
        if (oderID.trim() === "") {
            wx.showModal({
                title: '提示框',
                content: '未输入快递单号'
            })
        } else if (Number(oderID) + '' === 'NaN') {
            wx.showModal({
                title: '提示框',
                content: '快递单号只能为纯数字'
            })
        } else if (oderID.length < 10) {
            wx.showModal({
                title: '提示框',
                content: '快递单号不能小于10位'
            })
        }else if (expressID === 0) {
            wx.showModal({
                title: '提示框',
                content: '未选择快递公司'
            })
        } else {
            wx.showLoading({
                title: 'Loading...'
            })
            this.sendRequest({ oderID, expressID })
                .then((res) => {
                    const traces = res.data.Traces;
                    wx.hideLoading();
                    if (traces == undefined || traces.length === 0) {
                        wx.showModal({
                            title: '提示框',
                            content: '未查询到物流信息'
                        })
                    } else {
                        this.setData({
                            traces
                        })
                    }
                }, (err) => {
                    wx.hideLoading();
                    wx.showModal({
                        title: '提示框',
                        content: '请求服务器失败'
                    })
                })
        }
    },
    sendRequest (data) {
        return new Promise ((resolve, reject) => {
            wx.request({
                url: 'https://www.itlaobing.com/express/api',
                dataType: 'json',
                data: {
                    nu: data.oderID,
                    com: data.expressID
                },
                success: (res) => {
                    resolve(res);
                },
                reject: (err) => {
                    reject(err)
                }
            })
        }) 
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})