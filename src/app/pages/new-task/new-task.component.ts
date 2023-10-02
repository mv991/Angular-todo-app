import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
  listId:string = "";
constructor(private taskService:TaskService, private router: Router,private route: ActivatedRoute) {
  this.route.params.subscribe((params: Params) => this.listId = params['listId']);
}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  addTask(value:string) {
    console.log("ran add task")
     this.taskService.createTask(this.listId,value)
     .subscribe(() => this.router.navigate(["../"],{relativeTo: this.route}));
  }
}
