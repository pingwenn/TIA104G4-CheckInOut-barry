package com.admin.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminActionLogService {
	
	@Autowired
	private AdminActionLogRepository repository;
}
