import React, { View, Text, PropTypes, StyleSheet } from 'react-native'

import NavButton from './NavButton'

function ThirdScreen(props) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Third Screen</Text>
			<NavButton destLabel='First'
                 buttonHandler={props.navHandler}
                 type="reset"/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#79BD8F',
		justifyContent: 'center',
		alignItems: 'center'
	},
	title: {
		fontSize: 24,
		fontWeight: '500',
		color: '#ffffff',
		marginBottom: 30
	}
})

export default ThirdScreen;
