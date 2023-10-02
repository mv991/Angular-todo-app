import { TaskService } from './../../task.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import List from 'src/app/models/list';
@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css']
})
export class NewListComponent {
  constructor(private taskService:TaskService, private router: Router) {}
  addList(value: string) {
        this.taskService.createList(value).subscribe((list:any) => this.router.navigate(['/lists',list._id]))
  }
}
