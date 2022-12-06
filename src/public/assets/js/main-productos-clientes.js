const mainProducto = (() => {
  const $bodyTable = document.getElementById("data");
  const BASE_URL = "https://creativeideas-d.onrender.com/modulo/producto/getProducto";

  const _getData = async () => {
    //debugger;
    const response = await http.get(BASE_URL);
    for (let index = 0; index < response.length; index++) {
      console.log(response[index]);
      const $row = _createRow(response[index], "idProducto");
      $bodyTable.appendChild($row);
    }
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
          $img.setAttribute("src", `/api/imagen/file?filePath=${value}`);
          $img.classList.add("img-icon");
          $td.appendChild($img);
        }
      }

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

mainProducto.init();