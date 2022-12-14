const mainProduct = (() => {
  const $bodyTable = document.getElementById("data");
  const $boton = document.getElementById("botonGuardar");
  const BASE_URL = "http://localhost:4000/modulo/producto/getProducto";

  const _getData = async () => {
    //debugger;
    const response = await http.get(BASE_URL);
    for (let index = 0; index < response.length; index++) {
      const $row = _createRow(response[index], "idProducto");
      $bodyTable.appendChild($row);
    }
  };

  const _actionButtonEditar = async (event) => {
    const $btn = event.target;
    const $formStatus = document.getElementById("formProducto");
    const idProducto = $btn.getAttribute("item-id");

    const response = await http.get(`${BASE_URL}/${idProducto}`);

    _setData(response[0]);

  };


  const _createBtnAction1 = (_actionFuntion = () => { }) => {
    const $btn = document.getElementById("botonGuardar");
    $btn.addEventListener("click", _actionFuntion);
    return $btn;
  };

  const _createRow = (item = {}, itemId = "") => {
    const $row = document.createElement("tr");
    for (const key in item) {
      const value = item[key];
      const $td = document.createElement("td");
      if (key !== "url_imagen") {
        $td.innerText = value;

      } else {

        if (value == null) {
          $td.innerText = "SIN IMAGEN";
        } else {
          const $img = document.createElement("img");
          $img.setAttribute("width",100);
          $img.setAttribute("height",100);
          $img.setAttribute("src", `/api/imagen/file?filePath=${value}`);
          $img.classList.add("img-icon");
          $td.appendChild($img);
        }
      }

      $row.appendChild($td);

    }
    
    $row.appendChild(_createBtnAction(item[itemId], "Editar", _actionButtonEditar));

    return $row;
  };



  
  const _createBtnAction = (itemId = 0, labelBtn = "", _actionFuntion = () => { }) => {
    const $btn = document.createElement("button");
    $btn.innerText = labelBtn;
    $btn.className += "btn btn btn-outline-light";

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


  const _setData = (item = {}) => {
    const $inputStatus = document.getElementById("nombre");
    const $inputDescription = document.getElementById("descripcion");
    const $inputExistencia = document.getElementById("existencia");
    const $precio_Compra = document.getElementById("precio_Compra");
    const $precio_Venta = document.getElementById("precio_Venta");
    const { idProducto, nombre, descripcion, existencia, precio_Compra, precio_Venta } = item;
    $inputDescription.value = descripcion;
    $inputStatus.value = nombre;
    $inputExistencia.value = existencia;
    $precio_Compra.value = precio_Compra;
    $precio_Venta.value = precio_Venta;
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