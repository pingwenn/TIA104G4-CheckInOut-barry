package com.creditcard.model;

import java.util.List;
import java.util.Optional;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("CreditcardService")
public class CreditcardService {

	@Autowired
	CreditcardRepository repository;

	@Autowired
	private SessionFactory sessionFactory;
	
	@Transactional
	public CreditcardVO addCreditCardAndGet(CreditcardVO creditcardVo) {
		return repository.save(creditcardVo);
	}
	@Transactional
	public void addCreditCard(CreditcardVO creditcardVo) {
		repository.save(creditcardVo);
	}

	@Transactional
	public void updateCreditCard(CreditcardVO creditcardVo) {
		repository.save(creditcardVo);
	}

	public CreditcardVO queryCreditCard(Integer creditcardId) {
		Optional<CreditcardVO> optional = repository.findById(creditcardId);
		return optional.orElse(null);  
	}
  
	public List<CreditcardVO> findCreditcardByMemberId(Integer memberId) {
		return repository.findByMemberMemberId(memberId); 
	}

	public List<CreditcardVO> getAll() {
		return repository.findAll();
	}

}
