import React from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { translate, changeLocale, Title } from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';
import compose from 'recompose/compose';
import { changeTheme } from '../../redux/actions';

import DataService from '../../dataProvider/dataService';
const dataService = DataService.getInstance();

const styles = {
    flex: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent:'center'},
    label: { width: '10em', display: 'inline-block' },
    button: { margin: '1em' },
};

const Configuration = ({
    classes,
    theme,
    locale,
    changeTheme,
    changeLocale,
    translate,
}) => (
    <Card>
        <Title title={translate('com.configuration')} />
        {/* <CardContent>
            <div className={classes.label}>{translate('com.theme.name')}</div>
            <Button
                variant="raised"
                className={classes.button}
                color={theme === 'light' ? 'primary' : 'default'}
                onClick={() => changeTheme('light')}
            >
                {translate('com.theme.light')}
            </Button>
            <Button
                variant="raised"
                className={classes.button}
                color={theme === 'dark' ? 'primary' : 'default'}
                onClick={() => changeTheme('dark')}
            >
                {translate('com.theme.dark')}
            </Button>
        </CardContent> */}
        <CardContent>
            <div className={classes.label}>{translate('com.language')}</div>
            <div className={classes.flex}>
                <Button
                    variant="raised"
                    className={classes.button}
                    color={locale === 'en' ? 'primary' : 'default'}
                    onClick={() => {
                            dataService.lang = 'en'
                            localStorage.setItem('lang', 'en')
                            changeLocale('en')
                        }
                    }
                >
                    English
                </Button>
                <Button
                    variant="raised"
                    className={classes.button}
                    color={locale === 'ko' ? 'primary' : 'default'}
                    onClick={() => {
                            dataService.lang = 'ko'
                            localStorage.setItem('lang', 'ko')
                            changeLocale('ko')
                        }
                    }
                >
                    한국어
                </Button>
                <Button
                    variant="raised"
                    className={classes.button}
                    color={locale === 'cn' ? 'primary' : 'default'}
                    onClick={() => {
                            dataService.lang = 'cn'
                            localStorage.setItem('lang', 'cn')
                            changeLocale('cn')
                        }
                    }
                >
                    中文
                </Button>
            </div>
        </CardContent>
    </Card>
);

const mapStateToProps = state => ({
    theme: state.theme,
    locale: state.i18n.locale,
});

const enhance = compose(
    connect(
        mapStateToProps,
        {
            changeLocale,
            changeTheme,
        }
    ),
    translate,
    withStyles(styles)
);

export default enhance(Configuration);