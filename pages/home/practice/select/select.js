// pages/home/practice/select/select.js
const AV = require('../../../../libs/av-core-min');
var util = require('../../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    sportSelect:[false,false,false],
    sportType:['未选择','篮球','足球','羽毛球','乒乓球','跑步','游泳','举重','骑自行车','划船'],
    sportTypeCalCost:[0,245,273,245,150,600,350,210,350,420],
    sportIntensity: ['未选择','低强度','中低强度','中高强度','高强度'],
    sportIntensityPercentage: [0,0.5,0.66,0.82,1],
    sportDuration: ['未选择','0.5h','1h','1.5h','2h','2.5h','3h'],
    type:0,
    intensity:0,
    durate:0,
  },
  
  bindTypeChange: function(e){
    this.setData({
      type: e.detail.value
    })
  },

  bindIntensityChange: function(e){
    this.setData({
      intensity: e.detail.value
    })
  },

  bindDurationChange: function(e) {
    this.setData({
      durate: e.detail.value
    })
  },

  confirm(){
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration :2000
    })

    if(this.data.type==0||this.data.intensity==0||this.data.durate==0){
      console.log(this.data.durate)
      
      if(this.data.durate==0){
        wx.showToast({
          title: '请选择运动时间',
          icon: 'none',
        });
    }

      if(this.data.intensity==0){
      wx.showToast({
        title: '请选择运动强度',
        icon: 'none',
      });
    }

    if(this.data.type==0){
      wx.showToast({
        title: '请选择运动种类',
        icon: 'none',
      });
    }

    }
    else{
      const currentUser = AV.User.current()
      var weight = currentUser.get('weight')
      var calCost = weight/70*this.data.sportTypeCalCost[this.data.type]
        *this.data.sportIntensityPercentage[this.data.intensity]*this.data.durate
      console.log(calCost)
      const practiceTime = new AV.Object('PracticeTime')
      practiceTime.set('calCost',calCost)
      practiceTime.set('parent',currentUser)
      practiceTime.set('startTime',util.formatTime(new Date()))
      console.log(practiceTime)
      practiceTime.save()

      wx.redirectTo({
        url: '../../practice/practice',
      });
      wx.showToast({
        title: '更新成功',
        icon: 'success',
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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