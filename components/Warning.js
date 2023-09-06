import React, { useState, useEffect } from 'react'

import AwesomeAlert from 'react-native-awesome-alerts';

function Warning({navigation, text}) {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(
    () =>
    navigation.addListener('beforeRemove', (e) => {
        e.preventDefault();

        // Prompt the user before leaving the screen
        if (text) 
          setShowAlert(true)
        else
          navigation.dispatch(e.data.action);
      }),
    [navigation]
  );

  return (<AwesomeAlert
    show={showAlert}
    showProgress={false}
    title="Advertencia"
    message={text}
    closeOnTouchOutside={true}
    closeOnHardwareBackPress={false}
    showCancelButton={true}
    showConfirmButton={true}
    cancelText="No, continuar"
    confirmText="Si, descartar"
    confirmButtonColor="#DD6B55"
    onCancelPressed={() => {
      setShowAlert(false);
    }}
    onConfirmPressed={() => {
      navigation.goBack()
      setShowAlert(false);
      
    }}
  />)
}

export default Warning