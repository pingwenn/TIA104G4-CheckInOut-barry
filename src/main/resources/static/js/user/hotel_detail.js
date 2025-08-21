let hotelId = window.location.pathname.split('/')[3];
let temp = {};


// 當文件載入完成後執行初始化
$(document).ready(function () {
    const today = new Date();

    // 點擊日期範圍顯示區域時切換日曆的顯示狀態
    $('#date-range').on('click', function (e) {
        e.stopPropagation();
        const $calendar = $('#calendar-wrapper');
        $calendar.toggleClass('d-none');
    });

    // 點擊日曆和日期範圍顯示區域以外的地方時關閉日曆
    $(document).on('click', function (e) {
        if (!$(e.target).closest('#calendar-wrapper, #date-range').length) {
            $('#calendar-wrapper').addClass('d-none');
        }
    });

    fetchHotelInfo();
    fetchHotelInventory();

    $('.room').find('.plus').on('click', clickOnNum);
    $('.room').find('.minus').on('click', clickOnNum);
    $('.people').find('.plus').on('click', clickOnNum);
    $('.people').find('.minus').on('click', clickOnNum);
    $('#search-button').on('click', (e) => {
        $('#start_date, #end_date, #room_num, #people_num').trigger('change');
        if (
            $('#start_date').text() != "" &&
            $('#end_date').text() != "" &&
            $('#room_num').val() != "" &&
            $('#people_num').val() != ""
        ) {
            updateSearchResult();
        } else {
            showModal("請輸入完整資訊");
        }
    })

    // 點擊送出按鈕時的處理
    $(document).on('click', '.orderBtn', function (e) {
        temp.roomTypeId = $(this).attr("id").replace('btn', "");
        temp.roomTypeName = $(this).closest('.col-md-8').find('.card-title').text();
        temp.review = $('#rating').text() == "" ? 0 : $('#rating').text();
        temp.price = $(this).closest('div').find('.price').text().trim().replace("NTD$", "");
        temp.breakfast = $(this).closest('div').find('.breakfast').hasClass('d-none') ? 0 : 1;
        console.log(temp);
        addCart();
    });
});

function addCart() {
    return $.ajax({
        url: '/booking/api/addCart',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(temp),
        success: function (data) {
            console.log(data);
            getCartLength();
            showModal("已加入購物車");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('AJAX 請求發生錯誤:', textStatus, errorThrown);
            console.log('響應文本:', jqXHR.responseText);
            console.log(jqXHR.responseJSON.overlapDate);
            if (jqXHR.responseJSON.dateMismatch) {
                showModal(jqXHR.responseJSON.message);
            }
        }
    });

}

function clickOnNum(e) {
    let num = $(this).siblings("input[type='text']");
    let currentVal = parseInt(num.val());
    if (!currentVal) currentVal = 0;
    if ($(this).hasClass('plus')) {
        if (currentVal >= 10) {
            showModal("數量不能大於10");
            currentVal = 10;
        } else {
            num.val(currentVal + 1);
        }
    } else if ($(this).hasClass('minus') && currentVal > 1) {
        num.val(currentVal - 1);
    }
    if ($('#room_num').val() > $('#people_num').val() && $('#people_num').val() != "" && $('#room_num').val() != "") {
        showModal("房數大於入住人數，請重新輸入");
        $('#room_num').val($('#people_num').val());
    }
}



function putHotelCarousel(num) {
    for (let i = 0; i < num; i++) {
        let src = `/booking/api/image/hotel/${hotelId}/${i}`;
        let html = `
        <div class="carousel-item">
            <img src="${src}" class="d-block w-100 img-fluid" alt="Hotel Image ${num}">
        </div>
        `;
        $('.hotel-carousel').append(html);
    }
    $('.carousel-item').eq(0).addClass("active");
}

function putRoomCarousel(roomId, num) {
    let id = "#room-carousel" + roomId;
    for (let i = 0; i < num; i++) {
        let src = `/booking/api/image/room/${roomId}/${i}`;
        let html = `
        <div class="carousel-item">
            <img src="${src}" class="d-block w-100" alt="Hotel Image ${num}">
        </div>
        `;
        $(id).append(html);
    }
    $(id).find('.carousel-item').eq(0).addClass('active');
}



function hotelInfoUpdate(data) {
    $('.hotel_title').text(data.name);
    $('.hotel_address').text(data.city + data.district + data.address);
    $('.hotel_info').text(data.info);
    $('.review-container').html("");
    temp.hotelId = hotelId;
    temp.hotelName = data.name;
    if (data.avgRatings != "null") {
        $('#rating').text(Math.floor(data.avgRatings * 10) / 10);
        displayStars(data.avgRatings, document.querySelector('#rating-stars'));
        data.comments.forEach(ele => {
            let comment = (ele.comment.length <= 50) ? ele.comment : ele.comment.slice(0, 50) + '...';;
            let reviewer = ele.guest;
            let orderId = ele.orderId;
            let commentTime = ele.time.split(' ')[0];
            let html = `
            <div class="card review-card shadow-sm mb-3 border-0 d-flex align-items-center justify-content-center">
                <div class="card-body p-4 text-center">
                    <p class="card-text text-dark fs-5 mb-2">${comment}</p>
                    <p class="card-text mb-1">
                        <small class="text-muted">
                            <i class="bi bi-person-circle me-1"></i>Reviewer: ${reviewer}**
                        </small>
                    </p>
                    <p class="d-flex align-items-center justify-content-center mb-0">
                        <span class="me-2">評分:</span>
                        <span id="rating-stars-${orderId}" class="text-warning"></span>
                        <span class="ms-3 text-muted">${commentTime}</span>
                    </p>
                </div>
            </div>
        `
            $('.review-container').append(html);
            displayStars(ele.rating, document.querySelector(`#rating-stars-${orderId}`));
        });
    } else {
        $('.review').remove();
    }
    data.facility.forEach(ele => {
        let name = ele.facilityName;
        let html = `
        	<li class="me-2 mb-2">
			    <span class="badge rounded-pill bg-light text-dark border px-3 py-2">
				${name}
			    </span>
			</li>
        `;
        $('.facilities_list').append(html);
    })
}

function fetchHotelInfo() {
    return $.ajax({
        url: '/booking/api/hotel_detail',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            id: hotelId
        }), success: function (data) {
            putHotelCarousel(data.imgNum);
            hotelInfoUpdate(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('AJAX 請求發生錯誤:', textStatus, errorThrown);
            console.log('響應文本:', jqXHR.responseText);
        }
    });
}

function updateSearchResult() {
    return $.ajax({
        url: '/booking/api/update',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            startDate: $('#start_date').text(),
            endDate: $('#end_date').text(),
            roomNum: $('#room_num').val(),
            guestNum: $('#people_num').val()
        }), success: function () {
            fetchHotelInventory();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('AJAX 請求發生錯誤:', textStatus, errorThrown);
            console.log('響應文本:', jqXHR.responseText);
        }
    });
}


function fetchHotelInventory() {
    return $.ajax({
        url: '/booking/api/hotel_detail/inventory',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            id: hotelId,
        }), success: function (data) {
            console.log(data);
            updateRoom(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('AJAX 請求發生錯誤:', textStatus, errorThrown);
            console.log('響應文本:', jqXHR.responseText);
            console.log(jqXHR.responseJSON.error);
        }
    });
}

function updateRoom(Array) {
    sortByPrice(Array);
    $('.room-container').html("");
    Array.rooms.forEach(data => {
        let roomName = data.roomName;
        let roomTypeId = data.roomTypeId;
        let guest = data.maxPerson;
        let breakfast = data.breakfast;
        let facilityNum = data.roomFacility.length;
        let serviceNum = data.roomService.length;
        let html;
        if (!Array.nosession) {
            let startDate = new Date(data.inventories[0].date);
            let endDate = new Date(data.inventories[data.inventories.length - 1].date);
            endDate.setDate(endDate.getDate() + 1);
            let stayNight = (endDate - startDate) / (1000 * 60 * 60 * 24);
            let totalPrice = 0;
            let totalBreakfastPrice = 0;
            let roomNum = data.roomNum;
            let guestNum = data.guestNum;
            let realAvailableQuantity = 0;
            startDate = startDate.toISOString().split("T")[0];
            endDate = endDate.toISOString().split("T")[0];
            temp.roomNum = roomNum;
            temp.guestNum = guestNum;
            temp.checkInDate = startDate;
            temp.checkOutDate = endDate;
            $('#date-range').html(`入住: <span id="start_date">${startDate}</span> - 退房: <span id="end_date">${endDate}</span>`)
            $('#room_num').val(data.roomNum);
            $('#people_num').val(data.guestNum);
            data.inventories.forEach(di => {
                if (realAvailableQuantity == 0) {
                    realAvailableQuantity = di.availableQuantity;
                } else if (realAvailableQuantity > di.availableQuantity) {
                    realAvailableQuantity = di.availableQuantity
                }
                totalPrice += (di.price * roomNum);
                totalBreakfastPrice += (di.breakfastPrice * guestNum);
            })
            if (breakfast != 0) {
                totalPrice += totalBreakfastPrice;
            }
            html =`
                <div class="card shadow-lg">
                    <div class="row g-0 align-items-center">
                        <!-- 跑馬燈區域 -->
                        <div class="col-md-4">
                            <div id="roomCarousel${roomTypeId}" class="carousel slide" data-bs-ride="carousel">
                                <!-- 輪播圖片 -->
                                <div class="room-carousel carousel-inner" id="room-carousel${roomTypeId}" style="height:300px">
                                    <!-- 輪播圖片項目應在此填充 -->
                                </div>
                                <!-- 輪播控制按鈕 -->
                                <button class="carousel-control-prev" type="button" data-bs-target="#roomCarousel${roomTypeId}" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">上一張</span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#roomCarousel${roomTypeId}" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">下一張</span>
                                </button>
                            </div>
                        </div>

                        <!-- 房間資訊與互動區域 -->
                        <div class="col-md-8">
                            <div class="card-body">
                                <div class="row">
                                    <!-- 左側內容：房間基本資訊等 -->
                                    <div class="col-md-8">
                                        <h3 class="card-title mb-3">${roomName}</h3>

                                        <!-- 關鍵資訊標籤 -->
                                        <div class="mb-3">
                                            <span class="badge bg-info me-2">可入住 ${guest} 位房客</span>
                                            <span class="badge bg-success me-2 ${breakfast == 0 ? " d-none" : ""}">含早餐</span>
                                    </div>

                                    <hr>

                                        <!-- 房間設施 -->
                                        <div class="mb-3 ${facilityNum == 0 ? " d-none" : ""}" id="roomfacility${roomTypeId}">
                                        <h6 class="mb-2">房間設施：</h6>
                                </div>

                                <!-- 房間服務 -->
                                <div class="mb-3 ${serviceNum == 0 ? " d-none" : ""}" id="roomService${roomTypeId}">
                                <h6 class="mb-2">房間服務：</h6>
                            </div>
                        </div>

                        <!-- 右側內容：數量選擇、價格與預訂按鈕 -->
                        <div class="col-md-4 d-flex flex-column align-items-end justify-content-center">
                            <h6 class="mb-2 text-muted">
                                總共 ${guestNum} 位入住 <br>
                                    ${stayNight} 晚 ＊ ${parseInt(roomNum)} 間房
                            </h6>

                            <!-- 價格與早餐價格 -->
                            <div class="mb-3 text-end">
                                <h6 class="mb-1 text-secondary">
                                    每晚每房 <span class="fw-bold text-primary">NTD$ ${Math.floor(totalPrice / roomNum / stayNight)}</span>
                                </h6>
                                <p class="mb-1 text-muted breakfast ${breakfast == 0 ? " d-none" : ""}">
                                <small>
                                    <strong>
                                        已含早餐價格<br>
                                            每人每晚：NTD$ ${Math.floor(totalBreakfastPrice / guestNum / stayNight)}<br>
                                                總價：NTD$ ${totalBreakfastPrice}
                                            </strong>
                                        </small>
                                    </p>
                                    <h4 class="mb-2 price fw-bold text-danger">
                                        總價：<span>NTD$ ${totalPrice}</span>
                                    </h4>
                                    <p class="text-muted">
                                        剩餘庫存：<span>${realAvailableQuantity}</span>
                                    </h4>


                            </div>

                            <!-- 預訂按鈕 -->
                            <button id="btn${roomTypeId}" class="btn btn-lg btn-primary orderBtn">
                                立即預訂
                            </button>
                        </div>

                    </div>
                </div>
            `
        } else {
            html =`
<div class="card shadow-lg">
    <div class="row g-0 align-items-center">
        <!-- 跑馬燈區域 -->
        <div class="col-md-4">
            <div id="roomCarousel${roomTypeId}" class="carousel slide" data-bs-ride="carousel">
                <!-- 輪播圖片 -->
                <div class="room-carousel carousel-inner" id="room-carousel${roomTypeId}" style="height:300px">
                    <!-- 輪播圖片項目應在此填充 -->
                </div>
                <!-- 輪播控制按鈕 -->
                <button class="carousel-control-prev" type="button" data-bs-target="#roomCarousel${roomTypeId}"
                    data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">上一張</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#roomCarousel${roomTypeId}"
                    data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">下一張</span>
                </button>
            </div>
        </div>

        <!-- 房間資訊與互動區域 -->
        <div class="col-md-8">
            <div class="card-body">
                <div class="row">
                    <!-- 左側內容：房間基本資訊等 -->
                    <div class="col-md-12">
                        <h3 class="card-title mb-3">${roomName}</h3>

                        <!-- 關鍵資訊標籤：僅保留可入住人數 -->
                        <div class="mb-3">
                            <span class="badge bg-info me-2">可入住 ${guest} 位房客</span>
                            <!-- 移除日期與含早餐標籤 -->
                        </div>

                        <hr>

                        <!-- 房間設施 -->
                        <div class="mb-3 ${facilityNum == 0 ? " d-none" : "" }" id="roomfacility${roomTypeId}">
                            <h6 class="mb-2">房間設施：</h6>
                            <!-- 此處填入房間設施內容 -->
                        </div>

                        <!-- 房間服務 -->
                        <div class="mb-3 ${serviceNum == 0 ? " d-none" : "" }" id="roomService${roomTypeId}">
                            <h6 class="mb-2">房間服務：</h6>
                            <!-- 此處填入房間服務內容 -->
                        </div>
                    </div>

                    <!-- 移除右側內容：數量選擇、價格與預訂按鈕等 -->
                </div>
            </div>
        </div>
    </div>
</div>
                `
        }
        $('.room-container').append(html);
        putRoomCarousel(roomTypeId, data.imgNum);
        data.roomFacility.forEach(rf => {
            let fName = rf.facilityName;
            let id = "#roomfacility" + roomTypeId;
            let html = `
                <span class="badge rounded-pill bg-success me-1" > ${ fName }</span>
                    `;
            $(id).append(html);
        })
        data.roomService.forEach(rf => {
            let fName = rf.facilityName;
            let id = "#roomService" + roomTypeId;
            let html = `
                    <span class="badge rounded-pill bg-secondary me-1" > ${ fName }</span>
                        `;
            $(id).append(html);
        })

    })
};

function displayStars(rating, starContainer) {
    starContainer.innerHTML = "";
    // 顯示 5 顆星的評分
    for (let i = 1; i <= 5; i++) {
        if (rating >= i) {
            // 完整星星
            starContainer.innerHTML += '<i class="bi bi-star-fill star"></i>';
        } else if (rating >= i - 0.5) {
            // 半顆星星
            starContainer.innerHTML += '<i class="bi bi-star-half star"></i>';
        } else {
            // 空星星
            starContainer.innerHTML += '<i class="bi bi-star star"></i>';
        }
    }
}

function sortByPrice(data, order = 'asc') {
    data.rooms.sort((a, b) => {
        if (order === 'asc') {
            return Number(a.totalPrice) - Number(b.totalPrice);
        } else {
            return Number(b.totalPrice) - Number(a.totalPrice);
        }
    });
}
