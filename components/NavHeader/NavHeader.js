// components/NavHeader/NavHeader.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:String,
      value:'title'
    },
    nav:{
      type:String,
      value:'nav'
    },
    button:{
      type:String,
      value:'button'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    tomusiclist(){
      wx.navigateTo({
        url: '/pages/musiclist/musiclist',
      })
    },
  }
})
