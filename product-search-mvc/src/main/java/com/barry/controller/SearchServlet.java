package com.barry.controller;

import java.io.IOException;
import java.util.List;

import com.barry.model.Product;
import com.barry.model.ProductDAO;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/search")  // 告訴Tomcat這個servlet要處理/search的URL請求
public class SearchServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	// Model的DAO
	private ProductDAO productDAO;
	
	@Override  // 初始化方法;Servlet被建立時執行初始化資料
	public void init() throws ServletException {
		this.productDAO = new ProductDAO();
	}
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		String searchKeyword = request.getParameter("keyword");
		List<Product> productList = null;

		if (searchKeyword != null && !searchKeyword.trim().isEmpty()) {
			System.out.println("Controller: 正在查詢關鍵字 " + searchKeyword);
			productList = productDAO.searchProductsByName(searchKeyword.trim());
		}

		request.setAttribute("product", productList);
		request.setAttribute("searchPerformed", true);
		request.setAttribute("searchKeyword", searchKeyword);
		request.getRequestDispatcher("/productSearchForm.jsp").forward(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}
	
}
