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
    BooleanField,
    SelectField,
} from 'react-admin';

import Chip from '@material-ui/core/Chip';
import { AiOutlineQq, AiOutlineWechat } from "react-icons/ai";
import { withStyles } from '@material-ui/core/styles';
import PayHistoryIcon from '@material-ui/icons/AttachMoney';
import UserAvatarField from '../widget/UserAvatarField';

const styles = {
    image: { maxHeight: '1.5rem' },
    rowEven: {
        backgroundColor: '#fcfcfc',
    },
}

const PayHistoryFilter = props => (
    <Filter {...props}>
        <ReferenceInput
            source="user_id"
            reference="user"
            perPage={100}
            filter={{ role: { $ne: 'virtual' } }}
        >
            <AutocompleteInput optionText="name" />
        </ReferenceInput>

        {/*<SelectInput source="type" choices={[*/}
            {/*{ id: 1, name: 'resources.point_history.type.in' },*/}
            {/*{ id: 2, name: 'resources.point_history.type.out' },*/}
        {/*]} />*/}
        <DateInput source="ctime"/>
    </Filter>
);

// const PayTypeView = translate(({ record, translate }) => (
//     <Chip
//         label={record.type === 1?translate('resources.cash_history.type.in'):translate('resources.cash_history.type.out')}
//         style={{backgroundColor:record.type === 1?'#4ba236':'#cc455f', color:'white'}}
//     />
// ));

const PayHistoryPagination = props => <Pagination rowsPerPageOptions={[100,50,25,10]} {...props} />

const PayHistoryList = translate(withStyles(styles) (( { classes, permissions, translate, ...props } ) => (
    <List 
        {...props} 
        sort={{ field: 'id', order: 'DESC' }}         
        filters={<PayHistoryFilter />}
        pagination={<PayHistoryPagination />}
    >
        <Responsive
            small={
                <Datagrid classes={{ rowEven: classes.rowEven }}>
                    <ReferenceField source="user_id" reference="user" linkType={false}>
                        <UserAvatarField />
                    </ReferenceField>
                    <NumberField source="fee" />
                    <DateField source="ctime" options = {{ year: 'numeric', month: '2-digit', day: '2-digit', hour12: false, hour: '2-digit', minute: '2-digit'}} />
                </Datagrid>
            }
            medium={
                <Datagrid classes={{ rowEven: classes.rowEven }}>
                    <ReferenceField source="user_id" reference="user" linkType={false}>
                        <UserAvatarField />
                    </ReferenceField>
                    <NumberField source="fee" />
                    <TextField source="fee_type" />
                    {/*<PayTypeView source="type"/>*/}
                    <BooleanField source="state"/>
                    <SelectField source="agent_type" choices={[
                        { id: 1, name: <AiOutlineWechat style={{fontSize:30, color:'mediumseagreen', marginTop:8}}/> },
                        { id: 2, name: <AiOutlineQq style={{fontSize:30, color:'tomato', marginTop:8}}/> },
                    ]} />
                    <DateField source="ctime" options = {{ year: 'numeric', month: '2-digit', day: '2-digit', hour12: false, hour: '2-digit', minute: '2-digit'}} />
                </Datagrid>
            }
        />
    </List>
)))

export default {
    list: PayHistoryList,
    icon: PayHistoryIcon,
};