import React, { FC } from "react";
import { Divider, Tab, Tabs } from "@mui/material";
import MenuAppBar from "../src/client/components/AppBar";
import ParcelList from "../src/client/components/ParcelList";

const TABS = ["All", "In Transit", "Delivered"];
const TabsContent = [ParcelList, ParcelList, ParcelList];

const Dashboard: FC = () => {
  const [value, setValue] = React.useState(0);

  const onTabChange = (_event: React.SyntheticEvent, value: number) =>
    setValue(value);
  const TabContent = TabsContent[value];
  return (
    <>
      <MenuAppBar />
      <Tabs value={value} onChange={onTabChange}>
        {TABS.map((tab) => (
          <Tab label={tab} key={tab} />
        ))}
      </Tabs>
      <Divider />
      <TabContent tabIndex={value} />
    </>
  );
};

export default Dashboard;
