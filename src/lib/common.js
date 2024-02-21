import { resolveBrowserLocale } from 'react-admin';

export const states =[
    { id: 'rejected', name: 'resources.cash_history.state.rejected' },
    { id: 'done', name: 'resources.cash_history.state.done' },
    { id: 'pending', name: 'resources.cash_history.state.pending' },
    { id: 'accepted', name: 'resources.cash_history.state.accepted' },
]

export const cStates =[
    { id: 'accept', name: 'resources.review.state.accept' },
    { id: 'pending', name: 'resources.review.state.pending' },
    { id: 'delete', name: 'resources.review.state.delete' },
]

export const mTypes =[
    { id: 'video', name: 'resources.content.type.video' },
    { id: 'image', name: 'resources.content.type.image' },
    { id: 'audio', name: 'resources.content.type.audio' },
    { id: 'all', name: 'com.all' },
]

export const mTypes2 =[
    { id: 'video', name: 'resources.content.type.video' },
    { id: 'image', name: 'resources.content.type.image' },
]

export const langs = [
    { id: 'ko', name: '한국어' },
    { id: 'en', name: 'English' },
    { id: 'cn', name: '中文' },
]

export const countries = [
    { id: 'CHN', name: '중국' },
    { id: 'KOR', name: '한국' },
    { id: 'JPN', name: '일본' },
]

export const menus = [
    { id: 'dashboard', name: 'ra.page.dashboard' },
    { id: 'user', name: 'resources.user.name' },
    { id: 'cash', name: 'com.menu.cash' },
    { id: 'category', name: 'resources.category.name' },
    { id: 'tag', name: 'resources.tag.name' },
    { id: 'content', name: 'resources.content.name' },
    { id: 'review', name: 'resources.review.name' },
    { id: 'channel', name: 'resources.channel.name' },
    { id: 'advert', name: 'resources.advert.name' },
    { id: 'popup', name: 'resources.popup.name' },
    { id: 'faq', name: 'resources.faq.name' },
    { id: 'game', name: 'resources.game.name' },
    { id: 'gift', name: 'resources.gift.name' },
    { id: 'note', name: 'resources.note.name' },
    { id: 'service', name: 'resources.service.name' },
    { id: 'notice', name: 'resources.notice.name' },
    { id: 'setting', name: 'resources.setting.name' },
    { id: 'declare', name: 'resources.declare.name' },
    { id: 'manage', name: 'com.menu.manage' },
]

export const liveBlockReason =[
    { id: 'A', name: 'resources.channel.block_reason.a' },
    { id: 'B', name: 'resources.channel.block_reason.b' },
    { id: 'C', name: 'resources.channel.block_reason.c' },
    { id: 'D', name: 'resources.channel.block_reason.d' },
    { id: 'E', name: 'resources.channel.block_reason.e' },
]

export const isPermit = (menus, menu) => {
    if (menus && menus.length) {
        for (let i = 0; i < menus.length; i++) {
            if (menus[i] === menu) return true
        }
    }
    return false
}

export const roles = [
    { id: 'admin', name: 'resources.user.role.admin' },
    { id: 'member', name: 'resources.user.role.member' },
    { id: 'virtual', name: 'resources.user.role.virtual' },
]

export const totalLangs = [
    { id: 'all', name: 'com.all' },
    ...langs
]

export const point_units = [
    { id: 'coin', name: 'com.coin' },
    { id: 'point', name: 'com.point' },
]

export const resolveLocale = () => {
    let locale = localStorage.getItem('lang')
    if (!locale) locale = resolveBrowserLocale()
    if (locale === 'zh') locale = 'cn'
    return locale
}

export const isString = (str) => {
    return str && typeof str === 'string'
}

export function getBriefTimeGap(time) {
    let d1 = new Date();
    let d2 = new Date(time);
    let msec = d1.valueOf() - d2.valueOf();

    var v;
    var ret = {};
    v = Math.floor(msec / 1000 / 60 / 60 / 24 / 365);
    if (v) {
        ret.value = v;
        ret.str = 'YEAR';
        return ret;
    }
    v = Math.floor(msec / 1000 / 60 / 60 / 24 / 30);
    if (v) {
        ret.value = v;
        ret.str = 'MONTH';
        return ret;
    }
    v = Math.floor(msec / 1000 / 60 / 60 / 24);
    if (v) {
        ret.value = v;
        ret.str = 'DAY';
        return ret;
    }
    v = Math.floor(msec / 1000 / 60 / 60);
    if (v) {
        ret.value = v;
        ret.str = 'HOUR';
        return ret;
    }
    v = Math.floor(msec / 1000 / 60);
    if (v) {
        ret.value = v;
        ret.str = 'MINUTE';
        return ret;
    }
    v = Math.floor(msec / 1000);
    if (v) {
        ret.value = v;
        ret.str = 'SECOND';
        return ret;
    } else {
        ret.value = 1;
        ret.str = 'SECOND';
        return ret;
    }
}
