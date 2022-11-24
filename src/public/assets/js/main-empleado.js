const mainProduct = (() => {
  const $bodyTable = document.getElementById("data");
  const BASE_URL = "http://localhost:4000/catalogo/empleado/empleados";
 
  const _getData = async () => {
    const response = await http.get(BASE_URL);
    $bodyTable.innerHTML = "";
    for (let index = 0; index < response.length; index++) {
      const $row = _createRow(response[index], "idEmpleado");
      $bodyTable.appendChild($row);
    }
  };

  const _actionButtonEditar = async (event) => {
    const $btn = event.target;
    const $formStatus = document.getElementById("formStatus");
    $formStatus.setAttribute("method", "POST");
    const idEmpleado = $btn.getAttribute("item-id");
    const response = await http.get(`${BASE_URL}/${idEmpleado}`);
    _setData(response[0]);
  };

  const _actionButtonEliminar = async (event) => {
    const $btn = event.target;
    const idEmpleado = $btn.getAttribute("item-id");
    const response = await http.delete({ url: `${BASE_URL}/delete/${idEmpleado}` });
    mainProduct.getData();

  };

  const _createRow = (item = {}, itemId = "") => {
    const $row = document.createElement("tr");
    for (const key in item) {
      const value = item[key];
      const $td = document.createElement("td");
      $td.innerText = value;
      $row.appendChild($td);
    }
    $row.appendChild(_createBtnAction(item[itemId], "Editar", _actionButtonEditar));
    $row.appendChild(_createBtnAction(item[itemId], "Eliminar", _actionButtonEliminar));
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



  const _setVisible = (visible = true) => {
    if (visible) {
      $containerTable.classList.remove("hide");
    } else {
      $containerTable.classList.add("hide");
    }
  };


  const _setData = (item = {}) => {
    const $InputNombre = document.getElementById("nombre_E")
    const $inputEmail = document.getElementById("email");
    const $inputNivelEstudio = document.getElementById("nivelEstudio");

    const { nombre_E, email, nivelEstudio } = item;
    $InputNombre.value = nombre_E;
    $inputEmail.value = email;
    $inputNivelEstudio.value = nivelEstudio;
  };

  const _initElements = () => {
    _getData();
  };


  return {
    init: () => {
      _initElements();
    },

    setVisible: _setVisible,
    getData: _getData
  };
})();

mainProduct.init();