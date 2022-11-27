const mainCompras = (() => {
    const $bodyTable = document.getElementById("data");
    const BASE_URL = "http://localhost:4000/modulo/compras/getCompras";

    const _getData = async () => {

        const response = await http.get(BASE_URL);
        for (let index = 0; index < response.length; index++) {


            const $row = _createRow(response[index], "idCompra");


            $bodyTable.appendChild($row);
        }

    };


    const _createRow = (item = {}, itemId = "") => {

        const $row = document.createElement("tr");
        for (const key in item) {

            const value = item[key];
            if (value == null) {
                const $td = document.createElement("td");
                $td.innerText = "#";
                $row.appendChild($td);

            } else {
                const $td = document.createElement("td");
                $td.innerText = value;
                $row.appendChild($td);
            }

        }
        //Se crea una etiqueta para el status
        const $etiqueta = document.createElement("p");
        $etiqueta.innerText = "pagado"
        //Se agrega el status a la tabla
        $row.appendChild($etiqueta);
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

mainCompras.init();