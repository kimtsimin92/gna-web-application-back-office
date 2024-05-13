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
import {ProductEditComponent} from "./pages/marketing/products/product-edit/product-edit.component";
import {ProductViewComponent} from "./pages/marketing/products/product-view/product-view.component";
import {
  FormQuotationListComponent
} from "./pages/settings-products/form-quotation/form-quotation-list/form-quotation-list.component";
import {
  FormQuotationAddComponent
} from "./pages/settings-products/form-quotation/form-quotation-add/form-quotation-add.component";
import {
  FormQuotationEditComponent
} from "./pages/settings-products/form-quotation/form-quotation-edit/form-quotation-edit.component";
import {
  FormSubscriptionListComponent
} from "./pages/settings-products/form-subscription/form-subscription-list/form-subscription-list.component";
import {
  FormSubscriptionViewComponent
} from "./pages/settings-products/form-subscription/form-subscription-view/form-subscription-view.component";
import {
  FormSubscriptionEditComponent
} from "./pages/settings-products/form-subscription/form-subscription-edit/form-subscription-edit.component";
import {
  FormSubscriptionAddComponent
} from "./pages/settings-products/form-subscription/form-subscription-add/form-subscription-add.component";
import {
  FormQuotationViewComponent
} from "./pages/settings-products/form-quotation/form-quotation-view/form-quotation-view.component";
import {
  PremiumCalculationListComponent
} from "./pages/settings-products/premium-calculation/premium-calculation-list/premium-calculation-list.component";
import {
  PremiumCalculationAddComponent
} from "./pages/settings-products/premium-calculation/premium-calculation-add/premium-calculation-add.component";
import {
  PremiumCalculationEditComponent
} from "./pages/settings-products/premium-calculation/premium-calculation-edit/premium-calculation-edit.component";
import {
  PremiumCalculationDetailComponent
} from "./pages/settings-products/premium-calculation/premium-calculation-detail/premium-calculation-detail.component";
import {SimulationComponent} from "./simulation/simulation.component";
import {SimulationQuotationComponent} from "./simulation/simulation-quotation/simulation-quotation.component";
import {
  CustomerPersonalAccountRequestListComponent
} from "./pages/manager-customers-accounts/customer-personal-account-request-list/customer-personal-account-request-list.component";
import {
  CustomerCompanyAccountRequestListComponent
} from "./pages/manager-customers-accounts/customer-company-account-request-list/customer-company-account-request-list.component";
import {
  CustomerPersonalAccountRequestDetailComponent
} from "./pages/manager-customers-accounts/customer-personal-account-request-detail/customer-personal-account-request-detail.component";
import {
  CustomerCompanyAccountRequestDetailComponent
} from "./pages/manager-customers-accounts/customer-company-account-request-detail/customer-company-account-request-detail.component";
import {CampaignListComponent} from "./pages/marketing/campaign/campaign-list/campaign-list.component";
import {CampaignDetailComponent} from "./pages/marketing/campaign/campaign-detail/campaign-detail.component";
import {CampaignAddComponent} from "./pages/marketing/campaign/campaign-add/campaign-add.component";
import {CampaignEditComponent} from "./pages/marketing/campaign/campaign-edit/campaign-edit.component";
import {
  CoinsuranceSubmitListComponent
} from "./pages/coinsurance/coinsurance-request-submit/coinsurance-submit-list/coinsurance-submit-list.component";
import {
  CoinsuranceSubmitViewComponent
} from "./pages/coinsurance/coinsurance-request-submit/coinsurance-submit-view/coinsurance-submit-view.component";
import {
  CoinsuranceValidateListComponent
} from "./pages/coinsurance/coinsurance-request-validate/coinsurance-validate-list/coinsurance-validate-list.component";
import {
  CoinsuranceValidateViewComponent
} from "./pages/coinsurance/coinsurance-request-validate/coinsurance-validate-view/coinsurance-validate-view.component";
import {
  CoinsuranceRejectListComponent
} from "./pages/coinsurance/coinsurance-request-reject/coinsurance-reject-list/coinsurance-reject-list.component";
import {
  CoinsuranceRejectViewComponent
} from "./pages/coinsurance/coinsurance-request-reject/coinsurance-reject-view/coinsurance-reject-view.component";
import {
  ReinsuranceSubmitListComponent
} from "./pages/reinsurance/reinsurance-request-submit/reinsurance-submit-list/reinsurance-submit-list.component";
import {
  ReinsuranceSubmitViewComponent
} from "./pages/reinsurance/reinsurance-request-submit/reinsurance-submit-view/reinsurance-submit-view.component";
import {
  ReinsuranceValidateListComponent
} from "./pages/reinsurance/reinsurance-request-validate/reinsurance-validate-list/reinsurance-validate-list.component";
import {
  ReinsuranceValidateViewComponent
} from "./pages/reinsurance/reinsurance-request-validate/reinsurance-validate-view/reinsurance-validate-view.component";
import {
  ReinsuranceRejectListComponent
} from "./pages/reinsurance/reinsurance-request-reject/reinsurance-reject-list/reinsurance-reject-list.component";
import {
  ReinsuranceRejectViewComponent
} from "./pages/reinsurance/reinsurance-request-reject/reinsurance-reject-view/reinsurance-reject-view.component";
import {
  ExpertiseRejectListComponent
} from "./pages/expertise/expertise-request-reject/expertise-reject-list/expertise-reject-list.component";
import {
  ExpertiseRejectViewComponent
} from "./pages/expertise/expertise-request-reject/expertise-reject-view/expertise-reject-view.component";
import {
  ExpertiseValidateViewComponent
} from "./pages/expertise/expertise-request-validate/expertise-validate-view/expertise-validate-view.component";
import {
  ExpertiseSubmitListComponent
} from "./pages/expertise/expertise-request-submit/expertise-submit-list/expertise-submit-list.component";
import {
  ExpertiseSubmitViewComponent
} from "./pages/expertise/expertise-request-submit/expertise-submit-view/expertise-submit-view.component";
import {
  PrestationSubmitListComponent
} from "./pages/prestation/prestation-request-submit/prestation-submit-list/prestation-submit-list.component";
import {
  PrestationValidateViewComponent
} from "./pages/prestation/prestation-request-validate/prestation-validate-view/prestation-validate-view.component";
import {
  PrestationRejectListComponent
} from "./pages/prestation/prestation-request-reject/prestation-reject-list/prestation-reject-list.component";
import {
  PrestationRejectViewComponent
} from "./pages/prestation/prestation-request-reject/prestation-reject-view/prestation-reject-view.component";
import {
  PrestationSubmitViewComponent
} from "./pages/prestation/prestation-request-submit/prestation-submit-view/prestation-submit-view.component";
import {
  PrestationValidateListComponent
} from "./pages/prestation/prestation-request-validate/prestation-validate-list/prestation-validate-list.component";
import {
  ExpertiseValidateListComponent
} from "./pages/expertise/expertise-request-validate/expertise-validate-list/expertise-validate-list.component";


export const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    title: 'Compte | GNA',
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard', component: HomeComponent,
        title: 'Dashboard | GNA',
      },
      {
        path: 'manager/accounts/personals/requests/list', component: CustomerPersonalAccountRequestListComponent,
        title: "Demmandes d'ouvertures de comptes particuliers - Lister | GNA",
      },
      {
        path: 'manager/accounts/personals/requests/view', component: CustomerPersonalAccountRequestDetailComponent,
        title: "Demmandes d'ouvertures de comptes particuliers - Voir | GNA",
      },
      {
        path: 'manager/accounts/companies/requests/list', component: CustomerCompanyAccountRequestListComponent,
        title: "Demmandes d'ouvertures de comptes entreprises - Lister | GNA",
      },
      {
        path: 'manager/accounts/companies/requests/view', component: CustomerCompanyAccountRequestDetailComponent,
        title: "Demmandes d'ouvertures de comptes entreprises - Voir | GNA",
      },
      {
        path: 'coinsurance/requests/submits/list', component: CoinsuranceSubmitListComponent,
        title: "Coassurances - Demandes soumises | GNA",
      },
      {
        path: 'coinsurance/requests/submits/view', component: CoinsuranceSubmitViewComponent,
        title: "Coassurance - Demandes soumises | GNA",
      },
      {
        path: 'coinsurance/requests/validates/list', component: CoinsuranceValidateListComponent,
        title: "Coassurances - Demandes validées | GNA",
      },
      {
        path: 'coinsurance/requests/validates/view', component: CoinsuranceValidateViewComponent,
        title: "Coassurances - Demandes validées | GNA",
      },
      {
        path: 'coinsurance/requests/rejects/list', component: CoinsuranceRejectListComponent,
        title: "Coassurances - Demandes rejetées | GNA",
      },
      {
        path: 'coinsurance/requests/rejects/view', component: CoinsuranceRejectViewComponent,
        title: "Coassurances - Demandes rejetées | GNA",
      },
      {
        path: 'reinsurance/requests/submits/list', component: ReinsuranceSubmitListComponent,
        title: "Réassurances - Demandes soumises | GNA",
      },
      {
        path: 'reinsurance/requests/submits/view', component: ReinsuranceSubmitViewComponent,
        title: "Réassurances - Demandes soumises | GNA",
      },
      {
        path: 'reinsurance/requests/validates/list', component: ReinsuranceValidateListComponent,
        title: "Réassurances - Demandes validées | GNA",
      },
      {
        path: 'reinsurance/requests/validates/view', component: ReinsuranceValidateViewComponent,
        title: "Réassurances - Demandes validées | GNA",
      },
      {
        path: 'reinsurance/requests/rejects/list', component: ReinsuranceRejectListComponent,
        title: "Réassurances - Demandes rejetées | GNA",
      },
      {
        path: 'reinsurance/requests/rejects/view', component: ReinsuranceRejectViewComponent,
        title: "Réassurances - Demandes rejetées | GNA",
      },
      {
        path: 'expertise/requests/submits/list', component: ExpertiseSubmitListComponent,
        title: "Expertises - Demandes soumises | GNA",
      },
      {
        path: 'expertise/requests/submits/view', component: ExpertiseSubmitViewComponent,
        title: "Expertises - Demandes soumises | GNA",
      },
      {
        path: 'expertise/requests/validates/list', component: ExpertiseValidateListComponent,
        title: "Expertises - Demandes validées | GNA",
      },
      {
        path: 'expertise/requests/validates/view', component: ExpertiseValidateViewComponent,
        title: "Expertises - Demandes validées | GNA",
      },
      {
        path: 'expertise/requests/rejects/list', component: ExpertiseRejectListComponent,
        title: "Expertises - Demandes rejetées | GNA",
      },
      {
        path: 'expertise/requests/rejects/view', component: ExpertiseRejectViewComponent,
        title: "Expertises - Demandes rejetées | GNA",
      },
      {
        path: 'prestation/requests/submits/list', component: PrestationSubmitListComponent,
        title: "Expertises - Demandes soumises | GNA",
      },
      {
        path: 'prestation/requests/submits/view', component: PrestationSubmitViewComponent,
        title: "Expertises - Demandes soumises | GNA",
      },
      {
        path: 'prestation/requests/validates/list', component: PrestationValidateListComponent,
        title: "Expertises - Demandes validées | GNA",
      },
      {
        path: 'prestation/requests/validates/view', component: PrestationValidateViewComponent,
        title: "Expertises - Demandes validées | GNA",
      },
      {
        path: 'prestation/requests/rejects/list', component: PrestationRejectListComponent,
        title: "Expertises - Demandes rejetées | GNA",
      },
      {
        path: 'prestation/requests/rejects/view', component: PrestationRejectViewComponent,
        title: "Expertises - Demandes rejetées | GNA",
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
        title: 'Segmentation - Lister | GNA',
      },
      {
        path: 'segments/add', component: SegmentAddComponent,
        title: 'Segmentation - Créer | GNA',
      },
      {
        path: 'segments/edit', component: SegmentEditComponent,
        title: 'Segmentation - Modifier | GNA',
      },
      {
        path: 'segments/view', component: SegmentViewComponent,
        title: 'Segmentation | GNA',
      },
      {
        path: 'settings-products/forms/quotations/list', component: FormQuotationListComponent,
        title: 'Formulaires Cotations - Lister | GNA',
      },
      {
        path: 'settings-products/forms/quotations/add', component: FormQuotationAddComponent,
        title: 'Formulaires Cotations - Créer | GNA',
      },
      {
        path: 'settings-products/forms/quotations/edit', component: FormQuotationEditComponent,
        title: 'Formulaires Cotations - Modifier | GNA',
      },
      {
        path: 'settings-products/forms/quotations/view', component: FormQuotationViewComponent,
        title: 'Formulaires Cotations | GNA',
      },
      {
        path: 'settings-products/forms/subscriptions/list', component: FormSubscriptionListComponent,
        title: 'Formulaires Souscriptions - Lister | GNA',
      },
      {
        path: 'settings-products/forms/subscriptions/add', component: FormSubscriptionAddComponent,
        title: 'Formulaires Souscriptions - Créer | GNA',
      },
      {
        path: 'settings-products/forms/subscriptions/edit', component: FormSubscriptionEditComponent,
        title: 'Formulaires Souscriptions - Modifier | GNA',
      },
      {
        path: 'settings-products/forms/subscriptions/view', component: FormSubscriptionViewComponent,
        title: 'Formulaires Souscriptions | GNA',
      },
      {
        path: 'settings-products/premium-calculation/list', component: PremiumCalculationListComponent,
        title: 'Calculs de primes - Lister | GNA',
      },
      {
        path: 'settings-products/premium-calculation/add', component: PremiumCalculationAddComponent,
        title: 'Calculs de primes - Créer | GNA',
      },
      {
        path: 'settings-products/premium-calculation/edit', component: PremiumCalculationEditComponent,
        title: 'Calculs de primes - Modifier | GNA',
      },
      {
        path: 'settings-products/premium-calculation/view', component: PremiumCalculationDetailComponent,
        title: 'Calculs de primes - Voir | GNA',
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
        path: 'products/edit', component: ProductEditComponent,
        title: 'Produit - Modifier | GNA',
      },
      {
        path: 'products/view', component: ProductViewComponent,
        title: 'Produit | GNA',
      },
      {
        path: 'marketing/campaigns/list', component: CampaignListComponent,
        title: 'Marketing Campaign List | GNA',
      },
      {
        path: 'marketing/campaigns/details', component: CampaignDetailComponent,
        title: 'Marketing Campaign Details | GNA',
      },
      {
        path: 'marketing/campaigns/add', component: CampaignAddComponent,
        title: 'Marketing Campaign Créer | GNA',
      },
      {
        path: 'marketing/campaigns/edit', component: CampaignEditComponent,
        title: 'Marketing Campaign Modifier | GNA',
      },
      {
        path: 'profile', component: ProfileComponent,
        title: 'Compte - Mon Profil | GNA',
      },
      {
        path: 'settings/profiles/list', component: UserProfileManagementComponent,
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
    ],
  },
  {
    path: 'simulation',
    component: SimulationComponent,
    title: 'Simulation | GNA',
    canActivate: [authGuard]
  },
  {
    path: 'simulation/quotation',
    component: SimulationQuotationComponent,
    title: 'Simulation Cotation | GNA',
    canActivate: [authGuard]
  }
];
