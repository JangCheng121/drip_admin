import React from 'react';
import Avatar from '@material-ui/core/Avatar';

export const AvatarField = ({ record, size }) => (
    <Avatar
        src={`${record.picture}?size=${size}x${size}`}
        size={size}
        style={{ width: size, height: size }}
    />
);

AvatarField.defaultProps = {
    size: 25,
};

export const FlagField = ({ code, sex }) => {
    return code === 'CHN'? <i class="flag-icon flag-icon-cn"/>:<i class="flag-icon flag-icon-ko"/>
}

export const SexField = ({ sex }) => {
    return sex? <i className="fa fa-mars fa-lg"/>:<i className="fa fa-venus fa-lg"/>
}

