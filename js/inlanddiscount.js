
$(function () {

  //发送请求，获取数据渲染页面
  function render() {
    
    //发送请求
    $.ajax({
      type:'get',
      dataType:'json',
      url:'http://127.0.0.1:9090/api/getinlanddiscount',
      success:function (info) {
        console.log(info);
        

        //开始瀑布流渲染
        //将数组赋值给arr
        var arr = info.result;
        //切出前四条数据
        var str = arr.splice(0,4);

        //绑定到info中，不渲染info中的result，渲染obj
        info.obj = str;

        //绑定模板
        $('.mm_discount_list ul').html(template('pro_tpl',info));

        //注册滚动条监听事件
        $(window).on('scroll',function () {
          
          // console.log('触发');
          // 高度
          var height = $('.mm_discount_list').height()+$('.mm_discount_list').offset().top-($(window).scrollTop()+$(window).height());

          if(height<-100){

            //加载两张数据
            var str = arr.splice(0,2);
            info.obj = str;
            $('.mm_discount_list ul').append(template('pro_tpl',info));
          }

          // console.log(height);
        });
        
      }
    });
    
  }

  render();
  
  
})