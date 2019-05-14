"use strict";
var admin = admin || {}
admin = (()=>{
	let _, js, css, img, compojs;
	let ext= x =>{
		admin.$.ext(x);
	};
	let init = ()=>{
		_ = $.ctx();
		js = $.js();
		css = $.css();
		img = $.img();
		compojs = js+'/comp/compo.js';
		onCreate();
	};
	let onCreate=()=>{
		setContentView();
	};
	
	let setContentView =()=>{
		$.getJSON(_+"/member/memcount",d=>{
			$('#f_temp').empty();
			// 첫번째 박스 보여주는곳
			$('<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">'
					+'<div class="info-box blue-bg">'
					+'<img src="https://img.insight.co.kr/static/2017/08/24/700/o1970r670o9gfyx65u94.jpg" alt="" style="width:70px;height: 60px">'
					+'<div class="count">'+d.memcount+'</div>'
					+'<div class="title">회원수</div>'
					+'</div></div>').appendTo('#f_temp');
			$('<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">'
					+'<div class="info-box blue-bg">'
					+'<img src="https://pbs.twimg.com/media/DmHLWIUU0AENizD.jpg" alt="" style="width:70px;height: 60px">'
					+'<div class="count">'+d.schecount+'</div>'
					+'<div class="title">저장된 일정수</div>'
					+'</div></div>').appendTo('#f_temp');
			
			$('<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">'
					+'<div class="info-box green-bg">'
					+'<img src="'+d.top.countryFlag+'" alt="" style="width:70px;height: 60px">'
					+'<div class="count">'+d.top.countryName+'</div>'
					+'<div class="title">1등 여행지</div>'
					+'</div></div>').appendTo('#f_temp');
			
			//나라 등록된 순위 더미값을 통해서 통계 내야한다.
			
			$.each(d.clist,(i,j)=>{
				$('<tr><td><img src='+j.countryFlag+' style="height:18px; margin-top:-2px;"></td>'
						+'<td>'+j.countryName+'</td>'
						+'<td>'+j.countryCount+'</td>'
						+'<td><div class="progress thin">'
						+'<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="" aria-valuemin="0" aria-valuemax="100" style="width: '+Math.round((j.countryCount/d.schecount)*100)+'%">'+Math.round((j.countryCount/d.schecount)*100)+'%</div>'
						+'<div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="" aria-valuemin="0" aria-valuemax="100" style="width: '+Math.round((((j.countryCount/d.schecount)*100)-100)*-1)+'%"></div>'
						+'</div></td></tr>').appendTo('#rank_list');
			});
		});
		
		$.getJSON(_+'/map/chart',d=>{
			let mapdata=[];
			$.each(d.data,(i,j)=>{
				mapdata.push({"name":j.countryName,"id":j.countryCode,"value":j.msCount, "color": "#ff2d55"}) ;
			});
			word_map_chart(mapdata);
		});
		
		$('#cj_home').click(()=>{
			location.assign($.ctx());
		});
	};
	let word_map_chart = (mapData)=>{
		am4core.ready(function() {
			let latlong = js+'/latlong.json';
			$.getJSON(latlong,(d)=>{
				// Themes begin
				am4core.useTheme(am4themes_animated);
				// Themes end

				// Create map instance
				var chart = am4core.create("map", am4maps.MapChart);

				var title = chart.titles.create();
				title.text = "[bold font-size: 20]Yeogil Mapchart since 2019";
				title.textAlign = "middle";
				// Add lat/long information to data
				for(var i = 0; i < mapData.length; i++) {
					mapData[i].latitude = d[mapData[i].id].latitude;
					mapData[i].longitude = d[mapData[i].id].longitude;
				}
				// Set map definition
				chart.geodata = am4geodata_worldLow;

				// Set projection
				chart.projection = new am4maps.projections.Miller();

				// Create map polygon series
				var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
				polygonSeries.exclude = ["AQ"];
				polygonSeries.useGeodata = true;
				polygonSeries.nonScalingStroke = true;
				polygonSeries.strokeWidth = 0.5;

				var imageSeries = chart.series.push(new am4maps.MapImageSeries());
				imageSeries.data = mapData;
				imageSeries.dataFields.value = "value";

				var imageTemplate = imageSeries.mapImages.template;
				imageTemplate.propertyFields.latitude = "latitude";
				imageTemplate.propertyFields.longitude = "longitude";
				imageTemplate.nonScaling = true

				var circle = imageTemplate.createChild(am4core.Circle);
				circle.fillOpacity = 0.7;
				circle.propertyFields.fill = "color";
				circle.tooltipText = "{name}: [bold]{value}[/]";

				imageSeries.heatRules.push({
				  "target": circle,
				  "property": "radius",
				  "min": 0.5,
				  "max": 10,
				  "dataField": "value"
				})
			});
		}); // end am4core.ready()
	};
	return {init:init,ext:ext};
})();

admin.$= {
		ext: (x)=>{
			$.getScript(x+'/resources/js/router.js',()=>{
				$.extend(new Session(x));
				admin.init();
			})
		}
};



