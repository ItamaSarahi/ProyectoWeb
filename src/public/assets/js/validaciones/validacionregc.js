
const form = (() => {
  const $formStatus = document.getElementById("formStatus");
  const $InputNombre = document.getElementById("nombre_C");
  const $InputApellidoPaterno = document.getElementById("apellidoPC");
  const $InputApellidoMaterno = document.getElementById("apellidoMC");
  const $InputfechaNacimiento = document.getElementById("fechaNacimiento");
  const $Inputnum_telefono = document.getElementById("num_telefono");
  const $Inputusuario = document.getElementById("usuario");
  const $Inputpassword = document.getElementById("password");
  var fechafinal = new Date(2005, 01, 01);

  const pattern = new RegExp('^[A-Z]+$', 'i');

 
  const _sendActionForm = (event = {}) => {

    if ($InputNombre.value === "" || $InputApellidoPaterno.value === ""
      || $InputApellidoMaterno.value === "" || $InputfechaNacimiento.value === ""
      || $InputApellidoPaterno.value === "" || $Inputpassword.value === ""
      || $Inputnum_telefono.value === "" || $Inputusuario.value === "") {
      event.preventDefault();
      M.toast({ html: 'Se requieren rellenar todos los campos' , classes: 'rounded'})
    }

    else if (!pattern.test($InputNombre.value)){
      event.preventDefault();
      M.toast({ html: 'El nombre debe de estar compuesto solo por letras', classes: 'rounded' })
    }

    else if (!pattern.test($InputApellidoMaterno.value)){
      event.preventDefault();
      M.toast({ html: 'El apellido materno debe de estar compuesto solo por letras' , classes: 'rounded'})
    }

    else if (!pattern.test($InputApellidoPaterno.value)){
      event.preventDefault();
      M.toast({ html: 'El apellido paterno debe de estar compuesto solo por letras' , classes: 'rounded'})
    }

    else if (isNaN($Inputnum_telefono.value)) {
      event.preventDefault();
      M.toast({ html: 'El numero telefónico debe ser númerico' , classes: 'rounded'})
    }

    else if ($Inputnum_telefono.value.length != 10) {
      event.preventDefault();
      M.toast({ html: 'El numero telefónico debe de tener 10 digitos', classes: 'rounded' })
    }



    else if ($Inputpassword.value.length < 5) {
      event.preventDefault();
      M.toast({ html: 'La contraseña de contener al menos 5 digitos', classes: 'rounded' })
    }

    else if ($Inputusuario.value.length < 5) {
      event.preventDefault();
      M.toast({ html: 'El usuario debe de contener al menos 5 digitos', classes: 'rounded' })
    }


    else if (Date.parse($InputfechaNacimiento.value) >= Date.parse(fechafinal)) {
      event.preventDefault();
      M.toast({ html: '¡Debe de ser mayor de 18 años para poder registrarse!' })
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