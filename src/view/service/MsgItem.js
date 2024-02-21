import React, { Component } from 'react';
import { 
    Responsive,
    translate 
} from 'react-admin';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/HighlightOff';
import PhotoSwipeGallery from 'photoswipe';
import PhotoswipeUIDefault from 'photoswipe/dist/photoswipe-ui-default';
import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import {getBriefTimeGap, isString} from '../../lib/common';

import DataService from '../../dataProvider/dataService';
const ds = DataService.getInstance();

const styles = {
    truncate: {
        width: 500,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        color: '#EFB5F5',
    },
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    del_icon: {
        color:'#c0c0c0', 
        position: 'absolute', 
        top:0, 
        right:0    
    },
    time: {
        backgroundColor: '#f0f0f0',
        fontSize:12,
        padding:5,
        // borderRadius:'50%',

    },
    chat_text: {
        maxWidth: '70%',
        wordBreak: 'break-all',
        textAlign: 'left',
        margin: 10,
        padding: 10,
        paddingRight: 30,
        backgroundColor: '#BCC4FF',
        borderRadius: 10,
        display: 'inline-block',
        color:'black',
    },
    chat_text2: {
        maxWidth: '70%',
        wordBreak: 'break-all',
        textAlign: 'left',
        margin: 10,
        padding: 10,
        backgroundColor: '#B6C6BA',
        borderRadius: 10,
        display: 'inline-block',
        color:'black',
    }
};

// const MsgItemView = ({ msg, handleClick, classes }) => {

class MsgItem extends Component {
    componentDidMount() {
    }
    componentWillUnmount(){
        this.closeGallery();
    }
    openGallery = (item) => {
        const items = [{
            src: item,
            w: 0,
            h: 0,
        }];
        const pswpElement = this.pswpElement;
        const options = {index: 0};
        this.gallery = new PhotoSwipeGallery( pswpElement, PhotoswipeUIDefault, items, options);
        this.gallery.listen('gettingData', (index, item) => {
            const _this = this;
            if (item.w < 1 || item.h < 1) { // unknown size
                var img = new Image();
                img.onload = function() { // will get size after load
                    item.w = this.width; // set image width
                    item.h = this.height; // set image height
                    _this.gallery.invalidateCurrItems(); // reinit Items
                    _this.gallery.updateSize(true); // reinit Items
                };
                img.src = item.src; // let's download image
            }
        });
        this.gallery.init();
    };
    closeGallery = () => {
        if (!this.gallery) return;
        this.gallery.close();
    };
    renderElem() {
        const {msg, handleClick, classes} = this.props;
        let msgItem
        if(msg.type === 'text' && isString(msg.content.data)) {
            msgItem = 
            <div style={{position:'relative'}}>
                <span className={msg.sender === 1? classes.chat_text:classes.chat_text2} >
                    {msg.content.data}
                </span>
                {msg.sender === 1?
                <IconButton  className={classes.del_icon} style={{color:'white'}} onClick={() => handleClick('delete', msg.id)}>
                    <DeleteIcon />
                </IconButton>   
                :null}
            </div>
        }
        else if (msg.type === 'image') {
            msgItem = 
                <div style={{position:'relative'}}>
                    <Responsive
                    small={
                        <img alt='' src={msg.content.data} style={{width:'50%', margin:10, borderRadius:10}} onClick={() => this.openGallery(msg.content.data)}/>
                    }
                    medium={
                        <img alt='' src={msg.content.data} style={{width:'20%', margin:10, borderRadius:10}} onClick={() => this.openGallery(msg.content.data)}/>
                    }       
                    />
                    {msg.sender === 1?
                    <IconButton  className={classes.del_icon}  onClick={() => handleClick('delete', msg.id)}>
                        <DeleteIcon />
                    </IconButton>
                    :null}
                </div>
        }
        else if (msg.type === 'video') {
            const pathElem = ds.splitPath(msg.content.data);
            const url = `${pathElem.dirname}${pathElem.filename}.png`;
            msgItem = 
                <div style={{position:'relative'}}>
                    <Responsive
                    small={
                        <video controls poster={url} style={{width:'60%', borderRadius:10, margin:10}}>
                            <source src={msg.content.data}/>
                        </video>
                    }
                    medium={
                        <video controls poster={url} style={{width:'40%', borderRadius:10, margin:10}}>
                            <source src={msg.content.data}/>
                        </video>
                    }       
                    />
                    {msg.sender === 1?
                    <IconButton  className={classes.del_icon} onClick={() => handleClick('delete', msg.id)}>
                        <DeleteIcon />
                    </IconButton>
                    :null}
                </div>
        }
        else if (msg.type === 'audio') {
            msgItem =
                <div style={{position:'relative'}}>
                    <Responsive
                        small={
                            <audio controls style={{width:'60%', borderRadius:10, margin:10}}>
                                <source src={msg.content.data} type="audio/mpeg"/>
                            </audio>
                        }
                        medium={
                            <audio controls style={{width:'40%', borderRadius:10, margin:10}}>
                                <source src={msg.content.data} type="audio/mpeg"/>
                            </audio>
                        }
                    />
                    {msg.sender === 1?
                        <IconButton  className={classes.del_icon} onClick={() => handleClick('delete', msg.id)}>
                            <DeleteIcon />
                        </IconButton>
                    :null}
                </div>
        }
        else if (msg.type === 'other') {
            msgItem =
                <div style={{position:'relative'}}>
                    <a href={msg.content.data} download >
                        <i className="fa fa-file fa-3x" style={{margin:10, color:'#E8B953'}}></i>
                    </a>
                    {msg.sender === 1?
                    <IconButton  className={classes.del_icon} onClick={() => handleClick('delete', msg.id)}>
                        <DeleteIcon />
                    </IconButton>
                    :null}
                </div>
        }
        return msgItem
    }
    timeago = (time) => {
        const {translate} = this.props;
        const ret = getBriefTimeGap(time);
        return ret.value + translate("com.service." + ret.str) + translate("com.service.ago")
    } 
    render() {
        const {msg} = this.props;
        return (
            <div>
            <div style={{textAlign:'center'}}>
                <span style={styles.time}>{this.timeago(msg.ctime)}</span>
            </div>
            <div style={msg.sender === 1?{textAlign:'end'}:{}}>
                {this.renderElem(msg)}
            </div>
            <div className="pswp" tabIndex="-1" role="dialog" aria-hidden="true" ref={(div) => {this.pswpElement = div;} }>
                <div className="pswp__bg" />
                <div className="pswp__scroll-wrap">
                    <div className="pswp__container">
                        <div className="pswp__item" />
                        <div className="pswp__item" />
                        <div className="pswp__item" />
                    </div>
                    <div className="pswp__ui pswp__ui--hidden">
                        <div className="pswp__top-bar">
                            <div className="pswp__counter" />
                            <button className="pswp__button pswp__button--close" title="Close (Esc)" />
                            <button className="pswp__button pswp__button--share" title="Share" />
                            <button className="pswp__button pswp__button--fs" title="Toggle fullscreen" />
                            <button className="pswp__button pswp__button--zoom" title="Zoom in/out" />
                            <div className="pswp__preloader">
                                <div className="pswp__preloader__icn">
                                    <div className="pswp__preloader__cut">
                                        <div className="pswp__preloader__donut" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                            <div className="pswp__share-tooltip" />
                        </div>
                        <button className="pswp__button pswp__button--arrow--left" title="Previous (arrow left)" />
                        <button className="pswp__button pswp__button--arrow--right" title="Next (arrow right)" />
                        <div className="pswp__caption">
                            <div className="pswp__caption__center" />
                        </div>
                    </div>
                </div>
            </div>
       
        </div>

        )
    }

}

const mapStateToProps = state => ({
    version: state.admin.ui.viewVersion,
});

export default compose(
    connect(mapStateToProps),
    translate,
    withStyles(styles),
)(MsgItem);

