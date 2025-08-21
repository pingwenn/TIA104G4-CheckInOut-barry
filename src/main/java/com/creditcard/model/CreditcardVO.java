package com.creditcard.model;

import javax.persistence.*;
import javax.validation.constraints.*;

import com.member.model.MemberVO;
import com.order.model.OrderVO;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "creditcard")
public class CreditcardVO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "creditcard_id")
    private int creditcardId;

    @NotNull(message ="請輸入卡片名稱")
    @Column(name = "creditcard_name", length = 30)
    private String creditcardName;

    @NotNull(message ="請輸入卡號")
    @Size(min = 16, max = 16, message="請輸入16碼數字")
    @Column(name = "creditcard_num", unique = true)
    private String creditcardNum;

    @NotNull(message ="請輸入安全碼")
    @Size(min = 3, max = 6, message="請輸入3-6碼數字")
    @Column(name = "creditcard_security")
    private String creditcardSecurity;

    @NotNull(message ="請輸入期限")
    @Size(min = 4, max = 4, message="請輸入4碼期限")
    @Column(name = "expiry_date")
    private String expiryDate;
    
    //連接到會員，多對一
    @NotNull(message ="必須配對一名會員")
    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private MemberVO member;
    
    //連接到訂單，一對多
    @OneToMany(mappedBy = "creditcard", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrderVO> orderVO;
        
	public CreditcardVO() {
	}

	public int getCreditcardId() {
		return creditcardId;
	}

	public void setCreditcardId(int creditcardId) {
		this.creditcardId = creditcardId;
	}

	public String getCreditcardName() {
		return creditcardName;
	}

	public void setCreditcardName(String creditcardName) {
		this.creditcardName = creditcardName;
	}

	public String getCreditcardNum() {
		return creditcardNum;
	}

	public void setCreditcardNum(String creditcardNum) {
		this.creditcardNum = creditcardNum;
	}

	public String getCreditcardSecurity() {
		return creditcardSecurity;
	}

	public void setCreditcardSecurity(String creditcardSecurity) {
		this.creditcardSecurity = creditcardSecurity;
	}

	public String getExpiryDate() {
		return expiryDate;
	}

	public void setExpiryDate(String expiryDate) {
		this.expiryDate = expiryDate;
	}

	public MemberVO getMember() {
		return member;
	}

	public void setMember(MemberVO member) {
		this.member = member;
	}
    
	public void setCreditcardInfo(String creditcardName, String creditcardNum, String creditcardSecurity,
			String expiryDate, MemberVO member) {
		this.creditcardName = creditcardName;
		this.creditcardNum = creditcardNum;
		this.creditcardSecurity = creditcardSecurity;
		this.expiryDate = expiryDate;
		this.member = member;
	}

}