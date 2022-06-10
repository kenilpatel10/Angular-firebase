import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'angular-toastify';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BudgetService } from 'src/app/services/budget.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss'],
})
export class BudgetComponent implements OnInit {
  constructor(
    private ngxService: NgxUiLoaderService,
    private formbuilder: FormBuilder,
    private budgetService: BudgetService,
    private toast: ToastService
  ) {}
  budgetForm!: FormGroup;
  userId = localStorage.getItem('userid');
  expense: any = [];
  totalBudget: number = 0;
  ngOnInit(): void {
    this.ngxService.start();
    setTimeout(() => {
      this.ngxService.stop();
    }, 1000);
    this.budgetForm = this.formbuilder.group({
      amount: ['', Validators.required],
      description: ['', Validators.required],
      userId: [''],
      createdAt:[],
    });

    this.budgetService.getExpenses().subscribe((res) => {
      console.log('all', res);
      this.expense  = res.filter((i: any) => {
        return i.userId == localStorage.getItem('userid');
      });
    
      console.log(this.expense);
     this.totalBudget= this.expense.reduce((subtotal: any, item: any) => subtotal + item.amount,0)
     console.log(this.totalBudget,"total")
    });
  }
  createEx() {
    if(this.budgetForm.valid){
      this.budgetForm.patchValue({userId: this.userId})
      this.budgetForm.patchValue({createdAt: Date.now()})
         this.budgetService.addExpense(this.budgetForm.value);
         this.totalBudget += this.budgetForm.value.amount;
         this.budgetForm.reset();
    }else{
      this.toast.error("please fill Both fields ")
    }
  }
  deleteEx(data: any) {
    this.budgetService.deleteExpense(data.key);
    this.totalBudget -= data.amount;
  }
}
