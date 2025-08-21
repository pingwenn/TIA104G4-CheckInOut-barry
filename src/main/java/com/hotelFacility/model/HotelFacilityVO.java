package com.hotelFacility.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.facility.model.FacilityVO;
import com.hotel.model.HotelVO;

@Entity
@Table(name = "hotel_facility")
public class HotelFacilityVO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hotel_facility_id")
    private Integer hotelFacilityId;

    // 多對一：對應到 hotel 表 (hotel_id)
    @ManyToOne
    @JoinColumn(name = "hotel_id", nullable = false)
    @NotNull(message = "Hotel 不可為空")
    private HotelVO hotel;

    // 多對一：對應到 facility 表 (facility_id)
    @ManyToOne
    @JoinColumn(name = "facility_id", nullable = false)
    @NotNull(message = "Facility 不可為空")
    private FacilityVO facility;

    // ------------------------------
    // Constructors, Getters, Setters
    // ------------------------------
    public HotelFacilityVO() {
    }

    public Integer getHotelFacilityId() {
        return hotelFacilityId;
    }

    public void setHotelFacilityId(Integer hotelFacilityId) {
        this.hotelFacilityId = hotelFacilityId;
    }

    public HotelVO getHotel() {
        return hotel;
    }

    public void setHotel(HotelVO hotel) {
        this.hotel = hotel;
    }

    public FacilityVO getFacility() {
        return facility;
    }

    public void setFacility(FacilityVO facility) {
        this.facility = facility;
    }
}