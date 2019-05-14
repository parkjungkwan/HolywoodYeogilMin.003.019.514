package com.yeogil.web.domain;

import org.springframework.stereotype.Component;

import lombok.Data;

@Component @Data
public class ArticleDTO {
	private String title,content;
	private int article_seq,member_seq;
}
