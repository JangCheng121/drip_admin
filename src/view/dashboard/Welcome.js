import React from 'react';
import compose from 'recompose/compose';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import CodeIcon from '@material-ui/icons/StayPrimaryPortrait';
import { withStyles } from '@material-ui/core/styles';
import { translate } from 'react-admin';

const styles = {
    root: {
        margin:'1em',
        flex: 2,
        // width: '50%',
    },
    media: {
        height: '18em',
    },
};

const config = require('../../config')
const web_url = config.webUrl;
const apk_url = config.baseUrl + '/assets/drip.apk';

// const mediaUrl = `${base_url}/assets/img/games/game_${parseInt(
//     Math.random() * 10,
//     14
// ) + 1}.png`;
const mediaUrl = `https://source.unsplash.com/random/750x300`;

const Welcome = ({ classes, translate }) => {

    return (
        <Card className={classes.root}>
            <CardMedia image={mediaUrl} className={classes.media}/>
            <CardContent>
                <Typography variant="headline" component="h2">
                    {translate('com.dashboard.welcome.title')}
                </Typography>
                <Typography component="p">
                    {translate('com.dashboard.welcome.subtitle')}
                </Typography>
            </CardContent>
            <CardActions style={{justifyContent: 'flex-end'}}>
                <Button href={web_url}>
                    <HomeIcon style={{paddingRight: '0.5em'}}/>
                    {translate('com.dashboard.welcome.gohome')}
                </Button>
                <Button href={apk_url}>
                    <CodeIcon style={{paddingRight: '0.5em'}}/>
                    {translate('com.dashboard.welcome.apk')}
                </Button>
            </CardActions>
        </Card>
    )
};

const enhance = compose(
    withStyles(styles),
    translate
);

export default enhance(Welcome);