
$(function () {

  //发送ajax请求，渲染页面
  function render() {
    
    $.ajax({
      type:'get',
      dataType:'json',
      url:'http://127.0.0.1:9090/api/getbrandtitle',
      success:function (info) {
        
        // console.log(info);
        $('.m_category ul').html(template('list_tpl',info));
        
        
      }
    });
  }

  render();



  
  
});