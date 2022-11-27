//Esto es para traer los registro de las ventas en donde el estatus sea "NO PAGADO"

const mainNoVentas = (() => {
    const $bodyTable = document.getElementById("data");
    const BASE_URL = "http://localhost:4000/modulo/ventas/getApartados";

    const _getData = async () => {
        //debugger;
        const response = await http.get(BASE_URL);
        for (let index = 0; index < response.length; index++) {
            const $row = _createRow(response[index], "idVenta");
            $bodyTable.appendChild($row);
        }
    };

    const _actionButtonEditar = async (event) => {
        const $btn = event.target;
        const idVenta = $btn.getAttribute("item-id");
        const response = await http.get(`${BASE_URL}/${idVenta}`);
        _setData(response[0]);
    };


    const _createRow = (item = {}, itemId = "") => {
        //debugger;
        const $row = document.createElement("tr");
        for (const key in item) {
            const value = item[key];
            const $td = document.createElement("td");
            $td.innerText = value;
            $row.appendChild($td);
        }
        $row.appendChild(_createBtnAction(item[itemId], "Confirmar", _actionButtonEditar));

        return $row;
    };

    const _createBtnAction = (itemId = 0, labelBtn = "", _actionFuntion = () => { }) => {
        //debugger;
        const $btn = document.createElement("button");
        $btn.innerText = labelBtn;
        $btn.className += "waves-effect waves-light btn blue";
        $btn.setAttribute("item-id", itemId);
        $btn.addEventListener("click", _actionFuntion);
        return $btn;
    };

    const _setData = (item = {}) => {

        const $InputVenta = document.getElementById("venta");
        const $InputFechaI = document.getElementById("fechaI");
        const $InputFechaV = document.getElementById("fechaV");
        const $InputStatus = document.getElementById("status");
        const $InputEmpleado = document.getElementById("empleado");
        const $InputCliente = document.getElementById("cliente");

        const { idVenta, idCliente, idEmpleado, fecha_Inicial, fecha_Vencimiento, status } = item;
        $InputVenta.value = idVenta;
        $InputFechaI.value = fecha_Inicial;
        $InputFechaV.value = fecha_Vencimiento;
        $InputStatus.value = status;
        $InputEmpleado.value = idEmpleado;
        $InputCliente.value = idCliente;

    };



    const _initElements = () => {
        _getData();
    };

    return {
        init: () => {
            _initElements();
        },
    };
})();

mainNoVentas.init();