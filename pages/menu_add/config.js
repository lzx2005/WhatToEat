module.exports = {
  // 基础类型输入框配置
  base: {
    name: {
      title: '收货人',
      placeholder: '名字'
    },
    tel: {
      error: true,
      title: '联系电话',
      inputType: 'number',
      placeholder: '请输入手机号'
    },
    address: {
      title: '详细地址',
      type: 'textarea',
      placeholder: '请输入详细地址'
    }
  },
  // 无标题输入框
  notitle: {
    placeholder: '请输入收货人姓名',
    componentId: 'textarea:test'
  },
  // 圆角输入框
  radius: {
    title: {
      right: true,
      mode: 'wrapped',
      title: '名称',
      inputType: 'text',
      placeholder: '请输入菜品名称',
      componentId:"title"
    },
    keyword: {
      right: true,
      mode: 'wrapped',
      title: '搜索词',
      inputType: 'text',
      placeholder: '搜索地图的关键字',
      componentId: "keyword"
    }
  },
  // Form 中使用输入框
  form: {
    name: {
      placeholder: '请输入收货人姓名',
      mode: 'wrapped',
      componentId: 'form:test:name'
    },
    tel: {
      name: 'tel',
      inputType: 'tel',
      mode: 'wrapped',
      placeholder: '请输入收货人手机号码',
      componentId: 'form:test:tel'
    }
  }
};
