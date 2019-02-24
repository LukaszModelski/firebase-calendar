import { Component, OnInit } from '@angular/core';
import { ELEMENT_MARKER } from '@angular/core/src/render3/interfaces/i18n';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

  tasksObject;
  tasksArray;
  nrOfTasks;
  months = [
    {
      name: 'styczen',
      days: 31,
      tasks: []
    },
    {
      name: 'luty',
      days: 28,
      tasks: []
    },
    {
      name: 'marzec',
      days: 31,
      tasks: []
    },
    {
      name: 'kwiecien',
      days: 30,
      tasks: []
    },
    {
      name: 'maj',
      days: 31,
      tasks: []
    },
    {
      name: 'czerwiec',
      days: 30,
      tasks: []
    }
  ];

  // months = [1, 2, 3, 4];
  constructor() { }

  ngOnInit() {
    this.initDatabase();
    this.loadDataFromDatabse();
    console.log('Months: ' + this.months);
  }

  initDatabase() {
    const config = {
      apiKey: "AIzaSyDbWAi--vUq_uAf8xwZfvfJjgbpUdhdNs4",
      authDomain: "calendar-842e0.firebaseapp.com",
      databaseURL: "https://calendar-842e0.firebaseio.com",
      projectId: "calendar-842e0",
      storageBucket: "",
      messagingSenderId: "480335894528"
    };
    firebase.initializeApp(config);
  }

  loadDataFromDatabse() {
    const databeseRef = firebase.database().ref('/tasks/');
    databeseRef.on('value', (snapshot) => {
      this.tasksObject = snapshot.val();
      this.tasksArray = Object.values(this.tasksObject);
      // console.log(this.tasksObject);
      // console.log(this.tasksArray);
      this.loadDataToCalendar(this.tasksArray);
    });
  }

  loadDataToCalendar(tasks) {
    tasks.forEach(task => {
      // this.months[task.miesiac - 1].task = task.nazwa;
      // console.log(this.months[task.miesiac - 1]);
      this.months[task.miesiac - 1].tasks.push(task);
      console.log(this.months);
    });
    this.nrOfTasks = tasks.length;
  }

  openClosePopup(){
    const popup = document.querySelector('.add-task-popup');
    popup.classList.toggle('visible');
  }

  addTaskToDatabase() {
    // firebase.database().ref('users/').set({
    //   username: 'Maras',
    //   email: 'fred@gmail.com',
    //   profile_picture : 'imageUrlMarasa'
    // });
    console.log('Function to add task to DB');
  }

  counter(i: number) {
    return new Array(i);
  }
}
