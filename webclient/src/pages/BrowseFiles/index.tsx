import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { css } from "@emotion/css";
import {
  HvButton,
  HvGrid, HvMultiButton,
  HvTypography, theme
} from "@hitachivantara/uikit-react-core";
import RepositoryTree from "./RepositoryTree";
import { HOST, PentahoFile } from "./useBrowseFiles";
import ProtectedComponent from "../../components/ProtectedComponent";

const buildAnalyzerUrl = (path: string, mode: string, locale: string) => {
  const file = path.replaceAll("/", ":");

  return `${HOST}/pentaho/api/repos/${file}/${mode}?showRepositoryButtons=true&locale=${locale}`;
}

export default () => {
  const { t, i18n } = useTranslation("browseFiles");
  const [file, setFile] = useState<PentahoFile>();
  const [mode, setMode] = useState("viewer");

  return (
    <ProtectedComponent>
      <HvGrid container maxWidth="lg" rowSpacing="xs" direction="row">
        <HvGrid item xs={3}>
          <RepositoryTree onTreeItemClick={setFile} />
        </HvGrid>

        <HvGrid item xs={9} wrap="wrap" direction="column">
          <HvGrid item xs={12} display="flex" justifyContent="space-between">
            <HvTypography component="h1" variant="title3">
              {`${file?.title ?? "No file"} - ${file?.path}`}
            </HvTypography>

              <HvMultiButton className={css({ display: "flex", padding: theme.space.xs })}>
                {["viewer", "editor"].map((id) => (
                  <HvButton
                    key={id}
                    selected={id === mode}
                    onClick={() => setMode(id)}
                  >{t(`mode.${id}`)}</HvButton>
                ))}
              </HvMultiButton>
          </HvGrid>

          <HvGrid item xs={12}>
            {file?.path?.endsWith(".xanalyzer") && (
              <iframe src={buildAnalyzerUrl(file.path, mode, i18n.language)} width="100%" height="100%"></iframe>
            )}
          </HvGrid>
        </HvGrid>
      </HvGrid>
    </ProtectedComponent>
  );
};
