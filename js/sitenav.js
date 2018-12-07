$(function () {

  function render() {
    
    //发送ajax请求
    $.ajax({
      type:'get',
      dataType:'json',
      url:'http://127.0.0.1:9090/api/getsitenav',
      success:function (info) {
        
        // console.log(info);
        $('.ul_content ul').html(template('site_tpl',info));
        
        
      }
    })
    
  }
  render();
  
  
})