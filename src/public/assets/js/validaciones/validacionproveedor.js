const form = (() => {
  const $formStatus = document.getElementById("formProveedor");
  const $InputNombre = document.getElementById("empresa");
  const $Inputnum_telefono = document.getElementById("telefono");


  const _sendActionForm = (event = {}) => {
    if ($InputNombre.value === "" || $Inputnum_telefono.value === "") {
      event.preventDefault();
      M.toast({ html: 'Se requieren rellenar todos los campos', classes: 'rounded' })
    }
    
    else if (isNaN($Inputnum_telefono.value)) {
      event.preventDefault();
      M.toast({ html: 'El numero telefónico debe ser númerico', classes: 'rounded' })
    }

    else if ($Inputnum_telefono.value.length != 10) {
      event.preventDefault();
      M.toast({ html: 'El numero telefónico debe de tener 10 digitos', classes: 'rounded' })
    }


  };

  const _addActionForm = () => {
    $formStatus.addEventListener("submit", _sendActionForm);
  };

  return {
    init: () => {
      _addActionForm();
    },
  };
})();

form.init();