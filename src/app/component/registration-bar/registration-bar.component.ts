import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-registration-bar',
  templateUrl: './registration-bar.component.html',
  styleUrls: ['./registration-bar.component.scss'],
})
export class RegistrationBarComponent implements OnInit {

  @Input('registrationValueOne') registrationValueOne;
  @Input('registrationValueTwo') registrationValueTwo;
  @Input('registrationValueThree') registrationValueThree;
  @Input('connectedBarColor') connectedBarColor;

  constructor() { }

  ngOnInit() {}

}
