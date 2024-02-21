import React from 'react';
import { 
    Datagrid, 
    Responsive, 
    List, 
    FunctionField,
    TextField,
    DateField,
    translate,
    Pagination,
    NumberField,
    Filter,
    ReferenceInput,
    AutocompleteInput,
    SelectInput,
    DateInput,
    ReferenceField,
} from 'react-admin';

import { withStyles } from '@material-ui/core/styles';
import PointHistoryIcon from '@material-ui/icons/Grain';
import UserAvatarField from '../widget/UserAvatarField';
const styles = {
    image: { maxHeight: '1.5rem' },
    rowEven: {
        backgroundColor: '#fcfcfc',
    },
}

const PointHistoryFilter = props => (
    <Filter {...props}>
        <ReferenceInput
            source="user_id"
            reference="user"
            perPage={100}
            filter={{ role: { $ne: 'virtual' } }}
        >
            <AutocompleteInput optionText="name" />
        </ReferenceInput>

        <SelectInput source="type" choices={[
            { id: 1, name: 'resources.point_history.type.in' },
            { id: 2, name: 'resources.point_history.type.out' },
        ]} />
        <DateInput source="ctime"/>
    </Filter>
);

const PointHistoryPagination = props => <Pagination rowsPerPageOptions={[100,50,25,10]} {...props} />

const PointHistoryList = translate(withStyles(styles) (( { classes, permissions, translate, ...props } ) => (
    <List 
        {...props} 
        sort={{ field: 'id', order: 'DESC' }}         
        filters={<PointHistoryFilter />}
        pagination={<PointHistoryPagination />}
    >
        <Responsive
            small={
                <Datagrid classes={{ rowEven: classes.rowEven }}>
                    <ReferenceField source="user_id" reference="user" linkType={false}>
                        <UserAvatarField />
                    </ReferenceField>
                    <NumberField source="point" />                    
                    <FunctionField source="info" render={record =>  translate('resources.point_history.info.'+record.info)} />
                </Datagrid>
            }
            medium={
                <Datagrid classes={{ rowEven: classes.rowEven }}>
                    <ReferenceField source="user_id" reference="user" linkType={false}>
                        <UserAvatarField />
                    </ReferenceField>
                    <NumberField source="point" />                    
                    <FunctionField source="type" render={record =>  record.type===2?  <i className="icon-arrow-up-circle icons font-2xl d-block mt-4"/>:<i className="icon-arrow-down-circle icons font-2xl d-block mt-4"/>} />
                    <FunctionField source="info" render={record =>  translate('resources.point_history.info.'+record.info)} />
                    <TextField source="extra"/>
                    <DateField source="ctime" options = {{ year: 'numeric', month: '2-digit', day: '2-digit', hour12: false, hour: '2-digit', minute: '2-digit'}} />
                </Datagrid>
            }
        />
    </List>
)))

export default {
    list: PointHistoryList,
    icon: PointHistoryIcon,
};