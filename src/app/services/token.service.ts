import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';
import jwt_decode from "jwt-decode";
import { JwtPayload } from '../interfaces/jwtPayLoad.interface';

/**
 * Service for managing tokens.
 * @class
 */
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  /**
   * Saves the token to a cookie.
   * @param {string} token - The token to be saved.
   */
  saveToken(token: string) {
    setCookie('token-mote', token, { expires: 1, path: '/' });//1 day
  }

  /**
   * Retrieves the token from the cookie.
   * @returns {string} The token.
   */
  getToken() {
    const token = getCookie('token-mote');
    return token;
  }

  /**
   * Removes the token from the cookie.
   */
  removeToken() {
    removeCookie('token-mote');
  }

  /**
   * Removes the refresh token from the cookie.
   */
  removeRefreshToken() {
    //validate if the refresh token exists
    if (!this.getRefreshToken()) {
      removeCookie('refresh-token-mote');
    }

  }

  /**
   * Saves the refresh token to a cookie.
   * @param {string} token - The refresh token to be saved.
   */
  saveRefreshToken(token: string) {
    setCookie('refresh-token-mote', token, { expires: 1, path: '/' });
  }

  /**
   * Retrieves the refresh token from the cookie.
   * @returns {string} The refresh token.
   */
  getRefreshToken() {
    const token = getCookie('refresh-token-mote');
    return token;
  }

  /**
   * Checks if the token is valid.
   * @returns {boolean} True if the token is valid, false otherwise.
   */
  isValidToken() {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    //Decodes the token using jwt-decode library.
    const decodeToken = jwt_decode<JwtPayload>(token);
    //Checks if the token has an expiration date.
    if (decodeToken && decodeToken?.exp) {
      //Compare the expiration date with the current date for checking if the token is valid.
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);
      const today = new Date();
      return tokenDate.getTime() > today.getTime();
    }
    return false;
  }

  /**
   * Checks if the refresh token is valid.
   * @returns {boolean} True if the refresh token is valid, false otherwise.
   */
  isValidRefreshToken() {
    const token = this.getRefreshToken();
    if (!token) {
      return false;
    }
    const decodeToken = jwt_decode<JwtPayload>(token);
    if (decodeToken && decodeToken?.exp) {
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);
      const today = new Date();
      return tokenDate.getTime() > today.getTime();
    }
    return false;
  }

  decodeToken() {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    const decodeToken = jwt_decode<JwtPayload>(token);
    return decodeToken;
  }
}
