
$(function () {

  //1.发送ajax获取数据
  function render() {
    
    //发送ajax请求获取菜单栏数据
    $.ajax({
      type:'get',
      dataType:'json',
      url:'http://127.0.0.1:9090/api/getindexmenu',
      success:function (info) {
        console.log(info);
        //设置是否显示第三行
        var flag=false;
        var htmlStr = template('nav_list_tpl',info);
        $('.m_nav ul').html(htmlStr);
        
        // console.log();
        var $btn = $('[data-type=7]');

        $btn.click(function () {
          //如果不显示，单击后后要显示
          if(!flag){
            $('[data-type=8]').show();
          }else{
            $('[data-type=8]').hide();
          }
          flag = !flag;
        });
        
      }
    });

    //发送ajax获取超值推荐的数据
    $.ajax({
      type:'get',
      dataType:'json',
      url:'http://127.0.0.1:9090/api/getmoneyctrl',
      success:function (info) {
        
        console.log(info);
        var htmlStr = template('m_product_tpl',info);
        $('.mp_list ul').html(htmlStr);
        

        
        
      }
    });



    
  }
  render();
  
  
});

