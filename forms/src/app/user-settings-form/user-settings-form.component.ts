import { Component, OnInit } from '@angular/core';
import { UserSettings } from '../data/user-settings';
import { NgForm, NgModel } from '@angular/forms';
import { DataService } from '../data/data.service';
import { Observable } from 'rxjs';
import { tienda } from '../data/tienda';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css']
})
export class UserSettingsFormComponent implements OnInit {

  originalUserSettings: UserSettings = {
    name: null,
    emailOffers: null,
    interfaceStyle: null,
    subscriptionType: null,
    notes: null
  };

  userSettings: UserSettings = { ...this.originalUserSettings};
  tiendas: tienda = {
    name: "juan",
    ciudad: "medellin",
    numero: 312684,
    usuarios: [{
        name: "pedro",
        emailOffers: false,
        interfaceStyle: "oe",
        subscriptionType: "peor",
        notes: "ojala sirva"
      },{
        name: "asd",
        emailOffers: false,
        interfaceStyle: "oasdfe",
        subscriptionType: "peagor",
        notes: "ojaagfgala sirva"
      }]
  };
  postError = false;
  postErrorMessage= '';
  subscriptionTypes: Observable<string[]>;
  singleModel= "On";
  startDate: Date;
  startTime: Date;
  userRating = 0;
  maxRating = 5;
  isReadonly: boolean = false;


  
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.subscriptionTypes = this.dataService.getSubscriptionTypes();

    this.startDate = new Date();
    this.startTime = new Date();
    
  }

  onBlur(field: NgModel) {
    console.log('in OnBlur: ', field.valid);
    
  }

  onHttpError(errorResponse: any) {
    console.log('error: ', errorResponse);
    this.postError= true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }

  onSubmit(form: NgForm) {
    console.log('in onSubmit: ', form.valid);
    console.log(this.startDate);
    if(form.valid){

      this.dataService.postUserSettingsForm(this.userSettings).subscribe(
        result => console.log('success: ',result),
        error => this.onHttpError(error)
        );
    }else{
      this.postError = true;
      this.postErrorMessage = "revisar";
    }
  }

}
