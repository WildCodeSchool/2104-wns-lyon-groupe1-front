import React from 'react';
import './Footer.scss';
import logo from '../assets/logo.svg';

export default function Footer() {
  return (
    <div className="Footer">
      <img src={logo} alt="logo Notes" />
      <ul>
        <li>Nous Contacter</li>
        <li>Notre équipe</li>
        <li>Mentions légales</li>
      </ul>
    </div>
  );
}
