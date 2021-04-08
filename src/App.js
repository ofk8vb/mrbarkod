import React from 'react';
import './App.css';
import {CardList} from './components/cardlist/cardlist.component.jsx'
import stokbarkodmap from './stokno_barkod_map.json'
const axios = require('axios');


// Example api request http://185.51.37.235/api/StokBilgi/869783316106

class App extends React.PureComponent {

  constructor(props){
    super(props);


    this.state={
        input: '',
        products : [{Kod2: "default-card",StokTanim: 'bir stok aratin',Miktar: 0, Fiyat:0, Renk: 'Gokkusagi', Beden:'Tum Bedenler'}],
        currentBarcodes:['Mevcut barkod burada olacak']
    };

    this.onHandleInputChange=this.onHandleInputChange.bind(this)
    this.InputBarcodeMapper = this.InputBarcodeMapper.bind(this)

  }
  //  prefix this for testing https://cors-anywhere.herokuapp.com/
  // makes an axiost request for all the elements in a given array
  axiosFetcher = async (fetchArray)=>{

    axios.defaults.baseURL = 'https://intense-everglades-65236.herokuapp.com/http://185.51.37.235/api/StokBilgi/';
    let products = []
    if (fetchArray){
       for(let i=0;i<fetchArray.length;i++){
        let tempData = ''
        await axios.get(`${fetchArray[i]}`)
        .then( (response) =>{
          // handle success
          console.log(response.data[0])
          tempData=response.data[0]
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
          
        });
        products.push(tempData)
    }
    
    console.log(products)
    if (products.length === 0){
      products = [{Kod2: "boyle bir stok yok",StokTanim: 'boyle bi stok kodu yok',Miktar: 0, Fiyat:0, Renk: 'Gokkusagi', Beden:'Tum Bedenler'}]
      this.setState({products:products})
    }else{
      this.setState({products:products})
    }
    }else{
      products = [{Kod2: "boyle bir stok yok",StokTanim: 'boyle bi stok kodu yok',Miktar: 0, Fiyat:0, Renk: 'Gokkusagi', Beden:'Tum Bedenler'}]
      this.setState({products:products})
    }
   
    
  }

  // takes the stock code input, finds the associated barcode nos, and creates a new array that will be fetched by axios
  // this should be what is run when user clicks 'ara' button
  InputBarcodeMapper = (event)=>{
    event.preventDefault()
    const {input} = this.state
    if (input === ''){
      return;
    }
    // does the mapping and returns an array
    const fetchArray = stokbarkodmap[input]
    console.log(fetchArray)
    this.axiosFetcher(fetchArray)
  }


  onHandleInputChange = (e)=>{
    this.setState({input:e.target.value})
  }
   
  
  
  render(){
     return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={this.InputBarcodeMapper}>
          <label>
            <span className="main-barkod">Stok kodu : </span>
            <input placeholder='Ornek: 20101' value={this.state.input} onChange={this.onHandleInputChange} type="text" name="name" />
          </label>
          <button className="button"  type='submit'>Ara</button>
        </form>
  
      </header>
      <CardList products={this.state.products}></CardList>
     
    </div>
  );
  }
 
 
}

export default App;
