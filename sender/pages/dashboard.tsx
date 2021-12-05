import React, { FC } from "react";
import { Divider, Tab, Tabs } from "@mui/material";
import MenuAppBar from "../src/client/components/AppBar";
import ParcelList from "../src/client/components/ParcelList";
import { DASHBOARD_TABS } from "../src/client/constants/APP";

const Dashboard: FC = () => {
  const [value, setValue] = React.useState(0);
  const onTabChange = (_event: React.SyntheticEvent, value: number) =>
    setValue(value);
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

export const getServerSideProps = (ctx: any) => {
  const { cookie } = ctx.req.headers;
  if (!cookie) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return {
    props: {},
  };
};

export default Dashboard;
