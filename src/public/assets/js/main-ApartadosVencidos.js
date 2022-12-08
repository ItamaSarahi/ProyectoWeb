const mainApartados = (() => {
    const $bodyTable = document.getElementById("data");
    const BASE_URL = "https://creativeideas-d.onrender.com/modulo/ventas/getApartadosVencidos";
  
    const _getData = async () => {
      const response = await http.get(BASE_URL);
      $bodyTable.innerHTML = "";
      for (let index = 0; index < response.length; index++) {
        const $row = _createRow(response[index], "idVenta");
        $bodyTable.appendChild($row);
      }
    };
  
    
  
    const _actionButtonEliminar = async (event) => {
      const $btn = event.target;
        const idVenta = $btn.getAttribute("item-id");
        const response = await http.delete({ url: `${BASE_URL}/delete/${idVenta}` });
        mainApartados.getData();
  
    };
  
    const _createRow = (item = {}, itemId = "") => {
      const $row = document.createElement("tr");
      for (const key in item) {
        const value = item[key];
        const $td = document.createElement("td");
        $td.innerText = value;
        $row.appendChild($td);
      }
      
      $row.appendChild(_createBtnAction(item[itemId], "Eliminar", _actionButtonEliminar));
      return $row;
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
  
    const _setVisible = (visible = true) => {
      if (visible) {
        $containerTable.classList.remove("hide");
      } else {
        $containerTable.classList.add("hide");
      }
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
  
  mainApartados.init();