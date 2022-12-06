const mainVentas = (() => {
    const $bodyTable = document.getElementById("data");
    const BASE_URL = "https://creativeideas-d.onrender.com/modulo/ventas/getVentas";
  
    const _getData = async () => {
      
      const response = await http.get(BASE_URL);
      for (let index = 0; index < response.length; index++) {
        const $row = _createRow(response[index], "idVenta");
        $bodyTable.appendChild($row);
      }
      
    };
  
  
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
  
  
  
    const _initElements = () => {
      _getData();
    };
  
    return {
      init: () => {
        _initElements();
      },
    };
  })();
  
  mainVentas.init();
