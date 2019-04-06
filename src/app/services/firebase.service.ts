import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

private snapshotChangesSubscription: any;


  constructor(
        public afs: AngularFirestore,
        public afAuth: AngularFireAuth
  ) { }

  calGPA(gradeArray,creditHourArray){
    var averageGPA;
    var sum = 0.0;   
    var credSum = 0.0;    
    
    for(var j = 0; j <gradeArray.length; j++)
    {
        sum = sum + (parseFloat(gradeArray[j])*parseFloat(creditHourArray[j]));
    }
    
    
    for(var k = 0; k < creditHourArray.length; k++)
    {
        credSum = credSum + parseFloat(creditHourArray[k]);
    }
    

    averageGPA = ((sum)/(credSum)); 
    var newAvg = averageGPA.toFixed(2);
    console.log(sum);
    console.log(credSum);
    console.log(newAvg);
    return newAvg;

      
  }

  showGPA(){
    console.log("Hi")

  }


  createSubjects(value) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser; 
      this.afs.collection('people').doc(currentUser.uid).collection('Course').add({
        subName: value.subName,
        subCode: value.subCode,
        creditHour: value.creditHour,
        grade: value.grade
      })
      
      .then(
          res => resolve(res),
          err => reject(err)
      )
    
    })
  }

  createGPA(gradeArray,creditHourArray) {
      return new Promise<any>((resolve, reject) => {
          let currentUser = firebase.auth().currentUser; 
          this.afs.collection('people').doc(currentUser.uid).collection('GPA').add({
              gpa: this.calGPA(gradeArray,creditHourArray)
              
          })
              .then(
                  res => resolve(res),
                  err => reject(err)
              )
      
      })
      

  }


  unsubscribeOnLogOut() {
        //remember to unsubscribe from the snapshotChanges
      // this.snapshotChangesSubscription.unsubscribe();
  }

  getTasks(){
        return new Promise<any>((resolve, reject) => {
          this.afAuth.user.subscribe(currentUser => {
            if(currentUser){
              this.snapshotChangesSubscription = this.afs.collection('people').doc(currentUser.uid).collection('Course').snapshotChanges();
              resolve(this.snapshotChangesSubscription);
            }
          })
        })
  }
    
  getTask(taskId){
        return new Promise<any>((resolve, reject) => {
          this.afAuth.user.subscribe(currentUser => {
            if(currentUser){
              this.snapshotChangesSubscription = this.afs.doc<any>('people/' + currentUser.uid + '/Course/' + taskId).valueChanges()
              .subscribe(snapshots => {
                resolve(snapshots);
              }, err => {
                reject(err)
              })
            }
          })
        });
  }



  getGPA(){
        return new Promise<any>((resolve, reject) => {
          this.afAuth.user.subscribe(currentUser => {
            if(currentUser){
              this.snapshotChangesSubscription = this.afs.collection('people').doc(currentUser.uid).collection('GPA').snapshotChanges();
              resolve(this.snapshotChangesSubscription);
            }
          })
        })
  }
    
  getGPA2(GPAId){
        return new Promise<any>((resolve, reject) => {
          this.afAuth.user.subscribe(currentUser => {
            if(currentUser){
              this.snapshotChangesSubscription = this.afs.doc<any>('people/' + currentUser.uid + '/GPA/' + GPAId).valueChanges()
              .subscribe(snapshots => {
                resolve(snapshots);
              }, err => {
                reject(err)
              })
            }
          })
        });
  }

}