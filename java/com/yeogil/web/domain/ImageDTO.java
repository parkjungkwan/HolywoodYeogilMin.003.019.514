package com.yeogil.web.domain;

import org.springframework.stereotype.Component;

import lombok.Data;

@Data @Component
public class ImageDTO {
	private String imgName, imgUrl;
}
