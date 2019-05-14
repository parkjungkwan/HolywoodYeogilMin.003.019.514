package com.yeogil.web.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.yeogil.web.CmmService;
import com.yeogil.web.domain.ExchangeMoney;
import com.yeogil.web.domain.HotelDTO;
import com.yeogil.web.domain.ImageDTO;
import com.yeogil.web.domain.WeatherDTO;

@RestController
public class CrawlController {

	@Autowired Map<String, Object> map;
	@Autowired CmmService service;
	@Autowired ImageDTO img;
	@Autowired ExchangeMoney em;
	
	
	@GetMapping("/crawling/weather")
	public Map<?, ?> weathercrawling() throws Exception {

		// 1. URL 선언
		String weather = "https://www.google.com/search?q=타이베이+날씨";
		String exchange = "https://www.google.com/search?q=대만환율";
		// 2. weather 가져오기
		Connection conn = Jsoup.connect(weather).header("Content-Type", "application/json;charset=UTF-8")
				.method(Connection.Method.GET).ignoreContentType(true);

		String el = conn.get().select("#wob_tm").text();

		// 날씨 days
		Elements el1 = conn.get().select(".wob_df");
		List<WeatherDTO> wlist = new ArrayList<>();
		for (Element s : el1) {
			WeatherDTO w = new WeatherDTO();
			String[] a = s.select(".vk_lgy").text().split(" ");
			w.setDay(a[0]);
			String b = s.select("img").attr("src");
			w.setImgUrl(b);
			String h = s.select(".vk_gy").first().text().substring(0, 2);
			w.setHtem(h);
			String[] l = s.select(".wob_t").text().split(" ");
			w.setLtem(l[2]);
			wlist.add(w);
		}

		String nowimg = conn.get().select("#wob_tci").attr("src");

		// 환율
		conn = Jsoup.connect(exchange).header("Content-Type", "application/json;charset=UTF-8")
				.method(Connection.Method.GET).ignoreContentType(true);
		String money = conn.get().select("#knowledge-currency__tgt-amount").text();
		double taim = 1, kom = Double.parseDouble(money);

		em.setKor(kom);
		em.setTai(taim);
		map.clear();
		map.put("e", em);
		map.put("wlist", wlist);
		map.put("el", el);
		map.put("nowimg", nowimg);
		return map;
	}

	@GetMapping("/crawling/country")
	public Map<?, ?> country() throws Exception {
		String countryimg = "https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=대만";
		String countryDetail = "https://namu.wiki/w/대만";
		String exchange = "https://www.google.com/search?q=대만환율";

		Connection conn = Jsoup.connect(countryimg).header("Content-Type", "application/json;charset=UTF-8")
				.method(Connection.Method.GET).ignoreContentType(true);
		String imgurl = conn.get().select(".img_naflag img").attr("src");

		conn = Jsoup.connect(countryDetail).header("Content-Type", "application/json;charset=UTF-8")
				.method(Connection.Method.GET).ignoreContentType(true);
		String detailtext = conn.get().select(".wiki-heading-content").text().substring(0, 250);

		conn = Jsoup.connect(exchange).header("Content-Type", "application/json;charset=UTF-8")
				.method(Connection.Method.GET).ignoreContentType(true);
		String money = conn.get().select("#knowledge-currency__tgt-amount").text();

		double taim = 1, kom = Double.parseDouble(money);

		em.setKor(kom);
		em.setTai(taim);
		map.clear();
		map.put("c", imgurl);
		map.put("t", detailtext);
		map.put("u", countryDetail);
		map.put("e", em);

		return map;
	}

	@GetMapping("/crawling/topCtry")
	public Map<?, ?> topCity() throws Exception {
		String topCtry = "https://www.stubbyplanner.com";
		Connection conn = Jsoup.connect(topCtry).header("Content-Type", "application/json;charset=UTF-8")
				.method(Connection.Method.GET).ignoreContentType(true);
		Document doc = conn.get();
		Elements el = doc.select(".grid-item--height3");

		List<ImageDTO> list = new ArrayList<ImageDTO>();
		list.clear();
		map.clear();
		for (Element element : el) {
			ImageDTO img = new ImageDTO();
			String topImgUrl = element.select("img").attr("data-src");
			img.setImgUrl(topImgUrl);
			String topName = element.select("div div font").text();
			img.setImgName(topName);
			map.clear();
			list.add(img);
		}

		map.put("ls", list);
		return map;
	}
	
	  @PostMapping("/crawling/hvation")
	  public Map<?, ?> hvation(
			  @RequestBody Map<String, String> param) throws Exception { 
	  
	  String hotelimg = "https://www.booking.com/searchresults.ko.html?aid=376440&label=bdot-SIcScZhJX6z_*YtUYg62hwS267777897793%3Apl%3Ata%3Ap1%3Ap22%2C347%2C000%3Aac%3Aap1t1%3Aneg%3Afi%3Atikwd-325272469656%3Alp1009871%3Ali%3Adec%3Adm&sid=b6dbc68cd60ad07bc4e658438e804c14&sb=1&src=searchresults&src_elem=sb&error_url=https%3A%2F%2Fwww.booking.com%2Fsearchresults.ko.html%3Faid%3D376440%3Blabel%3Dbdot-SIcScZhJX6z_%252AYtUYg62hwS267777897793%253Apl%253Ata%253Ap1%253Ap22%252C347%252C000%253Aac%253Aap1t1%253Aneg%253Afi%253Atikwd-325272469656%253Alp1009871%253Ali%253Adec%253Adm%3Bsid%3Db6dbc68cd60ad07bc4e658438e804c14%3Btmpl%3Dsearchresults%3Bcheckin_month%3D5%3Bcheckin_monthday%3D13%3Bcheckin_year%3D2019%3Bcheckout_month%3D5%3Bcheckout_monthday%3D17%3Bcheckout_year%3D2019%3Bcity%3D-2637882%3Bclass_interval%3D1%3Bdest_id%3D-2637882%3Bdest_type%3Dcity%3Bdtdisc%3D0%3Bfrom_sf%3D1%3Bgroup_adults%3D2%3Bgroup_children%3D0%3Binac%3D0%3Bindex_postcard%3D0%3Blabel_click%3Dundef%3Bno_rooms%3D1%3Boffset%3D0%3Bpostcard%3D0%3Broom1%3DA%252CA%3Bsb_price_type%3Dtotal%3Bshw_aparth%3D1%3Bslp_r_match%3D0%3Bsrc%3Dsearchresults%3Bsrc_elem%3Dsb%3Bsrpvid%3D29e20872e80a0121%3Bss%3D%25ED%2583%2580%25EC%259D%25B4%25EB%25B2%25A0%25EC%259D%25B4%3Bss_all%3D0%3Bssb%3Dempty%3Bsshis%3D0%3Bssne%3D%25ED%2583%2580%25EC%259D%25B4%25EB%25B2%25A0%25EC%259D%25B4%3Bssne_untouched%3D%25ED%2583%2580%25EC%259D%25B4%25EB%25B2%25A0%25EC%259D%25B4%26%3B&ss=%ED%83%80%EC%9D%B4%EB%B2%A0%EC%9D%B4&is_ski_area=0&ssne=%ED%83%80%EC%9D%B4%EB%B2%A0%EC%9D%B4&ssne_untouched=%ED%83%80%EC%9D%B4%EB%B2%A0%EC%9D%B4&city=-2637882&checkin_year=2019&checkin_month=6&checkin_monthday=3&checkout_year=2019&checkout_month=6&checkout_monthday=7&group_adults=2&group_children=0&no_rooms=1&from_sf=1";
	  
	  Connection conn =
	   Jsoup.connect(hotelimg).header("Content-Type", "application/json;charset=UTF-8")
	  .method(Connection.Method.POST).ignoreContentType(true);
	  
	  Elements httext1 = conn.get().select(".sr_item");
	  List<HotelDTO> htlist = new ArrayList<>();
	  HotelDTO htdto = null;
	  //asdf
	  for (Element s : httext1) {
		  htdto = new HotelDTO();
		  /*IMAGE*/
		  String imgurl = s.select(".hotel_image").attr("src");
		  htdto.setImgUrl(imgurl);
		  /*NAME*/
		  String deptime1 = s.select(".sr-hotel__name").text();
		  htdto.setHotelName(deptime1);
		  /*ROOMTYPE*/
		  String sold = s.select(".room_link").text();
		  htdto.setRoomType(sold);
		  /*NOTICE*/
		  String notice = s.select(".fe_banner__title").text();
		  htdto.setNotice(notice);
		  /*PRICE*/
		  String hprice = s.select(".animated strong b").text();
		  htdto.setPrice(hprice);
		  htlist.add(htdto); 
	  }
	  map.clear();
	  map.put("htlist", htlist);
	  return map; 
	  }
}