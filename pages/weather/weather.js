// pages/weather/weather.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [
            { id: "province01", name: "北京", open: false, citys: ["北京"] },
            { id: "province02", name: "重庆", open: false, citys: ["重庆"] },
            { id: "province03", name: "天津", open: false, citys: ["天津"] },
            { id: "province04", name: "上海", open: false, citys: ["上海"] },
            { id: "province05", name: "安徽", open: false, citys: ["合肥", "芜湖", "蚌埠", "淮南", "马鞍山", "淮北", "铜陵", "安庆", "黄山", "阜阳", "宿州", "滁州", "六安", "宣城", "池州", "亳州"] },
            { id: "province06", name: "福建", open: false, citys: ["福州", "厦门", "莆田", "三明", "泉州", "漳州", "南平", "龙岩", "宁德", "平潭"] },
            { id: "province07", name: "甘肃", open: false, citys: ["兰州", "嘉峪关", "金昌", "白银", "天水", "酒泉", "张掖", "武威", "定西", "陇南", "平凉", "庆阳", "临夏回族自治州", "甘南藏族自治州"] },
            { id: "province08", name: "广东", open: false, citys: ["广州", "深圳", "珠海", "汕头", "佛山", "韶关", "湛江", "肇庆", "江门", "茂名", "惠州", "梅州", "汕尾", "河源", "阳江", "清远", "东莞", "中山", "潮州", "揭阳", "云浮"] },
            { id: "province09", name: "广西", open: false, citys: ["南宁", "柳州", "桂林", "梧州", "北海", "防城港", "钦州", "贵港", "玉林", "百色", "贺州", "河池", "来宾", "崇左", "南宁", "柳州"] },
            { id: "province10", name: "贵州", open: false, citys: ["贵阳", "六盘水", "遵义", "安顺", "毕节", "铜仁", "黔西南", "黔东南", "黔南"] },
            { id: "province11", name: "海南", open: false, citys: ["海口", "三亚", "三沙", "儋州"] },
            { id: "province12", name: "河北", open: false, citys: ["石家庄", "唐山", "秦皇岛", "邯郸", "邢台", "保定", "张家口", "承德", "沧州", "廊坊", "衡水", "定州", "辛集"] },
            { id: "province13", name: "黑龙江", open: false, citys: ["哈尔滨", "齐齐哈尔", "鸡西", "鹤岗", "双鸭山", "大庆", "伊春", "佳木斯", "七台河", "牡丹江", "黑河", "绥化", "大兴安岭", "绥芬河", "抚远"] },
            { id: "province14", name: "河南", open: false, citys: ["郑州", "开封", "洛阳", "平顶山", "安阳", "鹤壁", "新乡", "焦作", "濮阳", "许昌", "漯河", "三门峡", "南阳", "商丘", "周口", "信阳", "驻马店", "济源"] },
            { id: "province15", name: "湖北", open: false, citys: ["武汉", "黄石", "十堰", "宜昌", "襄阳", "鄂州", "荆门", "孝感", "荆州", "黄冈", "咸宁", "随州", "恩施土家族苗族自治州", "仙桃", "潜江", "天门", "神农架"] },
            { id: "province16", name: "湖南", open: false, citys: ["长沙", "株洲", "湘潭", "衡阳", "邵阳", "岳阳", "常德", "张家界", "益阳", "郴州", "永州", "怀化", "娄底", "湘西土家族苗族自治州"] },
            { id: "province17", name: "内蒙古", open: false, citys: ["呼和浩特", "包头", "乌海", "赤峰", "通辽", "鄂尔多斯", "呼伦贝尔", "巴彦淖尔", "乌兰察布盟", "兴安盟", "锡林郭勒盟", "阿拉善盟"] },
            { id: "province18", name: "江苏", open: false, citys: ["南京", "无锡", "徐州", "常州", "苏州", "南通", "连云港", "淮安", "盐城", "扬州", "镇江", "泰州", "宿迁"] },
            { id: "province19", name: "江西", open: false, citys: ["南昌", "九江", "上饶", "抚州", "宜春", "吉安", "赣州", "景德镇", "萍乡", "新余", "鹰潭"] },
            { id: "province20", name: "吉林", open: false, citys: ["长春", "吉林", "四平", "辽源", "通化", "白山", "白城", "松原", "延边朝鲜族自治州", "吉林省长白山保护开发区", "梅河口", "公主岭"] },
            { id: "province21", name: "辽宁", open: false, citys: ["沈阳", "大连", "鞍山", "抚顺", "本溪", "丹东", "锦州", "营口", "阜新", "辽阳", "盘锦", "铁岭", "朝阳", "葫芦岛"] },
            { id: "province22", name: "宁夏", open: false, citys: ["银川", "石嘴山", "吴忠", "固原", "中卫"] },
            { id: "province23", name: "青海", open: false, citys: ["西宁", "海东", "海北", "黄南", "海南", "果洛", "玉树", "海西"] },
            { id: "province24", name: "山西", open: false, citys: ["太原", "大同", "阳泉", "长治", "晋城", "朔州", "晋中", "运城", "忻州", "临汾", "吕梁"] },
            { id: "province25", name: "山东", open: false, citys: ["济南", "青岛", "淄博", "枣庄", "东营", "烟台", "潍坊", "济宁", "泰安", "威海", "日照", "莱芜", "临沂", "德州", "聊城", "滨州", "菏泽"] },
            { id: "province26", name: "四川", open: false, citys: ["成都", "绵阳", "自贡", "攀枝花", "泸州", "德阳", "广元", "遂宁", "内江", "乐山", "资阳", "宜宾", "南充", "达州", "雅安", "阿坝", "甘孜", "凉山", "眉山", "广安", "巴中"] },
            { id: "province27", name: "西藏", open: false, citys: ["拉萨", "昌都", "山南", "日喀则", "那曲", "阿里", "林芝"] },
            { id: "province28", name: "新疆", open: false, citys: ["乌鲁木齐", "克拉玛依", "吐鲁番", "哈密", "阿克苏", "喀什", "和田", "昌吉", "博尔塔拉", "巴音郭楞", "克孜勒苏", "伊犁"] },
            { id: "province29", name: "云南", open: false, citys: ["昆明", "曲靖", "玉溪", "昭通", "保山", "丽江", "普洱", "临沧", "德宏", "怒江", "迪庆", "大理", "楚雄", "红河", "文山", "西双版纳"] },
            { id: "province30", name: "浙江", open: false, citys: ["杭州", "宁波", "温州", "嘉兴", "湖州", "绍兴", "金华", "衢州", "舟山", "台州", "丽水"] },
            { id: "province31", name: "陕西", open: false, citys: ["西安", "宝鸡", "铜川", "咸阳", "渭南", "延安", "汉中", "榆林", "安康", "商洛", "杨凌示范区"] }
        ],
        lastIndex: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    click_province (e) {
        // console.log(e);
        // 获取上一次点击的索引值
        const lastIndex = this.data.lastIndex;
        // 获取当前点击的索引值
        let curIndex = e.target.dataset.index;
        const list = this.data.list;
        // 判断是否点击过
        if (lastIndex !== null) {
            list[lastIndex].open = false;
        }
        // 如果当前点击项和上次相同，则收起省份栏，并将上次的点击项的索引置空
        if (lastIndex === curIndex) {
            list[curIndex].open = false;
            curIndex = null;
        } else {
            // 将当前点击项的open值设置为 true -- 打开省份栏
            list[curIndex].open = true;
        }
        this.setData({
            list,
            lastIndex: curIndex
        })
    },
    // 跳转到城市的天气页面
    toCityPage (e) {
        const city = e.target.dataset.city;
        // console.log(city);
        wx.navigateTo({
            url: '../cityWeather/cityWeather?city=' + city
        });
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