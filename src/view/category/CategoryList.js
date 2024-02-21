import React from 'react';
import { 
    Datagrid, 
    TextField,
    List, 
    Responsive,
    Pagination,
    NumberField,
    ReferenceField,
    ArrayField,
    SingleFieldList,
    ChipField,
    SelectField,
} from 'react-admin';

import Card from '@material-ui/core/Card';
import withStyles from '@material-ui/core/styles/withStyles';
import EchartsTree from '../echarts/EchartsTree';
import {langs, mTypes} from "../../lib/common";

const styles = {
    name: { padding: '0 5px 0 5px' },
};

const rowStyle = (record, index) => ({
    backgroundColor: record.state === 'pending' ? '#F9E3FD' : index % 2 ? '#fbfbfb' : 'white',
});

const PostPagination = props => <Pagination rowsPerPageOptions={[100]} {...props} />

export const CategoryList = withStyles(styles) (( { classes, permissions, ...props } ) => (
    <Responsive
        small={
            <div>
                <Card style={{width:'90%', margin:'1em'}}><EchartsTree {...props} /></Card>                    
                <List
                    filter={{ id: { $gt: 1 } }}
                    perPage={100}
                    sort={{ field: 'parent_id', order: 'ASC' }}
                    pagination={<PostPagination />}
                    {...props}
                >
                    <Datagrid  rowStyle={rowStyle} rowClick="edit">
                        <ArrayField source="trans"  linkType={false}>
                            <SingleFieldList>
                                <ChipField source="str" />
                            </SingleFieldList>
                        </ArrayField>
                    </Datagrid>
                </List>
            </div>
        }
        medium={
            <div>
                <Card style={{width:'95%', margin:'1em'}}><EchartsTree {...props} /></Card>                    
                <List
                    filter={{ id: { $gt: 1 } }}
                    perPage={100}
                    sort={{ field: 'parent_id', order: 'ASC' }}
                    pagination={<PostPagination />}
                    {...props}
                >
                    <Datagrid  rowStyle={rowStyle} rowClick="edit">
                        <NumberField source="id" />
                        <NumberField source="parent_id" />
                        <TextField source="name" />
                        <ArrayField source="trans"  linkType={false}>
                            <SingleFieldList>
                                <ChipField source="str" />
                            </SingleFieldList>
                        </ArrayField>
                        <SelectField source="type" choices={mTypes}/>
                        <ReferenceField source="enter_level" reference="vip" linkType={false}>
                            <TextField source="name" />
                        </ReferenceField>
                        <TextField source="description" />
                    </Datagrid>
                </List>
            </div>
        }
    />
))

export default withStyles(styles)(CategoryList);