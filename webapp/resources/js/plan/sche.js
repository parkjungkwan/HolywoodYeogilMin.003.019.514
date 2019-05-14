"use strict";
var sche = sche || {};
var map;
var prev_infowindow =false;
var currentMark = false;
var markers = [];
var markerarray = [];
var s_markers = [];
var wayp;
var i_wins = [];
var is_state = '0';
var now_select_city_cnt;
var marker_img = '/web/resources/img/map/marker/normal_marker.png';
var marker_img_on = '/web/resources/img/map/marker/ic_current.png';
var marker_img_sk = '/web/resources/img/map/marker/ic_current.png';
//var marker_img_sk = '/res/img/worldmap/skt_pin.png';


sche = (()=>{
	let _,js,compojs,img,css;
	let init=()=>{
		_ = $.ctx();
		js = $.js();
		img = $.img();
		css = $.css();
		compojs = js+'/comp/compo.js';
		onCreate();
	};
	let onCreate=()=>{
		setContentView();
	};
	let setContentView=()=>{
		
		$('#jw_css').remove();
		$('<link id="jw_css" rel="stylesheet" href="'+css+'/web/date_picker.css" />').appendTo('head');
		$('<link id="jw_css" rel="stylesheet" href="'+css+'/component/schedule.css"/>').appendTo('head');
		$('#header').remove();
		$('#footer').remove();
		$('#schedule').remove();
		
		$.getScript(compojs,()=>{
			$('#common_area').empty();
			$(compo.sche_header()).appendTo('#common_area');
			$('#home').attr({src:img+"/common/logo1.png",style:"width:150px;"});
			
			
			
			$(compo.sche_content()).appendTo('#common_area');
			$('#cat_menu').empty();
			$('#schedule_full_box').empty();
			$('<div class="title_box"/>').appendTo('#schedule_full_box');
			$('<div id="country_list_title"/>').appendTo('.title_box');
			$('<div class="fl ct_title">'+'아시아'+'</div>')
			.appendTo('#country_list_title').attr('style','width:100%;');
			$('<div class="clear"/>').appendTo('#country_list_title');
			$('<div id="city_list_title">'
			+'<div class="back_btn fl" id="back_btn"></div>'
			+'<div class="fl cu_title" style="width:230px;padding-left:10px;font-size:15px;">city</div>'
			+'<div class="clear"></div>'
			+'</div>').appendTo('.title_box');
			$('#back_btn').css("background", "url('"+img+"/map/back_btn.png')");
			
			$('#map').insertAfter('#clip_list').attr('style','height: 100%; position: relative;overflow: hidden;');
			get("아시아");
			$.each(mapNav(),(i,j)=>{
				$('#country_list_box #Taiwan').click(function(){
				});
				$('<li><img src="'+j.src+'" class="s"></br>'+j.val+'</img></li>').attr({'data':j.name,'data-val':j.val})
					.appendTo('#cat_menu').click(function(){
					$('#country_list_title').empty();
					$('#country_list_box').empty();
					
					let that = $(this).attr('data');
					$(this).addClass('on');
					$(this).siblings().removeClass('on');
					switch (that) {
					case "as" :
						get("아시아");
						break;
					case "eu":
						get("유럽");
						break;
					case "oc":
						get("남태평양");
						break;
					case "na":
						get("북아메리카");
						break;
					case "sa":
						get("중남미");
						break;
					}
					//deleteMarkers();
					$('<div class="fl ct_title">'+j.val+'</div>')
						.appendTo('#country_list_title').attr('style','width:100%;');
					$('<div class="clear"/>').appendTo('#country_list_title');
					
				});
				$('[data=as]').addClass('on');
			});

			$('<div id="search_box"/>').appendTo('#schedule_full_box')
			.attr('style','width:100%;height:51px;border-bottom:solid #d6d6d6 1px;');
			
			$('<div id="country_list_box"/>')
			.appendTo('#schedule_full_box')
			.css("background-image", "url('"+img+"/map/cu_next_icon.png')")
			.attr('style','height: 569px;');
			
			$('<div id="city_list_box"/>').appendTo('#schedule_full_box')
			.attr('style','height: 569px;display:none;');
			$(compo.sche_detail()).appendTo('#right_full_box');
			$('<div class="detail_city_bottom">'
		 	+'<div class="detail_plan_go_btn">상세 일정 만들기</div></div>').appendTo('#select_detail_view_city');
			
			$('.detail_plan_go_btn').click(function(){

				let data = {ctr : $('#city_list_title').text(),
							startDate : $('#date_pick_btn').children().eq(0).text(),
							city : $('#selected_cities .s_cities .city_info .fl').text(),
							planTitle: $('#plan_title').val()};

				$.ajax({
					url: _+"/myplan/schedule/"+sessionStorage.getItem('memberId'),
					type: "POST",
					data : JSON.stringify(data),
					dataType :"json",
					contentType : "application/json; charset=UTF-8",
					success: d => {
						mysche.init(data.planTitle);
					},error: e => {
					}
				});
			});
			$('#map_close').click(function(){
				location.assign($.ctx()+'/sche');
			});
			$('#home').click(function(){
				location.assign($.ctx());
			});
		});
	};
	
	let mapNav =()=>{
		return [
			{name:'as',val:'아시아',src:img+'/map/cat_as.png'},
			{name:'eu',val:'유럽',src:img+'/map/cat_eu.png'},
			{name:'oc',val:'남태평양',src:img+'/map/cat_oc.png'},
			{name:'na',val:'북아메리카',src:img+'/map/cat_na.png'},
			{name:'sa',val:'중남미',src:img+'/map/cat_sa.png'}
			];
	};
	

	let get =x=>{
		
	var _ct_code = $('#cat_menu li.on').attr('data');
	var _prev_latlng;
	var _chg_set;
	
	$(document).ready(function(){
		var map_width = $( window ).width() - 336;
		var map_height = $( window ).height() -64;
		var map_list_height = $( window ).height() - 167;
		// $('#right_full_box').css('width',map_width+'px');
		// $('#right_full_box').css('height',map_height+'px');
		$('#country_list_box').css('height',map_height-121);
		$('#city_list_box').css('height',map_height-121);
		$('#selected_cities').css('max-height',map_height-200);
		
		$('#map').css('width',map_width+'px');
		$('#map').css('height',map_height+'px');
		
		$('#full_wrap').css('height',map_height+'px');
		$('#map_spot_list').css('height',map_list_height+'px');
		$('#top_menu').css('width',map_width+'px');
		initialize();
	});
	
	$( window ).resize(function() {
		var map_width = $( window ).width() - 336;
		var map_height = $( window ).height() - 64;
		var map_list_height = $( window ).height() - 167;
		// $('#right_full_box').css('width',map_width+'px');
		// $('#right_full_box').css('height',map_height+'px');
		$('#country_list_box').css('height',map_height-121);
		$('#city_list_box').css('height',map_height-121);
		$('#selected_cities').css('max-height',map_height-200);
		
		$('#map').css('width',map_width+'px');
		$('#map').css('height',map_height+'px');
		
		$('#full_wrap').css('height',map_height+'px');
		$('#map_spot_list').css('height',map_list_height+'px');
		$('#top_menu').css('width',map_width+'px');
	});
	
	$('#date_pick_btn').click(function(){
		$('#date_pick').attr('style','display:block;');
	});
	
	$('#date_pick').datepicker({
		numberOfMonths:1,
		prevText:'',
		nextText:'',
		monthNames : [
			'1월', //1월', 
			'2월', //2월', 
			'3월', //3월', 
			'4월', //4월', 
			'5월', //5월', 
			'6월', //6월', 
			'7월', //7월', 
			'8월', //8월', 
			'9월', //9월', 
			'10월', //10월', 
			'11월', //11월', 
			'12월'], //12월'],
			monthNamesShort : [
				'1월', //1월', 
				'2월', //2월', 
				'3월', //3월', 
				'4월', //4월', 
				'5월', //5월', 
				'6월', //6월', 
				'7월', //7월', 
				'8월', //8월', 
				'9월', //9월', 
				'10월', //10월', 
				'11월', //11월', 
				'12월'], //12월'],
				dayNames:['SUN','MON','TUE','WED','THU','FRI','SAT'],
				dayNamesShort:['SUN','MON','TUE','WED','THU','FRI','SAT'],
				dayNamesMin:['SUN','MON','TUE','WED','THU','FRI','SAT'],
				dateFormat:'yy-mm-dd',
				minDate:0,
				maxDate: '+1Y',
				hideIfNoPrevNext: true,
				onSelect: function (dateText, inst) {
					$('#date_pick_btn .pn_date_info').text(dateText);
					$('#date_pick_btn').attr('data',dateText);
					$('#date_pick').fadeOut();
				},
				onClose:function(selectedDate){
					var _this_start_day = selectedDate;
					var _this_select_day = $('.ht_checkout').val();
					
					var between_day = date_gap(_this_start_day, _this_select_day);
					
					if(between_day > 29){
						$('.ht_checkin').val('');
					}        
				}
	});
	
	$('#cat_menu li').click(function(){
		$('#cat_menu li').removeClass('on');
		$(this).addClass('on');
		deleteMarkers();
		$('#city_list_box').hide();
		$('#city_list_title').hide();
		$('#country_list_box').show();
		$('#country_list_title').show();
		get_country_list();
	});
	
	$('#country_list_box').on('click','.item',function(){
		let _cu_srl = $(this).attr('data');
		let _cu_name = $(this).attr('data-val');
		let _cu_ename = $(this).attr('data-name');
		deleteMarkers();
		$('#country_list_box').hide();
		$('#country_list_title').hide();
		$('#city_list_box').show();
		$('#city_list_title').attr('style','display: block;');
		if(_cu_srl == 5){
			get_ko_state(_cu_name,_cu_ename);
			
		}else{
			get_city_list(_cu_srl,_cu_name);
		}
		
	});
	
	$('#city_list_title').on('click','.back_btn',function(){
		deleteMarkers();
		let _go_state = $(this).attr('data-go_state');
		if(_go_state == '1'){
			get_ko_state('대한민국');
		}else{
			$('#city_list_box').hide();
			$('#city_list_title').hide();
			$('#country_list_box').show();
			$('#country_list_title').show();
			get_country_list();
		}
	});
	
	$('#selected_cities').on('click','.del_city_btn',function(){
		$(this).parent().parent().remove();
		draw_city_route();
	});
	
	$('#selected_cities').on('mouseover','.del_city_btn',function(){
		let _img_src = $(this).find('img').attr('src');
		let _c_img_src = _img_src.replace('_a.png','_b.png');
		$(this).find('img').attr('src',_c_img_src);
		
	});
	
	$('#selected_cities').on('mouseout','.del_city_btn',function(){
		let _img_src = $(this).find('img').attr('src');
		let _c_img_src = _img_src.replace('_b.png','_a.png');
		$(this).find('img').attr('src',_c_img_src);
		
	});
	
	$('#selected_cities').on('click','.city_set_minus_btn',function(){
		let _now_set = $(this).parent().find('.city_set_day_info span').text();
		if(_now_set == '1'){
			_chg_set = 1;
		}else if(_now_set == '0.5'){
			_chg_set = 0.5;
		}else{
			_chg_set = Number(_now_set) - 1;
		}
		$(this).parent().find('.city_set_day_info span').text(_chg_set);
		$(this).parent().parent().parent().find('.city_set_day_info span').text(_chg_set);
		$(this).parent().parent().parent().attr('data-day',_chg_set);
		total_day_calc();
		
	});
	
	$('#selected_cities').on('click','.city_set_plus_btn',function(){
		let _total_day = $('#selected_cities').attr('data');
		let _now_set = $(this).parent().find('.city_set_day_info span').text();
		if(_now_set == '0.5'){
			_chg_set = 1;
		}else{
			_chg_set = Number(_now_set) + 1;
		}
		$(this).parent().find('.city_set_day_info span').text(_chg_set);
		$(this).parent().parent().parent().attr('data-day',_chg_set);
		total_day_calc();
		
	});
	
	$('#schedule_full_box').on('mouseover','.item',function(){
		var no = $(this).attr('data-no');
		if(markers[no]){
			markers[no].setZIndex(30);
			markers[no].setIcon(img+'/map/marker/ic_current.png');
		}
	});
	$('#schedule_full_box').on('mouseout','.item',function(){
		var no = $(this).attr('data-no');
		if(markers[no]){
			markers[no].setZIndex(0);
			markers[no].setIcon(img+'/map/marker/normal_marker.png');
		}
	});
	
/*	$( function() {
		$( "#sortable" ).sortable();
		$( "#sortable" ).disableSelection();
	} );*/
	
	function initialize() {
		var styles = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}];
		
		var mapOptions = {
				center: new google.maps.LatLng(29.324242, 147.697405),
				zoom: 3,
				mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		map = new google.maps.Map(document.getElementById("map"), mapOptions);
		//    map.setOptions({styles: styles});
		
		get_country_list();
	}
	
	function get_country_list(){
		let _ct_code = $('#cat_menu li.on').attr('data');
		let _ct_name = $('#cat_menu li.on').attr('data-val');
		$('#country_list_title .ct_title').text(_ct_name);
		var data = {'ct_code':_ct_code}
		$.ajax({
			type: "post",
			url: _+"/cont/"+x,
			data : data,
			dataType :"json",
			success: function(data) {
				let html = ''; 
				$.each(data.ls, function(key, val) {
					html += '<div class="item" id="'+val.countryEname+'" data-no="'+key+'" data="'+val.countrySeq+'" data-latlng="'+
					val.countryLat+','+val.countryLng+'" data-val="'+val.countryEname+'" data-name="'+val.countryName+'">';
					html += '<div class="img_box fl"><img src="'+val.IMG_URL+'"/></div>';
					html += '<div class="info_box fl"><div class="info_title">'+val.countryName	+'</div><div class="info_sub_title">'+val.countryEname+'</div></div>';
					html += '<div class="clear"></div></div>';
					add_marker_country(val.countryLat,val.countryLng,val.countryName,val.countryEname,val.countrySeq);
				});
				$('#country_list_box').html(html);
				
			},error:function(data){
			},complete:function(){
				fitBoundsToVisibleMarkers();
			}
		});
	}
	
	function get_city_list(_cu_srl,_cu_name){
		$('#city_list_title .cu_title').text(_cu_name);
		var data = {'ci_cu':_cu_srl,"option":"DETAIL"}
		$.ajax({
			type: "post",
			url: _+"/cont/country/"+_cu_name,
			data : data,
			dataType :"json",
			success: function(data) {
				let html = '';
				$.each(data.ls, function(key, val) {
					html += '<div class="item" data-no="'+key+'" data="'+val.citySeq+'" data-ci_name="'+val.cityName+'" data-lat="'+val.cityLat+'" data-lng="'+val.cityLng+'">';
					html += '<div class="img_box fl"><img src="'+val.imgUrl+'"></div>';
					html += '<div class="info_box fl"><div class="info_title">'+val.cityName+'</div><div class="info_sub_title">'+val.cityEname+'</div></div>';
					html += '<div class="spot_to_inspot"><img src="'+img+'/map/spot_to_inspot_a.png"></div>';
					html += '<div class="clear"></div></div>';
					add_marker_city(val.cityLat,val.cityLng,val.cityName,val.cityEname,val.citySeq);
				});
				$('#city_list_box').html(html);
				
				
			},error:function(data){
			},complete:function(){
				fitBoundsToVisibleMarkers();
			}
		});
	}
	
	function add_marker_country(countryLat, countryLng, countryName, countryEname, countrySeq) {
		var marker_position = new google.maps.LatLng(countryLat,countryLng);
		var marker = new MarkerWithLabel({
			position: marker_position,
			map: map,
			icon: marker_img,
			title: countryName,
			title_en : countryEname,
			cu_srl: countrySeq,
			lat:countryLat,
			lng:countryLng,
			labelContent: countryName,
			labelAnchor: new google.maps.Point(-11, 30),
			labelClass: "labels", // the CSS class for the label
			labelStyle: {opacity: 0.75}
		});
		markers.push(marker);
		google.maps.event.addListener(marker, 'click', function() {
			deleteMarkers();
			$('#country_list_box').hide();
			$('#country_list_title').hide();
			$('#city_list_box').show();
			$('#city_list_title').show();
			if(cu_srl == '205'){
				get_ko_state(cu_name);
			}else{
				get_city_list(cu_srl, cu_name);
			}
		});
		
	}

	function add_marker_city(cityLat, cityLng, cityName, cityEname, citySeq) {
		var marker_position = new google.maps.LatLng(cityLat,cityLng);
		var marker = new MarkerWithLabel({
			position: marker_position,
			map: map,
			icon: marker_img,
			title: cityName,
			title_en : cityEname,
			cu_srl: citySeq,
			lat:cityLat,
			lng:cityLng,
			labelContent: cityName,
			labelAnchor: new google.maps.Point(-11, 30),
			labelClass: "labels", // the CSS class for the label
			labelStyle: {opacity: 0.75}
		});
		markers.push(marker);
		google.maps.event.addListener(marker, 'click', function() {
			let _html = '';
			if(is_state == '1'){
				deleteMarkers();
				//get_ko_city_in_state(citySeq,cityName);
			}else{
				_html = '<div class="s_cities" data-ci="'+citySeq+'" data-day="2" data-lat="'+cityLng+'" data-lng="'+cityLng+'"><div class="city_route_info"><div class="city_distance_info fl">0Km</div><a href="http://flights.earthtory.com" target="_blank"><div class="city_air_search_btn fr">항공검색</div></a><div class="clear"></div></div>';
				_html += '<div class="city_info"><div class="del_city_btn fl"><img src="'+img+'/map/del_city_btn_a.png"></div><div class="fl">'+cityName+'</div>';
				_html += '<div class="fr city_set_day_box"><div class="fl city_set_minus_btn"><img src="'+img+'/map/city_item_minus_btn.png"></div><div class="fl city_set_day_info"><span>2</span>일</div>';
				_html += '<div class="fl city_set_plus_btn"><img src="'+img+'/map/city_item_plus_btn.png"></div><div class="clear"></div></div><div class="clear"></div></div>';
				_html += '</div>';
				$('#selected_cities').append(_html);
				draw_city_route();
			}
		});
		
	}
	
	$('#city_list_box').on('click','.spot_to_inspot',function(){
		let ci_srl = $(this).parent().attr('data');
		let _lat = $(this).parent().attr('data-lat');
		let _lng = $(this).parent().attr('data-lng');
		let ci_name = $(this).parent().attr('data-ci_name');
		let _html ='';
		_html = '<div class="s_cities" data-ci="'+ci_srl+'" data-day="2" data-lat="'+_lat+'" data-lng="'+_lng+'"><div class="city_route_info" id="city_route"><div class="city_distance_info fl">0Km</div><a href="http://flights.earthtory.com" target="_blank"><div class="city_air_search_btn fr">항공검색</div></a><div class="clear"></div></div>';
		_html += '<div class="city_info"><div class="del_city_btn fl"><img src="'+img+'/map/del_city_btn_a.png"></div><div class="fl">'+ci_name+'</div>';
		_html += '<div class="fr city_set_day_box"><div class="fl city_set_minus_btn"><img src="'+img+'/map/city_item_minus_btn.png"></div><div class="fl city_set_day_info"><span>2</span>일</div>';
		_html += '<div class="fl city_set_plus_btn"><img src="'+img+'/map/city_item_plus_btn.png"></div><div class="clear"></div></div><div class="clear"></div></div>';
		_html += '</div>';
		$('#selected_cities').append(_html);
		$('.city_route_info').css("background","url('"+img+"/map/item_route_bg.png') no-repeat 20px 0px");
		draw_city_route();
	});
	
	
	$('#city_list_box').on('click','.item.state',function(){
		_is_state = $(this).attr('data-is_state');
		_ci_srl = $(this).attr('data');
		deleteMarkers();
		_this_st_name = $(this).attr('data-ci_name');
		//get_ko_city_in_state(_ci_srl,_this_st_name);
	});
	
	function add_s_marker(_lat, _lng) {
		var s_marker_img = img+'/map/marker/ic_current.png';

		var marker_position = new google.maps.LatLng(_lat,_lng);
		var marker = new google.maps.Marker({
			position: marker_position,
			map: map,
			icon: s_marker_img,
			lat:_lat,
			lng:_lng,
			zIndex:9999999999999
		});
		s_markers.push(marker);
		
	}
	
	function draw_city_route(){
		$( "#selected_cities" ).sortable({
			revert: false,
			start: function (e, ui) {
				$(ui.placeholder).css('width', 0);
				//$('.city_route_info').hide();
				$(ui.item).find('.city_route_info').hide();
				$(ui.item).css('height','41px');
			},
			change: function (e, ui) {
				$(ui.placeholder).css('width', 'auto');
			},
			stop: function (e, ui){
				$(ui.item).find('.city_route_info').show();
				// $('#selected_cities .s_cities .city_route_info').show();
				$('#selected_cities .s_cities .city_route_info').first().hide();
			},
			placeholder: "ui-state-highlight",
			update: function(event, ui){
				draw_city_route();
			}
		}).disableSelection();
		
		
		s_deleteMarkers();
		
		
		if(markerarray.length > 0){
			wayp.setMap(null);
			markerarray = [];
		}
		
		now_select_city_cnt = $('#selected_cities .s_cities').length;
		console.log('now_select_city_cnt:'+now_select_city_cnt);
		if(now_select_city_cnt > 0){
			$('#select_detail_view_city').attr('style','display:block;').show("slide", { direction: "left" }, 200);
		}else{
			$('#select_detail_view_city').hide("slide", { direction: "left" }, 200);
		}
		
		var i = 0;
		$('#selected_cities .s_cities').each(function() {
			let _lat = $(this).attr('data-lat');
			let _lng = $(this).attr('data-lng');
			let latlng = new google.maps.LatLng(parseFloat(_lat), parseFloat(_lng));
			markerarray.push(latlng);
			let _this_latlng = _lat+','+_lng;
			add_s_marker(_lat, _lng);
			if(i == 0){
				$(this).find('.city_route_info').hide();
			}else{
				$(this).find('.city_route_info').show();
				let _this_distance = distance_calc(_prev_latlng,_this_latlng);
				$(this).find('.city_route_info .city_distance_info').text(_this_distance+'Km');
			}
			_prev_latlng = _lat+','+_lng;
			i++;
		});
		var color='#ff4a4a';
		
		var lineSymbol = {
				path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
		};
		
		wayp = new google.maps.Polyline({
			path: markerarray,
			icons: [{
				icon: lineSymbol,
				repeat:'100px',
				offset: '100%'
			}],
			geodesic: true,
			strokeColor: color,
			strokeOpacity: 1.0,
			strokeWeight: 1.5
		});
		wayp.setMap(map);
		total_day_calc();
	}
	
	function total_day_calc(){
		var _total_day = 0;
		$('#selected_cities .s_cities').each(function() {
			let _this_day = $(this).attr('data-day');
			_total_day = _total_day + Number(_this_day);
		});
		$('#selected_cities').attr('data',_total_day);
	}
	
	function setAllMap(map) {
		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(map);
		}
	}
	
	
	function clearMarkers() {
		setAllMap(null);
	}
	
	
	
	function deleteMarkers() {
		clearMarkers();
		markers = [];
	}
	
	
	function s_setAllMap(map) {
		for (var i = 0; i < s_markers.length; i++) {
			s_markers[i].setMap(map);
		}
	}
	
	
	function s_clearMarkers() {
		s_setAllMap(null);
	}
	
	
	
	function s_deleteMarkers() {
		s_clearMarkers();
		s_markers = [];
	}
	
	function distance_calc(s_latlng,d_latlng){
		var slatlng = s_latlng.split(',');
		let lat1 = slatlng[0];
		let lon1 = slatlng[1];
		var dlatlng = d_latlng.split(',');
		let lat2 = dlatlng[0];
		let lon2 = dlatlng[1];
		var radlat1 = Math.PI * lat1/180
		var radlat2 = Math.PI * lat2/180
		var radlon1 = Math.PI * lon1/180
		var radlon2 = Math.PI * lon2/180
		var theta = lon1-lon2
		var radtheta = Math.PI * theta/180
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		dist = Math.acos(dist)
		dist = dist * 180/Math.PI
		dist = dist * 60 * 1.1515
		dist = dist * 1.609344 
		dist = Math.round(dist*100)/100;
		
		return dist;
		
	}
	
	
	
	function fitBoundsToVisibleMarkers() {
		var bounds = new google.maps.LatLngBounds();
		
		for (var i=0; i<markers.length; i++) {
			if(markers[i].getVisible()) {
				bounds.extend( markers[i].getPosition() );
			}
		}
		
		map.fitBounds(bounds);
		
	}
	
	
	
	function get_ko_state(_cu_name,_cu_ename){
	
		$('#city_list_title .cu_title').text(_cu_ename);
		$.ajax({
			url: _+"/cont/country/"+_cu_name,
			type: "post",
			dataType :"json",
			success: function(data) {
				let html = '';
				$.each(data.ls, function(key, val) {
					
					html += '<div class="item" data-no="'+key+'" data="'+val.citySeq+'" data-ci_name="'+val.cityName+'" data-lat="'+val.cityLat+'" data-lng="'+val.cityLng+'">';
					html += '<div class="img_box fl"><img src="'+val.imgUrl+'"></div>';
					html += '<div class="info_box fl" style="width:140px;"><div class="info_title">'+val.cityName+'</div><div class="info_sub_title">'+val.cityEname+'</div></div>';
					html += '<div class="spot_to_inspot"><img src= "'+img+'/map/spot_to_inspot_a.png"></div>';
					html += '<div class="clear"></div></div>';
					add_marker_city(val.cityLat,val.cityLng,val.cityName,val.cityEname,val.citySeq);
				});
				$('#city_list_box').html(html);
				$('#city_list_title .back_btn').attr('data-go_state','0');
			},error:function(data){
			},complete:function(){
				fitBoundsToVisibleMarkers();
			}
			
		});
		
	}
	
};
	return {init:init,get:get};
	
})();


