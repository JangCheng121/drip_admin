import SocketIOClient from 'socket.io-client';
import { 
    fetchUtils, 
} from 'react-admin';

import {resolveLocale} from '../lib/common';

let vm;



export default class DataService {
    static instance = null;

    socket = null
    mi = {}
    lang = 'zh-CN'
    setCashAlarm = null
    setChatAlarm = null
    receiveChat = null
    setContentAlarm = null
    setReviewAlarm = null
    serverUrl = ''

    static getInstance() {
        if (DataService.instance == null) {
            DataService.instance = new DataService();
            vm = DataService.instance;
            const config = require('../config')
            vm.serverUrl = config.baseUrl;
            vm.staticUrl = config.staticUrl;
            const data = localStorage.getItem('mi')
            if (data) vm.mi = JSON.parse(data)
            else vm.mi = {}

            vm.lang = vm.getCurrentLang()

            const token = localStorage.getItem('token');
            if(token) {
                vm.socket_connect(token)
            }
        }

        return this.instance;
    }

    getCurrentLang() {
        let lang = resolveLocale()
        if (lang === 'ko') vm.lang = 'ko-KR'
        else if (lang === 'en') vm.lang = 'en-US'
        else lang = 'zh-CN'
        return lang
    }

    getMediaType(mime) {
        if (!mime) {
            return 'invalid';
        }
        let array = mime.split('/');
        if (array && array[0].length) {
            return array[0];
        } else {
            return 'invalid';
        }
    }

    socket_connect = (token) => {
        vm.socket = SocketIOClient(vm.serverUrl);
        vm.socket.on('connect', function (p_socket) {
            console.log('socket connect: ' + vm.serverUrl)
            vm.socket.emit('mesSockInfo', {token: token});

            //20초마다 서버로 소켓 ping, timmeout 방지
            if (vm.timerId) clearInterval(vm.timerId)
            vm.timerId = setInterval(function () {
                console.log('socket ping');
                vm.socket.emit("Ping", {user_id: vm.mi.id});
            }, 20 * 1000)
        });
        vm.socket.on('reconnect', function (data) {
            console.log('socket reconnect');
            vm.socket.emit('mesSockInfo', {user_id: vm.mi.id});
        });
        vm.socket.on('disconnect', function (p_socket) {
            console.log('socket disconnected');
            if (vm.timerId) clearInterval(vm.timerId)
        });
        vm.socket.on('newMessage', function (data, callback) {
            if (vm.receiveChat) vm.receiveChat(data, callback)
            if (vm.setChatAlarm) vm.setChatAlarm()
        })            
        vm.socket.on('CashAlarm', function (data) {
            if (vm.setCashAlarm) vm.setCashAlarm()
        })            
        vm.socket.on('ContentAlarm', function (data) {
            if (vm.setContentAlarm) vm.setContentAlarm()
        })            
        vm.socket.on('ReviewAlarm', function (data) {
            if (vm.setReviewAlarm) vm.setReviewAlarm()
        })            
    }

    sendSocket(type, data) {
        console.log('sendSocket: ' + type, data);
        this.socket.emit(type, data);
    }

    createUUID = () => {
        // http://www.ietf.org/rfc/rfc4122.txt
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";
    
        var uuid = s.join("");
        return uuid;
    }
    getUniqueFileName() {
        // return `${Date.now()}${vm.createUUID()}`;
        const d = new Date()
        return `${vm.mi.id}_${d.getFullYear()}${d.getMonth()+1}${d.getDate()}${d.getHour()}${d.getMinutes()}${d.getSeconds()}`;
    }
    uploadFile(type, from, file, filename, progressFunc) {
        return new Promise((resolve, reject) => {
            let uploader = new XMLHttpRequest();
            let data = new FormData();
            data.append("file", file);
            let params = "field=file";
            uploader.open('POST', vm.serverUrl + '/api/system/file_upload?' + params, true);
            uploader.setRequestHeader('type', type);
            uploader.setRequestHeader('from', from);
            uploader.setRequestHeader('user_id', vm.mi.id);
            uploader.setRequestHeader('filename', filename);
            const token = localStorage.getItem('token');
            if(!token) {
                reject('no token')
            }    
            uploader.setRequestHeader('authorization', token);

            uploader.onprogress = (e) => {
                let progress = parseInt(e.loaded / e.total * 100, 10);
                console.log('upload progress', progress);
                progressFunc(progress);
            };
            uploader.onerror = (e) => {
                console.log('upload Error', e);
                reject(e);
            };
            uploader.ontimeout = (e) => {
                console.log('upload timeout', e);
                reject(e);
            };
            uploader.onabort = (e) => {
                console.log('upload aborted', e);
                reject(e);
            };
            uploader.onload = (e) => {
                console.log('upload Success', e);
                let res = JSON.parse(uploader.responseText);
                if (typeof res !== 'object' || !res.result || res.result !== "ok" || !res.fname)
                    reject('upload result error');
                res.fname = res.fname.replace('./', '');
                resolve(res);
            };
            uploader.send(data);
        })
    }

    splitPath = function (path) {
        let result = path.replace(/\\/g, "/").match(/(.*\/)?(\..*?|.*?)(\.[^.]*?)?(#.*$|\?.*$|$)/);
        return {
            dirname: result[1] || "",
            filename: result[2] || "",
            extension: result[3] || "",
            params: result[4] || ""
        };
    };

    fetchServer = (url) => {
        return new Promise((resolve, reject) => {
            try {
                const token = localStorage.getItem('token');
                if(token) {
                    const { fetchJson } = fetchUtils;
                    let options = {}
                    options.headers = new Headers({ Accept: 'application/json' });
                    options.headers.set('authorization', `${token}`);
                    fetchJson(vm.serverUrl + url, options)
                    .then((res) => {
                        resolve(res.json)
                    })
                    .catch((err) => reject(err))
                }   
            }
            catch(e) {
                reject(new Error('no token'))
            }
        })
    }
}

