import React from 'react';
import Avatar from '@material-ui/core/Avatar';

const GiftAvatarField = ({ record = {}, size }) => (
    <div style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center' }}>
        <Avatar
            src={`${record.img}?size=${size}x${size}`}
            size={size}
            style={{ width: size, height: size }}
        />&nbsp;
        {record.name}
    </div>
);

GiftAvatarField.defaultProps = {
    label: 'resources.gift.name',
    source: 'gift_id',
    size: 25,
    addLabel: true,
};

export default GiftAvatarField;