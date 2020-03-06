import React from "react";
import WidgetMain from "@/components/WidgetMain";

import { Provider } from "redux-zero/react";
import { store } from "@/store";

const WidgetWrapper = ({ className }) => {
  return (
    <Provider store={store}>
      <WidgetMain />
    </Provider>
  );
};

export default WidgetWrapper;
