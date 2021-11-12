import {
  ReactChild,
  ReactFragment,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { Header } from "./Header";
import { getDevices } from "../Provider/Device";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";

export function Device() {
  const [devices, setdevices]: any[] = useState([]);

  useEffect(() => {
    (async () => {
      const devices = await getDevices();
      if (devices.length) {
        //à faire
      }
      setdevices(devices);
      console.log(devices);
    })();
  }, []);

  return (
    <div>
      <Header />
      Devices
      <Table sx={{ maxWidth: "75%" }}>
        <TableBody>
          {devices.map((device: any) => (
            <TableRow key={device.id}>
              <TableCell>{device.id}</TableCell>
              <TableCell>{device.currentSurvey}</TableCell>
              <TableCell>{device.location}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
