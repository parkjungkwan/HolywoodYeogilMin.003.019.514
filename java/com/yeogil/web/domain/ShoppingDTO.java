package com.yeogil.web.domain;

import org.springframework.stereotype.Component;

import lombok.Data;

@Data @Component
public class ShoppingDTO {
	private String storeSeq,position,storeName;
}
