import {Component, Inject, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {LottieAnimationViewModule} from "ng-lottie";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-save-error-notification-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatDialogClose,
    NgIf,
    MatIcon,
  ],
  templateUrl: './save-error-notification-dialog.component.html',
  styleUrl: './save-error-notification-dialog.component.css'
})
export class SaveErrorNotificationDialogComponent implements OnInit {

  dialogMessage: string | undefined;

  public lottieConfig: any;
  private anim: any;
  private animationSpeed: number = 1;

  httpError: HttpErrorResponse | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.dialogMessage = data.dialogMessage

    if (data.httpError) {
      this.httpError = data.httpError;
    }

    this.lottieConfig = {
      path: 'assets/json/failed.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
    };

  }

  ngOnInit(): void {
  }

  handleAnimation(anim: any) {
    this.anim = anim;
  }

  stop() {
    this.anim.stop();
  }

  play() {
    this.anim.play();
  }

  pause() {
    this.anim.pause();
  }

  setSpeed(speed: number) {
    this.animationSpeed = speed;
    this.anim.setSpeed(speed);
  }

}
