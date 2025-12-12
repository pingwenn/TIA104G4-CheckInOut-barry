package com.barry.model;

import jakarta.persistence.*;

@Entity
@Table(name = "product")
public class Product {
	
	@Id // 標記主鍵
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "product_id")
	private Integer productId;
	
	// 產品名稱
	@Column(name = "product_name", nullable = false, length = 100)
	private String productName;
	
	// 產品價格
	@Column(name = "price")
	private Double price;
	
	// 產品庫存
	@Column(name = "stock")
	private Integer stock;
	
	public Product() {
		
	}
	
	public Product(String productName, Double price, Integer stock) {
		this.productName = productName;
		this.price = price;
		this.stock = stock;
	}

	public Product(Integer productId, String productName, Double price, Integer stock) {
		this.productId = productId;
		this.productName = productName;
		this.price = price;
		this.stock = stock;
	}

	public Integer getProductId() {
		return productId;
	}

	public void setProductId(Integer productId) {
		this.productId = productId;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Integer getStock() {
		return stock;
	}

	public void setStock(Integer stock) {
		this.stock = stock;
	}
	
	// 除錯時列印物件資訊
	@Override
	public String toString() {
		return "產品 [編號=" + productId + ", 名稱=" + productName + ", 價格=" + price + ", 庫存=" + stock + "]";
	}
	
}
