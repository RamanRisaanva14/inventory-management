import { Switch } from "@mui/material";
import React, { useState } from "react";
import { TbLogout } from "react-icons/tb";

const Header = ({ isAdmin, handleToggle }) => {
  return (
    <div className="flex justify-end gap-1 items-center font-medium text-white text-[14px]">
      <p>admin</p>
      <Switch
        checked={isAdmin}
        onChange={handleToggle}
        sx={{
          "& .MuiSwitch-switchBase.Mui-checked": {
            color: "#707F2C",
          },
          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
            backgroundColor: "#3B461D",
          },
          "& .MuiSwitch-switchBase + .MuiSwitch-track": {
            backgroundColor: "grey",
          },
        }}
      />
      <p>user</p>
      <div className="w-0 h-8 border-r border-r-white border-opacity-15 mx-3" />
      <TbLogout className="text-[25px]" />
    </div>
  );
};

export default Header;
