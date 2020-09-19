import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Paper, List, ListItem } from "@material-ui/core";
import DevicesIcon from "@material-ui/icons/Devices";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import ComputerIcon from "@material-ui/icons/Computer";
import DeviceUnknownIcon from "@material-ui/icons/DeviceUnknown";
import Popup from "reactjs-popup";
import { fetchDevices } from "../actions/devices";
import { transferPlayback } from "../actions/playbackStatus";

const deviceIcon = (deviceType) => {
  if (deviceType === "Smartphone") {
    return <PhoneAndroidIcon />;
  }
  if (deviceType === "Computer") {
    return <ComputerIcon />;
  }
  return <DeviceUnknownIcon />;
};

function Devices() {
  const dispatch = useDispatch();
  const deviceId = useSelector((state) => state.playbackStatus.deviceId);
  const devices = useSelector((state) => state.devices.items);

  const [anchorEl, setAnchorEl] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = () => dispatch(fetchDevices());

  return (
    <>
      <Popup
        onOpen={handleClick}
        trigger={<DevicesIcon />}
        position={"top center"}
        arrow={true}
      >
        <Paper style={{ backgroundColor: "gray" }}>
          <List>
            {devices.map((device) => (
              <ListItem
                button
                onClick={() => dispatch(transferPlayback(device.id))}
                key={device.id}
              >
                {deviceIcon(device.type)}
                {device.name}
              </ListItem>
            ))}
          </List>
        </Paper>
      </Popup>
    </>
  );
}

export default Devices;
