package com.admin.model;

import java.sql.Timestamp;
import javax.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import lombok.Data;

@Data
@Entity
@Table(name = "admin_action_log")
public class AdminActionLog {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "log_id")
	private Long logId;
	
	@Column(name = "admin_id", length = 50, nullable = false)
	private Integer adminId;
	
	@Column(name = "action", length = 50, nullable = false)
	private String action;
	
	@Column(name = "details", length = 255)
	private String details;
	
	@CreationTimestamp
	@Column(name = "timestamp", nullable = false, updatable = false)
	private Timestamp timestamp;

}
