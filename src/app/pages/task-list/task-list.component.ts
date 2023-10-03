import { TaskService } from './../../task.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import List from 'src/app/models/list';
import Task from 'src/app/models/task';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
    lists: List[] = [];
    task: Task[] = [];
    listId: string = "";
    constructor(private taskService:TaskService,
      private route: ActivatedRoute,
      private router: Router
      ) {}

    ngOnInit() {
       this.taskService.getLists().subscribe((lists: any) => {
        if(lists) {
                  this.lists = lists
                  this.hideloader();
        }
        
      
      });

       this.route.params.subscribe((params: Params) => {
         this.listId = params['listId'];
        if(!this.listId) return;
        this.taskService.getTasks(this.listId).subscribe((task: any) => this.task = task)
       });
    }
    onTaskClick(task: Task) {
      this.taskService.setCompleted(this.listId, task).subscribe(() => task.completed = !task.completed)
    }
    deleteTask(task: Task) {
      this.taskService.deleteTask(this.listId, task._id).subscribe((task: any) => this.task = this.task.filter(t => t._id!=task._id))
    }
     deleteList(lists: List) {
      this.taskService.deleteList(lists._id).subscribe(() => this.lists = this.lists.filter(l => l._id!=lists._id))
    }
    addTaskClick() {
      if(!this.listId) {
        alert("Please select a List to add tasks");
        return;
      }
      this.router.navigate(["./new-task"],{relativeTo: this.route})
    }
    hideloader() {
      console.log("ran")
           const x = document.getElementById("loading")! 
                x.style.display = 'none';
        }
}
