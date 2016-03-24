import React, { TouchableOpacity, Text, StyleSheet, PropTypes } from 'react-native';

function NavButton(props) {
  function onPress(e) {
    props.buttonHandler({
      eventArgs: e,
      dest: props.destLabel,
      type: props.type || 'default'
    });
  }
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.label}>Go to {props.destLabel} Page</Text>
    </TouchableOpacity>
  )
}

NavButton.propTypes = {
  destLabel: PropTypes.string.isRequired,
  buttonHandler: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    backgroundColor: '#3C5773',
    alignSelf: 'stretch'
  },
  label: {
    color: '#F4F4E9',
    textAlign: 'center'
  }
});

export default NavButton;
