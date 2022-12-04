const mainProduct = (() => {
  const $bodyTable = document.getElementById("data");
  const BASE_URL = "http://localhost:4000/productos/mostrarLoncheras";
  let contador = 0;
  let index = 0;

  const _getData = async () => {
    const response = await http.get(BASE_URL);
    console.log(response,"esto es responde")
    for (index; index < response.length; index++) {
      const $row = _createRow(response[index], "idProducto");
      $bodyTable.appendChild($row);
    }
  };

  const _actionButtonAgregar = async (event) => {
    const $btn = event.target;
    
    const idProducto = $btn.getAttribute("item-id");
    const cant= document.getElementById(idProducto);
    if(cant.value==""){
      cantidad=0;
    }else{
    cantidad=cant.value;}
    
    window.location=`http://localhost:4000/productos/guardarDatosLoncheras/${idProducto}/${cantidad}`;
  
  };


  const _createRow = (item = {}, itemId = "") => {
    if (contador > 2) {

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
          else if(key=="idProducto"){       
            $tr.innerText = "";
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
      $row.appendChild(_createBtnCantidad(item[itemId]));
      $row.appendChild(_createBtnAction(item[itemId], "Agregar al carrito", _actionButtonAgregar));
      return $row;
    }
  };


  const _createBtnAction = (itemId = 0, labelBtn = "", _actionFuntion = () => { }) => {
    const $btn = document.createElement("button");
    $btn.innerText = labelBtn;
    $btn.className += "waves-effect waves-light btn blue";
    $btn.setAttribute("item-id", itemId);
    $btn.addEventListener("click", _actionFuntion);
    return $btn;
  };


  const _createBtnCantidad = (itemId = 0, _actionFuntion = () => { }) => {
    const $btn = document.createElement("input");

    $btn.setAttribute("type", "number");
    $btn.setAttribute("max", 100);
    $btn.setAttribute("min", 1);
    $btn.setAttribute("value", 0);
    $btn.setAttribute("id", itemId);
    $btn.setAttribute("item-id", itemId);
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