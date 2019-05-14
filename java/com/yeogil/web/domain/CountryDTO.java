package com.yeogil.web.domain;

import org.springframework.stereotype.Component;

import lombok.Data;

@Data @Component
public class CountryDTO {
	private String countrySeq,countryName,countryEname,continentName,countryLat,countryLng,countryFlag,countryCount;
}
