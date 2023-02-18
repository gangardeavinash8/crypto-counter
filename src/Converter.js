import React, {useEffect,useState} from 'react'

import {  Form, Input,Card,Select} from 'antd'
const Converter = () => {
    const apiUrl=`https://api.coingecko.com/api/v3/exchange_rates`

    const defaultFirstSelectValue="Bitcoin";
    const defaultSecondSelectValue="Ether";


    const [cryptoList,setcryptoList]=useState([])
    const [inputValue,setinputValut]=useState('0')
    const [firstSelect,setfirstSelect]=useState(defaultFirstSelectValue)
    const [secondSelect,setsecondSelect]=useState(defaultSecondSelectValue)
    const [result,setresult]=useState('0')
   

    useEffect(()=>{// when page load useeffect will get activate
        fetchData();


    },[])//empty array for load only once 

useEffect (()=>{

    if(cryptoList.length == 0 ) return
    const firstSelectRate=cryptoList.find((item)=>{
   return item.value===firstSelect
    }).rate

    const secondSelectRate=cryptoList.find((item)=>{
        return item.value===secondSelect
         }).rate

    const resultValue=(inputValue * secondSelectRate)/firstSelectRate;
     setresult(resultValue.toFixed(6));


},[inputValue,firstSelect,secondSelect])


   async function fetchData(){
      const responce=await fetch(apiUrl)
      const jsonData=await responce.json()
          const data=jsonData.rates;
  

     const tempArray= Object.entries(data).map(item =>{
        return {
            value:item[1].name,
            label:item[1].name,
            rate:item[1].value
        }

          //    const tempArray=[];
  
    //   Object.entries(data).forEach(item =>{
    //   const tempObj={
    //     value:item[1].name,
    //     label:item[1].name,
    //     rate:item[1].value
    //   }
    //   tempArray.push(tempObj)
    //   })
      })


     setcryptoList(tempArray);
    }
  return (
    <div className='container'>
        <Card className='crypto-card' title={<h1>Crypto-Converter</h1>}>
            <Form size="large">
                <Form.Item>
                 <Input onChange={(event)=> setinputValut(event.target.value)} />
                </Form.Item>
               
            </Form>
            <div className='select-box'>
            <Select onChange={(value)=> setfirstSelect(value)} style={{width:'160px'}} defaultValue={defaultFirstSelectValue}  options={cryptoList}/>
            <Select onChange={(value)=> setsecondSelect(value)} style={{width:'160px'}} defaultValue={defaultSecondSelectValue}  options={cryptoList}/>
            </div>
            <p> {inputValue}  = {result} {secondSelect}</p>
        </Card>
    </div>
  )
}


export default Converter