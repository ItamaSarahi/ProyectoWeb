const mainProduct = (() => {
  const $bodyTable = document.getElementById("data");
  const BASE_URL = "https://creativeideas-d.onrender.com/productos/mostrarCubiertos";
  let contador = 0;
  let index = 0;

  const _getData = async () => {
    const response = await http.get(BASE_URL);
    for (index; index < response.length; index++) {
      const $row = _createRow(response[index], "idProducto");
     
      
      $bodyTable.appendChild($row);
    }
  };


  const _actionButtonEditar = (event) => {
    const $btn = event.target;

    const idProducto = $btn.getAttribute("item-id");
    const cant= document.getElementById(idProducto);
    if(cant.value==""){
      cantidad=0;
    }else{
    cantidad=cant.value;}
    
    window.location=`https://creativeideas-d.onrender.com/productos/guardarDatosCubiertos/${idProducto}/${cantidad}`;
    
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
        console.log(item,"item");
        console.log(key,"llabe");
        console.log(item[key],"contenido");
        
        const $tr = document.createElement("tr");
        $tr.setAttribute("width","250");

        

        if (key !== "url_imagen") {
          if (key === "precio_Venta") {
            $tr.innerText = "$ " + value;
          }
          else if(key=="idProducto"){       
            $tr.innerText = "";
          }else if(key=="descripcion"){       
            let datos= JSON.stringify(value);
            if(datos.length>=100){
              const $p1 = document.createElement("p");
              const $p2 = document.createElement("p");

              let va=datos.split(",");
              console.log(va[0]);
              console.log(va[1]);
              $p1.innerText=va[0].replace(/['"]+/g, '');
              $p2.innerText=va[1].replace(/['"]+/g, '');

              $tr.appendChild($p1);
              $tr.appendChild($p2);
              
            }else{
              $tr.innerText = value;
            }
          }
          else {
            
            $tr.innerText = value;
            ;
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
      $row.appendChild(_createBtnAction(item[itemId], "Agregar al carrito", _actionButtonEditar));
      return $row;
    }
  };


  const _createBtnAction = (itemId = 0, labelBtn = "", _actionFuntion = () => { }) => {
    //debugger;
    const $btn = document.createElement("button");
    $btn.innerText = labelBtn;
    
    $btn.className += "btn btn blue darken-3";
    $btn.setAttribute("item-id", itemId);
    $btn.addEventListener("click", _actionFuntion);
    return $btn;
  };


  const _createBtnCantidad = (itemId = 0) => {
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