import React, { FC } from 'react';
import { Divider, Tab, Tabs } from '@mui/material';
import MenuAppBar from '../components/AppBar';
import ParcelList from '../components/ParcelList';

const TABS = ['All', 'In Transit', 'Delivered'];
const TabsContent = [
    ParcelList,
    ParcelList,
    ParcelList,
];

const Dashboard: FC = () => {
    const [value, setValue] = React.useState(0);
    const onTabChange = (_event: React.SyntheticEvent, newValue: number) => setValue(newValue);
    const TabContent = TabsContent[value];
    return (
        <>
            <MenuAppBar />
            <Tabs value={value} onChange={onTabChange} >
                {TABS.map((tab) => (<Tab label={tab} key={tab} />))}
            </Tabs>
            <Divider />
            <TabContent tabIndex={value} />
        </>
    );
}


export default Dashboard;