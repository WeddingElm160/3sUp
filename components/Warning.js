import AwesomeAlert from 'react-native-awesome-alerts';

function Warning({show, confirm, cancel}) {

  return (<AwesomeAlert
    show={show}
    showProgress={false}
    title="¿Estás seguro de añadir este producto?"
    message='Añadir este producto revasará tu presupuesto asignado'
    closeOnTouchOutside={false}
    closeOnHardwareBackPress={false}
    showCancelButton={true}
    showConfirmButton={true}
    cancelText="No, descartar"
    confirmText="Si, añadir"
    confirmButtonColor="#DD6B55"
    onCancelPressed={cancel}
    onConfirmPressed={confirm}
  />)
}

export default Warning