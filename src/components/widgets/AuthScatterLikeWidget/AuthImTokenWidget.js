import React from 'react';
import AuthScatterLikeWidget from './AuthScatterLikeWidget';

export default (props) => (
  <AuthScatterLikeWidget
    title="Login with imToken..."
    hint="Please follow the instructions in the imToken popup."
    {...props}
  >
    To continue, please select the account you would like to use in the popup that appears on the screen.
  </AuthScatterLikeWidget>
)