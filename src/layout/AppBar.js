import React from 'react';

import { AppBar, UserMenu, MenuItemLink, translate, WithPermissions, } from 'react-admin';
import Typography from '@material-ui/core/Typography';
import LangIcon from '@material-ui/icons/Language';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Logo from './Logo';
import CashAlarm from '../widget/CashAlarm';
import ChatAlarm from '../widget/ChatAlarm';
import ContentAlarm from '../widget/ContentAlarm';
import ReviewAlarm from '../widget/ReviewAlarm';
import {isPermit} from '../lib/common';
import DataService from '../dataProvider/dataService';
const dataService = DataService.getInstance();

const styles = theme => ({
    margin: {
      margin: theme.spacing.unit * 2,
    },
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    spacer: {
        flex: 1,
    },
});
  

const myCustomIconStyle = {
    avatar: {
        height: 30,
        width: 30,
    },
};
const MyCustomIcon = withStyles(myCustomIconStyle)(
    ({ classes }) => (
        <Avatar
            className={classes.avatar}
            src={dataService.mi.picture}
        />
    )
);

const CustomUserMenu = translate(({ translate, ...props }) => (
    <UserMenu {...props} icon={<MyCustomIcon />}>
        <MenuItemLink
            to="/configuration"
            primaryText={translate('com.configuration')}
            leftIcon={<LangIcon />}
        />
    </UserMenu>
));

const CustomAppBar = ({ classes, permissions, ...props }) => (
    <AppBar {...props} userMenu={<CustomUserMenu />}>
        <Typography
            variant="title"
            color="inherit"
            className={classes.title}
            id="react-admin-title"
        />
        <Logo />
        <span className={classes.spacer} />
        <WithPermissions
            render={({ permissions }) => (
                isPermit(permissions, 'cash') &&
                <CashAlarm/>
            )}
        />
        <WithPermissions
            render={({ permissions }) => (
                isPermit(permissions, 'content') &&
                <ContentAlarm/>
            )}
        />
        <WithPermissions
            render={({ permissions }) => (
                isPermit(permissions, 'service') &&
                <ChatAlarm/>
            )}
        />
        <WithPermissions
            render={({ permissions }) => (
                isPermit(permissions, 'review') &&
                <ReviewAlarm/>
            )}
        />
    </AppBar>
);

export default withStyles(styles)(CustomAppBar);