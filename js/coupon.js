$(function () {

  //1.发送ajax请求，获取数据
  function render() {
    
    //发送ajax请求
    $.ajax({
      type:'get',
      dataType:'json',
      url:'http://127.0.0.1:9090/api/getcoupon',
      success:function (info) {
        
        // console.log(info);
        $('.mm_coupon_title ul').html(template('coup_tpl',info))
        
        
      }
    });
    
  }
  render();
  
  
});