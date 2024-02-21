import React, { Component } from 'react';
import { 
    GET_LIST, 
    withDataProvider, 
    DELETE,
    Responsive, 
    translate, 
} from 'react-admin';

import compose from 'recompose/compose';
import { connect } from 'react-redux';

import MsgListView from './MsgListView';
import SearchComponent from './SearchComponent';
import MsgInput from './MsgInput';
import DataService from '../../dataProvider/dataService';
import {AvatarField} from "../../widget/AvatarField";

const config = require('../../config')
const user_all = {id:-1, picture: config.baseUrl + '/assets/img/users/user_all.jpg', name:"all", count:0};
const user_online = {id:-2, picture: config.baseUrl + '/assets/img/users/user_online.jpg', name:"online", count:0};
const ds = DataService.getInstance();

let vm
class Serviceboard extends Component {
    state = {unreadUsers:[]};

    componentDidMount() {
        vm = this

        const { translate } = this.props;
        user_all.name = translate('com.service.user_all')
        user_online.name = translate('com.service.user_online')
        let curUser = localStorage.getItem('currentChatUser')
        if (curUser) {
            curUser = JSON.parse(curUser)
            this.setFrom(curUser)
        }
        else {
            this.setFrom(user_all)
        }
        ds.receiveChat = this.receiveChat.bind(this)

        ds.fetchServer('/api/message/service_stat').then((res) => {
            if (curUser) {
                let i
                for(i = 0; i < res.length; i++) {
                    if(res[i].id === curUser.id) break;
                }
                if (i === res.length && curUser.id > 0) {
                    this.setState({unreadUsers:[user_all, user_online, curUser].concat(res)})
                    return
                }
            }
            this.setState({unreadUsers:[user_all, user_online].concat(res)});
        })
    }


    componentDidUpdate(prevProps) {
        // handle refresh
        if (this.props.version !== prevProps.version) {
        }
    }

    addUser = (user) => {
        let i
        for (i = 0; i < this.state.unreadUsers.length; i++) {
            if (this.state.unreadUsers[i].id === user.id) {
                break;
            }
        }      
        //새로운 유저인 경우 유저리스트에 추가한다
        if (i === this.state.unreadUsers.length) {
            const newData = [].concat(this.state.unreadUsers)
            newData.push(user)
            this.setState({ unreadUsers:newData});
        }
    }

    receiveChat = (data, callback) => {
        //받은 채팅이 현재 채팅중의 유저이면 채팅화면갱신
        if (data.sender === vm.state.user.id) {
            //서버에 채팅확인상태를 전달한다
            callback(data.id)
            const new_msgs = Object.assign([], vm.state.msgs);
            new_msgs.push(data)
            vm.setState({ msgs:new_msgs });    
        }
        else {
            let i
            //미확인상태수를 갱신
            for (i = 0; i < vm.state.unreadUsers.length; i++) {
                if (vm.state.unreadUsers[i].id === data.receiver) {
                    const newData = [].concat(vm.state.unreadUsers)
                    newData[i].count++
                    newData[i] = Object.assign({}, newData[i])
                    vm.setState({ unreadUsers:newData});
                    break;
                }
            }      
            //새로운 유저인 경우 서버에서 다시 적제한다      
            if (i === vm.state.unreadUsers.length) {
                ds.fetchServer('/api/message/service_stat').then((res) => {
                    vm.setState({unreadUsers:[user_all, user_online].concat(res)});
                })
            }
        }
    }

    async fetchData(from) {
        const { dataProvider } = this.props;
        const {data, total} = await dataProvider(GET_LIST, 'message', {
            filter: { $or: [ { $and: [ { "sender": from.id }, { "receiver": 1 } ] }, { $and: [ { "sender": 1 }, { "receiver": from.id } ] } ] },
            sort: { field: 'ctime', order: 'ASC' },
            pagination: { page: 1, perPage: 100 },
        });

        this.setState({
            user:from,
            msgs:data,
            total:total,
        });
    }
    setMsg = (type, msg) => {
        if(msg.length) {
            if (ds.socket) {
                const data = {id:ds.createUUID(), sender:1, receiver:this.state.user.id, type:type, mode:'private', content:{'data':msg}, ctime:new Date()}
                ds.sendSocket('newMessage', data);
                const new_msgs = Object.assign([], this.state.msgs);
                new_msgs.push(data)
                this.setState({ msgs:new_msgs });    
            }
            else this.props.history.push('/login') //로그인페지로 .. 소켓을 로그인할때 창조된다
        }
    }
    setFrom = (from) => {
        this.fetchData(from)
        // this.addUser(from)
        localStorage.setItem('currentChatUser', JSON.stringify(from))
    }
    handleClick = (cmd, id) => {
        const { dataProvider } = this.props;
        let new_msgs = []
        if (cmd === 'delete') {
            for(let i = 0; i < this.state.msgs.length; i++) {
                if (this.state.msgs[i].id === id) {
                    //서버에 반영
                    dataProvider(DELETE, 'message', {'id': id});
                    continue
                }
                new_msgs.push(this.state.msgs[i])
            }
        }
        this.setState({
            msgs:new_msgs,
            total:new_msgs.length,
        });
    }

    render() {
        const {
            msgs,
            total,
            user,
            unreadUsers
        } = this.state;

        if(!user) return null

        return (
            <Responsive
                small={
                    <div>
                        <SearchComponent users={unreadUsers} setFrom={this.setFrom.bind(this)} addUser={this.addUser.bind(this)}/>
                        <div style={{marginLeft:30}}>
                            <AvatarField record={user} size={40} />
                        </div>
                        <MsgListView msgs={msgs} total={total} user={user} handleClick={this.handleClick.bind(this)}/>
                        <MsgInput set_msg={this.setMsg.bind(this)}/>
                    </div>
                }
                medium = {
                    <div>
                        <div style={{position: 'absolute', top:70, left: 200, zIndex: 100}}>
                            <AvatarField record={user} size={60} />
                        </div>
                        
                        <div style={{flexDirection:'row', display:'flex'}}>
                            <div  style={{flex:4, margin:20}}>
                                <MsgListView msgs={msgs} total={total} user={user} handleClick={this.handleClick.bind(this)}/>
                                <MsgInput set_msg={this.setMsg.bind(this)}/>
                            </div>
                            <div style={{flex:1, margin:20}}>
                                <SearchComponent users={unreadUsers} setFrom={this.setFrom.bind(this)} addUser={this.addUser.bind(this)}/>
                            </div>
                        </div>

                    </div>
                }
            />
        );
    }
}

const mapStateToProps = state => ({
    version: state.admin.ui.viewVersion,
});

export default compose(
    connect(mapStateToProps),
    withDataProvider,
    translate,
)(Serviceboard);