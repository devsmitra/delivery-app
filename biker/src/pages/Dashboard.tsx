import React, { FC } from "react";
import { Divider, Tab, Tabs } from "@mui/material";
import MenuAppBar from "../components/AppBar";
import ParcelList from "../components/ParcelList";
import { DASHBOARD_TABS } from "../constants/APP";

const Dashboard: FC = () => {
  const [value, setValue] = React.useState(0);
  const onTabChange = (_e: React.SyntheticEvent, val: number) => setValue(val);
  return (
    <>
      <MenuAppBar />
      <Tabs value={value} onChange={onTabChange}>
        {DASHBOARD_TABS.map((tab) => (
          <Tab label={tab} key={tab} />
        ))}
      </Tabs>
      <Divider />
      <ParcelList tabIndex={value} />
    </>
  );
};

export default Dashboard;
