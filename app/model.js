import {Observable} from 'rx';
import {NavigationExperimental} from 'react-native';
const {StateUtils} = NavigationExperimental;
import extend from 'xtend';

const initialNavState = {
  key: 'MainNavigation',
  index: 0,
  children: [{
    key: 'First'
  }]
};

function getCurrentKey(state) {
  const length = state.children.length;
  return state.children[length - 1].key;
}

export default function model(interactions) {
  // The onNavigate handler for root view.
  // Not being called.
  const onNavigateMod = interactions.get('onRootNavigate')
    .map(() => state => state);
  // The header navigation
  const onHeaderNavigateMod = interactions.get('onHeaderNavigate')
    .map(({type}) => state => {
      if (type === 'BackAction') {
        return StateUtils.pop(state);
      }
      return state;
    });
  // The router.
  // Handles all navigate actions.
  const onPressNavigateMod = interactions.get('onPressNavigate')
    .map(({dest, type}) => state => {
      if (getCurrentKey(state) === dest) {
        // Preventing navigate to the same page if the user clicks very fast
        return state;
      }
      if (type === 'reset') {
        return extend(state, {
          index: 0,
          children: [{
            key: dest
          }]
        });
      }
      return StateUtils.push(state, {key: dest});
    });

  return Observable.merge(
    onNavigateMod,
    onHeaderNavigateMod,
    onPressNavigateMod
  )
  .startWith(initialNavState)
  .scan((state, mod) => mod(state));
}
