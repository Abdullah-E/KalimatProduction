// components/Footer.js
import React from 'react';
import {useNavigate} from "react-router-dom"

const Footer = () => {
  const navigate = useNavigate();
  const policyClick = () => {
    navigate("/policy");
  }
  const termsClick = () => {
    navigate("/termsandconditions");
  }
  return (
    <div className="w-full bg-custom-dark-blue text-white">
      <div className="flex mx-12 justify-between items-center py-3">
        <div>© 2024 KalimatKeywords All rights reserved.</div>
        <div className="flex gap-4">
          <div onClick={policyClick}>الخصوصية</div>
          <div onClick={termsClick}>الشروط والأحكام</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
