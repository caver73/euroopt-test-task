import React from 'react'
import './App.scss'
import ListGroup from './components/ListGroup'
import TextGroup from './components/TextGroup'
import {observer} from 'mobx-react'
import store from './store'

const App = () =>

  <div className="App content-wrapper">
    <div className='registration'>
      <div>
        <img src='logo.svg' alt='Евроопт' />
      </div>
      <form>
        <ListGroup label = 'Страна' isRequired='true' options = {store.countries} value={store.country} onChange={country=>store.selectCountry(country)}/>
        <ListGroup label = 'Область (обл. центр)' isRequired='true' options = {store.regions} value = {store.region}  onChange={reg=>store.selectRegion(reg)}/>
        <ListGroup label = 'Район (район. центр)' isRequired='true' options = {store.districts} value={store.district} onChange = {dist=>store.selectDistrict(dist)}/>
        <ListGroup label = 'Населенный пункт' isRequired='true' options = {store.cities} value={store.city} onChange = {city=>store.selectCity(city)}/>
        <ListGroup label = 'Улица' isRequired='true' options = {store.streets} value={store.street} onChange = {street=>store.selectStreet(street)}/>
        <TextGroup label = 'Дом' isRequired='true'/>
        <TextGroup label = 'Корпус' />
        <TextGroup label = 'Подъезд' />
        <TextGroup label = 'Этаж' />
        <TextGroup label = 'Квартира' />
        <button type="submit" className="btn btn-orange btn-primary">Сохранить</button>
      </form>
    </div>
  </div>


export default observer(App);
