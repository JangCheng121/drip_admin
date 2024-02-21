import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK, AUTH_GET_PERMISSIONS } from 'react-admin';
// load config
import DataService from './dataProvider/dataService';

const dataService = DataService.getInstance();
const config = require('./config')
const md5 = require('md5')

export default (type, params) => {
    // called when the user attempts to log in
    if (type === AUTH_LOGIN) {
        let uid, tok
        const { uuid, password } = params;
        const request = new Request(config.baseUrl + '/account/auth1', {
            method: 'POST',
            body: JSON.stringify({ uuid:uuid, role:'admin'}),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        })
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(({ user_id, onepass }) => {
                uid = user_id
                const request = new Request(config.baseUrl + '/account/auth2', {
                    method: 'POST',
                    body: JSON.stringify({ user_id:user_id, token:md5(user_id + password + onepass)}),
                    headers: new Headers({ 'Content-Type': 'application/json' }),
                })
                return fetch(request)
            })
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(({ token }) => {
                tok = token
                const request = new Request(config.baseUrl + '/api/user/' + uid, {
                    method: 'GET',
                    headers: new Headers({ 'Content-Type': 'application/json' }),
                })
                return fetch(request)
            })
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(({ id, picture, allowed_menus }) => {
                dataService.mi = {id:id, role:allowed_menus, picture:picture};
                dataService.socket_connect(tok);
                localStorage.clear();
                localStorage.setItem('token', tok);
                localStorage.setItem('mi', JSON.stringify(dataService.mi));
                return Promise.resolve();
            })
    }
    // called when the user clicks on the logout button
    if (type === AUTH_LOGOUT) {
        let headers = new Headers({ Accept: 'application/json' });
        const token = localStorage.getItem('token');
        if(token) {
            headers.set('authorization', `${token}`);
        }    
        const request = new Request(config.baseUrl + '/api/auth/logout', {
            method: 'POST',
            body: JSON.stringify({ role: 'admin' }),
            headers: headers,
        })
        return fetch(request)
            .then((response) => {
                localStorage.removeItem('token');
                return Promise.resolve();
            })
    }
    // called when the API returns an error
    if (type === AUTH_ERROR) {
        const { status } = params;
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    }
    // called when the user navigates to a new location
    if (type === AUTH_CHECK) {
        const { resource } = params;
        console.log(resource)
        return localStorage.getItem('token')
            ? Promise.resolve()
            : Promise.reject();
    }
    if (type === AUTH_GET_PERMISSIONS) {
        return dataService.mi.role ? Promise.resolve(dataService.mi.role) : Promise.reject();
    }
    return Promise.reject('Unknown method');
};

