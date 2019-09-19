// pages/version_two/version.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title: "查快递 上云创",
        userImage: 'http://img2.imgtn.bdimg.com/it/u=426605109,2382879281&fm=26&gp=0.jpg',
        index: 0,
        oderID: '',
        traces: null,
        comList: [
            { id: 0, name: "请选择快递公司", comImg: "http://img2.imgtn.bdimg.com/it/u=426605109,2382879281&fm=26&gp=0.jpg"},
            { id: "ZTO", name: "中通快递", comImg: "../../image/icons/ZTO.jpg"},
            { id: "YTO", name: "圆通快递", comImg: "../../image/icons/YTO.jpg"},
            { id: "YD", name: "韵达快递", comImg:"../../image/icons/YD.jpg"},
            { id: "HTKY",name: "百世快递",comImg:"../../image/icons/HTKY.jpg"},
            { id: "STO", name: "申通快递",comImg:"../../image/icons/STO.jpg"},
            { id: "EMS", name: "EMS", comImg: "../../image/icons/EMS.jpg"},
            { id: "HHTT", name: "天天快递",comImg:"../../image/icons/HHTT.jpg"},
            { id: "JD", name: "京东物流", comImg:"../../image/icons/JD.jpg"},
            { id: "SF", name: "顺丰速运", comImg:"../../image/icons/SF.jpg"},
            { id: "UC", name: "优速快递",comImg: "../../image/icons/UC.jpg"},
            { id: "DBL", name: "德邦快递",comImg:"../../image/icons/DBL.jpg"},
            { id: "FAST", name:"快捷快递",comImg:"../../image/icons/FAST.jpg"},
            { id: "ZJS", name: "宅急送", comImg: "../../image/icons/ZJS.jpg"},
            { id: "TNT", name: "TNT快递",comImg:"../../image/icons/TNT.jpg"},
            { id: "UPS", name: "UPS", comImg: "../../image/icons/UPS.jpg"},
            { id: "DHL", name: "DHL", comImg: "../../image/icons/DHL.jpg"},
            { id:"FEDEX",name:"FEDEX联邦(国内件)",comImg:"../../image/icons/FEDEX.jpg"},
            { id: "FEDEX_GJ", name: "FEDEX联邦(国际件)", comImg: "../../image/icons/FEDEX_GJ.jpg"}
        ],
        curExpress: {
            name: 'waiting...',
            comImg: 'http://img2.imgtn.bdimg.com/it/u=426605109,2382879281&fm=26&gp=0.jpg'
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
    },
    // 扫描二维码
    getScanCode () {
        wx.scanCode({
            success: (res) => {
                this.setData({
                    oderID: res.result
                })
            },
            fail: (res) => {
                // console.log(res);
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
        if (oderID.trim() === "") {// 判断输入是否为空
            wx.showModal({
                title: '提示框',
                content: '未输入快递单号'
            })
            return;
        } else if (Number(oderID) + '' === 'NaN') {// 判断输入是否为纯数字
            wx.showModal({
                title: '提示框',
                content: '快递单号只能为纯数字'
            })
            return;
        } else if (oderID.length < 10) {// 判断快递单号长度
            wx.showModal({
                title: '提示框',
                content: '快递单号不能小于10位'
            })
            return;
        }
        // 显示加载图标
        wx.showLoading({
            title: 'Loading...'
        })
        // 清空上次请求的数据
        this.setData({
            traces: null,
            curExpress: {
                name: 'waiting...',
                comImg: 'http://img2.imgtn.bdimg.com/it/u=426605109,2382879281&fm=26&gp=0.jpg'
            }
        })
        // 根快递单号匹配快递公司
        wx.request({
            url: 'https://www.itlaobing.com/api/express/distinguish',
            method: 'post',
            header: {
                "content-type": 'application/x-www-form-urlencoded'
            },
            data: {
                num: oderID
            },
            success: (res) => {
                const shippers = res.data.data.Shippers;
                // console.log(shippers);
                if (shippers != undefined && shippers.length === 0) {
                    wx.showModal({
                        title: '提示框',
                        content: '未查询到快递公司'
                    })
                    return;
                }
                // 获取快递公司编号
                const expressID = shippers[0].ShipperCode;
                const comList = this.data.comList.slice();
                // 请求物流信息
                this.getExpressInfo(oderID, expressID)
                // 保存当前快递单号对应的快递公司信息
                for (let i = 0; i < comList.length; i++) {
                    if (expressID === comList[i].id) {
                        this.setData({
                            curExpress: comList[i]
                        })
                        return;
                    }
                }
            },
            complete: () => {
                wx.hideLoading();
            }
        })
    },
    // 封装wx.request，发送get请求
    sendRequest (data) {
        return new Promise ((resolve, reject) => {
            wx.request({
                url: 'https://www.itlaobing.com/express/api',
                dataType: 'json',
                method: data.method,
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
    // 请求物流信息
    getExpressInfo (oderID, expressID) {
        this.sendRequest({ oderID, expressID })
            .then((res) => {
                const traces = res.data.Traces;
                if (traces == undefined || traces.length === 0) {
                    wx.showModal({
                        title: '提示框',
                        content: '未查询到物流信息'
                    })
                } else {
                    // console.log(traces);
                    this.setData({
                        traces
                    })
                }
            }, (err) => {
                wx.showModal({
                    title: '提示框',
                    content: '请求服务器失败'
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