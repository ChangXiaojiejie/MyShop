
  $(function() {
    // 动态计算product 中ul的宽度
    var $ul = $('.ba_nav ul')
    var $li = $ul.children()
    console.log($li);
    
    // 遍历所有的li
    var total = 0
    $li.each(function(){
      total += $(this).width()
    })
  
    // 设置ul的宽度
    $ul.width(total)
    // 初始化iscroll
    new IScroll('.bargain_nav .ba_nav', {
      scrollX: true,
      scrollY: false
    })
  
  })

  $(function () {
    var titleid ;
    //发送请求，获取数据
    function render() {
      
      //发送ajax
      $.ajax({
        type:'get',
        dataType:'json',
        url:'http://127.0.0.1:9090/api/getbaicaijiatitle',
        success:function (info) {
          
          console.log(info);

          //渲染一级菜单栏
          $('.ba_nav ul').html(template('title_tpl',info));

          //渲染商品信息
          titleid = info.result[0].titleId;
          console.log(titleid);
          getList(titleid);
        }
      });
    }

    render();

    //封装渲染商品列表
    function getList(titleid) {
      //发送ajax请求
      $.ajax({
        type:'get',
        data:{
          titleid : titleid 
        },
        url:'http://127.0.0.1:9090/api/getbaicaijiaproduct',
        dataType:'json',
        success:function (info) {
          
          console.log(info);
          $('.nav_list ul').html(template('pro_list_tpl',info))
          
          
        }
      });
    }

    //注册点击事件
    $('.ba_nav').on('click','a',function () {
      
      // console.log('触发');
      var id = $(this).data("id");
      $('.ba_nav a').removeClass('active');
      $(this).addClass('active');
      // alert(id);

      //重新渲染商品列表
      getList(id);

      
      
    })







    
    
  })
  