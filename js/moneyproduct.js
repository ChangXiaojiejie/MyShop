
$(function () {

  var usrStr = new UrlSearch();

  var productid = usrStr.productid;
  console.log(productid);
  

  //发送请求渲染数据
  function render() {

    $.ajax({
      type:'get',
      data:{
        productid :productid
      },
      url:'http://127.0.0.1:9090/api/getmoneyctrlproduct',
      dataType:'json',
      success:function (info) {
        
        console.log(info);
        $('.dts_content').html(template('pro_tpl',info));
      }
    });    
    
  }

  render();
  
  
});