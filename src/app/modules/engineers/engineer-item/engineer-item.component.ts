import { Component, Input, OnInit } from '@angular/core';
import { EngineersService } from '../engineers.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../shared/components/modals/confirmation-dialog/confirmation-dialog.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-engineer-item',
  templateUrl: './engineer-item.component.html',
  styleUrls: ['./engineer-item.component.scss'],
})
export class EngineerItemComponent implements OnInit {
  @Input() engineer;
  @Input() orderId;
  public isSending = false;
  constructor(private engineerService: EngineersService, private snackBar: MatSnackBar, public dialog: MatDialog) {}

  ngOnInit(): void {}

  public sendInvite(id) {
    if (this.isSending) {
      return false;
    }
    this.isSending = true;
    const body = {
      order_id: this.orderId,
      to: id,
    };
    this.engineerService.sendInvite(body).subscribe(
      (res) => {
        this.snackBar.open('User was invited');
        this.isSending = false;
      },
      () => (this.isSending = false)
    );
  }
  public confirmDialog(id) {
    this.dialog
      .open(ConfirmationDialogComponent, {
        width: '50%',
        data: {
          type: 'error',
          icon: 'icon-delete',
          title: 'Confirm',
          text:
            'Please confirm you are interested in interviewing this candidate. After the confirmation, our manager will get in contact with you and the candidate to schedule the interview',
        },
      })
      .afterClosed()
      .pipe(filter((el) => el))
      .subscribe((res) => {
        this.sendInvite(id);
      });
  }
}
