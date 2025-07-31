package com.restro.model;

public class UserLoginRequest {
    private Long mobNum;
    private String password;

    public Long getMobNum() {
        return mobNum;
    }
    public void setMobNum(Long mobNum) {
        this.mobNum = mobNum;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

}
