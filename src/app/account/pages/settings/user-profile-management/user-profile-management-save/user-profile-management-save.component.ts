import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AccountService} from "../../../../account.service";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {UserSaveForm} from "../../users-manager/forms/user-save-form";
import {UserProfileManagementSaveForm} from "./user-profile-management-save-form";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {CheckboxModule} from "primeng/checkbox";
import {InputSwitchModule} from "primeng/inputswitch";
import {MatDivider} from "@angular/material/divider";
import {MatList, MatListItem} from "@angular/material/list";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatIcon} from "@angular/material/icon";
import {ProfileSaveForm} from "./profile-save-form";
import {HttpErrorResponse} from "@angular/common/http";
import {
  ConfirmationAddDialogComponent
} from "../../../../dialogs/confirmation/confirmation-add-dialog/confirmation-add-dialog.component";
import {
  SaveLoadingDialogComponent
} from "../../../../dialogs/loading/save-loading-dialog/save-loading-dialog.component";
import {
  SaveNotificationDialogComponent
} from "../../../../dialogs/notification/save-notification-dialog/save-notification-dialog.component";
import {
  SaveErrorNotificationDialogComponent
} from "../../../../dialogs/notification/save-error-notification-dialog/save-error-notification-dialog.component";
import {NotBlankDialogComponent} from "../../../../dialogs/not-blank-dialog/not-blank-dialog.component";

@Component({
  selector: 'app-user-profile-management-save',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatButton,
    MatDivider,
    MatList,
    MatListItem,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    NgIf,
    MatSelect,
    MatOption,
    BreadcrumbModule,
    MatSlideToggle,
    FormsModule,
    MatCheckbox,
    MatRadioGroup,
    MatRadioButton,
    CheckboxModule,
    InputSwitchModule,
    MatIcon,
    NgForOf
  ],
  templateUrl: './user-profile-management-save.component.html',
  styleUrl: './user-profile-management-save.component.css'
})
export class UserProfileManagementSaveComponent implements OnInit, OnDestroy, AfterViewInit {

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
  loadingPage: boolean = true;

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


  this.items = [{label: 'Paramètres'}, {label: 'Profils'}, {label: 'Création'}];

  this.home = {icon: 'pi pi-home', routerLink: '/account/home'};

    if (localStorage.getItem("PROFILE_DATA")) {
      this.modeEdit = false;
      // @ts-ignore
      this.profileData = JSON.parse(localStorage.getItem("PROFILE_DATA"));
    } else {
      this.modeEdit = true;
    }

    this.formProfile = this._fb.group(this.profileForm);
    this.formProfileSave = this._fb.group(this.profileSaveForm);

    this.userGroups = [
      {
        id: 1,
        name: "GROUP_LIST",
        label: "Gestion Listes",
        icon: "tune",
        roles: []
      },
      {
        id: 2,
        name: "GROUP_PRODUCT",
        label: "Configuration Produits",
        icon: "sell",
        roles: []
      },
      {
        id: 3,
        name: "GROUP_SETTINGS",
        label: "Paramètres",
        icon: "settings",
        roles: []
      }
    ];
    /*this.userGroups = [
      {
        id: 1,
        name: "GROUP_LIST",
        label: "Gestion Listes",
        icon: "tune",
        roles: [
          {
            id: 1,
            name: "ROLE_PARTNER",
            label: "Partenaires",
            icon: null,
            permissions: [
              {
                id: 1,
                name: "PERMISSION_READ",
                label: "Lister",
                icon: null,
              },
              {
                id: 2,
                name: "PERMISSION_CREATE",
                label: "Créer",
                icon: null,
              } ,
              {
                id: 3,
                name: "PERMISSION_UPDATE",
                label: "Modifier",
                icon: null,
              },
              {
                id: 4,
                name: "PERMISSION_DELETE",
                label: "Supprimer",
                icon: null,
              }
            ]
          },
          {
            id: 2,
            name: "ROLE_BRANCH",
            label: "Branches",
            icon: null,
            permissions: [
              {
                id: 5,
                name: "PERMISSION_READ",
                label: "Lister",
                icon: null,
              },
              {
                id: 6,
                name: "PERMISSION_CREATE",
                label: "Créer",
                icon: null,
              } ,
              {
                id: 7,
                name: "PERMISSION_UPDATE",
                label: "Modifier",
                icon: null,
              },
              {
                id: 8,
                name: "PERMISSION_DELETE",
                label: "Supprimer",
                icon: null,
              }
            ]
          },
          {
            id: 3,
            name: "ROLE_TERRITORY",
            label: "Territoires",
            icon: null,
            permissions: [
              {
                id: 9,
                name: "PERMISSION_READ",
                label: "Lister",
                icon: null,
              },
              {
                id: 10,
                name: "PERMISSION_CREATE",
                label: "Créer",
                icon: null,
              } ,
              {
                id: 11,
                name: "PERMISSION_UPDATE",
                label: "Modifier",
                icon: null,
              },
              {
                id: 12,
                name: "PERMISSION_DELETE",
                label: "Supprimer",
                icon: null,
              }
            ]
          },
          {
            id: 4,
            name: "ROLE_SEGMENT",
            label: "Segments",
            icon: null,
            permissions: [
              {
                id: 10,
                name: "PERMISSION_READ",
                label: "Lister",
                icon: null,
              },
              {
                id: 11,
                name: "PERMISSION_CREATE",
                label: "Créer",
                icon: null,
              } ,
              {
                id: 12,
                name: "PERMISSION_UPDATE",
                label: "Modifier",
                icon: null,
              },
              {
                id: 13,
                name: "PERMISSION_DELETE",
                label: "Supprimer",
                icon: null,
              }
            ]
          }
        ]
      },
      {
        id: 2,
        name: "GROUP_PRODUCT",
        label: "Configuration Produits",
        icon: "sell",
        roles: [
          {
            id: 4,
            name: "ROLE_GUARANTEE",
            label: "Garanties",
            icon: null,
            permissions: [
              {
                id: 14,
                name: "PERMISSION_READ",
                label: "Lister",
                icon: null,
              },
              {
                id: 15,
                name: "PERMISSION_CREATE",
                label: "Créer",
                icon: null,
              } ,
              {
                id: 16,
                name: "PERMISSION_UPDATE",
                label: "Modifier",
                icon: null,
              },
              {
                id: 17,
                name: "PERMISSION_DELETE",
                label: "Supprimer",
                icon: null,
              }
            ]
          },
        ]
      }
    ];*/

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
                      g.roles.forEach((r: any) => {
                          if (r.permissions && r.permissions.length > 0) {
                            r.permissions.forEach((p: any) => {
                              if (p.id === userPermission.id) {
                                permissionStatus = true;
                              }
                            });
                          }
                      });
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

  onSaveProfile() {

    this.openSaveLoadingDialog();

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
      userType: this.formProfile.value.userType,
      enabled: this.formProfile.value.enabled,
      groups: groupsData
    };

    console.log("PROFILE DATA");
    console.info(requestData);

    this.accountService.userProfileSave(requestData)
      .subscribe((responseData) => {
        console.log(responseData);
        this.closeDialog();
        this.profileData = responseData["body"];
        this.openSaveNotificationDialog();
      }, (errorData: HttpErrorResponse) => {
        console.log(errorData);
        this.closeDialog();
        this.openSaveErrorNotificationDialog(errorData);
      });

  }

  onBack() {
    this._router.navigateByUrl("/account/settings/profiles");
  }

  openConfirmAdd(): void {

    this.isSave = true;
    this.accountService.isSave = this.isSave;

    const dialogRef = this._dialog.open(ConfirmationAddDialogComponent, {
      hasBackdrop: false,
      width: '360px',
      height: '200px',
      data: {
        dialogMessage: "de ce profil"
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

  openSaveLoadingDialog(): void {

    const dialogRef = this._dialog.open(SaveLoadingDialogComponent, {
      hasBackdrop: false,
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  openSaveNotificationDialog(): void {

    const dialogRef = this._dialog.open(SaveNotificationDialogComponent, {
      hasBackdrop: false,
      width: '440px',
      data: {
        dialogMessage: "L'enregistrement du profil a réussi."
      },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

      this._router.navigateByUrl("/account/settings/profiles/edit").then(() => {
        // @ts-ignore
        localStorage.setItem("PROFILE_DATA", JSON.stringify(this.profileData));
        this.loadingPage = false;
      });

    });

  }

  openSaveErrorNotificationDialog(error: HttpErrorResponse): void {

    const dialogRef = this._dialog.open(SaveErrorNotificationDialogComponent, {
      hasBackdrop: false,
      width: '440px',
      data: {
        httpError: error,
        dialogMessage: "L'enregistrement du profil a échoué."
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


}
