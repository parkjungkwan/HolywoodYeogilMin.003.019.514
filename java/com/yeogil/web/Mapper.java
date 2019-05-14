package com.yeogil.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.yeogil.web.domain.AirportInfoDTO;
import com.yeogil.web.domain.AirportLeaveDTO;
import com.yeogil.web.domain.AirportReturnDTO;
import com.yeogil.web.domain.ArticleDTO;
import com.yeogil.web.domain.AttractionDTO;
import com.yeogil.web.domain.CityDTO;
import com.yeogil.web.domain.ContinentDTO;
import com.yeogil.web.domain.CountryDTO;
import com.yeogil.web.domain.HotelDTO;
import com.yeogil.web.domain.ImageDTO;
import com.yeogil.web.domain.MemberDTO;
import com.yeogil.web.domain.MemschAttrDTO;
import com.yeogil.web.domain.MemschCityDTO;
import com.yeogil.web.domain.MemschDTO;
import com.yeogil.web.domain.RestaurantDTO;
import com.yeogil.web.domain.ScheduleDTO;
import com.yeogil.web.domain.ShoppingDTO;

@Repository
public interface Mapper {
	// Airport
	public void createAirport(AirportLeaveDTO aldto);
	public List<AirportLeaveDTO> selectDepartureAirports();
	public List<AirportReturnDTO> selectArrivalAirports();
	// AttractionMapper
	public int countAttractionsByCountry(String countryName);
	public List<AttractionDTO> selectAttractions(Proxy pxy);
	// CityMapper
	public List<CityDTO> selectCitiesWithImagesByCountry(String countryName);
	public int countCities();
	public List<CityDTO> selectCitiesWithImages(Proxy pxy);
	public List<CityDTO> selectCitiesByCountry(String countryName);
	// Country
	public List<?> selectCountries();
	public List<?> selectCountriesWithImages(Proxy pxy);
	public int countCountries();
	public List<?> selectCountriesTouristPreferenced();
	public CountryDTO selectTopCountryTouristPreferenced();
	
	// Hotel
	public void insertHotel(HotelDTO htdto);
	// Image
	public ImageDTO selectImage(ImageDTO img);
	// Member
	public void insertMember(MemberDTO mem);
	public boolean existMember(MemberDTO mem);
	public void updateMember(MemberDTO mem);
	public int countMembers();
	
	// Schedule
	public List<MemschDTO> selectSchedulesForMember();
	public int countSchedulesForMember();
	public void insertSchedule(ScheduleDTO sch);
	public void insertSchedule2(MemschCityDTO mem);
	public void insertSchedule3(MemschAttrDTO mem);
	public int countSchedules();
	public List<ScheduleDTO> selectSchedulesGroupByCity(Proxy pxy);
	public List<ScheduleDTO> selectSchedulesByTitle(Proxy pxy);
	public List<ScheduleDTO> selectSchedulesByUserid(String id);
	public List<AttractionDTO> selectAttractionsBySchedule(ScheduleDTO attr);
}
