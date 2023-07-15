// pages/musiclist/musiclist.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      hotlist:[1,2,3,4,5,6],
      newlist:[1,2,3,4,5,6],
      hotsum:6,
      newsum:6,
  },

  //热门推荐歌单
  getHotMusic:function (sum) {
    var hotlist=this.data.hotlist
    var that=this
    wx.request({
      url: 'http://localhost:3000/personalized',
      success: (result) => {
        // console.log(result.data.result)
        var result=result.data.result
        if (sum > result.length){
          //console.log("歌单已加载完毕")
          wx.showLoading({
            title: '歌单已加载完毕',
          })
          setTimeout(function () {
            wx.hideLoading()
          },2000)
          return
        }
        for(var i=0;i<sum;i++){
          hotlist[i]=result[i]
        }
        that.setData({
          hotlist:hotlist
        })
      },
    })
  },

  //最新推荐歌单
  getNewMusic:function (sum) {
    var newlist=this.data.newlist
    var that=this
    wx.request({
      url: 'http://localhost:3000/personalized/newsong',
      success: (result) => {
        // console.log(result.data.result)
        var result=result.data.result
        if (sum > result.length){
          console.log("歌单已加载完毕")
          wx.showLoading({
            title: '歌单已加载完毕',
          })
          setTimeout(function () {
            wx.hideLoading()
          },2000)
          return
        }
        for(var i=0;i<sum;i++){
          newlist[i]=result[i]
        }
        that.setData({
          newlist:newlist
        })
      },
    })
  },

  //更多按钮
  changehot:function () {
    var sum=this.data.hotsum
    sum = sum + 3
    this.setData({
      hotsum:sum
    })
    this.getHotMusic(sum)
  },

  changenew:function () {
    var sum=this.data.newsum
    sum = sum + 3
    this.setData({
      newsum:sum
    })
    this.getNewMusic(sum)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var sum=this.data.hotsum
    this.getHotMusic(sum)
    var sum=this.data.newsum
    this.getNewMusic(sum)
  },
  //跳转到歌单歌曲列表页面
  toPlayList(event){
    //console.log(event)
    wx.navigateTo({
      url: '/pages/playlist/playlist?id=' + event.currentTarget.id,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})