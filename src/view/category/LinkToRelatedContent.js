import React from 'react';
import compose from 'recompose/compose';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { translate } from 'react-admin';
import { stringify } from 'query-string';

import content from '../content';

const styles = {
    icon: { paddingRight: '0.5em' },
    link: {
        display: 'inline-flex',
        alignItems: 'center',
    },
};

const LinkToRelatedContent = ({ classes, record, translate }) => (
    <Button
        size="small"
        color="primary"
        component={Link}
        to={{
            pathname: '/content',
            search: stringify({
                page: 1,
                perPage: 25,
                sort: 'id',
                order: 'DESC',
                filter: JSON.stringify({ category_id: record.id }),
            }),
        }}
        className={classes.link}
    >
        <content.icon className={classes.icon} />
        {translate('resources.content.fields.name')}
    </Button>
);

const enhance = compose(
    withStyles(styles),
    translate
);
export default enhance(LinkToRelatedContent);