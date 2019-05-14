package com.yeogil.web.domain;

import org.springframework.stereotype.Component;

import lombok.Data;

@Component @Data
public class ScheduleDTO {
	private int sche_seq,continetn_seq,member_seq,ms_seq;
	private String ctr,startDate,city,planTitle,member_id,day,endDate,countryName;
}
