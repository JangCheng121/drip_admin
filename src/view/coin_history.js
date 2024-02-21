import React from 'react';
import { 
    Datagrid, 
    Responsive, 
    List, 
    FunctionField,
    DateField,
    ReferenceField,
    translate,
    NumberField,
    Filter,
    ReferenceInput,
    AutocompleteInput,
    SelectInput,
    DateInput,
} from 'react-admin';

import { withStyles } from '@material-ui/core/styles';
import CoinHistoryIcon from '@material-ui/icons/GroupWork';
import UserAvatarField from '../widget/UserAvatarField';
const styles = {
    image: { maxHeight: '1.5rem' },
    rowEven: {
        backgroundColor: '#fcfcfc',
    },
}

const CoinHistoryFilter = props => (
    <Filter {...props}>
        <ReferenceInput 
            source="user_id" 
            reference="user" 
            perPage={10}
            filter={{ role: { $ne: 'virtual' } }}
        >
            <AutocompleteInput optionText="name" />
        </ReferenceInput>

        <SelectInput source="type" alwaysOn choices={[
            { id: 1, name: 'resources.coin_history.type.in' },
            { id: 2, name: 'resources.coin_history.type.out' },
        ]} />
        <DateInput source="ctime"/>
    </Filter>
);


const CoinHistoryList = translate(withStyles(styles) (( { classes, permissions, translate, ...props } ) => (
    <List 
        {...props} 
        sort={{ field: 'id', order: 'DESC' }}         
        filters={<CoinHistoryFilter />}
    >
        <Responsive
            small={
                <Datagrid classes={{ rowEven: classes.rowEven }}>
                    <ReferenceField source="user_id" reference="user" linkType={false}>
                        <UserAvatarField />
                    </ReferenceField>
                    <NumberField source="coin" />                    
                    <FunctionField source="info" render={record =>  translate('resources.coin_history.info.'+record.info)} />
                </Datagrid>
            }
            medium={
                <Datagrid classes={{ rowEven: classes.rowEven }}>
                    <ReferenceField source="user_id" reference="user" linkType={false}>
                        <UserAvatarField />
                    </ReferenceField>
                    <NumberField source="coin" />                    
                    <FunctionField source="type" render={record =>  record.type===2?  <i className="icon-arrow-up-circle icons font-2xl d-block mt-4"/>:<i className="icon-arrow-down-circle icons font-2xl d-block mt-4"/>} />
                    <FunctionField source="info" render={record =>  translate('resources.coin_history.info.'+record.info)} />
                    <DateField source="ctime" options = {{ year: 'numeric', month: '2-digit', day: '2-digit', hour12: false, hour: '2-digit', minute: '2-digit'}} />
                </Datagrid>
            }
        />
    </List>
)))

export default {
    list: CoinHistoryList,
    icon: CoinHistoryIcon,
};