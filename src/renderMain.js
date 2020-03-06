import React from 'react';
import { hydrate, render } from "react-dom";
import WidgetWrapper from "./components/WidgetWrapper";

export function renderMainToElement(element) {
  if (element.hasChildNodes()) {
    hydrate(<WidgetWrapper />, element);
  } else {
    render(<WidgetWrapper />, element);
  }

}