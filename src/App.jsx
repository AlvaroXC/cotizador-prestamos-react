import { useState, useEffect } from "react"
import Header from "./components/Header"
import Button from "./components/Button";
import { formatearDinero, calcularTotalAPagar } from "./utils";

function App() {

  const [cantidad, setCantidad] = useState(10000);
  const [meses, setMeses] = useState(6);
  const [total, setTotal] = useState(0);
  const [pago, setPago] = useState(0);


  useEffect(()=>{
    const resultadoTotal = calcularTotalAPagar(cantidad, meses);
    setTotal(resultadoTotal);

  }, [cantidad, meses]);

  useEffect(()=>{
        //calcular el pago mensual 
        setPago(total/meses);
  }, [total, meses])


  const MIN=0;
  const MAX=20000;
  const STEP=100;

  function handleChange(e){
    setCantidad(parseInt(e.target.value));
  }

  function handleClickDecremento(){
    const valor = cantidad - STEP;
    if(!(valor<MIN)){
      setCantidad(valor);
    }
  }

  function handleClickIncremento(){
    const valor = cantidad + STEP;
    if(!(valor>MAX)){
      setCantidad(valor);
    }
  }

  function handleChangeMeses(e){
    setMeses(parseInt(e.target.value));
  }

  return (
    <div className="my-20 max-w-lg mx-auto shadow p-10 bg-white">
      <Header/>
      <div className="flex justify-between my-6">
        <Button
          operador='-'
          fn={handleClickDecremento}
        />
        <Button
          operador='+'
          fn={handleClickIncremento}
        />
      </div>

      <input 
        type="range" 
        className="w-full h-6 bg-grey-500 accent-lime-500 hover:accent-lime-600"
        onChange={handleChange}
        min={MIN}
        max={MAX}
        step={STEP}
        value={cantidad}
      />
      <p className="text-center text-5xl text-indigo-600 my-10 font-extrabold">
        {formatearDinero(cantidad)}
      </p>

      <h2 className="text-center text-2xl font-extrabold text-gray-500">
        Elige un <span className="text-indigo-600">plazo</span> a pagar
      </h2>

      <select className="mt-5 w-full p-2 bg-white border-gray-300 rounded-lg text-center text-xl font-bold text-gray-500 " 
        value={meses} 
        name="" id=""
        onChange={handleChangeMeses}
        >
        <option value="6">6 meses</option>
        <option value="12">12 meses</option>
        <option value="24">24 meses</option>
      </select>
      
      <div className="my-5 space-y-3 bg-gray-50 p-5">
        <h2 className="text-center text-2xl font-extrabold text-gray-500">
        Resumen <span className="text-indigo-600">de pagos</span></h2>

        <p className="text-xl text-gray-500 text-center font-bold">{meses} Meses</p>
        <p className="text-xl text-gray-500 text-center font-bold">{formatearDinero(total)} Total a pagar</p>
        <p className="text-xl text-gray-500 text-center font-bold">{formatearDinero(pago)} Mensuales</p>
      </div>

    </div>
  )
}

export default App
