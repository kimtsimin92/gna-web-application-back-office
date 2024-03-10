import {AccountComponent} from "./account.component";
import {HomeComponent} from "./pages/home/home.component";
import {Routes} from "@angular/router";
import {authGuard} from "../auth/auth.guard";
import {ProfileComponent} from "./pages/profile/profile.component";
import {UsersManagerComponent} from "./pages/settings/users-manager/users-manager.component";
import {
  UsersManagerSaveComponent
} from "./pages/settings/users-manager/users-manager-save/users-manager-save.component";
import {
  UserProfileManagementComponent
} from "./pages/settings/user-profile-management/user-profile-management.component";
import {
  UserProfileManagementSaveComponent
} from "./pages/settings/user-profile-management/user-profile-management-save/user-profile-management-save.component";
import {PartnerListComponent} from "./pages/list-management/partner/partner-list/partner-list.component";
import {PartnerSaveComponent} from "./pages/list-management/partner/partner-save/partner-save.component";
import {PartnerEditComponent} from "./pages/list-management/partner/partner-edit/partner-edit.component";
import {PartnerViewComponent} from "./pages/list-management/partner/partner-view/partner-view.component";
import {
  UserManagementEditComponent
} from "./pages/settings/users-management/user-management-edit/user-management-edit.component";
import {
  UserManagementViewComponent
} from "./pages/settings/users-management/user-management-view/user-management-view.component";
import {
  UserProfileManagementViewComponent
} from "./pages/settings/user-profile-management/user-profile-management-view/user-profile-management-view.component";
import {
  UserProfileManagementEditComponent
} from "./pages/settings/user-profile-management/user-profile-management-edit/user-profile-management-edit.component";
import {BranchListComponent} from "./pages/list-management/branches/branch-list/branch-list.component";
import {BranchAddComponent} from "./pages/list-management/branches/branch-add/branch-add.component";
import {BranchEditComponent} from "./pages/list-management/branches/branch-edit/branch-edit.component";
import {BranchViewComponent} from "./pages/list-management/branches/branch-view/branch-view.component";
import {ZoneViewComponent} from "./pages/list-management/zones/zone-view/zone-view.component";
import {ZoneEditComponent} from "./pages/list-management/zones/zone-edit/zone-edit.component";
import {ZoneAddComponent} from "./pages/list-management/zones/zone-add/zone-add.component";
import {ZoneListComponent} from "./pages/list-management/zones/zone-list/zone-list.component";
import {SegmentViewComponent} from "./pages/list-management/segments/segment-view/segment-view.component";
import {SegmentEditComponent} from "./pages/list-management/segments/segment-edit/segment-edit.component";
import {SegmentAddComponent} from "./pages/list-management/segments/segment-add/segment-add.component";
import {SegmentListComponent} from "./pages/list-management/segments/segment-list/segment-list.component";
import {GuaranteeListComponent} from "./pages/settings-products/guarantees/guarantee-list/guarantee-list.component";
import {GuaranteeAddComponent} from "./pages/settings-products/guarantees/guarantee-add/guarantee-add.component";
import {GuaranteeEditComponent} from "./pages/settings-products/guarantees/guarantee-edit/guarantee-edit.component";
import {GuaranteeViewComponent} from "./pages/settings-products/guarantees/guarantee-view/guarantee-view.component";
import {
  ProductGroupEditComponent
} from "./pages/settings-products/products-groups/product-group-edit/product-group-edit.component";
import {
  ProductGroupAddComponent
} from "./pages/settings-products/products-groups/product-group-add/product-group-add.component";
import {
  ProductGroupListComponent
} from "./pages/settings-products/products-groups/product-group-list/product-group-list.component";
import {
  ProductGroupViewComponent
} from "./pages/settings-products/products-groups/product-group-view/product-group-view.component";
import {ProductListComponent} from "./pages/marketing/products/product-list/product-list.component";
import {ProductAddComponent} from "./pages/marketing/products/product-add/product-add.component";

export const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    title: 'Compte | GNA',
    canActivate: [authGuard],
    children: [
      {
        path: 'home', component: HomeComponent,
        title: 'Dashboard | GNA',
      },
      {
        path: 'partners/list', component: PartnerListComponent,
        title: 'Partenaires - Lister | GNA',
      },
      {
        path: 'partners/add', component: PartnerSaveComponent,
        title: 'Partenaires - Créer | GNA',
      },
      {
        path: 'partners/edit', component: PartnerEditComponent,
        title: 'Partenaires - Modifier | GNA',
      },
      {
        path: 'partners/view', component: PartnerViewComponent,
        title: 'Partenaires | GNA',
      },
      {
        path: 'branches/list', component: BranchListComponent,
        title: 'Branches - Lister | GNA',
      },
      {
        path: 'branches/add', component: BranchAddComponent,
        title: 'Branches - Créer | GNA',
      },
      {
        path: 'branches/edit', component: BranchEditComponent,
        title: 'Branches - Modifier | GNA',
      },
      {
        path: 'branches/view', component: BranchViewComponent,
        title: 'Branches | GNA',
      },
      {
        path: 'zones/list', component: ZoneListComponent,
        title: 'Territoires - Lister | GNA',
      },
      {
        path: 'zones/add', component: ZoneAddComponent,
        title: 'Territoires - Créer | GNA',
      },
      {
        path: 'zones/edit', component: ZoneEditComponent,
        title: 'Territoires - Modifier | GNA',
      },
      {
        path: 'zones/view', component: ZoneViewComponent,
        title: 'Territoires | GNA',
      },
      {
        path: 'segments/list', component: SegmentListComponent,
        title: 'Segments - Lister | GNA',
      },
      {
        path: 'segments/add', component: SegmentAddComponent,
        title: 'Segments - Créer | GNA',
      },
      {
        path: 'segments/edit', component: SegmentEditComponent,
        title: 'Segments - Modifier | GNA',
      },
      {
        path: 'segments/view', component: SegmentViewComponent,
        title: 'Segments | GNA',
      },
      {
        path: 'guarantees/list', component: GuaranteeListComponent,
        title: 'Garantie - Lister | GNA',
      },
      {
        path: 'guarantees/add', component: GuaranteeAddComponent,
        title: 'Garantie - Créer | GNA',
      },
      {
        path: 'guarantees/edit', component: GuaranteeEditComponent,
        title: 'Garantie - Modifier | GNA',
      },
      {
        path: 'guarantees/view', component: GuaranteeViewComponent,
        title: 'Garantie | GNA',
      },
      {
        path: 'products-groups/list', component: ProductGroupListComponent,
        title: 'Groupe Produit - Lister | GNA',
      },
      {
        path: 'products-groups/add', component: ProductGroupAddComponent,
        title: 'Groupe Produit - Créer | GNA',
      },
      {
        path: 'products-groups/edit', component: ProductGroupEditComponent,
        title: 'Groupe Produit - Modifier | GNA',
      },
      {
        path: 'products-groups/view', component: ProductGroupViewComponent,
        title: 'Groupe Produit | GNA',
      },
      {
        path: 'products/list', component: ProductListComponent,
        title: 'Produit - Lister | GNA',
      },
      {
        path: 'products/add', component: ProductAddComponent,
        title: 'Produit - Créer | GNA',
      },
      {
        path: 'profile', component: ProfileComponent,
        title: 'Compte - Mon Profil | GNA',
      },
      {
        path: 'settings/profiles', component: UserProfileManagementComponent,
        title: 'Gestion Profils | GNA',
      },
      {
        path: 'settings/profiles/add', component: UserProfileManagementSaveComponent,
        title: 'Gestion Profils - Créer | GNA',
      },
      {
        path: 'settings/profiles/view', component: UserProfileManagementViewComponent,
        title: 'Gestion Profils | GNA',
      },
      {
        path: 'settings/profiles/edit', component: UserProfileManagementEditComponent,
        title: 'Gestion Profils - Modifier | GNA',
      },
      {
        path: 'settings/users', component: UsersManagerComponent,
        title: 'Gestion Utilisateurs | GNA',
      },
      {
        path: 'settings/users/add', component: UsersManagerSaveComponent,
        title: 'Gestion Utilisateurs - Créer | GNA',
      },
      {
        path: 'settings/users/edit', component: UserManagementEditComponent,
        title: 'Gestion Utilisateurs - Modifier | GNA',
      },
      {
        path: 'settings/users/view', component: UserManagementViewComponent,
        title: 'Gestion Utilisateurs | GNA',
      },
    ]
  }
];
