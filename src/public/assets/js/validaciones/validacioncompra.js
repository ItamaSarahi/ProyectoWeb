
//Validacion para los campos del formulario del registro de compras
const form = (() => {
    const $formCompra = document.getElementById("formRegistroCompra");
    const $InputProducto = document.getElementById("producto");
    const $InputCantidad = document.getElementById("cantidad");
    const $InputProveedor = document.getElementById("proveedor");

    const _sendActionForm = (event = {}) => {

        if ($InputProducto.value === "" || $InputCantidad.value === "" || $InputProveedor.value == "") {
            event.preventDefault();
            M.toast({ html: 'Se requieren rellenar todos los campos', classes: 'rounded' })
        }
    };

    const _addActionForm = () => {
        $formCompra.addEventListener("submit", _sendActionForm);
    };

    return {
        init: () => {
            _addActionForm();
        },
    };
})();

form.init();