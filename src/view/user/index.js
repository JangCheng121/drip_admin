import React from 'react';
import {
    Datagrid,
    TabbedForm,
    FormTab,
    Toolbar,
    Filter,
    List,
    Create,
    Edit,
    FormDataConsumer,
    Responsive,
    SimpleList,
    SimpleFormIterator,
    SaveButton,
    CloneButton,
    ListButton,
    DateInput,
    DeleteButton,
    TextInput,
    NumberInput,  
    NullableBooleanInput,
    BooleanInput,
    SelectInput,
    ReferenceInput,
    ArrayInput,
    AutocompleteInput,
    LongTextInput,
    SelectArrayInput,
    DateField,
    NumberField,
    EmailField,
    TextField,
    SelectField,
    FunctionField,
} from 'react-admin';

import withStyles from '@material-ui/core/styles/withStyles';
import UserIcon from '@material-ui/icons/Person';

import UserAvatarField from '../../widget/UserAvatarField';
import ColoredNumberField from '../../widget/ColoredNumberField';
import Badge from '@material-ui/core/Badge';

import {
    AvatarField, 
    // SexField, 
    // FlagField
} from '../../widget/AvatarField';

import {roles, menus, countries} from '../../lib/common';
import Grid from '@material-ui/core/Grid';
import DataService from '../../dataProvider/dataService';
const dataService = DataService.getInstance();

const UserFilter = props => (
    <Filter {...props}>
        <SelectInput source="role" choices={roles} alwaysOn />
        <ReferenceInput
            label="resources.user.fields.name"
            source="id"
            reference="user"
            perPage={100}
            filter={{ role: { $ne: 'virtual' } }}
            allowEmpty
        >
            <AutocompleteInput optionText="name" />
        </ReferenceInput>
        <TextInput source="uuid"/>
        <DateInput source="ctime" />
        <NullableBooleanInput source="state" />
    </Filter>
);

const list_styles = theme => ({
    nb_commands: { color: 'purple' },
    customBadge: {
        backgroundColor: "#239000",
    },  
    customBadge2: {
        backgroundColor: "#BE1919",
    },  
    rowEven: {
        backgroundColor: '#fcfcfc',
    },
});


const UserList = withStyles(list_styles) (( { classes, permissions, ...props } ) => (
    <List  
        {...props}
        filters={<UserFilter />}
        sort={{ field: 'point', order: 'DESC' }}
        perPage={25}
        exporter={false}
    >
        <Responsive
            small={
                <Datagrid rowClick="edit" classes={{ rowEven: classes.rowEven }} >
                    <NumberField source="id" />
                    <UserAvatarField />
                    <NumberField source="point" />
                </Datagrid>
            }
            medium={
                <Datagrid rowClick="edit" classes={{ rowEven: classes.rowEven }} >
                    <NumberField source="id" />
                    <UserAvatarField />

                    {/* <DateField source="login_time" type="date" /> */}
                    <ColoredNumberField
                        source="coin"
                    />
                    <NumberField source="point" />
                     
                    <EmailField source="email" />
                    <TextField source="uuid" />
                    <TextField source="phone" />
                    <FunctionField source="sex" render={record =>  record.sex?  <i className="fa fa-mars fa-lg"/>:<i className="fa fa-venus fa-lg"/>} />
                    <SelectField source="state" style={{paddingLeft:12}} choices={[
                        { id: true, name: <Badge classes={{ badge: classes.customBadge }}/> },
                        { id: false, name: <Badge classes={{ badge: classes.customBadge2 }}/> },
                    ]} />
                    <DateField source="birthday" type="date" />
                    <SelectField source="country" choices={[
                        { id: 'CHN', name: <i class="flag-icon flag-icon-cn"/> },
                        { id: 'RUS', name: <i class="flag-icon flag-icon-ru"/> },
                        { id: 'ENG', name: <i class="flag-icon flag-icon-gb"/> },
                        { id: 'KOR', name: <i class="flag-icon flag-icon-kr"/> },
                        { id: 'JPN', name: <i class="flag-icon flag-icon-jp"/> },
                    ]} />
                    <DateField source="ctime" />
                    <NumberField source="stat.login_total" />
                </Datagrid>
            }
        />
    </List>
))

const styles = {
    first_name: { display: 'inline-block' },
    last_name: { display: 'inline-block', marginLeft: 32 },
    email: { width: '50%' },
    picture: { width: '50%' },
    address: { maxWidth: '50%' },
    inline: {
        flexDirection:'row',
        display: 'flex',
        width: '100%'
    },
    comment: {
        maxWidth: '20em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
};

const UserCreate = withStyles(styles) (( { classes, permissions, ...props } ) => (
    <Create {...props}>
        <Responsive
            small={
                <TabbedForm toolbar={<CustomToolbar />}>
                    <FormTab label="resources.user.tab.identity">
                        <TextInput source="name" formClassName={classes.first_name}/>
                        <TextInput source="password" />
                        <TextInput
                            type="email"
                            source="email"
                            validation={{ email: true }}
                            fullWidth={true}
                            formClassName={classes.email}
                        />
                        <DateInput source="birthday" />
                        <TextInput source="phone"/>
                        <NumberInput source="point" />
                        <NumberInput source="coin" />
                        <TextInput source="uuid"/>

                        <BooleanInput source="block.chat"/>
                        <BooleanInput source="block.content_view" />
                        <BooleanInput source="block.friend" />
                        <BooleanInput source="block.review_view" />
                        <BooleanInput source="block.review" />
                        <BooleanInput source="block.save_view" />
                    </FormTab>

                    <FormTab label="resources.user.tab.address">
                        <LongTextInput source="address" formClassName={classes.address} />
                        <TextInput source="zipcode"/>
                        <TextInput source="city"/>
                    </FormTab>
                    <FormTab label="resources.user.tab.bank">
                        <TextInput source="bank.name" />
                        <TextInput source="bank.card"   />
                        <TextInput source="bank.owner"   />
                    </FormTab>
                    <FormTab label="resources.user.tab.enter_categories">
                        <ArrayInput source="enter_categories"  style={{ width: '40%' }} label="">
                            <SimpleFormIterator>
                                <ReferenceInput source="category_id" reference="category" label="resources.category.name">
                                    <SelectInput optionText="name" />
                                </ReferenceInput>
                                <DateInput source="from" defaultValue={new Date()} formClassName={classes.inline_margin} style={{ width: 150 }} label="resources.popup.fields.from" />
                                <DateInput source="to" defaultValue={new Date()} formClassName={classes.inline_margin} style={{ width: 150 }} label="resources.popup.fields.to" />
                            </SimpleFormIterator>
                        </ArrayInput>
                    </FormTab>
                </TabbedForm>

            }
            medium={
                <TabbedForm toolbar={<CustomToolbar />}>
                    <FormTab label="resources.user.tab.identity">
                        <TextInput source="name" formClassName={classes.first_name}/>
                        <TextInput source="password" />
                        <DateInput source="birthday" />
                        <NumberInput source="point" />
                        <NumberInput source="coin" />
                        <TextInput source="uuid"/>

                        <div className={classes.inline} >
                            <div>
                                <BooleanInput source="block.chat" label="resources.user.fields.block.chat"/>
                                <BooleanInput source="block.content_view" label="resources.user.fields.block.content_view"/>
                            </div>
                            <div >
                                <BooleanInput source="block.friend"  label="resources.user.fields.block.friend"/>
                                <BooleanInput source="block.review_view" label="resources.user.fields.block.review_view"/>
                            </div>
                            <div >
                                <BooleanInput source="block.review"  label="resources.user.fields.block.review"/>
                                <BooleanInput source="block.save_view" label="resources.user.fields.block.save_view"/>
                            </div>
                        </div>
                    </FormTab>

                    <FormTab label="resources.user.tab.address">
                        <LongTextInput source="address" formClassName={classes.address} />
                        <TextInput source="zipcode"/>
                        <TextInput source="city"/>
                    </FormTab>
                    <FormTab label="resources.user.tab.bank">
                        <TextInput source="bank.name" />
                        <TextInput source="bank.card"   />
                        <TextInput source="bank.owner"   />
                    </FormTab>
                    <FormTab label="resources.user.tab.enter_categories">
                        <ArrayInput source="enter_categories"  style={{ width: '40%' }} label="">
                            <SimpleFormIterator>
                                <ReferenceInput source="category_id" reference="category" label="resources.category.name">
                                    <SelectInput optionText="name" />
                                </ReferenceInput>
                                <DateInput source="from" defaultValue={new Date()} formClassName={classes.inline_margin} style={{ width: 150 }} label="resources.popup.fields.from" />
                                <DateInput source="to" defaultValue={new Date()} formClassName={classes.inline_margin} style={{ width: 150 }} label="resources.popup.fields.to" />
                            </SimpleFormIterator>
                        </ArrayInput>
                    </FormTab>
                </TabbedForm>
            }
        />
    </Create>
))

const UserTitle = ({ record }) => record ? <UserAvatarField record={record} size={32} /> : null;

const toolbarStyles = {
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
};
const CustomToolbar = withStyles(toolbarStyles)(props => (
    <Toolbar {...props}>
        <SaveButton />
        <CloneButton />
        <ListButton />
        {/* <ShowButton /> */}
        <DeleteButton undoable={true} />
    </Toolbar>
));

const UserEdit = withStyles(styles) (( { classes, permissions, ...props } ) => (

    <Edit title={<UserTitle />}  undoable={true} {...props}>
        <Responsive
            small={
                <TabbedForm toolbar={<CustomToolbar />}>
                    <FormTab label="resources.user.tab.identity">
                        <TextInput source="name" formClassName={classes.first_name}/>
                        <FormDataConsumer>
                            {({ formData, ...rest }) => formData && (formData.id === dataService.mi.id || dataService.mi.id === 1) &&
                                <TextInput source="password" label="resources.user.fields.password" />
                            }
                        </FormDataConsumer>
                        <FormDataConsumer>
                            {({ formData, ...rest }) => formData && dataService.mi.id === 1 &&
                                <SelectInput source="role" choices={roles} label="resources.user.fields.role"/>
                            }
                        </FormDataConsumer>
                        <FormDataConsumer>
                            {({ formData, ...rest }) => formData && dataService.mi.id === 1 &&
                                <SelectArrayInput source="allowed_menus" label="resources.user.fields.allowed_menus" choices={menus} style={{width:'50%'}}/>
                            }
                        </FormDataConsumer>

                        <TextInput
                            type="email"
                            source="email"
                            validation={{ email: true }}
                            fullWidth={true}
                            formClassName={classes.email}
                        />
                        <DateInput source="birthday" />
                        <SelectInput source="country" choices={countries}/>
                        <NumberInput source="point" />
                        <NumberInput source="coin" />
                        <TextInput source="uuid"/>

                        <BooleanInput source="block.chat"/>
                        <BooleanInput source="block.content_view" />
                        <BooleanInput source="block.friend" />
                        <BooleanInput source="block.review_view" />
                        <BooleanInput source="block.review" />
                        <BooleanInput source="block.save_view" />
                    </FormTab>

                    <FormTab label="resources.user.tab.address">
                        <LongTextInput
                            source="address"
                            formClassName={classes.address}
                        />
                        <TextInput source="zipcode"/>
                        <TextInput source="city"/>
                    </FormTab>
                    <FormTab label="resources.user.tab.bank">
                        <TextInput
                            source="bank_name"
                        />
                        <TextInput
                            source="bank_id"
                        />
                    </FormTab>
                    <FormTab label="resources.user.tab.enter_categories">
                        <ArrayInput source="enter_categories"  style={{ width: '40%' }} label="">
                            <SimpleFormIterator>
                                <ReferenceInput source="category_id" reference="category" label="resources.category.name">
                                    <SelectInput optionText="name" />
                                </ReferenceInput>
                                <DateInput source="from" defaultValue={new Date()} formClassName={classes.inline_margin} style={{ width: 150 }} label="resources.popup.fields.from" />
                                <DateInput source="to" defaultValue={new Date()} formClassName={classes.inline_margin} style={{ width: 150 }} label="resources.popup.fields.to" />
                            </SimpleFormIterator>
                        </ArrayInput>
                    </FormTab>
                </TabbedForm>

            }
            medium={
                <TabbedForm toolbar={<CustomToolbar />}>
                    <FormTab label="resources.user.tab.identity">
                        <Grid container spacing={24}>
                            <Grid item xs={12} sm={2}>
                                <TextInput source="name" label="resources.user.fields.name"/>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <TextInput source="uuid" label="resources.user.fields.uuid"/>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <FormDataConsumer>
                                    {({ formData, ...rest }) => formData && (formData.id === dataService.mi.id || dataService.mi.id === 1) &&
                                        <TextInput source="password" label="resources.user.fields.password" />
                                    }
                                </FormDataConsumer>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <FormDataConsumer>
                                    {({ formData, ...rest }) => formData && dataService.mi.id === 1 &&
                                        <SelectInput source="role" choices={roles} label="resources.user.fields.role"/>
                                    }
                                </FormDataConsumer>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <BooleanInput source="block.login" label="resources.user.fields.block.login" style={{marginTop:20}}/>
                            </Grid>
                        </Grid>

                        <Grid container spacing={24}>
                            <Grid item xs={12} sm={2}>
                                <TextInput
                                    type="email"
                                    source="email"
                                    validation={{ email: true }}
                                    fullWidth={true}
                                    formClassName={classes.email}
                                    label="resources.user.fields.email"
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <TextInput source="phone" label="resources.user.fields.phone"/>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <DateInput source="birthday" label="resources.user.fields.birthday"/>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <SelectInput source="country" choices={countries} label="resources.user.fields.country"/>
                            </Grid>
                        </Grid>
                        <TextInput source="picture" style={{width:'50%'}}/>
                        <FormDataConsumer>
                            {({ formData, ...rest }) => formData && dataService.mi.id === 1 && formData.role === 'admin' &&
                                <SelectArrayInput source="allowed_menus" label="resources.user.fields.allowed_menus" choices={menus} style={{width:'50%'}}/>
                            }
                        </FormDataConsumer>
                        <Grid container spacing={24}>
                            <Grid item xs={12} sm={2}>
                                <NumberInput source="point" label="resources.user.fields.point"/>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <NumberInput source="coin" label="resources.user.fields.coin"/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={24}>
                            <Grid item xs={12} sm={2}>
                                <TextInput source="zipcode" label="resources.user.fields.zipcode"/>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <TextInput source="city" label="resources.user.fields.city"/>
                            </Grid>
                        </Grid>
                        <LongTextInput
                            source="address"
                            formClassName={classes.address}
                        />
                        <div className={classes.inline} >
                            <div>
                                <BooleanInput source="block.chat" label="resources.user.fields.block.chat"/>
                                <BooleanInput source="block.content_view" label="resources.user.fields.block.content_view"/>
                            </div>
                            <div >
                                <BooleanInput source="block.friend"  label="resources.user.fields.block.friend"/>
                                <BooleanInput source="block.review_view" label="resources.user.fields.block.review_view"/>
                            </div>
                            <div >
                                <BooleanInput source="block.review"  label="resources.user.fields.block.review"/>
                                <BooleanInput source="block.save_view" label="resources.user.fields.block.save_view"/>
                            </div>
                        </div>
                    </FormTab>

                    <FormTab label="resources.user.tab.bank">
                        <TextInput
                            source="bank_name"
                        />
                        <TextInput
                            source="bank_id"
                        />
                    </FormTab>
                    <FormTab label="resources.user.tab.enter_categories">
                        <ArrayInput source="enter_categories"  style={{ width: '40%' }} label="">
                            <SimpleFormIterator>
                                <ReferenceInput source="category_id" reference="category" label="resources.category.name">
                                    <SelectInput optionText="name" />
                                </ReferenceInput>
                                <DateInput source="from" defaultValue={new Date()} formClassName={classes.inline_margin} style={{ width: 150 }} label="resources.popup.fields.from" />
                                <DateInput source="to" defaultValue={new Date()} formClassName={classes.inline_margin} style={{ width: 150 }} label="resources.popup.fields.to" />
                            </SimpleFormIterator>
                        </ArrayInput>
                    </FormTab>
                </TabbedForm>
            }
        />
    </Edit>
))


export default {
    list: UserList,
    edit: UserEdit,
    create: UserCreate,
    // show: UserShow,
    icon: UserIcon,
};