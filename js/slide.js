/**
 * slide插件，完成图片滑动，定时轮播。
 * @author mingdd。
 * @param  {object} 配置参数 。
 */
(function ($) {
  $.slide = function (opt) {
      var opts = $.extend({
          box: '.slide',  //滑动的块
          wrap: '.slidewrap',     //li的包装集
          fix: false,  //是否固定大小
          width: 250, //宽
          height: 120, //高
          images: 2,  //展示图片的格式
          slides: 2,  //每次滑动图片个数
          length: 40, //触屏最小滑动长度
          auto: true, //自动轮播
          speed: 300, //滑动速度
          delay: 3000 //滚动间隔
      }, {}, opt);
      var _box = $(opts.box), _wrap = $(opts.wrap);
      var s = _wrap.find('li').size();
      var sls = opts.slides, imgs = opts.images;
      var i = 0;
      var starX = 0;
      var timer;
  
      var o = {
          /** 初始化UI */
          initUI: function () {
            var width = o.getWidth(), h = o.getHeight();
            var itemw = o.getItemWidth();
            _wrap.find('li').slice(0, s).clone(true).appendTo(opts.wrap);
            _wrap.find('li').slice(0, s).clone(true).prependTo(opts.wrap);
            /** 对于不定高的，根据加载的第一张图片高度设置容器的高 */
            if(!opts.fix){
              //_wrap.height(h);
              /**  设置每个li的height和width*/
              _wrap.css({marginLeft: -s * itemw}).find('li').each(function () { 
                $(this).width(itemw); 
              });
              var img = _wrap.find('img').eq(s);
              img.on("load", function () {
                  _box.height(_wrap.height());
              });                        
            }else{
              _wrap.height(h);
              _box.width(width).height(h);              
              /** 设置每个li的height和width */
              _wrap.css({marginLeft: -s * itemw}).find('li').each(function () {
                $(this).width(itemw).height(h);
              });
            }
          },
          getWidth:function(){
            if (opts.fix){return opts.width;}
            return _box.width();
          },
          getHeight : function(){
            return opts.height;
          },
          getItemWidth : function(){
            return (o.getWidth() / imgs).toFixed(1);
          },
          /** 图片懒加载函数 */
          lazyLoad: function (index,n) {
              var _img=_wrap.find('img');
              for (var i = 0; i < n; i++) {
                  var x=parseInt(s)+parseInt(index)+i;
                  var _imgItem = _img.eq(x);
                  if (_imgItem.attr("src3")) {
                      _imgItem.attr("src", _imgItem.attr("src3")).removeAttr("src3");
                  }
              }
          },
          /** 图片向左滚动 */
          leftMove: function () {
              if (!_wrap.is(":animated")) {
                  o.lazyLoad(i + sls, imgs > sls ? imgs : sls);
                  _wrap.stop().animate({"left": "-=" + sls * o.getItemWidth()}, opts.speed, function () {
                      i += sls;
                      if (i >= s) {
                          i = i - s;
                          _wrap.css({left: -i * o.getItemWidth()});
                      }
                  });
              }
          },
          /**
           * 图片向右滚动
           */
          rightMove: function () {
              if (!_wrap.is(":animated")) {
                  o.lazyLoad(i - sls, imgs > sls ? imgs : sls);
                  if (i <= -s + 2*sls) {
                      o.lazyLoad(i - sls + s, imgs);
                  }
                  _wrap.stop().animate({"left": "+=" + sls * o.getItemWidth()}, opts.speed, function () {
                      i -= sls;
                      if (i <= -s + sls) {
                          i = i + s;
                          _wrap.css({left: -i * o.getItemWidth()});
                      }
                  });
              }
          },
          /**
           * touchStar事件
           * @param  {object} event [touch事件]
           */
          touchStar: function (event) {
              o.endLoop();
              starX = parseInt(event.touches[0].clientX, 10);
          },
           /**
           * touchMove事件
           * @param  {object} event [touch事件]
           */
          touchMove: function (event) {
              o.endLoop();
          },
          /**
           * touchEnd事件
           * @param  {object} event [touch事件]
           */
          touchEnd: function (event) {
              var endX = parseInt(event.changedTouches[0].clientX, 10);
              var d = parseInt((endX - starX), 10);
              if (d < -opts.length) {
                  o.leftMove();
              } else if (d > opts.length) {
                  o.rightMove();
              }
              o.startLoop();
          },
          /**
           * 开始轮播
           */
          startLoop: function () {
              if (opts.auto) {
                  timer = setInterval(o.rightMove, opts.delay);
              }
          },
          /**
           * 停止轮播
           */
          endLoop: function () {
              if (opts.auto && timer) {
                  clearInterval(timer);
              }
          },
          /**
           * 绑定事件
           */
          bindEvent: function () {
              _box[0].addEventListener("touchstart", o.touchStar, false);
              _box[0].addEventListener("touchend", o.touchEnd, false);
              _box[0].addEventListener("touchmove", o.touchMove, false);
          },
          /**
           * 初始化
           */
          init:function(){
              o.initUI();
              o.lazyLoad(i,imgs);
              o.startLoop();
              o.bindEvent();
          }
      };
      o.init();
      return o; 
    }
})(jQuery);