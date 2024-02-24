import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CallAPIService {

  constructor() { }

  async postData(dataObj: any, path: string) {
    let userCredentials = {"Email":dataObj.Email, "Password":dataObj.Password};
    fetch(path, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      body: JSON.stringify(userCredentials), // body data type must match "Content-Type" header
    }).catch(error => console.log("an error occurred: ", error))
      .then(response => console.log(response));
  }
}
