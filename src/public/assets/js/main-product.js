const mainProduct = (() => {
    const $bodyTable = document.getElementById("data");
    const BASE_URL = "http://localhost:4000/catalogo/producto/product";
  
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
        const $formStatus = document.getElementById("formStatus");
      $formStatus.setAttribute("method","POST");
      
      const idProducto = $btn.getAttribute("item-id");
      const response = await http.get(`${BASE_URL}/${idProducto}`);
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
      $row.appendChild(_createBtnAction(item[itemId], "Editar", _actionButtonEditar));
      
      return $row;
    };
  
    const _createBtnAction = (itemId = 0, labelBtn = "", _actionFuntion = () => {}) => {
      //debugger;
      const $btn = document.createElement("button");
      $btn.innerText = labelBtn;
      $btn.className += "waves-effect waves-light btn blue";
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
      $inputDescription.value =descripcion;
      $inputStatus.value = nombre;
      $inputExistencia.value=existencia;
      $precio_Compra.value=precio_Compra;
      $precio_Venta.value=precio_Venta;
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