const mainApartados = (() => {
  const $bodyTable = document.getElementById("data");
  const BASE_URL = "http://localhost:4000/iniciosesion/datosEmpleado";


  const _getData = async () => {
    const response = await http.get(BASE_URL);
    $bodyTable.innerHTML = "";
    for (let index = 0; index < response.length; index++) {
      const $row = _createRow(response[index], "id_DV");
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

      console.log(key)
      if (key=== "idVenta") {
        $td.innerText = "";
      }
      else {
        $td.innerText = value;
      }

      $row.appendChild($td);

    }

    return $row;
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