import React from "react";
import {HvGrid} from "@hitachivantara/uikit-react-core";
import {HvDashboard} from "@hitachivantara/uikit-react-lab";
import classes from "./styles";
import ProtectedComponent from "../../components/ProtectedComponent";

export default () => {
  return (
    <ProtectedComponent>
        <div className={classes.root}>
          <HvGrid container>
            <HvGrid item>
              <HvDashboard>
                <h1>Amazing dashboard</h1>
              </HvDashboard>
            </HvGrid>
          </HvGrid>
        </div>
    </ProtectedComponent>
  );
}
