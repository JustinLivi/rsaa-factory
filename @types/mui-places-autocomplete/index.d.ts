declare module 'mui-places-autocomplete' {
  import { ReactType } from 'react';
  import { TextFieldProps } from '@material-ui/core/TextField';
  import { Suggestion } from 'react-places-autocomplete';

  export {
    geocodeByPlaceId,
    geocodeBySuggestion,
    Suggestion
  } from 'react-places-autocomplete';

  export interface MUIPlacesAutocompleteProps {
    onSuggestionSelected: (suggestion: Suggestion) => void;
    renderTarget: ReactType;
    textFieldProps?: TextFieldProps;
  }

  export default class MUIPlacesAutocomplete extends React.Component<
    MUIPlacesAutocompleteProps
  > {}
}
