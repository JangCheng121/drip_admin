import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import ReactPlayer from 'react-player'

const styles = {
    root: { display: 'inline-block', marginTop: '1em', zIndex: 2 },
    content: { padding: 0, '&:last-child': { padding: 0 } },
    img: {
        width: 'initial',
        minWidth: 'initial',
        maxWidth: '42em',
        maxHeight: '15em',
    },
};

export const ImagePlayer = withStyles(styles)(({ classes, record }) => {
    return record.type === 'image' ? <image width={'100%'} alt='img' src = {record.media[0].src} />:null
})

export const VideoPlayer = withStyles(styles)(({ classes, record }) => {
    return record.type === 'video' && (record.media && record.media.length) ? <ReactPlayer playing Autoplay muted controls = {true} width={'100%'} height={200} url = {record.media[0].src} config = {{ file: { forceVideo: true }}}/>:null})

export const AudioPlayer = withStyles(styles)(({ classes, record }) => {
    return record.type === 'audio' ? <ReactPlayer controls = {true} url = {record.media[0].src} width={'100%'} height={50} config = {{ file: { forceAudio: true }}}/>:null
})

