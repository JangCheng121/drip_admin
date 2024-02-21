import React, {useEffect} from 'react';
import ReactPlayer from 'react-player'
import MpegtsPlayer from './MpegTsPlayer';


const config = require('../../config')

const RtmpPlayer = (props) => {

    const {streamKey} = props;
    const videoUrl = `${config.hlsUrl}/${streamKey}.flv`;

    useEffect(() => {
        console.log(config)

    }, [])

    

    return (
        // <ReactPlayer
        //     url={`${config.hlsUrl}/${streamKey}/index.m3u8`}
        //     type={'application/mpegurl'}
        //     playing
        //     width={'100%'}
        //     height={'100%'}
        //     muted={false}
        //     controls={true}
        // />
        <MpegtsPlayer src={videoUrl} />
    )
}

export default RtmpPlayer;