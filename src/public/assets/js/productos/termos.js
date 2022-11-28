const mainProduct = (() => {
  const $bodyTable = document.getElementById("data");
  const BASE_URL = "http://localhost:4000/productos/mostrarTermos";
  let contador = 0;
  let index = 0;

  const _getData = async () => {
    const response = await http.get(BASE_URL);
    for (index; index < response.length; index++) {
      const $row = _createRow(response[index], "idProducto");
      $bodyTable.appendChild($row);
    }
  };

  const _actionButtonEditar = async (event) => {
    const $btn = event.target;
    const $formStatus = document.getElementById("formProducto");



    const idProducto = $btn.getAttribute("item-id");
    //const response = await http.get(`${BASE_URL}/${idProducto}`);
    const response = await http.get(`${BASE_URL}/${idProducto}`);
    $formStatus.setAttribute("_method", "PUT");
    _setData(response[0]);


    $formStatus.setData('PUT');



  };


  const _createRow = (item = {}, itemId = "") => {


    if (contador > 3) {

      const $row = document.createElement("tr");
      contador = 0;
      index--;
      return $row;

    }
    else {
      const $row = document.createElement("td");

      for (const key in item) {
        const value = item[key];
        const $tr = document.createElement("tr");

        if (key !== "url_imagen") {
          if (key === "precio_Venta") {
            $tr.innerText = "$ " + value;
          }
          else {
            $tr.innerText = value;
          }

        } else {
          if (value == null) {
            $tr.innerText = "SIN IMAGEN";
          } else {
            const $img = document.createElement("img");
            $img.setAttribute("src", `/api/imagen/file?filePath=${value}`);
            $img.classList.add("img-icon");
            $tr.appendChild($img);
          }

        }
        $row.appendChild($tr);
      }

      contador++;
      $row.appendChild(_createBtnAction(item[itemId], "Agregar al carrito", _actionButtonEditar));

      return $row;
    }
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