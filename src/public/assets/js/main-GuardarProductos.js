const mainProduct = (() => {
    const $bodyTable = document.getElementById("data");
    const BASE_URL = "https://creativeideas-d.onrender.com/productos/recuperarDatos";
  
    const _getData = async () => {
      try {
        let calculo=0;
        const response = await http.get(BASE_URL);
        $bodyTable.innerHTML = "";
        console.log(response, "Esto es responde");
        var verProducto = JSON.parse(response);
        let contador = 0;
        let index = 0;
        while (index < verProducto.length) {
          const $row = document.createElement("tr");
          const value = verProducto[index];
          const value1 = verProducto[index + 1];
          const value2 = verProducto[index + 2];
          const value3 = verProducto[index + 3];
          const value4 = verProducto[index + 4];
  
          
  
          
          const $td = document.createElement("td");
          const $td1 = document.createElement("td");
          const $td2 = document.createElement("td");
          const $td3 = document.createElement("td");
          const $td4 = document.createElement("td");
          calculo=calculo+value4;
          
          $td1.innerText = value1;
          $td2.innerText = value2;
          $td3.innerText = value3;
          $td4.innerText = value4;
  
  
          if (value == null) {
            $td.innerText = "SIN IMAGEN";
          } else {
            const $img = document.createElement("img");
            $img.setAttribute("width",150);
            $img.setAttribute("height",150);
            $img.setAttribute("src", `/api/imagen/file?filePath=${value}`);
            $img.classList.add("img-icon");
            $td.appendChild($img);
          }
  
          console.log(value);
          //$row.innerText=value;
          $row.appendChild($td);
          $row.appendChild($td1);
          $row.appendChild($td2);
          $row.appendChild($td3);
          $row.appendChild($td4);
  
  
          index = index + 5;
          $bodyTable.appendChild($row);
  
  
  
        }
        $bodyTable.appendChild(_createTOTAL("TU TOTAL A PAGAR ES = $"+calculo+"."));
      } catch (error) {
        window.location='https://creativeideas-d.onrender.com/productos/recuperarDatos';
  
      }
      console.log("Termino el ciclo");
  
  
  
  
  
    };
  
    const _createTOTAL = (valor) => {
      const $btn = document.createElement("input");
      $btn.setAttribute("type", "text");
      $btn.setAttribute("value", valor);
      $btn.readOnly=true;
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
  
  mainProduct.init();