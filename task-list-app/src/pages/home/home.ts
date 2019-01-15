import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})

export class HomePage {

	public tasks: string[];
	public tasksCheck: boolean[];

	constructor(public navCtrl: NavController, public alertCtrl: AlertController, public storage: Storage) {
		var doesArrayExists;
		storage.get('tasks').then((val1) => {
			console.log(val1);
			if (val1 != null) {
				doesArrayExists = true;
			} else {
				doesArrayExists = false;
			}
				if (doesArrayExists == true) {
					console.log("done");
					storage.get('tasks').then((val2) => {
						this.tasks = val2;
					});
					storage.get('tasksCheck').then((val3) => {
						this.tasksCheck = val3;
						for(let task of this.tasks) {
							if (this.tasksCheck[this.tasks.indexOf(task)] == true) {
								document.getElementById('task'+this.tasks.indexOf(task)+'unchecked').remove();
							} else {
								document.getElementById('task'+this.tasks.indexOf(task)+'checked').remove();
							}
						}
					});
				} else {
					this.tasks = [];
					this.tasksCheck = [];
				}
		});
	}

	promptTask() {
		const prompt = this.alertCtrl.create({
			title: 'New Task',
			message: "Enter a name for your task",
			inputs: [
				{
					name: 'task'
				},
			],
			buttons: [
				{
					text: 'Cancel'
				},
				{
					text: 'Save',
					handler: data => {
						data = data.task;
						this.tasks.push(data);
						this.tasksCheck.push(false);
						document.getElementById('task'+(this.tasks[(this.tasks).length()-1])+'checked').remove();

						this.storage.set('tasks', this.tasks);
						this.storage.set('tasksCheck', this.tasksCheck);
					}
				}
			]
		});
		prompt.present();
	}

	removeTask(itemIndex) {
		const confirm = this.alertCtrl.create({
			title: 'Confirm',
			message: 'Are you sure to delete '+this.tasks[itemIndex]+' ?',
			buttons: [
				{
					text: 'Cancel'
				},
				{
					text: 'Confirm',
					handler: data => {
						this.tasks.splice(itemIndex, 1);
						this.tasksCheck.splice(itemIndex, 1);

						this.storage.set('tasks', this.tasks);
						this.storage.set('tasksCheck', this.tasksCheck);
					}
				}
			]
		});
		confirm.present();
	}

	checkTask(itemIndex) {
		if(this.tasksCheck[itemIndex] == false) {
			this.tasksCheck[itemIndex] = true;
			this.storage.set('tasksCheck', this.tasksCheck);
		} else {
			this.tasksCheck[itemIndex] = false;
			this.storage.set('tasksCheck', this.tasksCheck);
		}
	}
}