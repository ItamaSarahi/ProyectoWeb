const form = (() => {
    const $formStatus = document.getElementById("formStatus");
    const $InputNombre = document.getElementById("nombre_E");
    const $InputapellidoP = document.getElementById("apellidoPE");
    const $InputapellidoM = document.getElementById("apellidoME");
    const $InputEmail = document.getElementById("email");
    const $InputNivelestudio= document.getElementById("nivelEstudio");
    const $Inputusuario = document.getElementById("usuario");
    const $Inputpassword = document.getElementById("password");
    
  const pattern = new RegExp('^[A-Z]+$', 'i');

  const email= new RegExp(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i);

    const _sendActionForm = (event = {}) => {
  
      if ($InputNombre.value === "" || $InputapellidoP.value === ""
        || $InputapellidoM.value === "" ||  $InputEmail.value === ""
        || $InputNivelestudio.value === "") {
        event.preventDefault();
        M.toast({ html: 'Se requieren rellenar todos los campos' , classes: 'rounded'})
      }
      else if (!pattern.test($InputNombre.value)){
        event.preventDefault();
        M.toast({ html: 'El nombre debe de estar compuesto solo por letras', classes: 'rounded' })
      }
  
      else if (!pattern.test($InputapellidoM.value)){
        event.preventDefault();
        M.toast({ html: 'El apellido materno debe de estar compuesto solo por letras' , classes: 'rounded'})
      }
  
      else if (!pattern.test($InputapellidoP.value)){
        event.preventDefault();
        M.toast({ html: 'El apellido paterno debe de estar compuesto solo por letras' , classes: 'rounded'})
      }

      

    else if ($Inputpassword.value.length < 5) {
        event.preventDefault();
        M.toast({ html: 'La contraseña de contener al menos 5 digitos', classes: 'rounded' })
      }
  
      else if ($Inputusuario.value.length < 5) {
        event.preventDefault();
        M.toast({ html: 'El usuario debe de contener al menos 5 digitos', classes: 'rounded' })
      }

      else if (!email.test($InputEmail.value)) {
        event.preventDefault();
        M.toast({ html: 'Favor de ingresar un correo valido', classes: 'rounded' })
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