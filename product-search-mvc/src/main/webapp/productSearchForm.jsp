<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>產品搜尋</title>
</head>
<body>

    <h2>產品搜尋</h2>

    <form action="search" method="get">
        <input type="text" name="keyword" />
        <input type="submit" value="Search" />
    </form>

    <hr/>

    <h3>搜尋結果:</h3>
    <table border="1">
        <tr>
            <th>編號</th>
            <th>名稱</th>
            <th>價格</th>
			<th>庫存</th>
        </tr>
        <c:forEach var="product" items="${product}">
            <tr>
                <td>${product.productId}</td>
                <td>${product.productName}</td>
                <td>${product.price}</td>
				<td>${product.stock}</td>
            </tr>
        </c:forEach>
    </table>

</body>
</html>
