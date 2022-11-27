const mainProduct = (() => {
  const $bodyTable = document.getElementById("data");
  const BASE_URL = "http://localhost:4000/iniciosesion/datosCliente";

  //Obtener los datos de la tabla clientes:
  const _getData = async () => {
    const response = await http.get(BASE_URL);
    for (let index = 0; index < response.length; index++) {
      const $row = _createRow(response[index], "idCliente");
      $bodyTable.appendChild($row);
    }
  };

  //Accion boton editar:
  const _actionButtonEditar = async (event) => {
    const $btn = event.target;
    const $formStatus = document.getElementById("formStatus");
    $formStatus.setAttribute("method", "POST");
    const idCliente = $btn.getAttribute("item-id");
    const response = await http.get(`${BASE_URL}/${idCliente}`);
    _setData(response[0]);
  };


  //Crear columnas
  const _createRow = (item = {}, itemId = "") => {

    const $row = document.createElement("tr");
    for (const key in item) {
      const value = item[key];
      const $td = document.createElement("td");
      $td.innerText = value;
      $row.appendChild($td);
    }
    $row.appendChild(_createBtnAction(item[itemId], "Editar", _actionButtonEditar));
    return $row;
  };


  //Crear acción del botón:
  const _createBtnAction = (itemId = 0, labelBtn = "", _actionFuntion = () => { }) => {
    const $btn = document.createElement("button");
    $btn.innerText = labelBtn;
    $btn.className += "btn waves-effect cyan darken-2";
    $btn.setAttribute("item-id", itemId);
    $btn.addEventListener("click", _actionFuntion);
    return $btn;
  };

  //Cambiar datos del cliente
  const _setData = (item = {}) => {
    const $inputUsuario = document.getElementById("usuario");
    const $inputPassword = document.getElementById("password");

    const { usuario} = item;
    $inputUsuario.value = usuario;
    $inputPassword.value = "";
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

mainProduct.init(); 