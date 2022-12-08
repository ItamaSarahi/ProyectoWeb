const mainProduct = (() => {
  const $bodyTable = document.getElementById("data");
  const BASE_URL = "https://creativeideas-d.onrender.com/iniciosesion/datosCliente";

  //Obtener los datos de la tabla clientes:
  const _getData = async () => {
    const response = await http.get(BASE_URL);
    for (let index = 0; index < response.length; index++) {
      const $row = _createRow(response[index], "idCliente");
      $bodyTable.appendChild($row);
    }
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
    return $row;
  };
 

  //Crear acción del botón:

  
  const _createBtnAction = (itemId = 0, labelBtn = "", _actionFuntion = () => { }) => {
    const $btn = document.createElement("button");
    $btn.innerText = labelBtn;
    $btn.className += "btn btn blue darken-3";

    if(labelBtn=="Editar"){
      $btn.innerHTML += ("<i class='material-icons'>create</i>");
    }
   
    $btn.setAttribute("item-id", itemId);
    $btn.addEventListener("click", _actionFuntion);

    return $btn;
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