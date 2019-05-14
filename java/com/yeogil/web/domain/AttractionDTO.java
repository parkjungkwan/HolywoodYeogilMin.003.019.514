package com.yeogil.web.domain;

import org.springframework.stereotype.Component;

import lombok.Data;

@Data @Component
public class AttractionDTO {
	private String attrSeq,attrName
	,attrEname,attrLat,attrLng,cityName,cityEname,attrImg,countryName;
}
