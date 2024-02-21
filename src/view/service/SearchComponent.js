import React, { Component } from 'react';
import { 
    GET_LIST, 
    GET_ONE, 
    withDataProvider, 
    // Responsive, 
    // translate 
} from 'react-admin';

import compose from 'recompose/compose';
import { connect } from 'react-redux';
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import UserAvatarField from '../../widget/UserAvatarField';

const styles = {
    badge: {
        backgroundColor: "#FF7661",
        color:'white',
        position: 'absolute',
        left:20,
        top:-20,
        zIndex:3,
    },
    text: {
        width:'80%'
    }
};

class SearchComponent extends Component {
    state = {
    };
    searchText = ''

    componentDidMount() {
    }

    async fetchData() {
        try {
            const { dataProvider } = this.props;
            let res;
            let user;
            if (isNaN(this.searchText)) {
                //이름으로 검색
                res = await dataProvider(GET_LIST, 'user', {
                        filter: { name: this.searchText},
                        sort: { field: 'id', order: 'DESC' },
                        pagination: { page: 1, perPage: 100 },
                });
                if (res.data.length) user = res.data[0]
            }
            else {
                //id로 검색
                res = await dataProvider(GET_ONE, 'user', {id: Number(this.searchText)});
                user = res.data
            }    
            if (user) {
                user.count = 0
                this.props.addUser(user)
            }
        }
        catch(e) {
            console.log(e)
        }
    }
    handleChange = (e) => {
        this.searchText = e.target.value
    }

    render() {
        const { users, setFrom, classes } = this.props;
        if (!users) return null

        return (
            <Card style={{marginBottom:20, padding:20}}>
                <TextField   
                    className={classes.text}                                 
                    onChange={this.handleChange}
                    margin='normal'
                />

                <IconButton  aria-label="Search" onClick={()=>this.fetchData()}>
                    <SearchIcon />
                </IconButton>   

                {users?
                    <List>
                    {users.map(user => (
                        <div key={user.id} onClick={() => {setFrom(user)}} style={{margin:10, display:'block'}}>
                            <UserAvatarField record={user} size={40} />
                            {user.count?
                            <Badge classes={{ badge: classes.badge }} badgeContent={user.count}></Badge>
                            :null}                            
                        </div>                        
                    ))}
                    </List>                
                :null}             
            </Card>
        );
    }
}

const mapStateToProps = state => ({
    version: state.admin.ui.viewVersion,
});

export default compose(
    connect(mapStateToProps),
    withDataProvider,
    withStyles(styles),
)(SearchComponent);