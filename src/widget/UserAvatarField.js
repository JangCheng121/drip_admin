import React from 'react';
import Avatar from '@material-ui/core/Avatar';

const UserAvatarField = ({ record = {}, size, showName = true }) => (
    <div style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center' }}>
        <Avatar
            src={`${record.picture}?size=${size}x${size}`}
            size={size}
            style={{ width: size, height: size, backgroundColor:'lightgray' }}
        />&nbsp;
        {showName?record.name:null}
    </div>
);

UserAvatarField.defaultProps = {
    // label: 'resources.user.name',
    // source: 'user_id',
    size: 25,
    addLabel: true,
};

export default UserAvatarField;