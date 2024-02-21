import React from 'react';
import {
    Edit,
    Toolbar,
    FormTab,
    TabbedForm,
    SimpleFormIterator,
    NumberInput,
    ArrayInput,
    Responsive,
    SimpleForm,
    SelectArrayInput,
    TextInput,
    BooleanInput,
    SelectInput,
    ReferenceArrayInput,
    DisabledInput,
    translate,
    SaveButton,
    FormDataConsumer,
    LongTextInput,
} from 'react-admin';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import {langs, point_units} from '../../lib/common';

const styles = {
    inline: { display: 'inline-block' },
    inline2: { display: 'inline-block', width:60 },
    inline_margin: { display: 'inline-block', marginRight: 32 },
    rowEven: {
        backgroundColor: '#fcfcfc',
    },
    comment: {
        maxWidth: '20em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
};

const toolbarStyles = {
    toolbar: {
        display: 'flex',
        justifySetting: 'space-between',
    },
};

export const CustomToolbar = withStyles(toolbarStyles)(props => (
    <Toolbar {...props}>
        <SaveButton />
    </Toolbar>
));


const SettingTitle = translate(({ translate }) => (
    <span>
        {translate('resources.setting.name')} 
    </span>
));

const SettingEdit = ({ classes, translate, ...props }) => (
    <Edit title={<SettingTitle />}  undoable={true} {...props}>
        <Responsive
            small={
                <SimpleForm toolbar={<CustomToolbar />}>
                    <h3>{translate('resources.setting.name')} </h3>
                    <BooleanInput source="block" defaultValue={false} />
                    <BooleanInput source="register_block" defaultValue={false} />
                    <NumberInput source="exchange_dollar_rmb" defaultValue={6.88} />
                    <NumberInput source="exchange_dollar_won" defaultValue={1168} />
                    <NumberInput source="exchange_rate_coin" defaultValue={1000} />
                    <NumberInput source="exchange_rate_point" defaultValue={10} />
                    <NumberInput source="cash_out_rate" defaultValue={10} />
                    <BooleanInput source="invite_use" defaultValue={true} />
                    <FormDataConsumer>
                        {({ formData, ...rest }) => formData && formData.invite_use &&
                            <SelectInput source="invite_mode" label="resources.setting.fields.invite_mode" choices={[
                                { id: 'mustbe', name: 'resources.setting.fields.invite_mode_mustbe' },
                                { id: 'normal', name: 'resources.setting.fields.invite_mode_normal' },
                            ]} />
                        }
                    </FormDataConsumer>            

                    <BooleanInput source="alarm_content" defaultValue={false} />
                    <BooleanInput source="alarm_review" defaultValue={false} />
                    <BooleanInput source="alarm_cash" defaultValue={false} />
                    <SelectInput source="first_page" style={{width:100}} choices={[
                        { id: 'image', name: 'resources.setting.info.image' },
                        { id: 'video', name: 'resources.setting.info.video' },
                        { id: 'soical', name: 'resources.setting.info.square' },
                        { id: 'home', name: 'resources.setting.info.home' },
                        { id: 'chat', name: 'resources.setting.info.chat' },
                        { id: 'service', name: 'resources.setting.info.service' },
                    ]} />

                    <h3>{translate('resources.setting.tab.advert')} </h3>
                    <ReferenceArrayInput source="advert_categories" reference="category">
                        <SelectArrayInput optionText="name" />
                    </ReferenceArrayInput>
                    <NumberInput source="advert_content_cnt" defaultValue={10} />
                    <NumberInput source="advert_video_cnt" defaultValue={10} />
                    <NumberInput source="advert_days" defaultValue={7}  />
                    <NumberInput source="advert_point_guarantee" defaultValue={1000000} />
                    <NumberInput source="advert_point_min" defaultValue={100} />
                    <NumberInput source="advert_point_max" defaultValue={1000}/>

                    <NumberInput source="virtual.view" defaultValue={10} />
                    <NumberInput source="virtual.like" defaultValue={5} />
                    <NumberInput source="virtual.save" defaultValue={2} />
                    <h3>{translate('resources.setting.tab.service')} </h3>
                    <BooleanInput source="auto_service" label="resources.setting.fields.auto_service" />
                    <TextInput
                        style={{width:200}} 
                        type="time"
                        source="work_start_time" 
                        label="resources.setting.fields.work_start_time" 
                    />
                    <TextInput
                        style={{width:200}} 
                        type="time"
                        source="work_end_time" 
                        label="resources.setting.fields.work_end_time" 
                    />

                    <h3>{translate('resources.setting.tab.point')} </h3>
                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={2}>
                            <NumberInput source="point_first_cash_in" label="resources.setting.fields.point_first_cash_in" defaultValue={10}/>
                        </Grid>
                        <Grid item xs={12} sm={1}>
                            <NumberInput source="point_first_cash_out" label="resources.setting.fields.point_first_cash_out" defaultValue={10} style={{width:70}}/>
                        </Grid>
                        <Grid item xs={12} sm={1}>
                            <NumberInput source="point_cash_in" label="resources.setting.fields.point_cash_in" defaultValue={10} style={{width:60}}/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={2}>
                            <NumberInput source="point_invite" label="resources.setting.fields.point_invite" defaultValue={10}  style={{width:120}}/> 
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <NumberInput source="point_follow" label="resources.setting.fields.point_follow" defaultValue={10} style={{width:140}} />                    
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={2}>
                            <NumberInput source="point_content" label="resources.setting.fields.point_content" defaultValue={5}  style={{width:100}} />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <NumberInput source="point_content_cnt" label="resources.setting.fields.point_content_cnt" defaultValue={10} style={{width:140}}/>                    
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={2}>
                            <NumberInput source="point_review" label="resources.setting.fields.point_review" defaultValue={1} style={{width:100}}/>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <NumberInput source="point_review_cnt" label="resources.setting.fields.point_review_cnt" defaultValue={5} style={{width:140}}/>                    
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={2}>
                            <NumberInput source="point_advert" label="resources.setting.fields.advert_review" defaultValue={1} style={{width:100}}/>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <NumberInput source="point_advert_cnt" label="resources.setting.fields.point_advert_cnt" defaultValue={5} style={{width:140}}/>
                        </Grid>
                    </Grid>
                    <h3 style={{marginBottom:0, marginTop:40}}>{translate('resources.setting.fields.point_cash')} </h3>
                    <ArrayInput source="point_cash"  style={{marginTop:0}} label="" >
                        <SimpleFormIterator >
                            <NumberInput source="cash" style={{ width: 100 }} formClassName={classes.inline_margin}  label="resources.setting.tab.cash"/>
                            <NumberInput source="point" style={{ width: 100 }} formClassName={classes.inline_margin}  label="resources.user.fields.point" />
                        </SimpleFormIterator>
                    </ArrayInput>
                    <h3 style={{marginBottom:0, marginTop:40}}>{translate('resources.setting.fields.black_ip')} </h3>
                    <ArrayInput source="black_ip" style={{ width: '90%' }} label="">
                        <SimpleFormIterator>
                            <TextInput source="ip" label="resources.setting.fields.black_ip" className={classes.inline}/>
                        </SimpleFormIterator>
                    </ArrayInput>            
                    <h3 style={{marginBottom:0, marginTop:40}}>{translate('resources.setting.fields.black_name')} </h3>
                    <ArrayInput source="black_name" style={{ width: '90%' }} label="">
                        <SimpleFormIterator>
                            <TextInput source="name" label="resources.setting.fields.black_name" className={classes.inline}/>
                        </SimpleFormIterator>
                    </ArrayInput>            

                    <h3 style={{marginBottom:0, marginTop:40}}>{translate('resources.setting.fields.chat')} </h3>
                    <NumberInput source="point_note" style={{ width: 180 }} defaultValue={10}/>
                    <NumberInput source="chat_free_cnt" label="resources.setting.fields.chat_free_cnt"  defaultValue={10}/>
                    <NumberInput source="chat_free_time"  label="resources.setting.fields.chat_free_time"  defaultValue={10}/>
                    <ArrayInput source="chat_free_point"   label="resources.setting.fields.chat_free_point">
                        <SimpleFormIterator>
                            <NumberInput source="cnt" formClassName={classes.inline_margin}  label="resources.setting.fields.chat_member_cnt"/>
                            <NumberInput source="time" formClassName={classes.inline_margin}  label="resources.setting.fields.chat_time"/>
                            <NumberInput source="point" formClassName={classes.inline_margin}  label="resources.user.fields.point" />
                        </SimpleFormIterator>
                    </ArrayInput>
                    <NumberInput source="chat_pay_cnt"  defaultValue={10}/>
                    <ArrayInput source="chat_pay_point"   label="resources.setting.fields.chat_pay_point">
                        <SimpleFormIterator>
                            <NumberInput source="cnt" formClassName={classes.inline_margin}  label="resources.setting.fields.chat_member_cnt"/>
                            <NumberInput source="time"  formClassName={classes.inline_margin}  label="resources.setting.fields.chat_time"/>
                            <NumberInput source="point"  formClassName={classes.inline_margin}  label="resources.user.fields.point" />
                        </SimpleFormIterator>
                    </ArrayInput>
                    <ArrayInput source="chat_delay_point" label="resources.setting.fields.chat_delay_point">
                        <SimpleFormIterator>
                            <NumberInput source="time"  formClassName={classes.inline_margin}  label="resources.setting.fields.chat_time"/>
                            <NumberInput source="point"  formClassName={classes.inline_margin}  label="resources.user.fields.point" />
                        </SimpleFormIterator>
                    </ArrayInput>

                    <h3 style={{marginBottom:0, marginTop:40}}>{translate('resources.setting.tab.lang')} </h3>
                    <ArrayInput source="msg_first_login">
                        <SimpleFormIterator>
                            <SelectInput source="lang" formClassName={classes.inline_margin} style={{ width: 50 }} label="com.language" choices={langs} />
                            <TextInput source="str"  formClassName={classes.inline_margin} label="resources.category.trans.str" />
                        </SimpleFormIterator>
                    </ArrayInput>
                    <ArrayInput source="msg_login">
                        <SimpleFormIterator>
                            <SelectInput source="lang" formClassName={classes.inline_margin} style={{ width: 50 }} label="com.language" choices={langs} />
                            <TextInput source="str"  formClassName={classes.inline_margin}  label="resources.category.trans.str" />
                        </SimpleFormIterator>
                    </ArrayInput>
                    <ArrayInput source="msg_cash" >
                        <SimpleFormIterator>
                            <SelectInput source="lang" formClassName={classes.inline_margin} style={{ width: 50 }} label="com.language" choices={langs} />
                            <TextInput source="str"  formClassName={classes.inline_margin}  label="resources.category.trans.str" />
                        </SimpleFormIterator>
                    </ArrayInput>
                    <ArrayInput source="msg_auto_service" >
                        <SimpleFormIterator>
                            <SelectInput source="lang" formClassName={classes.inline_margin} style={{ width: 50 }} label="com.language" choices={langs} />
                            <TextInput source="str"  formClassName={classes.inline_margin}  label="resources.category.trans.str" />
                        </SimpleFormIterator>
                    </ArrayInput>
                    <ArrayInput source="msg_qr">
                        <SimpleFormIterator>
                            <SelectInput source="lang" formClassName={classes.inline_margin} style={{ width: 50 }} label="com.language" choices={langs} />
                            <LongTextInput source="str"  formClassName={classes.inline_margin} label="resources.category.trans.str" />
                        </SimpleFormIterator>
                    </ArrayInput>
                    <ArrayInput source="msg_select_content">
                        <SimpleFormIterator>
                            <SelectInput source="lang" formClassName={classes.inline_margin} style={{ width: 50 }} label="com.language" choices={langs} />
                            <LongTextInput source="str"  formClassName={classes.inline_margin} label="resources.category.trans.str" />
                        </SimpleFormIterator>
                    </ArrayInput>
                    <ArrayInput source="msg_live" >
                        <SimpleFormIterator>
                            <SelectInput source="lang" formClassName={classes.inline_margin} style={{ width: 50 }} label="com.language" choices={langs} />
                            <TextInput source="str"  formClassName={classes.inline_margin}  label="resources.category.trans.str" />
                        </SimpleFormIterator>
                    </ArrayInput>
                </SimpleForm>
            }
            medium={
                <TabbedForm toolbar={<CustomToolbar />}>
                    <FormTab label="resources.setting.name"  >
                        <Grid container spacing={24}>
                            <Grid item xs={12} sm={2}>
                                <BooleanInput source="alarm_content" label="resources.setting.fields.alarm_content" defaultValue={false} />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <BooleanInput source="alarm_review" label="resources.setting.fields.alarm_review" defaultValue={false} />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <BooleanInput source="alarm_cash" label="resources.setting.fields.alarm_cash" defaultValue={false} />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <BooleanInput source="auto_service" label="resources.setting.fields.auto_service" />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <BooleanInput source="database_perfect" label="resources.setting.fields.database_perfect" defaultValue={false} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={24}>
                            <Grid item xs={12} sm={2}>
                                <BooleanInput source="block" label="resources.setting.fields.block" defaultValue={false} />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <BooleanInput source="register_block" label="resources.setting.fields.register_block" defaultValue={false} />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <BooleanInput source="invite_use" label="resources.setting.fields.invite_use" defaultValue={true} />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <FormDataConsumer>
                                    {({ formData, ...rest }) => formData && formData.invite_use &&
                                        <SelectInput source="invite_mode" label="resources.setting.fields.invite_mode" choices={[
                                            { id: 'mustbe', name: 'resources.setting.fields.invite_mode_mustbe' },
                                            { id: 'normal', name: 'resources.setting.fields.invite_mode_normal' },
                                        ]} />
                                    }
                                </FormDataConsumer>
                            </Grid>
                        </Grid>
                        <Grid container spacing={24}>
                            <Grid item xs={12} sm={2} style={{paddingTop:0}}>
                                <TextInput
                                    style={{width:200}}
                                    type="time"
                                    source="work_start_time"
                                    label="resources.setting.fields.work_start_time"
                                />
                            </Grid>
                            <Grid item xs={12} sm={2} style={{paddingTop:0}}>
                                <TextInput
                                    style={{width:200}}
                                    type="time"
                                    source="work_end_time"
                                    label="resources.setting.fields.work_end_time"
                                />
                            </Grid>
                            <Grid item xs={12} sm={2} style={{paddingTop:0}}>
                                <SelectInput source="first_page" label="resources.setting.fields.first_page" style={{width:100}} choices={[
                                    { id: 'home', name: 'resources.setting.info.home' },
                                    { id: 'image', name: 'resources.setting.info.image' },
                                    { id: 'video', name: 'resources.setting.info.video' },
                                    { id: 'social', name: 'resources.setting.info.square' },
                                    { id: 'chat', name: 'resources.setting.info.chat' },
                                    { id: 'service', name: 'resources.setting.info.service' },
                                ]} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={24}>
                            <Grid item xs={12} sm={2}>
                                <NumberInput source="exchange_dollar_rmb" style={{width:150}} label="resources.setting.fields.exchange_dollar_rmb" defaultValue={6.88} />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <NumberInput source="exchange_dollar_won" style={{width:150}} label="resources.setting.fields.exchange_dollar_won" defaultValue={1168} />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <NumberInput source="exchange_rate_coin" style={{width:150}} label="resources.setting.fields.exchange_rate_coin" defaultValue={1000} />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <NumberInput source="exchange_rate_point" style={{width:150}} label="resources.setting.fields.exchange_rate_point" defaultValue={10} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={24}>
                            <Grid item xs={12} sm={2}>
                                <NumberInput source="cash_out_from" style={{width:150}} label="resources.setting.fields.cash_out_from" title={translate('resources.setting.help.cash_out_from')} defaultValue={1000} />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <NumberInput source="cash_out_rate" style={{width:150}} label="resources.setting.fields.cash_out_rate" defaultValue={10} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={24}>
                            <Grid item xs={12} sm={2}>
                                <NumberInput source="select_content.views" label="resources.setting.select_content.views" />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <NumberInput source="select_content.likes" label="resources.setting.select_content.likes"  />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <NumberInput source="select_content.amount" label="resources.setting.select_content.amount" style={{width: 120 }} />
                                <SelectInput source="select_content.unit" label="" style={{display: 'inline-block', width: 100 }} choices={point_units} />
                                <BooleanInput source="select_content.is_note" label="resources.setting.select_content.is_note" style={{display: 'inline-block', marginTop: 30}} defaultValue={false} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={24}>
                            <Grid item xs={12} sm={3}>
                                <NumberInput source="virtual.view_from" label="resources.setting.virtual.view_from" style={{width: 150 }}/>
                                <NumberInput source="virtual.view_to" label="resources.setting.virtual.to" style={{display: 'inline-block', width: 60}}/>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <NumberInput source="virtual.like_from" label="resources.setting.virtual.like_from" style={{width: 150 }}/>
                                <NumberInput source="virtual.like_to" label="resources.setting.virtual.to" style={{display: 'inline-block', width: 60}}/>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <NumberInput source="virtual.save_from" label="resources.setting.virtual.save_from" style={{width: 150 }}/>
                                <NumberInput source="virtual.save_to" label="resources.setting.virtual.to" style={{display: 'inline-block', width: 60}}/>
                            </Grid>
                        </Grid>
                    </FormTab>

                    <FormTab label="resources.setting.tab.advert"  >
                        <ReferenceArrayInput source="advert_categories" reference="category"  style={{width:'70%'}}>
                            <SelectArrayInput optionText="name" />
                        </ReferenceArrayInput>
                        <Grid container spacing={24}>
                            <Grid item xs={12} sm={3}>
                                <NumberInput source="advert_content_cnt" defaultValue={10} style={{width:200}} label="resources.setting.fields.advert_content_cnt"/>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <NumberInput source="advert_video_cnt" defaultValue={10}  style={{width:200}} label="resources.setting.fields.advert_video_cnt"/>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <NumberInput source="advert_days" defaultValue={7}  style={{width:200}} label="resources.setting.fields.advert_days"/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={24}>
                            <Grid item xs={12} sm={3}>
                                <NumberInput source="advert_point_guarantee" defaultValue={1000000}  style={{width:200}} label="resources.setting.fields.advert_point_guarantee"/>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <NumberInput source="advert_point_min" defaultValue={100} style={{width:200}} label="resources.setting.fields.advert_point_min"/>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <NumberInput source="advert_point_max" defaultValue={1000} style={{width:200}} label="resources.setting.fields.advert_point_max"/>
                            </Grid>
                        </Grid>
                    </FormTab>
                    <FormTab label="resources.setting.tab.point"  >
                        <Grid container spacing={24}>
                            <Grid item xs={12} sm={3}>
                                <NumberInput source="point_invite" label="resources.setting.fields.point_invite" defaultValue={10}  style={{width:120}}/>
                                <SelectInput source="point_invite_unit" label="" style={{display: 'inline-block', width: 100 }} choices={point_units} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={24}>
                            <Grid item xs={12} sm={3}>
                                <NumberInput source="point_content" label="resources.setting.fields.point_follow" defaultValue={5}  style={{width:100}} />
                                <SelectInput source="point_follow_unit" label="" style={{display: 'inline-block', width: 100 }} choices={point_units} />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <NumberInput source="point_follow_cnt" label="resources.setting.fields.point_content_cnt" defaultValue={10} style={{width:140}}/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={24}>
                            <Grid item xs={12} sm={3}>
                                <NumberInput source="point_content" label="resources.setting.fields.point_content" defaultValue={5}  style={{width:100}} />
                                <SelectInput source="point_content_unit" label="" style={{display: 'inline-block', width: 100 }} choices={point_units} />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <NumberInput source="point_content_cnt" label="resources.setting.fields.point_content_cnt" defaultValue={10} style={{width:140}}/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={24}>
                            <Grid item xs={12} sm={3}>
                                <NumberInput source="point_review" label="resources.setting.fields.point_review" defaultValue={1} style={{width:100}}/>
                                <SelectInput source="point_review_unit" label="" style={{display: 'inline-block', width: 100 }} choices={point_units} />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <NumberInput source="point_review_cnt" label="resources.setting.fields.point_content_cnt" defaultValue={5} style={{width:140}}/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={24}>
                            <Grid item xs={12} sm={3}>
                                <NumberInput source="point_advert" label="resources.setting.fields.point_advert" defaultValue={1} style={{width:100}}/>
                                <SelectInput source="point_advert_unit" label="" style={{display: 'inline-block', width: 100 }} choices={point_units} />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <NumberInput source="point_advert_cnt" label="resources.setting.fields.point_content_cnt" defaultValue={5} style={{width:140}}/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={24}>
                            <Grid item sm={3}>
                                <NumberInput source="point_first_cash_in" label="resources.setting.fields.point_first_cash_in" style={{width: 170 }} defaultValue={10}/>
                                <SelectInput source="point_first_cash_in_unit" label="" style={{display: 'inline-block', width: 100 }} choices={point_units} />
                            </Grid>
                            <Grid item sm={2}>
                                <NumberInput source="point_first_cash_out" label="resources.setting.fields.point_first_cash_out" defaultValue={10} style={{width:70}}/>
                                <SelectInput source="point_first_cash_out_unit" label="" style={{display: 'inline-block', width: 100 }} choices={point_units} />
                            </Grid>
                            <Grid item sm={2}>
                                <NumberInput source="point_cash_in" label="resources.setting.fields.point_cash_in" defaultValue={10} style={{width:60}}/>
                                <SelectInput source="point_cash_in_unit" label="" style={{display: 'inline-block', width: 100 }} choices={point_units} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={24}>
                            <Grid item sm={4}>
                                <ArrayInput source="point_cash" label="resources.setting.fields.point_cash" >
                                    <SimpleFormIterator>
                                        <NumberInput source="cash" style={{ width: 100 }} formClassName={classes.inline_margin}  label="resources.setting.tab.cash"/>
                                        <NumberInput source="point" style={{ width: 60 }} formClassName={classes.inline}  label="resources.user.fields.point" />
                                    </SimpleFormIterator>
                                </ArrayInput>
                            </Grid>
                            <Grid item sm={1}>
                            </Grid>
                            <Grid item sm={2}>
                                <SelectInput source="point_cash_unit"  label="com.point_unit" style={{width: 100 }} choices={point_units} />
                            </Grid>
                        </Grid>

                    </FormTab>
                    <FormTab label="resources.setting.fields.point_attend">
                        <Grid container spacing={24}>
                            <Grid item sm={3}>
                                <ArrayInput source="point_attend" label="resources.setting.fields.point_attend">
                                    <SimpleFormIterator disableRemove  disableAdd>
                                        <DisabledInput source="day" style={{ width: 100 }} formClassName={classes.inline_margin}  label="resources.setting.fields.attend_day"/>
                                        <NumberInput source="point" style={{ width: 100 }} formClassName={classes.inline_margin}  label="resources.setting.fields.point_attend" />
                                    </SimpleFormIterator>
                                </ArrayInput>
                            </Grid>
                            <Grid item sm={1}>
                                <SelectInput source="point_attend_unit"  label="com.point_unit" style={{width: 100 }} choices={point_units} />
                            </Grid>
                        </Grid>
                    </FormTab>
                    <FormTab label="resources.setting.tab.black">
                        <ArrayInput source="black_ip" style={{ width: '30%' }} label="">
                            <SimpleFormIterator>
                                <TextInput source="ip" label="resources.setting.fields.black_ip" className={classes.inline}/>
                            </SimpleFormIterator>
                        </ArrayInput>            
                        <ArrayInput source="black_name" style={{ width: '30%' }} label="">
                            <SimpleFormIterator>
                                <TextInput source="name" label="resources.setting.fields.black_name" className={classes.inline}/>
                            </SimpleFormIterator>
                        </ArrayInput>            
                    </FormTab>
                    <FormTab label="resources.setting.tab.chat">
                        <NumberInput source="point_note" style={{ width: 180 }} defaultValue={10}/>
                        <Grid container spacing={24}>
                            <Grid item xs={12} sm={2}>
                                <NumberInput source="chat_free_cnt" label="resources.setting.fields.chat_free_cnt" style={{ width: 180 }} defaultValue={10}/>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <NumberInput source="chat_free_time"  label="resources.setting.fields.chat_free_time" style={{ width: 180 }} defaultValue={10}/>
                            </Grid>
                        </Grid>
                        <ArrayInput source="chat_free_point"  style={{ width: 550 }} label="resources.setting.fields.chat_free_point">
                            <SimpleFormIterator>
                                <NumberInput source="cnt" style={{ width: 100 }} formClassName={classes.inline_margin}  label="resources.setting.fields.chat_member_cnt"/>
                                <NumberInput source="time" style={{ width: 100 }} formClassName={classes.inline_margin}  label="resources.setting.fields.chat_time"/>
                                <NumberInput source="point" style={{ width: 100 }} formClassName={classes.inline_margin}  label="resources.user.fields.point" />
                            </SimpleFormIterator>
                        </ArrayInput>
                        <NumberInput source="chat_pay_cnt"  style={{ width: 180 }} defaultValue={10}/>
                        <ArrayInput source="chat_pay_point"  style={{ width: 550 }}  label="resources.setting.fields.chat_pay_point">
                            <SimpleFormIterator>
                                <NumberInput source="cnt" style={{ width: 100 }} formClassName={classes.inline_margin}  label="resources.setting.fields.chat_member_cnt"/>
                                <NumberInput source="time" style={{ width: 100 }} formClassName={classes.inline_margin}  label="resources.setting.fields.chat_time"/>
                                <NumberInput source="point" style={{ width: 100 }} formClassName={classes.inline_margin}  label="resources.user.fields.point" />
                            </SimpleFormIterator>
                        </ArrayInput>
                        <ArrayInput source="chat_delay_point"  style={{ width: 400 }} label="resources.setting.fields.chat_delay_point">
                            <SimpleFormIterator>
                                <NumberInput source="time" style={{ width: 100 }} formClassName={classes.inline_margin}  label="resources.setting.fields.chat_time"/>
                                <NumberInput source="point" style={{ width: 100 }} formClassName={classes.inline_margin}  label="resources.user.fields.point" />
                            </SimpleFormIterator>
                        </ArrayInput>
                    </FormTab>
                    <FormTab label="resources.setting.tab.lang">
                        <ArrayInput source="msg_first_login"  style={{ width: '60%' }}>
                            <SimpleFormIterator>
                                <SelectInput source="lang" formClassName={classes.inline_margin} style={{ width: 50 }} label="com.language" choices={langs} />
                                <TextInput source="str"  formClassName={classes.inline_margin} style={{ width: 600 }} label="resources.category.trans.str" />
                            </SimpleFormIterator>
                        </ArrayInput>
                        <ArrayInput source="msg_login"  style={{ width: '60%' }}>
                            <SimpleFormIterator>
                                <SelectInput source="lang" formClassName={classes.inline_margin} style={{ width: 50 }} label="com.language" choices={langs} />
                                <TextInput source="str"  formClassName={classes.inline_margin} style={{ width: 600 }} label="resources.category.trans.str" />
                            </SimpleFormIterator>
                        </ArrayInput>
                        <ArrayInput source="msg_cash"  style={{ width: '60%' }}>
                            <SimpleFormIterator>
                                <SelectInput source="lang" formClassName={classes.inline_margin} style={{ width: 50 }} label="com.language" choices={langs} />
                                <TextInput source="str"  formClassName={classes.inline_margin} style={{ width: 600 }} label="resources.category.trans.str" />
                            </SimpleFormIterator>
                        </ArrayInput>
                        <ArrayInput source="msg_auto_service"  style={{ width: '60%' }}>
                            <SimpleFormIterator>
                                <SelectInput source="lang" formClassName={classes.inline_margin} style={{ width: 50 }} label="com.language" choices={langs} />
                                <TextInput source="str"  formClassName={classes.inline_margin} style={{ width: 600 }} label="resources.category.trans.str" />
                            </SimpleFormIterator>
                        </ArrayInput>
                        <ArrayInput source="msg_qr"  style={{ width: '100%' }}>
                            <SimpleFormIterator>
                                <SelectInput source="lang" formClassName={classes.inline_margin} style={{ width: 50 }} label="com.language" choices={langs} />
                                <LongTextInput source="str"  formClassName={classes.inline_margin} style={{ width: 1000 }} label="resources.category.trans.str" />
                            </SimpleFormIterator>
                        </ArrayInput>
                        <ArrayInput source="msg_select_content"  style={{ width: '100%' }}>
                            <SimpleFormIterator>
                                <SelectInput source="lang" formClassName={classes.inline_margin} style={{ width: 50 }} label="com.language" choices={langs} />
                                <LongTextInput source="str"  formClassName={classes.inline_margin} style={{ width: 1000 }} label="resources.category.trans.str" />
                            </SimpleFormIterator>
                        </ArrayInput>
                        <ArrayInput source="msg_live"  style={{ width: '100%' }}>
                            <SimpleFormIterator>
                                <SelectInput source="lang" formClassName={classes.inline_margin} style={{ width: 50 }} label="com.language" choices={langs} />
                                <LongTextInput source="str"  formClassName={classes.inline_margin} style={{ width: 1000 }} label="resources.category.trans.str" />
                            </SimpleFormIterator>
                        </ArrayInput>
                    </FormTab>
                </TabbedForm>
            }
        />
    </Edit>
);

export default translate(withStyles(styles)(SettingEdit));
