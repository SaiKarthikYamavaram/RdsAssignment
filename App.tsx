import React, {createContext, useReducer} from 'react';
import {Platform, UIManager} from 'react-native';
import 'react-native-gesture-handler';
import {productType} from './data/mockdata/Products';
import Navigation from './navigation';
import {
  addProduct,
  deleteProduct,
  reduceProductQuantity,
} from './reducerHelpers/productReducers';

const initialState = {
  products: [],
  price: 0,
};
type globalState = {
  products: productType[];
  price: number;
};
export const AppContext = createContext<{
  state: globalState | null;
  dispatch: any;
}>({
  state: null,
  dispatch: null,
});

const reducer = (state: globalState, action: any) => {
  const {type, payload} = action;
  switch (type) {
    case 'addProduct':
      return addProduct(state, payload);
    case 'deleteProduct':
      return deleteProduct(state, payload);
    case 'reduceProductQuantity':
      return reduceProductQuantity(state, payload);
    default:
      return state;
  }
};

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const App: React.FC<{}> = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{state: state, dispatch: dispatch}}>
      <Navigation />
    </AppContext.Provider>
  );
};

export default App;
