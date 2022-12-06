const mainDetalleVentas = (() => {
    const $bodyTable = document.getElementById("data");
    const BASE_URL = "https://creativeideas-d.onrender.com/modulo/detalleVentas/getDetalleVentas";

    const _getData = async () => {

        const response = await http.get(BASE_URL);
        for (let index = 0; index < response.length; index++) {


            const $row = _createRow(response[index], "id_DV");


            $bodyTable.appendChild($row);
        }

    };


    const _createRow = (item = {}, itemId = "") => {

        const $row = document.createElement("tr");
        for (const key in item) {

            const value = item[key];
            if(value==null){
            const $td = document.createElement("td");
            $td.innerText = "#";
            $row.appendChild($td);

            }else{
            const $td = document.createElement("td");
            $td.innerText = value;
            $row.appendChild($td);
            }

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

mainDetalleVentas.init();