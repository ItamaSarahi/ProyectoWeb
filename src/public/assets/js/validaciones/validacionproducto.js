const form = (() => {
    const $formProducto = document.getElementById("formProducto");
    const $InputNombre = document.getElementById("nombre");
    const $InputDescripcion = document.getElementById("descripcion");
    const $InputExistencia = document.getElementById("existencia");
    const $InputProveedor = document.getElementById("proveedor");
    const $InputPrecio_Compra = document.getElementById("precio_Compra");
    const $InputPrecio_Venta= document.getElementById("precio_Venta");
    const _sendActionForm = (event = {}) => {
  
      if ($InputNombre.value === "" || $InputDescripcion.value === ""
        || $InputExistencia.value === "" || $InputPrecio_Compra.value === ""
        || $InputPrecio_Venta.value === "" || $InputProveedor.value === "") {
        event.preventDefault();
        M.toast({ html: 'Se requieren rellenar todos los campos' , classes: 'rounded'})
      }
      else if($InputPrecio_Venta.value<=0){
        event.preventDefault();
        M.toast({html: 'El precio de venta no puede ser cero'})
      }
      else if ($InputPrecio_Compra.value<=0){
        event.preventDefault();
        M.toast({html: 'El precio de compra no puede ser cero'})
      }
      else if($InputExistencia<=0){
        event.preventDefault();
        M.toast({html: 'La existencia no puede ser cero'})
      }
  
  
  
    };
  
    const _addActionForm = () => {
      $formProducto.addEventListener("submit", _sendActionForm);
    };
  
    return {
      init: () => {
        _addActionForm();
      },
    };
  })();
  
  form.init();