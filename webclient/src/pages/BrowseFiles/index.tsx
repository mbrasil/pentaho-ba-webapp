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

const buildCDAUrl = (path: string) => {
  return `${HOST}/pentaho/plugin/cda/api/previewQuery?path=${path}`;
}

const buildFileContentUrl = (path: string) => {
  const file = path.replaceAll("/", ":");

  return `${HOST}/pentaho/api/repos/${file}/content`;
}

const buildFileGeneratedContentUrl = (path: string) => {
  const file = path.replaceAll("/", ":");

  return `${HOST}/pentaho/api/repos/${file}/generatedContent`;
}

const buildFileViewerUrl = (path: string) => {
  const file = path.replaceAll("/", ":");

  return `${HOST}/pentaho/api/repos/${file}/viewer`;
}

const buildPRPTIUrl = (path: string, mode: string) => {
  const file = path.replaceAll("/", ":");

  return `${HOST}/pentaho/api/repos/${file}/prpti.${mode === "viewer" ? "view" : "edit"}`;
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
            {file?.path?.endsWith(".cda") && (
              <iframe src={buildCDAUrl(file.path)} width="100%" height="100%"></iframe>
            )}
            {file?.path && new RegExp(/\.(cdfde|css|gif|html|js|pdf|png)$/i).test(file.path) && (
              <iframe src={buildFileContentUrl(file.path)} width="100%" height="100%"></iframe>
            )}
            {file?.path && new RegExp(/\.(kjb|ktr|prpt)$/i).test(file.path) && (
              <iframe src={buildFileViewerUrl(file.path)} width="100%" height="100%"></iframe>
            )}
            {file?.path?.endsWith(".prpti") && (
              <iframe src={buildPRPTIUrl(file.path, mode)} width="100%" height="100%"></iframe>
            )}
            {file?.path && new RegExp(/\.(wcdf|xcdf)$/i).test(file.path) && (
              <iframe src={buildFileGeneratedContentUrl(file.path)} width="100%" height="100%"></iframe>
            )}
          </HvGrid>
        </HvGrid>
      </HvGrid>
    </ProtectedComponent>
  );
};
