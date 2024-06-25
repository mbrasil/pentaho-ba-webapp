import React, {useState} from "react";
import {
  HvButton,
  HvGrid,
  HvSection,
  HvTypography, theme
} from "@hitachivantara/uikit-react-core";
import { Tool } from "@hitachivantara/uikit-react-icons";
import { HvDashboard } from "@hitachivantara/uikit-react-lab";
import ProtectedComponent from "../../components/common/ProtectedComponent";
import RecentActivity from "../../components/home/RecentActivity/RecentActivity";
import classes from "./styles";

const layout = [
  { i: 'quick-access', h: 1, w: 12, x: 0, y: 0 },
  { i: 'recent-activity', h: 6, w: 12, x: 0, y: 1 },
];

export default () => {
  const [canDrag, setCanDrag] = useState(false);
  const [canResize, setCanResize] = useState(false);

  return (
    <ProtectedComponent>
      <div className={classes.root}>
        <HvGrid container flexDirection="column">
          <HvGrid container item justifyContent="space-between">
            <HvGrid item>
              <div className={classes.header}>
                <HvTypography variant="xxsTitle">Welcome to Pentaho User Console</HvTypography>
                <HvTypography variant="mTitle">Username</HvTypography>
              </div>
            </HvGrid>
            <HvGrid item>
              <HvButton
                variant="secondaryGhost"
                startIcon={<Tool />}
                onClick={() => setCanDrag((prev) => !prev)}
              >
                {`Drag is ${canDrag ? "enabled" : "disabled"}`}
              </HvButton>
              <HvButton
                variant="secondaryGhost"
                startIcon={<Tool />}
                onClick={() => setCanResize((prev) => !prev)}
              >
                {`Resize is ${canResize ? "enabled" : "disabled"}`}
              </HvButton>
            </HvGrid>
          </HvGrid>

          <HvGrid item>
            <HvDashboard isDraggable={canDrag} isResizable={canResize} layout={layout}>
              <HvSection key="quick-access">
                <HvTypography variant="sectionTitle">Quick Access (WIP)</HvTypography>
              </HvSection>
              <HvSection key="recent-activity" classes={{ content: classes.recentActivity }}>
                <RecentActivity />
              </HvSection>
            </HvDashboard>
          </HvGrid>
        </HvGrid>
      </div>
    </ProtectedComponent>
  );
}


