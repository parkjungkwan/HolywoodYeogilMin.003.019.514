package com.yeogil.web.controller;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.yeogil.web.Mapper;
import com.yeogil.web.Proxy;
import com.yeogil.web.TxService;
import com.yeogil.web.domain.AttractionDTO;
import com.yeogil.web.domain.CityDTO;
import com.yeogil.web.domain.CountryDTO;
import com.yeogil.web.domain.MemschAttrDTO;
import com.yeogil.web.domain.MemschCityDTO;
import com.yeogil.web.domain.ScheduleDTO;
import com.yeogil.web.lambda.IFunction;

@RestController
public class JiwooController {
	@Autowired Proxy pxy;
	@Autowired List<CountryDTO> list;
	@Autowired List<CityDTO> list2;
	@Autowired List<AttractionDTO> schList;
	@Autowired Map<String,Object> map;
	@Autowired ScheduleDTO schedule;
	@Autowired MemschAttrDTO attr;
	@Autowired Mapper mapper;
	@Autowired MemschCityDTO mcdto;
	@Autowired TxService txService;
	
	@SuppressWarnings("unchecked")
	@PostMapping("/cont/{continentName}")
	public Map<?,?> countrylist1(@PathVariable String continentName) {
		map.clear();
		map.put("srch", continentName);
		map.put("page_size", "5");
		map.put("block_size", "5");
		map.put("row_count", 5);
		pxy.carryOut(map);
		list = (List<CountryDTO>) mapper.selectCountriesWithImages(pxy);
		map.clear();
		map.put("ls",list);
		return map;
	}
	
	@PostMapping("/cont/country/{countryName}")
	public Map<?,?> citylist(@PathVariable String countryName) {
		
		IFunction i = (Object o) -> mapper.selectCitiesWithImagesByCountry(countryName);
		List<?> ls = (List<?>) i.apply(countryName);
		
		map.clear();
		map.put("ls",ls);
        
		return map;
	}
	
	
	@PostMapping("/myplan/schedule/{memberid}")
	public Map<?,?> storelist(
			@PathVariable String memberid,
			@RequestBody ScheduleDTO sche
			) throws Exception{
		String ctr = sche.getCtr();
        String planTitle = sche.getPlanTitle();
        
        schedule.setCtr(ctr);
        schedule.setPlanTitle(planTitle);
        schedule.setMember_id(memberid);
        //map = transactionservice.txinsert(schedule);
        
		

		return map;
	}
}
