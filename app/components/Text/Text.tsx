import React from "react";
import { useTranslations } from "next-intl";
import "./Text.css";

interface TextInterface {
  children: string;
}

function Text(props: TextInterface) {
  const t = useTranslations("Translations");
  return <div className="text">{t(props.children)}</div>;
}

function TranslatableString(text: string){
  const t = useTranslations("Translations");
  return t(text);
}

function TextLink(props: TextInterface) {
  return (
    <div className="text-link">
      <Text>{props.children}</Text>
    </div>
  );
}

export { Text, TextLink, TranslatableString };
