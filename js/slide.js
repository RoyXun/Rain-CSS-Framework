/**
 * slide插件，完成图片滑动，定时轮播。
 * @author mingdd。
 * @param  {object} 配置参数 。
 */
(function ($) {
    $.extend({
        "slide": function (opt) {
            var opts = $.extend({
                box: '.slide',  //滑动的块
                wrap: '.slidewrap',     //li的包装集
                fix: false,  //是否固定大小
                width: 320, //宽
                height: 195, //高
                images: 3,  //展示图片的格式
                slides: 1,  //每次滑动图片个数
                length: 40, //触屏最小滑动长度
                loop: false, //是否是无缝轮播
                auto: true, //自动轮播
                speed: 800, //滑动速度
                delay: 5000 //滚动间隔
            }, {}, opt);
            var box = opts.box, wrap = opts.wrap;
            var _box = $(box), _wrap = $(wrap);
            var s = _wrap.find('li').size();    //需要展示图片张数
            var slides = opts.slides, images = opts.images, ms = slides > images ? slides : images;    //slides每次滑动图片张数，images每次展示的图片张数，ms需要复杂的图片张数。
            var i = 0, starX = 0;   //i标记图片位置，straX标记触屏初始点
            var timer;  //计时器
            var width, w, h;
            var finish= false;  //标记图片是否全部加载

            var o = {
                //初始化UI
                initUI: function () {
                    width = o.getWidth(), h = o.getHeight, w = o.getItemWidth();
                    if (opts.fix) {
                        _box.width(width).height(h);
                    }
                    //判断是否需要复杂节点
                    if (opts.loop) {
                        //复制节点
                        _wrap.find('li').slice(0, ms).clone(true).appendTo(wrap);
                        _wrap.find('li').slice(s - ms, s).clone(true).prependTo(wrap);
                    } else {
                        ms = 0;
                    }
                    //更改位置
                    _wrap.css({marginLeft: -ms * w}).find('li').each(function () {
                        $(this).width(w);
                    });
                    _box.width(width);
                },
                //获取box的宽
                getWidth: function () {
                    if (opts.fix) {
                        return opts.width;
                    }
                    return _box.width();
                },
                //获取box的高
                getHeight: function () {
                    return opts.height;
                },
                //获取每个li的宽
                getItemWidth: function () {
                    return o.getWidth() / images;
                },
                //获取展示图片的张数
                getimages: function () {
                    return opts.images;
                },
                //左移
                leftMove: function () {
                    w = o.getItemWidth();
                    if (!_wrap.is(':animated')) {
                        o.lazyLoad('left', i + slides, images);
                        //判断是否做无缝滚动
                        if (!opts.loop && i + images + slides > s) {
                            _wrap.stop().animate({marginLeft: -(s - images) * w}, opts.speed, function () {
                                i = s - images;
                            });
                        } else {
                            _wrap.stop().animate({marginLeft: '-=' + slides * w}, opts.speed, function () {
                                i += slides;
                                if (i + slides > s) {
                                    i = i - s;
                                    _wrap.css({marginLeft: -i * w - ms * w});
                                }
                            });
                        }
                    }
                },
                //右移
                rightMove: function () {
                    w = o.getItemWidth();
                    if (!_wrap.is(':animated')) {
                        o.lazyLoad('right', i - slides, images);
                        //判断是否做无缝滚动
                        if (!opts.loop && i - slides < 0) {
                            _wrap.stop().animate({marginLeft: 0}, opts.speed, function () {
                                i = 0;
                            });
                        } else {
                            _wrap.stop().animate({marginLeft: '+=' + slides * w}, opts.speed, function () {
                                i -= slides;
                                if (i < 0) {
                                    i = i + s;
                                    _wrap.css({marginLeft: -i * w - ms * w});
                                }
                            });
                        }
                    }
                },
                //图片懒加载
                lazyLoad: function (towards, index, n) {
                    if (!finish) {
                        //根据方向加载图片
                        switch (towards) {
                            case 'left':
                                if (index + slides > s) {
                                    index -= s;
                                }
                                break;
                            case 'right':
                                if (index < slides) {
                                    index += s;
                                }
                                break;
                        }
                        var _img = _wrap.find('img');
                        var _item;
                        //加载图片
                        for (var i = 0; i < n; i++) {
                            _item = _img.eq(ms + i + index);
                            if (_item.attr('data-src')) {
                                _item.attr('src', _item.attr('data-src')).removeAttr('data-src');
                            }
                        }
                        o.judge(_img);
                    }
                },
                //判断图片是否加载完
                judge: function (img) {
                    finish = true;
                    for (var i = 0; i < s; i++) {
                        if (img.eq(ms + i).attr('data-src')) {
                            finish = false;
                        }
                    }
                    //图片加载完，更改所有节点的data-src。
                    if (finish) {
                        for (i = 0; i < s + 2 * ms; i++) {
                            if (img.eq(i).attr('data-src')) {
                                img.eq(i).attr('src', img.eq(i).attr('data-src')).removeAttr('data-src');
                            }
                        }
                    }
                },
                //touchStar事件
                touchStar: function (event) {
                    o.endLoop();
                    starX = parseInt(event.touches[0].clientX, 10);
                },
                //touchMove事件
                touchMove: function (event) {
                    o.endLoop();
                },
                // touchEnd事件
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
                //开始轮播
                startLoop: function () {
                    if (opts.auto) {
                        timer = setInterval(o.leftMove, opts.delay);
                    }
                },
                // 停止轮播
                endLoop: function () {
                    if (opts.auto && timer) {
                        clearInterval(timer);
                    }
                },
                //绑定触屏事件
                bindTouchEvent: function () {
                    _box[0].addEventListener("touchstart", o.touchStar, false);
                    _box[0].addEventListener("touchend", o.touchEnd, false);
                    _box[0].addEventListener("touchmove", o.touchMove, false);
                },
                bindCommonEvent:function(){
                    $('#btnLeft').on('click', o.leftMove);
                    $('#btnRight').on('click', o.rightMove);
                },
                //初始化
                init: function () {
                    o.initUI();
                    //加载初次展示的图片，如果dom的初始就为src可以删去。
                    o.lazyLoad('right', 0, images);
                    o.startLoop();
                    //判断是否支持触屏事件。
                    if (util.supportTouch) {
                        o.bindTouchEvent();
                    }
                    o.bindCommonEvent();
                }
            };
            o.init();
            return o;
        }
    });
})(jQuery);