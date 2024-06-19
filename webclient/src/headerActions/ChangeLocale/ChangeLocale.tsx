import React, { ChangeEvent, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { HvDropDownMenu, HvListValue, HvTooltip } from "@hitachivantara/uikit-react-core";
import usePentahoLocale, { setPentahoLocale } from "./usePentahoLocale";

const localeData = [
  { id: "en", label: "English" },
  { id: "de", label: "Deutsch" },
  { id: "fr", label: "Français" }
];

export default () => {
  const { t, i18n } = useTranslation("common");
  const { locale } = usePentahoLocale();

  useEffect(() => {
    if (locale != null && locale != i18n.language) {
      i18n.changeLanguage(locale).catch((error) => {
        console.error("useEffect - something went wrong:", error)
      });
    }
  }, [locale]);

  const onClick = useCallback((event: ChangeEvent, value: HvListValue) => {
    const newLocale = `${value.id}`;

    setPentahoLocale(newLocale).then(() => i18n.changeLanguage(newLocale));
  }, [i18n]);

  return (
    <HvTooltip title={t("headerActions.changeLocale")}>
      <HvDropDownMenu dataList={localeData} onClick={onClick} keepOpened={false}/>
    </HvTooltip>
  )
}
