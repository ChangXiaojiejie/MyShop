$(function () {

  var shopid;
  var areaid;

  // 给所有一级导航的里注册点击事件，显示二级列表框
  // var flag = false;
  $('.mm_nav').on('click', 'a', function () {

    //隐藏所有的二级列表

    // 先找爸爸
    var li = $(this).parent();
    // console.log(li[0]);
    // 让爸爸的兄弟的孩子（.nav_list）隐藏
    li.siblings().find('.nav_list').hide();
    //让当前元素的兄弟元素切换显示和隐藏
    $(this).siblings().toggle();

    //获取当前元素身上的自定义属性
    var shopId = $(this).data('id');
    // console.log(shopId);

    shopid = shopId;
    render(shopid,areaid);
  })

  //给下拉店铺注册点击事件
  $('.nav_list').on('click', 'a', function () {

    var id = $(this).data('id');
    // alert(id);
    // $('.nav_list i').removeClass('active');

    $(this).find('i').addClass('active');


    areaid = $(this).data('id');


    render(shopid,areaid);

  });


  function render(shopid,areaid) {
  //发送ajax请求获取数据
  $.ajax({
    url: 'http://127.0.0.1:9090/api/getgsshop',
    // http://127.0.0.1:9090/api/getgsshop
    type: 'get',
    dataType: 'json',
    success: function (info) {
      
      shopid = shopid || info.result[0].shopId;

      info.shopid = shopid;

      console.log(info);



      $('.shop .nav_list ul').html(template('nav_tpl', info));

    }

  });


  //区域获取
  //发送ajax请求
  $.ajax({
    type: 'get',
    // 
    dataType: 'json',
    url: 'http://127.0.0.1:9090/api/getgsshoparea',
    success: function (info) {

      console.log(info);
      areaid = areaid || info.result[0].areaId;

      info.areaid = areaid;

      $('.region .nav_list ul').html(template('region_tpl', info));


      

        //获取商品列表
        $.ajax({
          type: 'get',
          url: 'http://127.0.0.1:9090/api/getgsproduct',
          data: {
            shopid: shopid,
            areaid: areaid
          },
          dataType: 'json',
          success: function (info) {
            console.log(info);
            $('.mm_product_list ul').html(template('pro_tpl', info));
          }
        });
      }

   
  });

}

  render();



});