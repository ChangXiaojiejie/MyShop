
$(function () {


  //1.给li注册点击事件，让ul显示
  // console.log('触发');
  
  $('.m_category').on('click','.item',function () {
    
    $(this).toggleClass('active').siblings().removeClass('active');
    // alert('1111');

    //获取当前li的a的自定义属性id
    var id = $(this).find('a').data('id');
    // alert(id);

    //发送ajax请求 获取对应的ul内部数据
    $.ajax({
      type:'get',
      data: {
        titleid:id
      },
      url:'http://127.0.0.1:9090/api/getcategory',
      dataType:'json',
      success:function (info) {
        
        console.log(info);
        var htmlStr = template('gory_tpl',info);
        $('.m_category .item ul').html(htmlStr);
        
        
      }
    });





  })

  //2.发送ajax请求，获取数据
  function render() {
    
    //发送ajax请求
    $.ajax({
      url:'http://127.0.0.1:9090/api/getcategorytitle',
      dataType:'json',
      type:'get',
      success:function (info) {
        
        console.log(info);
        var htmlStr = template('item_tpl',info);
        $('.m_category ul').html(htmlStr);
      }
    });
    
  }
  render();



  
  
});