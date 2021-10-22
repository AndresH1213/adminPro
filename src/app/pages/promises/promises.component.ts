import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: [
  ]
})
export class PromisesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsuarios().then( usuario => {
      console.log(usuario)
    })
    // const promise = new Promise((resolve, reject) => {
    //   if (false) {
    //     resolve('Hola mundo')
    //   } else {
    //     reject('algo salio mal')
    //   }
    // });
    // promise.then((mensaje) => {
    //   console.log(mensaje)
    //   console.log('dentro de la promesa')
    // }).catch(err => console.log('error en mi promesa', err))
    // console.log('fin del init')
  }

  getUsuarios() {

    return new Promise( resolve => {
      fetch('https://reqres.in/api/users')
        .then( resp => resp.json())
        .then( ({data}) => resolve(data));
    })
  }
}
