
$(function () {

  var serStr = new UrlSearch();
  var brandtitleid = serStr.brandtitleid;
  console.log(brandtitleid);
  var productId;


  //发送ajax请求
  function render() {

    //发送ajax请求，获取标题
    $.ajax({
      type:'get',
      dataType:'json',
   
      url:'http://127.0.0.1:9090/api/getbrandtitle',
      success:function (info) {
        
        console.log(info);

        //brandtitleid作为索引找到对应的数据，取出brandTitle
        var str = info.result[brandtitleid].brandTitle;
        console.log(str);
        var name = str.substr(0,str.indexOf('十'));
        console.log(name);
        // 设置品牌名称
        $('.re_top').text(name);
        
        
        
        
      }
    });



    
    $.ajax({
      type:'get',
      dataType:'json',
      url:'http://127.0.0.1:9090/api/getbrand',
      data:{
        brandtitleid:brandtitleid
      },
      success:function (info) {
        
        // console.log(info);
        $('.mm_sign ul').html(template('sign_tmp',info));
        $(".mm_sign ul li .number").eq(0).css("backgroundColor", "#f10f0f");
        $(".mm_sign ul li .number").eq(1).css("backgroundColor", "#ff9315");
        $(".mm_sign ul li .number").eq(2).css("backgroundColor", "#8adf5b");
      }
    });

    $.ajax({
      type:'get',
      data:{
        brandtitleid:brandtitleid
      },
      url:'http://127.0.0.1:9090/api/getbrandproductlist',

      dataType:'json',
      success:function (info) {
        
        console.log(info);
        //渲染产品销量排行
        $('.list_content ul').html(template('list_tmp',info));
        if(info.result.length==0){
          return;
        }
        // 获取产品的id
        productId = info.result[0].productId;

        //获取图片和描述信息
        var proImg = info.result[0].productImg;
        var proText = info.result[0].productName;

        console.log(proImg);
        console.log(proText);
        $.ajax({
          type:'get',
          data:{
            productid :productId 
          },
          url:'http://127.0.0.1:9090/api/getproductcom',
          dataType:'json',
          success:function (info) {
            
            console.log(info);

            info.img = proImg;
            info.text = proText;


            $('.mm_comment').html(template('con_tmp',info));

          }
        })
      }
    });
  }

  render();
  
});