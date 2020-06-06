import ReactDOM from 'react-dom'
import React from 'react'
import Lyrics from './lyrics'
import SearchForm from './search_form'
//import Clock from './clock'
//import Toggle from './toggle'



// ReactDOM.render(
//   <Lyrics songName="wonderful world"/>,
//   document.getElementById('lyrics')
// );

ReactDOM.render(
  <SearchForm/>,
  document.getElementById('lyrics')
);

