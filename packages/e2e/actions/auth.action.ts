import { browser } from 'protractor';
import jwt = require('jsonwebtoken');
import { getEnvVariable } from './helpers.action';

function getJwtSecret() {
  return getEnvVariable('E2E_JWT_SECRET');
}

function getAccessToken() {
  return getEnvVariable('E2E_ACCESS_TOKEN');
}

export function generateAuthToken(): string {
  const tokenOptions = { algorithm: 'HS512', audience: 'stryker', expiresIn: '30m', issuer: 'stryker' };
  const authToken = jwt.sign({
    accessToken: getAccessToken(),
    displayName: null,
    id: 56148018,
    username: 'strykermutator-test-account',
  }, getJwtSecret(), tokenOptions);
  return authToken;
}

export async function logOn() {
  const authToken = generateAuthToken();
  await browser.get('/');
  await browser.executeScript(`window.sessionStorage.setItem('authToken', '${authToken}');`);
  // await browser.get('/');
}

export async function logOff() {
  await browser.executeScript('window.sessionStorage.removeItem("authToken")');
}
