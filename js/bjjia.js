
$(function () {
  
    var serStr = new UrlSearch();
    var productid  = serStr.productid;
    var categoryid  = serStr.categoryid;
    console.log(productid);
    console.log(categoryid);
    
    //1.发送ajax请求，获取数据
    function render() {

      // 发送ajax请求 当前产品信息
      $.ajax({
        type:'get',
        data:{
          productid:productid
        },
        dataType:'json',
        url:'http://127.0.0.1:9090/api/getproduct',
        success:function (info) {
          
          console.log(info);
          var list = info.result[0].productName.split(' ')[0];
          console.log(list);
          //设置三级列表
          var htmlStr = template('pro_tpl',info);
          $('.product_bijia').html(htmlStr);
          

          //设置商品图片
         
          $('.mm_product_list .three').html(template('three_tpl',{list:list}));
          
          
        }
      });

      //发送ajax获取评论信息
      $.ajax({
        type:'get',
        url:'http://127.0.0.1:9090/api/getproductcom',
        data:{
          productid:productid
        },
        dataType:'json',
        success:function (info) {
          
          // console.log(info);
          var htmlStr = template('pro_com_tpl',info);
          $('.commomt_info ul').html(htmlStr);
          
          
        }
      });

      //发送获取二级列表
      $.ajax({
        type:'get',
        url:'http://127.0.0.1:9090/api/getcategorybyid',
        data:{
          categoryid:categoryid
        },
        dataType:'json',
        success:function(info){
          $('.list_title .secondary').html(template('send_tpl',info))
        }
      })
      
      
    }

    render();
    


  
  
});