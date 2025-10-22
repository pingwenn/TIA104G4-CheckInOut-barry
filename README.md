# TIA104G4-CheckInOut 管理員系統

## 專案簡介
此專案為一個功能完善的管理員系統，旨在提供後台管理人員便捷地管理網站各項資料與權限。作為我在六個月後端 Java 密集學習後的實戰成果，我獨立負責了本系統的前後端開發，從系統架構設計到功能實作，全面應用所學知識。

## 核心功能
本管理員系統提供以下主要功能，以確保網站營運的順暢與資料的安全性：
*   **權限管理：** 精細化管理各級管理員的資料存取與操作權限。
*   **管理員資料管理：** 增刪修查管理員帳號與基本資料。
*   **會員與業者基本資料管理：** 檢視、編輯會員與業者詳細資訊。
*   **業者資料與房型審核：** 處理業者提交的資料及房型資訊的審核流程。
*   **最新消息發布：** 透過後台介面即時發布網站最新消息至官網。
*   **優惠券發放：** 管理與發放各類優惠券，支援行銷活動。

## 技術棧

### 後端 (Backend)
*   **語言：** Java 17
*   **核心框架：** Spring Boot 2.7.0
    *   **Web 開發：** Spring Boot Starter Web
    *   **資料持久層：** Spring Data JPA, Hibernate
    *   **資料庫：** MySQL 
    *   **開發工具：** Lombok, Spring Boot DevTools
    *   **JSON 處理：** org.json, Gson
    *   **物件映射：** MapStruct 
    *   **資料驗證：** JSR 303/349/380 Bean Validation 
*   **建置工具：** Maven

### 前端 (Frontend)
*   **模板引擎：** Thymeleaf 
*   **核心技術：** HTML5, CSS3, JavaScript 

## 開發環境
*   **JDK 版本：** Java Development Kit 17
*   **IDE：** Eclipse
*   **資料庫工具：** MySQL Workbench, DBeaver

## 專案設定與啟動

### 1. 資料庫設定
*   請確保您的 MySQL 資料庫已啟動。
*   建立一個名為 `checkinout` 的資料庫。
*   修改 `src/main/resources/application.properties` 中的資料庫連線資訊，確保 `spring.datasource.username` 和 `spring.datasource.password` 與您的 MySQL 設定相符。
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/checkinout?serverTimezone=Asia/Taipei
    spring.datasource.username=root
    spring.datasource.password=123456
    spring.jpa.hibernate.ddl-auto=update
    ```
    (註：`spring.jpa.hibernate.ddl-auto=update` 會在應用程式啟動時自動更新資料庫結構，開發階段方便，生產環境請謹慎使用或改為 `validate` 或 `none`)

### 2. Redis 設定
*   請確保您的 Redis 服務已啟動。

### 3. 郵件服務設定
*   若需使用郵件發送功能，請在 `application.properties` 中配置您的 Gmail 帳號資訊。
    ```properties
    spring.mail.host=smtp.gmail.com
    spring.mail.port=587
    spring.mail.username=您的Gmail帳號
    spring.mail.password=您的應用程式密碼 (或真實密碼，不建議)
    spring.mail.properties.mail.smtp.auth=true
    spring.mail.properties.mail.smtp.starttls.enable=true
    spring.mail.properties.mail.smtp.ssl.trust=smtp.gmail.com
    ```
    (註：若使用 Gmail，建議使用應用程式密碼而非真實密碼，以提高安全性。)

### 4. 啟動應用程式
*   **使用 Maven 啟動：**
    在專案根目錄下執行：
    ```bash
    mvn spring-boot:run
    ```
*   **使用 IDE 啟動：**
    在您的 IDE 中找到 `TIA104G4CheckInOutApplication.java` (或類似名稱的主應用程式類)，右鍵執行 `main` 方法。

## 專案貢獻
本專案管理員系統由 Barry 獨立開發與維護。

## 學習與成長
透過此專案，我深入理解並實踐了 Spring Boot 生態系統的各個組件，包括 Web 開發、資料庫整合 (JPA/Hibernate)以及前端模板渲染 (Thymeleaf)。這六個月的學習與實作，極大地提升了我的後端 Java 開發能力，並讓我對全端開發流程有了更全面的掌握。

