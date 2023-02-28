import { useContext, useEffect, useState, useCallback } from "react";
import "./profile.css";

import AuthContext from "../store/authContext";
import { Icon } from "@iconify/react";


import Stories from "./Stories";
const MyProfile = () => {
 
const image = localStorage.getItem("image");
const username = localStorage.getItem("username");

    return (
        <div className="profile">
            <div className="images">
                <img
                    src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt=""
                    className="cover"
                />
                <img
                    src={image}
                    alt=""
                    className="profilePic"
                />
            </div>

        
            <div className="profileContainer">
                <div className="uInfo">
                    <div className="left">
                        <a href="http://facebook.com">
                            <Icon icon="ri:facebook-circle-line" />
                        </a>
                        <a href="http://instagram.com">
                            <Icon icon="mdi:instagram" />
                        </a>
                        <a href="http://twitter.com">
                            <Icon icon="ph:twitter-logo-bold" />
                        </a>
                        <a href="http://linkedin.com">
                            <Icon icon="ph:linkedin-logo" />
                        </a>
                    </div>
                    <div className="center">
                        <span>{ username}</span>
                        <div className="info">
                            <div className="item">
                                <Icon icon="ic:outline-place" />
                                <span>USA</span>
                            </div>
                            <div className="item">
                                <Icon icon="material-symbols:language-sharp" />
                                <span></span>
                            </div>
                        </div>
                        <button>follow</button>
                    </div>
                    <div className="right"></div>
                </div>
            </div>

              
                </div>
            )}




export default MyProfile;
