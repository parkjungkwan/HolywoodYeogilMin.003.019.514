package com.yeogil.web.domain;

import org.springframework.stereotype.Component;

import lombok.Data;

@Data @Component
public class CityDTO {
	private String citySeq,cityName,cityEname,cityLat,cityLng,imgName,imgUrl,countryEname;
}
