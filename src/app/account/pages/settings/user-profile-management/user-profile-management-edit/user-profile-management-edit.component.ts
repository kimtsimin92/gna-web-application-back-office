import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {BreadcrumbModule} from "primeng/breadcrumb";
import {InputSwitchModule} from "primeng/inputswitch";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatSelect} from "@angular/material/select";
import {NgForOf, NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MenuItem} from "primeng/api";
import {UserProfileManagementSaveForm} from "../user-profile-management-save/user-profile-management-save-form";
import {ProfileSaveForm} from "../user-profile-management-save/profile-save-form";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AccountService} from "../../../../account.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {
  ConfirmationEditDialogComponent
} from "../../../../dialogs/confirmation/confirmation-edit-dialog/confirmation-edit-dialog.component";
import {
  EditLoadingDialogComponent
} from "../../../../dialogs/loading/edit-loading-dialog/edit-loading-dialog.component";
import {
  SaveNotificationDialogComponent
} from "../../../../dialogs/notification/save-notification-dialog/save-notification-dialog.component";
import {
  SaveErrorNotificationDialogComponent
} from "../../../../dialogs/notification/save-error-notification-dialog/save-error-notification-dialog.component";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {NotBlankDialogComponent} from "../../../../dialogs/not-blank-dialog/not-blank-dialog.component";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";

@Component({
  selector: 'app-user-profile-management-edit',
  standalone: true,
    imports: [
        BreadcrumbModule,
        InputSwitchModule,
        MatButton,
        MatCard,
        MatCardContent,
        MatCardHeader,
        MatError,
        MatFormField,
        MatIcon,
        MatInput,
        MatLabel,
        MatOption,
        MatRadioButton,
        MatRadioGroup,
        MatSelect,
        NgForOf,
        NgIf,
        PaginatorModule,
        ReactiveFormsModule,
        InputTextModule,
        InputTextareaModule,
        IconFieldModule,
        InputIconModule
    ],
  templateUrl: './user-profile-management-edit.component.html',
  styleUrl: './user-profile-management-edit.component.css'
})
export class UserProfileManagementEditComponent implements OnInit, OnDestroy, AfterViewInit {

  headerTitle: string | undefined;

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  profileData: any = null;

  modeEdit: boolean = false;
  isSave: boolean = false;

  userTypes: any[] = [
    {value: 1, viewValue: 'Interne'},
    {value: 2, viewValue: 'Externe'},
  ];

  formProfile: FormGroup = new FormGroup({}, undefined, undefined);
  profileForm: UserProfileManagementSaveForm = new UserProfileManagementSaveForm();

  formProfileSave: FormGroup = new FormGroup({}, undefined, undefined);
  profileSaveForm: ProfileSaveForm = new ProfileSaveForm();

  checked: boolean = false;

  userGroups: any[] =[];

  //AUTHORISATION

  formUserGroupList: any[] = [];
  formUserRoleList: FormGroup[] = [];
  formUserPermissionList: FormGroup[] = [];

  formUserGroup = this._fb.group({
    group: this._fb.control(null),
    roles: this._fb.array([])
  });

  formUserRole = this._fb.group({
    id: this._fb.control(null),
    name: this._fb.control(null),
    label: this._fb.control(null),
    permissions: this._fb.array([]),
  });

  formUserPermission = this._fb.group({
    id: this._fb.control(null),
    name: this._fb.control(null),
    label: this._fb.control(null),
    status: this._fb.control(null)
  });

  isActivated: boolean = true;
  isDisabled: boolean = false;

  constructor(
    private _fb: FormBuilder,
    public _dialog: MatDialog,
    private _router: Router,
    public accountService: AccountService) {
  }


  ngOnInit(): void {

    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }

    this.headerTitle = "Gestion Profiles";
    localStorage.setItem("APP_HEADER_TITLE", this.headerTitle);

    this.onGetUserGroupList();

    if (localStorage.getItem("PROFILE_DATA")) {
      // @ts-ignore
      this.profileData = JSON.parse(localStorage.getItem("PROFILE_DATA"));
      this.profileForm.name.setValue(this.profileData.name);
      this.profileForm.description.setValue(this.profileData.description);
    } else {
     this._router.navigateByUrl("/account/admin/users/interns/profiles/list")
    }

    this.formProfile = this._fb.group(this.profileForm);


    console.log(this.formUserGroupList);

  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    if (localStorage.getItem("PROFILE_DATA")) {
      localStorage.removeItem("PROFILE_DATA")
    }
  }


  getErrorMessageNane() {
    return "";
  }

  onSave() {

    // this.formScaleList.forEach(fs => {
    //   console.log(fs.value);
    //
    //   if (fs.value.rateTarget > 0 && fs.value.rateCommission > 0) {
    //     scales.push(fs.value);
    //   } else {
    //
    //     let i = this.formScaleList.lastIndexOf(fs);
    //     let s = i;
    //     let e = i -1;
    //
    //     if (e < 1) {
    //       e = 1
    //     }
    //     this.formScaleList.splice(s, e);
    //
    //   }
    // });
    //
    // if (!this.target) {
    //   this.target = new Target();
    //   this.target.date = new Date();
    // }
    //
    // // @ts-ignore
    // this.target?.group = group;
    //
    // // @ts-ignore
    // this.target?.scales = scales;
    //
    // console.log(this.target);

  }

  onSaveProfile() {

    this.openSaveEditLoadingDialog();

    let groupsData: any[] = [];

    if (this.formUserGroupList && this.formUserGroupList.length > 0) {

      this.formUserGroupList.forEach((group: any) => {

        if (group.roles && group.roles.length > 0) {

          if (group !== null) {

            let rolesData: any[] = [];

            group.roles.forEach((role: any) => {

              if (role !== null) {
                if (role.permissions && role.permissions.length > 0) {

                  let permissionsData: any[] = [];

                  role.permissions.forEach((permission: any) => {

                    if (permission.formPermission) {

                      if (permission.formPermission.value.permissionStatus) {

                        let permissionData: any = {
                          permissionId: permission.id
                        };

                        permissionsData.push(permissionData)

                        let roleData: any = {
                          roleId: role.id,
                          permissions: permissionsData
                        }

                        if (roleData.roleId) {
                          rolesData[roleData.roleId] = roleData;

                          let groupData = {
                            groupId: group.groupId,
                            roles: rolesData
                          };

                          if (groupData.groupId) {
                            groupsData[groupData.groupId] = groupData;
                          }

                        }

                      }

                    }

                  });

                }
              }

            });

          }

        }

      });

    }

    let requestData = {
      name: this.formProfile.value.name,
      description: this.formProfile.value.description,
      groups: groupsData
    };

    console.log("PROFILE DATA");
    console.info(requestData);

    this.accountService.userProfileEdit(requestData, this.profileData.id)
      .subscribe((responseData) => {
        console.log(responseData);
        this.closeDialog();
        this.profileData = responseData["body"];
        // @ts-ignore
        localStorage.setItem("PROFILE_DATA", JSON.stringify(this.profileData));
        this.openSaveEditNotificationDialog();
      }, (errorData: HttpErrorResponse) => {
        console.log(errorData);
        this.closeDialog();
        this.openSaveEditErrorNotificationDialog(errorData);
      });

  }

  onBack() {
    this._router.navigateByUrl("/account/admin/users/interns/profiles/list");
  }

  openConfirmEdit(): void {

    this.isSave = true;
    this.accountService.isSave = this.isSave;

    const dialogRef = this._dialog.open(ConfirmationEditDialogComponent, {
      hasBackdrop: false,
      width: '400px',
      height: '340px',
      data: {
        dialogMessage: "de ce profil utilisateur"
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      if (result) {
        this.onSaveProfile();
      } else {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

    });

  }

  openSaveEditLoadingDialog(): void {

    const dialogRef = this._dialog.open(EditLoadingDialogComponent, {
      hasBackdrop: false,
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  openSaveEditNotificationDialog(): void {

    const dialogRef = this._dialog.open(SaveNotificationDialogComponent, {
      hasBackdrop: false,
      width: '440px',
      data: {
        dialogMessage: "La modification du profil utilisateur a réussi."
      },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

    });

  }

  openSaveEditErrorNotificationDialog(error: HttpErrorResponse): void {

    const dialogRef = this._dialog.open(SaveErrorNotificationDialogComponent, {
      hasBackdrop: false,
      width: '440px',
      data: {
        httpError: error,
        dialogMessage: "La modification du profil utilisateur a échoué."
      },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

    });

  }

  closeDialog() {
    this._dialog.closeAll();
  }

  onGetNotBlankAlert() {
    const dialogRef = this._dialog.open(NotBlankDialogComponent, {
      width: '440px',
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  onGetUserGroupList() {

    this.accountService.onGetUserGroupList()
      .subscribe((responseData: HttpResponse<any>) => {
        console.log(responseData);

        this.userGroups = responseData["body"];

        if (this.userGroups && this.userGroups.length > 0) {

          this.userGroups.forEach((userGroup: any) => {

            let furList: any[] = [];

            if (userGroup.roles && userGroup.roles.length > 0) {

              userGroup.roles.forEach((userRole: any) => {

                let fupList: any[] = [];

                if (userRole.permissions && userRole.permissions.length > 0) {

                  userRole.permissions.forEach((userPermission: any) => {

                    let permissionStatus = false;

                    if (this.profileData && this.profileData.groups && this.profileData.groups.length > 0) {
                      this.profileData.groups.forEach((g: any) => {
                        if (g.roles && g.roles.length > 0) {
                          if (userGroup.id === g.groupId) {
                            g.roles.forEach((r: any) => {
                              if (userRole.id === r.roleId) {
                                if (r.permissions && r.permissions.length > 0) {
                                  r.permissions.forEach((p: any) => {
                                    if (p.permissionId === userPermission.id) {
                                      permissionStatus = true;
                                    }
                                  });
                                }
                              }
                            });
                          }
                        }
                      });

                    }

                    let fup= {
                      id: userPermission.id,
                      name: userPermission.name,
                      label: userPermission.label,
                      formPermission: this._fb.group({
                        permissionId: new FormControl(userPermission.id),
                        permissionStatus: new FormControl(permissionStatus)
                      })
                    };

                    fupList.push(fup);

                  });

                }

                let fur = {
                  id: userRole.id,
                  name: userRole.name,
                  label: userRole.label,
                  permissions: fupList,
                };

                furList.push(fur);

              });

            }

            /*  let fug = this._fb.group({
                groupId: this._fb.control(userGroup.id),
                groupName: this._fb.control(userGroup.name),
                label: this._fb.control(userGroup.label),
                icon: this._fb.control(userGroup.icon),
                roles: this._fb.array(furList),
              }); */

            let fug = {
              groupId: userGroup.id,
              groupName: userGroup.name,
              label: userGroup.label,
              icon: userGroup.icon,
              roles: furList,
            }


            this.formUserGroupList.push(fug);

          });
        }

      }, (errorResponseData: HttpErrorResponse) => {
        console.log(errorResponseData);
      })

  }


}
