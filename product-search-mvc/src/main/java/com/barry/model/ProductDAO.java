package com.barry.model;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ProductDAO {
	
	private static final String JDBC_URL = "jdbc:mysql://localhost:3308/java_db?serverTimezone=Asia/Taipei";
	private static final String USER = "root";
	private static final String PASSWORD = "password";
	
	public List<Product> searchProductsByName(String keyword){
		List<Product> products = new ArrayList<>();
			try (Connection conn = DriverManager.getConnection(JDBC_URL, USER, PASSWORD);
				PreparedStatement pstmt = conn.prepareStatement("SELECT product_id, product_name, price, stock FROM product WHERE product_name LIKE ?")){
				pstmt.setString(1, "%" + keyword + "%");
				
				ResultSet rs = pstmt.executeQuery();
				while (rs.next()) {
					Product product = new Product(
						rs.getInt("product_id"),
						rs.getString("product_name"),
						rs.getDouble("price"),
						rs.getInt("stock")
					);
					products.add(product);				
				}
			} catch(SQLException e) {
				e.printStackTrace();
			}
			return products;
	} 
	}

