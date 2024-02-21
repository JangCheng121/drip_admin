import React, { Component } from 'react';
import { 
    translate, 
} from 'react-admin';

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

// import Icon from '@material-ui/core/Icon';
// import Card from '@material-ui/core/Card';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import DataService from '../../dataProvider/dataService';

const ds = DataService.getInstance();

const styles = {
    root: {
        width: 600,
    },
    text: {
        width:'80%',
        flex:8
    },
    button: {
        height: 40,
        marginLeft:30,
        marginRight:30,
        // flex:1
    },
    upload: {
        // marginLeft:30,
        fontSize:32,
    }
};


class MsgInputComponent extends Component {
    state = {msg:''}

    handleSubmit(e) {
        if (e.which === 13) {
            e.preventDefault();
            this.props.set_msg('text', this.state.msg)
            this.setState({msg:''})
        }
    }
    handleChange = (e) => {
        this.setState({msg:e.target.value})
    }
    
    async onSelectFile(e) {
        let file = this.input.files[0];
        if(!file){
            return;
        }
        let type = '';
        if(file.type)
            type = ds.getMediaType(file.type);
        if(!type){
            return;
        }
        let progressFunc = function(progress){
            console.log("chat upload progress:",progress);
        }
        const filename = ds.getUniqueFileName();
        let upResult = await ds.uploadFile(type,'chat',file,filename,progressFunc);
        if(upResult && !upResult.fname){
            return;
        }else{
            this.props.set_msg(type, ds.staticUrl + '/' + upResult.fname)
        }
    }

    render() {
        const { set_msg, classes, translate } = this.props;

        return (
            <div style={{margin:20, flexDirection:'row', display:'flex', alignItems:'center'}}>
                <TextField
                    // id='123'
                    // label='name'
                    className={classes.text}
                    onChange={this.handleChange}
                    onKeyDown={this.handleSubmit.bind(this)}
                    margin='normal'
                    value={this.state.msg}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={()=> {
                        set_msg('text', this.state.msg)
                        this.setState({msg:''})
                    }}
                    className={classes.button}
                >
                    {translate('com.service.send')}
                </Button>

                <div style={{flex:1, marginBottom:5}}>
                    <label htmlFor="upload" className={classes.upload}>
                        <i className="fa fa-image fa-lg"></i>
                    </label>
                    <input ref={e => this.input = e}
                        type="file"
                        id="upload"
                        name="file"
                        multiple={false}
                        style={{display: 'none'}}
                        onChange={this.onSelectFile.bind(this)}
                    />
                </div>


            </div>
        );
    }
}

const mapStateToProps = state => ({
    version: state.admin.ui.viewVersion,
});

export default compose(
    connect(mapStateToProps),
    withStyles(styles),
    translate,
)(MsgInputComponent);