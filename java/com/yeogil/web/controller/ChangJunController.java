package com.yeogil.web.controller;

import java.util.List;
import java.util.Map;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.yeogil.web.CmmService;
import com.yeogil.web.Mapper;
import com.yeogil.web.Proxy;
import com.yeogil.web.domain.AirportReturnDTO;
import com.yeogil.web.domain.CountryDTO;
import com.yeogil.web.domain.ImageDTO;
import com.yeogil.web.lambda.IFunction;
import com.yeogil.web.lambda.ISupplier;

@RestController
public class ChangJunController {
	@Autowired CmmService service;
	@Autowired Mapper mapper;
	@Autowired List<CountryDTO> list;
	@Autowired Map<String, Object> map;
	@Autowired AirportReturnDTO ar;
	@Autowired Proxy pxy;
	
	@SuppressWarnings("unchecked")
	@GetMapping("/country/list")
	public Map<?,?> countty() {
		// list = (List<CountryDTO>) service.findAllCountry();
		list = null;
		map.clear();
		map.put("ls",list);
		return map;
	}
	
	@GetMapping("/city/{countryName}/{page}")
	public Map<?,?> citylist(
			@PathVariable String countryName,
			@PathVariable String page) {
		map.clear();
		map.put("srch", countryName);
		map.put("page_num", page);
		map.put("page_size", "5");
		map.put("block_size", "5");
		ISupplier is = () -> mapper.countCities();
		map.put("row_count", is.get());
		pxy.carryOut(map);
		
		IFunction i = (Object o) -> mapper.selectCitiesWithImages(pxy);
		List<?> ls = (List<?>) i.apply(pxy);
		map.clear();
		map.put("ls", ls);
		map.put("pxy", pxy);
		return map;
	}
	
	@GetMapping("/attraction/{countryName}/{page}")
	public Map<?,?> attractionlist(
			@PathVariable String countryName,
			@PathVariable String page) {
		map.clear();
		map.put("srch", countryName);
		map.put("page_num", page);
		map.put("page_size", "5");
		map.put("block_size", "5");
		ISupplier is = () -> mapper.countAttractionsByCountry(countryName);
		map.put("row_count", is.get());
		pxy.carryOut(map);
		
		IFunction i = (Object o) -> mapper.selectAttractions(pxy);
		List<?> ls = (List<?>) i.apply(pxy);
		map.clear();
		map.put("ls", ls);
		map.put("pxy", pxy);
		return map;
	}
	
	@GetMapping("/member/memcount")
	public Map<?,?> memcount() {
		ISupplier is = () -> mapper.countMembers();
		map.clear();
		map.put("memcount", is.get());
		is = () -> mapper.countSchedulesForMember();
		map.put("schecount", is.get());
		
		is = () -> mapper.selectTopCountryTouristPreferenced();
		map.put("top", is.get());
		
		is = () -> mapper.selectCountries();
		map.put("clist", is.get());
		

		
		return map;
	}
	
	@GetMapping("/map/chart")
	public Map<?,?> mapchart() {
		map.clear();
		
		ISupplier is = () -> mapper.countSchedulesForMember();
		map.put("data", is.get());
		return map;
	}
}
