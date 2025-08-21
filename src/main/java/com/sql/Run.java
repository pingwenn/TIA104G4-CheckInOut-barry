package com.sql;

import com.ScheduledTask.ScheduledTaskService;

public class Run {
    public static void main(String[] args) {
        // 開始計時
        long startTime = System.currentTimeMillis();

        HotelLicensePhotoWrite.run();
        RandomHotelPhotoUploader.run();
        RoomTypePhotoWrite.run();

        //  更新庫存數量
        UpdateRoomInventory.run();
        // 會員照片 雄大&兔兔
        MemberAvatarWriter.run();
//        HotelFacilityUploader.run();
//        RoomTypeFacilityUploader.run();
//        RoomUploader.run();
//        PriceUploader.run();
//        RoomInventoryUploader.run();

        // 結束計時
        long endTime = System.currentTimeMillis();
        // 計算並打印執行時間
        long duration = endTime - startTime;
        double durationInSeconds = duration / 1000.0;
        System.out.println("All done");
        System.out.println("Total execution time: " + durationInSeconds + " seconds");
    }
}
