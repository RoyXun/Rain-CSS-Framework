require.config({
	urlArgs: 'v='+new Date().getTime(),
	"baseUrl": "./js/",
	paths: {
		jquery: 'lib/jquery-1.7.2',
		html: 'lib/freehtml',
		template: 'lib/template',
		util:'lib/util',
		swipe: 'lib/swipe',
		head:'app/head',
		foot:'app/foot'
	},
  shim : {
    'util' : {
      deps : ['jquery'],
      exports : 'util'
    },
    'swipe' : {
      deps : ['jquery'],
      exports : 'swipe'
    }
  },
  priority: ['jquery']
});
require(['jquery','html','template','util','swipe','head','foot'], function ($,_html,t,util,swipe,head,foot){
	var html = _html.htmlObj;
	var headdata = {
			name: 'Rain CSS'
	};
	var navdata = {
			title1:'标题',
			title2:'标题',
			title3:'标题',
			title4:'标题'
	}
	var footdata = {
			title1:'标题',
			title2:'标题',
			title3:'标题',
			title4:'标题'
	}
	var data = {
			nav: navdata,
			gamelist:[{
				url:'http://wande.me/gg/index.html',
				imgurl:'http://wande.me/game/images/gameicons-2.jpg',
				name:'帅哥爱消除',
				intro:'一款帅哥消除游戏',
				start:'开始游戏'
			}]
	};
	var slidedata = {data:['../images/s1.jpg','../images/s2.jpg','../images/s3.jpg','../images/s4.jpg']};
	
	var main = new html('#body');
	var headhtml = head(headdata);
	var s = new $.swipe({
		touchSelector : ".c_touch",
		imgArray: slidedata.data,
		linksArray:['#','#','#','#'],
		time : 5000,
		autorun: true,
		width: main.getJQobj().width(),
		height:95,
		responsive: false,
		tipswrapStyle:{ bottom: "10px",right: "5px"}
	});
	var gamelist = t("mainbox",data);
	var foothtml = foot(footdata);
	main.add(headhtml).add(s).add(gamelist).add(foothtml);
/*	util.addRoute('/','home',function(){
		main.add(headhtml).add(s).add(gamelist).add(foothtml);
	});*/


});
