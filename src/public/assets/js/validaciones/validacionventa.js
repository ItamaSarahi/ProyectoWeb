const form = (() => {
    const $formStatus = document.getElementById("formConfirmarVentas");
    const $InputVenta = document.getElementById("venta");
    const $InputFechaI = document.getElementById("fechaI");
    const $InputFechaV= document.getElementById("fechaV");
    const $InputStatus = document.getElementById("status");
    const $InputEmpleado = document.getElementById("empleado");
    const $InputCliente= document.getElementById("cliente");
    
    const _sendActionForm = (event = {}) => {
  
      if ($InputVenta.value === "" || $InputFechaI.value === "" || $InputFechaV.value==""
      || $InputStatus.value === "" || $InputEmpleado.value === "" || $InputCliente.value=="") {
        event.preventDefault();
        M.toast({ html: 'Se requieren rellenar todos los campos' , classes: 'rounded'})
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