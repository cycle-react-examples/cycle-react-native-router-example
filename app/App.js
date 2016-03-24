import React, { NavigationExperimental, Text, View, StyleSheet, PropTypes } from 'react-native';
const {
	AnimatedView: NavigationAnimatedView,
	Card: NavigationCard,
	Header: NavigationHeader
} = NavigationExperimental;
import {component} from 'cycle-react';
import model from './model';
import First from './First';
import Second from './Second';
import Third from './Third';

const App = component('App', function comp(interactions) {
	function rendersScene(params) {
		const navHandler = interactions.listener('onPressNavigate');
		const state = params.scene.navigationState;

	  switch (state.key) {
	    case 'First':
	      return <First navHandler={navHandler} />;
	    case 'Second':
	      return <Second navHandler={navHandler} />;
	    case 'Third':
	      return <Third navHandler={navHandler} />;
	  }
	}

	return model(interactions).map(function view(navigationState) {
    return (
      // Note that we are not using a NavigationRootContainer here because Cycle-React is handling
      // the reduction of our state for us. Instead, we grab the navigationState we have in
      // our Observable and pass it directly to the <NavigationAnimatedView />.
      <NavigationAnimatedView
        navigationState={navigationState}
        style={styles.outerContainer}
        onNavigate={interactions.listener('onRootNavigate')}
        renderOverlay={props => (
          // Also note that we must explicity pass <NavigationHeader /> an onNavigate prop
          // because we are no longer relying on an onNavigate function being available in
          // the context (something NavigationRootContainer would have given us).
          <NavigationHeader
            {...props}
            getTitle={state => state.key}
            onNavigate={interactions.listener('onHeaderNavigate')}
          />
        )}
        renderScene={props => {
					return (
	          // Again, we pass our navigationState from the Observable to <NavigationCard />.
	          // Finally, we'll render out our scene based on navigationState in renderScene().
	          <NavigationCard
	            {...props}
	            key={props.scene.navigationState.key}
	            renderScene={rendersScene}
	          />
	        );
				}}
      />
    );
  });
});

const styles = StyleSheet.create({
	outerContainer: {
		flex: 1
	},
	container: {
		flex: 1
	}
});

export default App;
