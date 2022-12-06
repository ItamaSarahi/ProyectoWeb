const mainProduct = (() => {
  const $bodyTable = document.getElementById("data");
  const BASE_URL = "https://creativeideas-d.onrender.com/catalogo/proveedor/prove";

  const _getData = async () => {
    const response = await http.get(BASE_URL);
    $bodyTable.innerHTML = "";
    for (let index = 0; index < response.length; index++) {
      const $row = _createRow(response[index], "idProveedor");
      $bodyTable.appendChild($row);
    }
  };

  const _actionButtonEditar = async (event) => {
    const $btn = event.target;
    const $formProveedor = document.getElementById("formProveedor");
    $formProveedor.setAttribute("method", "POST");
    const idProveedor = $btn.getAttribute("item-id");
    const response = await http.get(`${BASE_URL}/${idProveedor}`);
    _setData(response[0]);
  };

  const _actionButtonEliminar = async (event) => {
    const $btn = event.target;
    const idProveedor = $btn.getAttribute("item-id");
    const response = await http.delete({ url: `${BASE_URL}/delete/${idProveedor}` });
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
    const $btn = document.createElement("button");
    $btn.innerText = labelBtn;
    $btn.className += "btn btn btn-outline-blue darken-3";
    
    if(labelBtn=="Editar"){
      $btn.innerHTML += ("<i class='material-icons'>create</i>");
   
    }
    if(labelBtn=="Eliminar"){
      $btn.innerHTML += ("<i class='material-icons'>delete</i>");
    }
    
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
    const $inputStatus = document.getElementById("empresa");
    const $inputDescription = document.getElementById("telefono");
    const { idProducto, empresa, telefono } = item;
    $inputDescription.value = telefono;
    $inputStatus.value = empresa;
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