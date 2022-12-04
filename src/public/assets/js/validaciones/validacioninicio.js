
const form = (() => {
    const $formStatus = document.getElementById("formStatus");
    const $Inputusuario = document.getElementById("usuario");
    const $Inputpassword = document.getElementById("password");
  
    
    const _sendActionForm = (event = {}) => {
  
      if ($Inputpassword.value === "" || $Inputusuario.value === "") {
        event.preventDefault();
        M.toast({ html: 'Se requieren rellenar todos los campos para poder iniciar' , classes: 'rounded'})
      }else{
        
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
  
  