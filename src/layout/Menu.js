import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import {
    translate,
    DashboardMenuItem,
    MenuItemLink,
    WithPermissions,
    Responsive,
} from 'react-admin';

import user from '../view/user';
import content from '../view/content';
import advert from '../view/advert';
import category from '../view/category';
import tag from '../view/tag';
import review from '../view/review';
import channel from '../view/channel';
import game from '../view/game';
import room from '../view/room';
import vip from '../view/vip';
import gift from '../view/gift';
import cash_set from '../view/cash_set';
import login_history from '../view/login_history';
import penal_history from '../view/penal_history';
import point_history from '../view/point_history';
import coin_history from '../view/coin_history';
import pay_history from '../view/pay_history';
import cash_history from '../view/cash_history';
import live_history from '../view/live_history';
import gift_history from '../view/gift_history';
import setting from '../view/setting';
import note from '../view/note';
import notice from '../view/notice';
import popup from '../view/popup';
import faq from '../view/faq';
import service from '../view/service';
import gain from '../view/gain';
import declare from '../view/declare';

import SubMenu from './SubMenu';
import ManageIcon from '@material-ui/icons/Gavel';
import LangIcon from '@material-ui/icons/Language';
import CashIcon from '@material-ui/icons/MonetizationOn';

import {isPermit} from '../lib/common';

class Menu extends Component {
    state = {
        menuContent: false,
        menuLive: false,
        menuSetting: false,
        menuGame: false,
        menuGift: false,
        menuCash: false,
        menuUsers: false,
    };

    static propTypes = {
        onMenuClick: PropTypes.func,
        logout: PropTypes.object,
    };

    componentDidMount() {
        console.log('menu start')
    }

    handleToggle = menu => {
        this.setState(state => ({ [menu]: !state[menu] }));
    };

    render() {
        const { onMenuClick, open, logout, translate } = this.props;
        return (
            <div>
                {' '}
                <WithPermissions
                    render={({ permissions }) => (
                        isPermit(permissions, 'dashboard')
                            ? <DashboardMenuItem onClick={onMenuClick} />
                            : null
                    )}
                />

                <WithPermissions
                    render={({ permissions }) => (
                        isPermit(permissions, 'user')
                            ?
                            <SubMenu
                                handleToggle={() => this.handleToggle('menuUser')}
                                isOpen={this.state.menuUser}
                                sidebarIsOpen={open}
                                name="resources.user.name"
                                icon={<user.icon color="primary"/>}
                            >
                                <MenuItemLink
                                    to={`/user`}
                                    primaryText={translate(`resources.user.name`, {
                                        smart_count: 2,
                                    })}
                                    leftIcon={<user.icon/>}
                                    onClick={onMenuClick}
                                />
                                <MenuItemLink
                                    to={`/vip`}
                                    primaryText={translate(`resources.vip.name`, {
                                        smart_count: 2,
                                    })}
                                    leftIcon={<vip.icon />}
                                    onClick={onMenuClick}
                                />
                                <MenuItemLink
                                    to={`/login_history`}
                                    primaryText={translate(`resources.login_history.name`, {
                                        smart_count: 2,
                                    })}
                                    leftIcon={<login_history.icon />}
                                    onClick={onMenuClick}
                                />
                                <MenuItemLink
                                    to={`/penal_history`}
                                    primaryText={translate(`resources.penal_history.name`, {
                                        smart_count: 2,
                                    })}
                                    leftIcon={<penal_history.icon />}
                                    onClick={onMenuClick}
                                />
                            </SubMenu>
                            : null
                    )}
                />
                <WithPermissions
                    render={({ permissions }) => (
                        isPermit(permissions, 'cash')
                            ?
                            <SubMenu
                                handleToggle={() => this.handleToggle('menuCash')}
                                isOpen={this.state.menuCash}
                                sidebarIsOpen={open}
                                name="com.menu.cash"
                                icon={<CashIcon />}
                            >
                                <MenuItemLink
                                    to={`/pay_history`}
                                    primaryText={translate(`resources.pay_history.name`, {
                                        smart_count: 2,
                                    })}
                                    leftIcon={<pay_history.icon />}
                                    onClick={onMenuClick}
                                />
                                <MenuItemLink
                                    to={`/cash_history`}
                                    primaryText={translate(`resources.cash_history.name`, {
                                        smart_count: 2,
                                    })}
                                    leftIcon={<cash_history.icon />}
                                    onClick={onMenuClick}
                                />
                                <MenuItemLink
                                    to={`/point_history`}
                                    primaryText={translate(`resources.point_history.name`, {
                                        smart_count: 2,
                                    })}
                                    leftIcon={<point_history.icon />}
                                    onClick={onMenuClick}
                                />
                                <MenuItemLink
                                    to={`/coin_history`}
                                    primaryText={translate(`resources.coin_history.name`, {
                                        smart_count: 2,
                                    })}
                                    leftIcon={<coin_history.icon />}
                                    onClick={onMenuClick}
                                />
                                <MenuItemLink
                                    to={`/cash_set`}
                                    primaryText={translate(`resources.cash_set.name`, {
                                        smart_count: 2,
                                    })}
                                    leftIcon={<cash_set.icon />}
                                    onClick={onMenuClick}
                                />
                                <MenuItemLink
                                    to={`/gain`}
                                    primaryText={translate(`resources.gain.name`, {
                                        smart_count: 2,
                                    })}
                                    leftIcon={<gain.icon />}
                                    onClick={onMenuClick}
                                />
                            </SubMenu>
                            : null
                    )}
                />
                <WithPermissions
                    render={({ permissions }) => (
                        isPermit(permissions, 'category')
                            ?
                            <MenuItemLink
                                to={`/category`}
                                primaryText={translate(`resources.category.name`, {
                                    smart_count: 2,
                                })}
                                leftIcon={<category.icon />}
                                onClick={onMenuClick}
                            />
                            : null
                    )}
                />
                <WithPermissions
                    render={({ permissions }) => (
                        isPermit(permissions, 'content')
                            ?
                            <SubMenu
                                handleToggle={() => this.handleToggle('menuContent')}
                                isOpen={this.state.menuContent}
                                sidebarIsOpen={open}
                                name="resources.content.name"
                                icon={<content.icon />}
                            >
                                <WithPermissions
                                    render={({ permissions }) => (
                                        isPermit(permissions, 'tag')
                                            ?
                                            <MenuItemLink
                                                to={`/tag`}
                                                primaryText={translate(`resources.tag.name`, {
                                                    smart_count: 2,
                                                })}
                                                leftIcon={<tag.icon />}
                                                onClick={onMenuClick}
                                            />
                                            : null
                                    )}
                                />
                                <WithPermissions
                                    render={({ permissions }) => (
                                        isPermit(permissions, 'content')
                                            ?
                                            <MenuItemLink
                                                to={`/content`}
                                                primaryText={translate(`resources.content.name`, {
                                                    smart_count: 2,
                                                })}
                                                leftIcon={<content.icon />}
                                                onClick={onMenuClick}
                                            />
                                            : null
                                    )}
                                />
                                <WithPermissions
                                    render={({ permissions }) => (
                                        isPermit(permissions, 'review')
                                            ?
                                            <MenuItemLink
                                                to={`/review`}
                                                primaryText={translate(`resources.review.name`, {
                                                    smart_count: 2,
                                                })}
                                                leftIcon={<review.icon />}
                                                onClick={onMenuClick}
                                            />
                                            : null
                                    )}
                                />

                            </SubMenu>
                            : null
                    )}
                />
                <WithPermissions
                    render={({ permissions }) => (
                        isPermit(permissions, 'channel')
                            ?
                            <SubMenu
                                handleToggle={() => this.handleToggle('menuLive')}
                                isOpen={this.state.menuLive}
                                sidebarIsOpen={open}
                                name="resources.channel.name"
                                icon={<channel.icon />}
                            >
                                <WithPermissions
                                    render={({ permissions }) => (
                                        <MenuItemLink
                                            to={`/channel`}
                                            primaryText={translate(`resources.channel.name`, {
                                                smart_count: 2,
                                            })}
                                            leftIcon={<channel.icon />}
                                            onClick={onMenuClick}
                                        />
                                    )}
                                />
                                <WithPermissions
                                    render={({ permissions }) => (
                                        <MenuItemLink
                                            to={`/live_history`}
                                            primaryText={translate(`resources.live_history.name`, {
                                                smart_count: 2,
                                            })}
                                            leftIcon={<live_history.icon />}
                                            onClick={onMenuClick}
                                        />
                                    )}
                                />
                            </SubMenu>
                            : null
                    )}
                />
                <WithPermissions
                    render={({ permissions }) => (
                        isPermit(permissions, 'game')
                            ?
                            <SubMenu
                                handleToggle={() => this.handleToggle('menuGame')}
                                isOpen={this.state.menuGame}
                                sidebarIsOpen={open}
                                name="resources.game.name"
                                icon={<game.icon />}
                            >
                                <MenuItemLink
                                    to={`/game`}
                                    primaryText={translate(`resources.game.name`, {
                                        smart_count: 2,
                                    })}
                                    leftIcon={<game.icon />}
                                    onClick={onMenuClick}
                                />
                                <MenuItemLink
                                    to={`/room`}
                                    primaryText={translate(`resources.room.name`, {
                                        smart_count: 2,
                                    })}
                                    leftIcon={<room.icon />}
                                    onClick={onMenuClick}
                                />
                            </SubMenu>
                            : null
                    )}
                />
                <WithPermissions
                    render={({ permissions }) => (
                        isPermit(permissions, 'gift')
                            ?
                            <SubMenu
                                handleToggle={() => this.handleToggle('menuGift')}
                                isOpen={this.state.menuGift}
                                sidebarIsOpen={open}
                                name="resources.gift.name"
                                icon={<gift.icon />}
                            >
                                <MenuItemLink
                                    to={`/gift`}
                                    primaryText={translate(`resources.gift.name`, {
                                        smart_count: 2,
                                    })}
                                    leftIcon={<gift.icon />}
                                    onClick={onMenuClick}
                                />
                                <MenuItemLink
                                    to={`/gift_history`}
                                    primaryText={translate(`resources.gift_history.name`, {
                                        smart_count: 2,
                                    })}
                                    leftIcon={<gift_history.icon />}
                                    onClick={onMenuClick}
                                />
                            </SubMenu>
                            : null
                    )}
                />
                <WithPermissions
                    render={({ permissions }) => (
                        isPermit(permissions, 'advert')
                            ?
                            <MenuItemLink
                                to={`/advert`}
                                primaryText={translate(`resources.advert.name`, {
                                    smart_count: 2,
                                })}
                                leftIcon={<advert.icon />}
                                onClick={onMenuClick}
                            />
                            : null
                    )}
                />
                <WithPermissions
                    render={({ permissions }) => (
                        isPermit(permissions, 'popup')
                            ?
                            <MenuItemLink
                                to={`/popup`}
                                primaryText={translate(`resources.popup.name`, {
                                    smart_count: 2,
                                })}
                                leftIcon={<popup.icon />}
                                onClick={onMenuClick}
                            />
                            : null
                    )}
                />

                <WithPermissions
                    render={({ permissions }) => (
                        isPermit(permissions, 'manage')
                            ?
                            <SubMenu
                                handleToggle={() => this.handleToggle('menuManage')}
                                isOpen={this.state.menuManage}
                                sidebarIsOpen={open}
                                name="com.menu.manage"
                                icon={<ManageIcon />}
                            >
                                <WithPermissions
                                    render={({ permissions }) => (
                                        isPermit(permissions, 'note')
                                            ?
                                            <MenuItemLink
                                                to={`/note`}
                                                primaryText={translate(`resources.note.name`, {
                                                    smart_count: 2,
                                                })}
                                                leftIcon={<note.icon />}
                                                onClick={onMenuClick}
                                            />
                                            : null
                                    )}
                                />
                                <WithPermissions
                                    render={({ permissions }) => (
                                        isPermit(permissions, 'faq')
                                            ?
                                            <MenuItemLink
                                                to={`/faq`}
                                                primaryText={translate(`resources.faq.name`, {
                                                    smart_count: 2,
                                                })}
                                                leftIcon={<faq.icon />}
                                                onClick={onMenuClick}
                                            />
                                            : null
                                    )}
                                />
                                <WithPermissions
                                    render={({ permissions }) => (
                                        isPermit(permissions, 'declare')
                                            ?
                                            <MenuItemLink
                                                to={`/declare`}
                                                primaryText={translate(`resources.declare.name`, {
                                                    smart_count: 2,
                                                })}
                                                leftIcon={<declare.icon />}
                                                onClick={onMenuClick}
                                            />
                                            : null
                                    )}
                                />
                                <WithPermissions
                                    render={({ permissions }) => (
                                        isPermit(permissions, 'service')
                                            ?
                                            <MenuItemLink
                                                to={`/service`}
                                                primaryText={translate(`resources.service.name`, {
                                                    smart_count: 2,
                                                })}
                                                leftIcon={<service.icon />}
                                                onClick={onMenuClick}
                                            />
                                            : null
                                    )}
                                />
                                <WithPermissions
                                    render={({ permissions }) => (
                                        isPermit(permissions, 'notice')
                                            ?
                                            <MenuItemLink
                                                to={`/notice`}
                                                primaryText={translate(`resources.notice.name`, {
                                                    smart_count: 2,
                                                })}
                                                leftIcon={<notice.icon />}
                                                onClick={onMenuClick}
                                            />
                                            : null
                                    )}
                                />
                            </SubMenu>
                            : null
                    )}
                />

                <WithPermissions
                    render={({ permissions }) => (
                        isPermit(permissions, 'setting')
                            ?
                            <MenuItemLink
                                to={`/setting`}
                                primaryText={translate(`resources.setting.name`, {
                                    smart_count: 2,
                                })}
                                leftIcon={<setting.icon />}
                                onClick={onMenuClick}
                            />
                            : null
                    )}
                />

                <Responsive
                    xsmall={
                        <MenuItemLink
                            to="/configuration"
                            primaryText={translate('com.configuration')}
                            leftIcon={<LangIcon />}
                            onClick={onMenuClick}
                        />
                    }
                    medium={null}
                />
                <Responsive
                    small={logout}
                    medium={null} // Pass null to render nothing on larger devices
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    open: state.admin.ui.sidebarOpen,
    theme: state.theme,
    locale: state.i18n.locale,
});

const enhance = compose(
    withRouter,
    connect(
        mapStateToProps,
        {
        }
    ),
    translate
);

export default enhance(Menu);