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
  /**
   * 通用loader对象
   * @param {Object} 参数对象
   * @return {Object} 返回一个公有对象
   */
  util.loading = $.fn.loading = $.loading = function(obj){
    var opt = $.extend({
      content:"",//文本
      loadingStyle:{},//loading的样式
      loadingClass:"",//loading class。
      textStyle:{"font-size":"1.2em"},//文本的样式
      textClass:""//文本的class
    }, obj || {});
    var randomStr = Math.round(Math.random() * 1e6 + 1) + "",
    _content=opt.content;
    var o = {
        htmlobj:null,
        /** 初始化 */
        init:function(){
          o.initHtml();
          o.initUI();
        },
        /** 初始化html*/
        initHtml:function(){
          if(!o.htmlobj){
            o.htmlobj = $('<div id="j_loader'+randomStr+'" class="j_loader'+randomStr+' ui-loader round-5 ps posf hide"><span class="ui-icon-loading block center roundall o-5"></span><div class="j_content tac"></div></div>');
          }
          if(_content){o.htmlobj.find('.j_content').html(_content);}
          return o.htmlobj;
        },
        /** 设置样式*/
        initUI:function(){
          o.htmlobj.addClass(opt.loadingClass);
          o.htmlobj.css(opt.loadingStyle);
          o.htmlobj.find('.j_content').css(opt.textStyle);
          o.htmlobj.find('.j_content').addClass(o.textClass);
          $('body').append(o.htmlobj);
        },
        /**
         * 设置文本内容
         * @param {string} 文本
         */
        setContent:function(s){
           o.htmlobj.find('.j_content').html(s);
        },
        /** loading显示 */
        show:function(){
          o.htmlobj.removeClass("hide");
        },
        /** loading隐藏 */
        hide:function(){
          o.htmlobj.addClass("hide");
        }
    };

    o.init();
    return o;
  };
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
    o.init = function(){
      win.scroll(function(){
          //手机端滚动到底部加载height=device-height;
          if ($(o.lastItemHandle).is(':visible')){
           if(win.scrollTop() + win.height() >= $(document).height()){}
          }
      });
    };
    o.init();
    return o;
  };
})(jQuery);