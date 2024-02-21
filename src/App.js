import React, { Component } from 'react';
import { Admin, Resource, } from 'react-admin';

import './App.css';

import authProvider from './authProvider';
import { Login, Layout } from './layout';
import { Dashboard } from './view/dashboard';
import customRoutes from './routes';

import user from './view/user';
import category from './view/category';
import tag from './view/tag';
import content from './view/content';
import advert from './view/advert';
import review from './view/review';
import channel from './view/channel';
import game from './view/game';
import room from './view/room';
import vip from './view/vip';
import gift from './view/gift';
import cash_set from './view/cash_set';
import login_history from './view/login_history';
import penal_history from './view/penal_history';
import point_history from './view/point_history';
import coin_history from './view/coin_history';
import pay_history from './view/pay_history';
import cash_history from './view/cash_history';
import live_history from './view/live_history';
import gift_history from './view/gift_history';
import setting from './view/setting';
import note from './view/note';
import notice from './view/notice';
import service from './view/service';
import allow_func from './view/allow_func';
import popup from './view/popup';
import faq from './view/faq';
import gain from './view/gain';
import declare from './view/declare';

import uploadCapableDataProvider from './dataProvider/dataProvider';

import messages from './i18n';
import defaultMessages from 'ra-language-english';

import themeReducer from './redux/theme';

import {resolveLocale} from './lib/common';

const i18nProvider = locale => {
    if (messages[locale]) {
        return messages[locale];
    }
    return defaultMessages;
};

class App extends Component {
    componentDidMount() {
        console.log('app start')
    }

    render() {

        if (!uploadCapableDataProvider) {
            return (
                <div className="loader-container">
                    <div className="loader">Loading...</div>
                </div>
            );
        }

        return (
            <Admin
                title="Drip Admin"
                dataProvider={uploadCapableDataProvider}
                customReducers={{ theme: themeReducer }}
                customRoutes={customRoutes}
                authProvider={authProvider}
                dashboard={Dashboard}
                loginPage={Login}
                appLayout={Layout}
                locale={resolveLocale()}
                i18nProvider={i18nProvider}
            >
                <Resource name="user" {...user} />
                <Resource name="game" {...game} />
                <Resource name="room" {...room} />
                <Resource name="gift" {...gift} />
                <Resource name="vip" {...vip} />
                <Resource name="cash_set" {...cash_set} />
                <Resource name="login_history" {...login_history} />
                <Resource name="penal_history" {...penal_history} />
                <Resource name="point_history" {...point_history} />
                <Resource name="coin_history" {...coin_history} />
                <Resource name="pay_history" {...pay_history} />
                <Resource name="cash_history" {...cash_history} />
                <Resource name="category" {...category} />
                <Resource name="tag" {...tag} />
                <Resource name="content" {...content} />
                <Resource name="review" {...review} />
                <Resource name="channel" {...channel} />
                <Resource name="live_history" {...live_history} />
                <Resource name="gift_history" {...gift_history} />
                <Resource name="advert" {...advert} />
                <Resource name="setting" {...setting} /> 
                <Resource name="note" {...note} /> 
                <Resource name="service" {...service} /> 
                <Resource name="allow_func" {...allow_func} /> 
                <Resource name="popup" {...popup} /> 
                <Resource name="faq" {...faq} /> 
                <Resource name="notice" {...notice} />
                <Resource name="gain" {...gain} />
                <Resource name="declare" {...declare} />
            </Admin>
        );
    }
}

export default App;


