import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    djrecommendList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
      //判断用户是否登录
      let userIinfo = wx.getStorageSync('userInfo');
      if(!userIinfo){
        wx.showToast({
          title: '请先进行登录',
          icon: 'none',
          success: ()=>{
            //跳转至登录界面
            wx.reLaunch({
              url: '/pages/login/login',
            })
          }
        })
      }

      //获取推荐电台数据
      this.getdjRecommendList();

  },

    //获取推荐电台数据
    async getdjRecommendList(){
    let djrecommendListData = await request('/dj/recommend');
    
    this.setData({
      djrecommendList: djrecommendListData.djRadios
    })
  },
  //跳转到播放音乐页面
  tosongdetail(event){
    let stadio = event.currentTarget.dataset.stadio;
    //路由跳转传参
    console.log(stadio)
    //跳转至播放界面
    wx.navigateTo({
      url: '/pages/playlist_stadio/playlist_stadio'
    })
  },

    //跳转到歌单歌曲列表页面
    toPlayList(event){
      let stadio = event.currentTarget.dataset.stadio;
      console.log(stadio)
      wx.navigateTo({
        url: '/pages/playlist_stadio/playlist_stadio?rid=' + stadio.id
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