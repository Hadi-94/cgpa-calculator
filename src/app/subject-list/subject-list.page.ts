import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { AuthService } from '../services/auth.service';

import { LoadingController } from '@ionic/angular';
import { database } from 'firebase';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.page.html',
  styleUrls: ['./subject-list.page.scss'],
})
export class SubjectListPage implements OnInit {

  subjects: Array<any>;
  gpa: number;
  
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    public loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    if (this.route && this.route.data) {
        this.getData();
      }
 
}
  async getData(){
   /*    const loading = await this.loadingCtrl.create({
         message: 'Please wait...'
       });
       this.presentLoading(loading);
   */
       this.route.data.subscribe(routeData => {
         routeData['data'].subscribe(data => {
         //  loading.dismiss();
           this.subjects = data;
         })
       })
     }
   
    async presentLoading(loading) {
       return await loading.present();
    }

    
    
    // async calGPA(gradeArray,creditHourArray){
    //     var averageGPA;
    //     var sum = 0.0;   
    //     var credSum = 0.0;    
        
    //     for(var j = 0; j <gradeArray.length; j++)
    //     {
    //       sum = sum + (parseFloat(gradeArray[j])*parseFloat(creditHourArray[j]));
    //     }
        
        
    //     for(var k = 0; k < creditHourArray.length; k++)
    //     {
    //         credSum = credSum + parseFloat(creditHourArray[k]);
    //     }
        

    //     averageGPA = ((sum)/(credSum)); 
    //     var newAvg = averageGPA.toFixed(2);
    //     console.log(sum);
    //     console.log(credSum);
    //     console.log(newAvg);
    //     return newAvg;
    // }


       
         
      
      





  goToSubPage() {

      this.router.navigate(['/subjects']);
  }
  logout() {
      this.authService.doLogout()
          .then(res => {
              this.router.navigate(["/home"]);
          }, err => {
              console.log(err);
          })
  }
}
