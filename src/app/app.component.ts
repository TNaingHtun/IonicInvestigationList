import { Component } from '@angular/core';
import firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyA4xmDuo58EPSCYFUoPeVZQxsuH56rPixI",
      authDomain: "phone-auth-27278.firebaseapp.com",
      projectId: "phone-auth-27278",
      storageBucket: "phone-auth-27278.appspot.com",
      messagingSenderId: "373612246600",
      appId: "1:373612246600:web:db7ea89b5585a4295aca7d",
      measurementId: "G-J702HG58KL"
      }
    );
  }
}
