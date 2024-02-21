import React from 'react';
import {
    translate,
} from 'react-admin';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#f0f0f0',
    // color: theme.palette.common.black,
    fontSize: 15,
    fontWeight: 'bold'
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    // minWidth: 700,
  },
  row: {
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

const CustomizedTable = ({ stats, days, translate, classes }) => (
  <Paper className={classes.root}>
  <Table className={classes.table}>
    <TableHead>
      <TableRow className={classes.row}>
        <CustomTableCell>{translate('resources.cash_history.fields.type')}</CustomTableCell>
        {stats.map(stat => (
          <CustomTableCell align="right">{translate('resources.cash_history.type.'+stat.type)}</CustomTableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {days.map(day => (
        <TableRow className={classes.row} key={day}>
          <CustomTableCell component="th" scope="row">
          {translate('resources.cash_history.days.'+day)}
          </CustomTableCell>
          {stats.map(stat => (
            <CustomTableCell align="right">{stat.data[day]}</CustomTableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
</Paper>
);

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default translate(withStyles(styles)(CustomizedTable));