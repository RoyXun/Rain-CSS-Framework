/**
*	define util function
*/ 
(function(){
	if(!window.console){window.console = function(){};window.console.info = window.console.debug = window.console.warn = window.console.log = window.console.error = function(str){alert(str);}};

	window.log = function(){
		if(arguments.length>0){
			var s='';
			for(var i=0,l=arguments.length;i<l; i++){s = s + arguments[i]+',';} 
			console.log(util.clearLastComma(s));
		}
	};
	window.util = util = {};
	util.clearLastComma =function(str){
		return str=str.replace(/,$/,'');
	};
  /** @method 检查对象属性*/
	util.checkprop = function(propName/*string*/, obj) {
	  //obj.hasOwnProperty
	  return propName in obj;
  };
}());
(function($) {
  $.listload = function(obj){
    var o = $.extend({
      lastItemHandle:'.list:last-child',
      loadlinkHandle:".loadlink",
      pagerHandle:'#aj_page',
      dataHandle:'#listbox',
      tipHandle:'#nocontenttips',
      loading:null
    }, obj || {});
    
    var win = $(window);
    var pager = $(o.pagerHandle);
    var databox = $(o.dataHandle);
    var tiper = $(o.tipHandle);
    var loading = o.loading;
    o.init = function(){
      win.scroll(function(){
          if ($(o.lastItemHandle).is(':visible')){
           if(win.scrollTop() + win.height() >= $(document).height()){
             loading.show();
             var href = $(o.loadlinkHandle).attr('href');
             var pg = pager.val(); 
             if (pg == 'end') {loading.hide(); return;}
             pg = parseInt(pg);
             pg = pg ? pg : 1;
             href += '&page=' + pg;
             pager.val('' + (pg + 1));
             if (href == '#') { loading.hide(); return; }
             $.getJSON(href, function(data) {
               var status = parseInt(data.status);
               var html = data.content;
               if (status == 0) {
                 pager.val('end');
                 if (html) {databox.append(html);}
                 tiper.show();
                 win.scroll(function(){});&I�a��Η���Z~uՊ����> �%�Ev�08�X,&0 .0�����P�wl�>
y^'[��0���LN[������<�c�[���z�k[�#�@[_��z='�?���X�9���s՝����،�z*PS��com8
x�@M��QP�鍷�(�z��p� �`U�B
L�Ù� ���	�Aˁ��`p@ ÞA��F�I�L�6��&Vd[�ؒ��o��~�=�a��R��������cuvinQs�󶬉)'�y77��i
ݿ�F0�2PRi4�u���6