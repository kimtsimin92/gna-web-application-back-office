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
import {
  ManagementCustomerAccountCompanyViewComponent
} from "./pages/manager-customers-accounts/mangement-customer-account/management-customer-account-company-view/management-customer-account-company-view.component";
import {
  ManagementCustomerAccountCompanyListComponent
} from "./pages/manager-customers-accounts/mangement-customer-account/management-customer-account-company-list/management-customer-account-company-list.component";
import {
  ManagementCustomerAccountPersonalListComponent
} from "./pages/manager-customers-accounts/mangement-customer-account/management-customer-account-personal-list/management-customer-account-personal-list.component";
import {
  ManagementCustomerAccountPersonalViewComponent
} from "./pages/manager-customers-accounts/mangement-customer-account/management-customer-account-personal-view/management-customer-account-personal-view.component";
import {
  AccountingRequestRejectViewComponent
} from "./pages/accounting/accounting-request-reject/accounting-request-reject-view/accounting-request-reject-view.component";
import {
  AccountingRequestRejectListComponent
} from "./pages/accounting/accounting-request-reject/accounting-request-reject-list/accounting-request-reject-list.component";
import {
  AccountingRequestValidateViewComponent
} from "./pages/accounting/accounting-request-validate/accounting-request-validate-view/accounting-request-validate-view.component";
import {
  AccountingRequestValidateListComponent
} from "./pages/accounting/accounting-request-validate/accounting-request-validate-list/accounting-request-validate-list.component";
import {
  AccountingRequestSubmitViewComponent
} from "./pages/accounting/accounting-request-submit/accounting-request-submit-view/accounting-request-submit-view.component";
import {
  AccountingRequestSubmitListComponent
} from "./pages/accounting/accounting-request-submit/accounting-request-submit-list/accounting-request-submit-list.component";
import {
  SinisterRequestValidateListComponent
} from "./pages/sinister/sinster-request-validate/sinister-request-validate-list/sinister-request-validate-list.component";
import {
  SinisterRequestValidateViewComponent
} from "./pages/sinister/sinster-request-validate/sinister-request-validate-view/sinister-request-validate-view.component";
import {
  SinisterRequestRejectListComponent
} from "./pages/sinister/sinster-request-reject/sinister-request-reject-list/sinister-request-reject-list.component";
import {
  SinisterRequestRejectViewComponent
} from "./pages/sinister/sinster-request-reject/sinister-request-reject-view/sinister-request-reject-view.component";
import {
  SinisterRequestSubmitViewComponent
} from "./pages/sinister/sinster-request-submit/sinister-request-submit-view/sinister-request-submit-view.component";
import {
  SinisterRequestSubmitListComponent
} from "./pages/sinister/sinster-request-submit/sinister-request-submit-list/sinister-request-submit-list.component";
import {
  CompensationRequestOpenListComponent
} from "./pages/compensation/compensation-request-open/compensation-request-open-list/compensation-request-open-list.component";
import {
  CompensationRequestCloseListComponent
} from "./pages/compensation/compensation-request-close/compensation-request-close-list/compensation-request-close-list.component";
import {profileGroupGuard} from "../auth/profile/profile-group.guard";
import {profileRoleGuard} from "../auth/profile/profile-role.guard";
import {profilePermissionGuard} from "../auth/profile/profile-permission.guard";
import {
  ProductCategoryListComponent
} from "./pages/list-management/product-category/product-category-list/product-category-list.component";
import {
  ProductCategoryEditComponent
} from "./pages/list-management/product-category/product-category-edit/product-category-edit.component";
import {
  ProductCategoryViewComponent
} from "./pages/list-management/product-category/product-category-view/product-category-view.component";
import {
  ProductCategoryAddComponent
} from "./pages/list-management/product-category/product-category-add/product-category-add.component";
import {CapitalListComponent} from "./pages/settings-products/capital/capital-list/capital-list.component";
import {CapitalAddComponent} from "./pages/settings-products/capital/capital-add/capital-add.component";
import {QuoteSimulationComponent} from "./pages/quote/quote-simulation/quote-simulation.component";
import {
  SubscriptionQuoteListComponent
} from "./pages/subscription/subscription-quote/subscription-quote-list/subscription-quote-list.component";
import {
  SubscriptionQuoteViewComponent
} from "./pages/subscription/subscription-quote/subscription-quote-view/subscription-quote-view.component";
import {
  SubscriptionSubmitListComponent
} from "./pages/subscription/subscription-submit/subscription-submit-list/subscription-submit-list.component";
import {
  SubscriptionSubmitViewComponent
} from "./pages/subscription/subscription-submit/subscription-submit-view/subscription-submit-view.component";
import {
  SubscriptionRejectListComponent
} from "./pages/subscription/subscription-reject/subscription-reject-list/subscription-reject-list.component";
import {
  SubscriptionValidateViewComponent
} from "./pages/subscription/subscription-validate/subscription-validate-view/subscription-validate-view.component";
import {
  SubscriptionRejectViewComponent
} from "./pages/subscription/subscription-reject/subscription-reject-view/subscription-reject-view.component";
import {
  SubscriptionValidateListComponent
} from "./pages/subscription/subscription-validate/subscription-validate-list/subscription-validate-list.component";
import {ComplaintsListComponent} from "./pages/marketing/complaints/complaints-list/complaints-list.component";
import {ComplaintsViewComponent} from "./pages/marketing/complaints/complaints-view/complaints-view.component";
import {
  ComplaintsCloseListComponent
} from "./pages/marketing/complaints/complaints-close-list/complaints-close-list.component";
import {
  UserCoinsurerListComponent
} from "./pages/settings/users-external/user-coinsurer-list/user-coinsurer-list.component";
import {
  UserCoinsurerAddComponent
} from "./pages/settings/users-external/user-coinsurer-add/user-coinsurer-add.component";
import {
  UserCoinsurerEditComponent
} from "./pages/settings/users-external/user-coinsurer-edit/user-coinsurer-edit.component";
import {
  UserCoinsurerViewComponent
} from "./pages/settings/users-external/user-coinsurer-view/user-coinsurer-view.component";
import {
  UserReinsurerListComponent
} from "./pages/settings/users-external/user-reinsurer-list/user-reinsurer-list.component";
import {
  UserReinsurerAddComponent
} from "./pages/settings/users-external/user-reinsurer-add/user-reinsurer-add.component";
import {
  UserReinsurerEditComponent
} from "./pages/settings/users-external/user-reinsurer-edit/user-reinsurer-edit.component";
import {
  UserReinsurerViewComponent
} from "./pages/settings/users-external/user-reinsurer-view/user-reinsurer-view.component";
import {
  ComplaintsCloseViewComponent
} from "./pages/marketing/complaints/complaints-close-view/complaints-close-view.component";
import {VisitListComponent} from "./pages/marketing/captive-portal/visits/visit-list/visit-list.component";
import {VisitViewComponent} from "./pages/marketing/captive-portal/visits/visit-view/visit-view.component";
import {CoinsuranceComponent} from "./pages/subscription/coinsurance/coinsurance.component";
import {ReinsuranceComponent} from "./pages/subscription/reinsurance/reinsurance.component";

const PROFILE_GROUPS: any = {
  managementCustomers: "GROUP_MANAGEMENT_CUSTOMERS",
  managementProducts: "GROUP_MANAGEMENT_PRODUCTS",
  managementMarketing: "GROUP_MANAGEMENT_MARKETING",
}

const PROFILE_ROLES: any = {
  managementCustomerRequests: "ROLE_MANAGEMENT_CUSTOMER_REQUESTS",
  managementCustomerAccounts: "ROLE_MANAGEMENT_CUSTOMER_ACCOUNTS",
  managementProductGuarantees: "ROLE_MANAGEMENT_PRODUCT_GUARANTEES",
  managementProductGroups: "ROLE_MANAGEMENT_PRODUCT_GROUPS",
}

const PROFILE_PERMISSION: any = {
  PERMISSION_LIST: "PERMISSION_LIST",
  PERMISSION_VIEW: "PERMISSION_VIEW",
  PERMISSION_ADD: "PERMISSION_ADD",
  PERMISSION_EDIT: "PERMISSION_EDIT",
  PERMISSION_REMOVE: "PERMISSION_REMOVE",
  PERMISSION_ENABLE: "PERMISSION_ENABLE",
  PERMISSION_VALIDATE: "PERMISSION_VALIDATE",
}


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
        path: 'management/customers',
        title: "Gestion des comptes | GNA",
      /*  canActivate: [profileGroupGuard],
        data: {
          groups: [PROFILE_GROUPS.managementCustomers]
        },*/
        children: [
          {
            path: 'requests',
            title: "Demmandes d'ouvertures de comptes | GNA",
         /*   canActivate: [profileRoleGuard],
            data: {
              roles: [PROFILE_ROLES.managementCustomerRequests]
            },*/
            children: [
              {
                path: 'personals/list', component: CustomerPersonalAccountRequestListComponent,
                title: "Demmandes d'ouvertures de comptes particuliers - Lister | GNA",
              },
              {
                path: 'personals/view', component: CustomerPersonalAccountRequestDetailComponent,
                title: "Demmandes d'ouvertures de comptes particuliers - Voir | GNA",
              },
              {
                path: 'companies/list', component: CustomerCompanyAccountRequestListComponent,
                title: "Demmandes d'ouvertures de comptes entreprises - Lister | GNA",
              },
              {
                path: 'companies/view', component: CustomerCompanyAccountRequestDetailComponent,
                title: "Demmandes d'ouvertures de comptes entreprises - Voir | GNA",
              },
            ]
          },
          {
            path: 'accounts',
            title: "Comptes | GNA",
           /* canActivate: [profileRoleGuard],
            data: {
              roles: [PROFILE_ROLES.managementCustomerAccounts]
            },*/
            children: [
              {
                path: 'personals/list', component: ManagementCustomerAccountPersonalListComponent,
                title: "Comptes particuliers | GNA",
              },
              {
                path: 'personals/view', component: ManagementCustomerAccountPersonalViewComponent,
                title: "Comptes particuliers | GNA",
              },
              {
                path: 'companies/list', component: ManagementCustomerAccountCompanyListComponent,
                title: "Comptes entreprises | GNA",
              },
              {
                path: 'companies/view', component: ManagementCustomerAccountCompanyViewComponent,
                title: "Comptes entreprises | GNA",
              },
            ]
          },
        ]
      },
      {
        path: 'management/products',
        title: 'Configuration des produits | GNA',
      /*  canActivate: [profileGroupGuard],
        data: {
          groups: [PROFILE_GROUPS.managementProducts]
        },*/
        children: [
          {
            path: 'guarantees',
            title: 'Garanties | GNA',
          /*  canActivate: [profileRoleGuard],
            data: {
              roles: [PROFILE_ROLES.managementProductGuarantees]
            },*/
            children: [
              {
                path: 'list', component: GuaranteeListComponent,
                title: 'Garanties - Lister | GNA',
              /*  canActivate: [profilePermissionGuard],
                data: {
                  groups: [PROFILE_GROUPS.managementProducts],
                  roles: [PROFILE_ROLES.managementProductGuarantees],
                  permissions: [PROFILE_PERMISSION.PERMISSION_LIST],
                },*/
              },
              {
                path: 'add', component: GuaranteeAddComponent,
                title: 'Garanties - Créer | GNA',
               /* canActivate: [profilePermissionGuard],
                data: {
                  groups: [PROFILE_GROUPS.managementProducts],
                  roles: [PROFILE_ROLES.managementProductGuarantees],
                  permissions: [PROFILE_PERMISSION.PERMISSION_ADD],
                },*/
              },
              {
                path: 'edit', component: GuaranteeEditComponent,
                title: 'Garanties - Modifier | GNA',
             /*   canActivate: [profilePermissionGuard],
                data: {
                  groups: [PROFILE_GROUPS.managementProducts],
                  roles: [PROFILE_ROLES.managementProductGuarantees],
                  permissions: [PROFILE_PERMISSION.PERMISSION_EDIT],
                },*/
              },
              {
                path: 'view', component: GuaranteeViewComponent,
                title: 'Garanties - Voir | GNA',
               /* canActivate: [profilePermissionGuard],
                data: {
                  groups: [PROFILE_GROUPS.managementProducts],
                  roles: [PROFILE_ROLES.managementProductGuarantees],
                  permissions: [PROFILE_PERMISSION.PERMISSION_VIEW],
                },*/
              },
            ]
          },
          {
            path: 'groups',
            title: 'Groupes de produits | GNA',
          /*  canActivate: [profileRoleGuard],
            data: {
              roles: [PROFILE_ROLES.managementProductGroups]
            },*/
            children: [
              {
                path: 'list', component: ProductGroupListComponent,
                title: 'Groupes de produits - Lister | GNA',
              },
              {
                path: 'add', component: ProductGroupAddComponent,
                title: 'Groupes de produits - Créer | GNA',
              },
              {
                path: 'edit', component: ProductGroupEditComponent,
                title: 'Groupes de produits - Modifier | GNA',
              },
              {
                path: 'view', component: ProductGroupViewComponent,
                title: 'Groupes de produits | GNA',
              },
            ]
          },
        ]
      },

      {
        path: 'subscriptions/quotes/list', component: SubscriptionQuoteListComponent,
        title: "Gestion des souscriptions - Cotations | GNA",
      },
      {
        path: 'subscriptions/quotes/view', component: SubscriptionQuoteViewComponent,
        title: "Gestion des souscriptions - Cotations | GNA",
      },
      {
        path: 'subscriptions/submits/list', component: SubscriptionSubmitListComponent,
        title: "Gestion des souscriptions - Demandes soumises | GNA",
      },
      {
        path: 'subscriptions/submits/view', component: SubscriptionSubmitViewComponent,
        title: "Gestion des souscriptions - Demandes soumises | GNA",
      },
      {
        path: 'subscriptions/submits/co-insurances/view', component: CoinsuranceComponent,
        title: "Gestion des souscriptions - Demandes soumises - Coassurance | GNA",
      },
      {
        path: 'subscriptions/submits/re-insurances/view', component: ReinsuranceComponent,
        title: "Gestion des souscriptions - Demandes soumises - Réassurance | GNA",
      },
      {
        path: 'subscriptions/validates/list', component: SubscriptionValidateListComponent,
        title: "Gestion des souscriptions - Demandes validées | GNA",
      },
      {
        path: 'subscriptions/validates/view', component: SubscriptionValidateViewComponent,
        title: "Gestion des souscriptions - Demandes validées | GNA",
      },
      {
        path: 'subscriptions/rejects/list', component: SubscriptionRejectListComponent,
        title: "Gestion des souscriptions - Demandes rejetées | GNA",
      },
      {
        path: 'subscriptions/rejects/view', component: SubscriptionRejectViewComponent,
        title: "Gestion des souscriptions - Demandes rejetées | GNA",
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
        title: "Prestation - Demandes soumises | GNA",
      },
      {
        path: 'prestation/requests/submits/view', component: PrestationSubmitViewComponent,
        title: "Prestation - Demandes soumises | GNA",
      },
      {
        path: 'prestation/requests/validates/list', component: PrestationValidateListComponent,
        title: "Prestation - Demandes validées | GNA",
      },
      {
        path: 'prestation/requests/validates/view', component: PrestationValidateViewComponent,
        title: "Prestation - Demandes validées | GNA",
      },
      {
        path: 'prestation/requests/rejects/list', component: PrestationRejectListComponent,
        title: "Prestation - Demandes rejetées | GNA",
      },
      {
        path: 'prestation/requests/rejects/view', component: PrestationRejectViewComponent,
        title: "Prestation - Demandes rejetées | GNA",
      },

      {
        path: 'sinister/requests/submits/list', component: SinisterRequestSubmitListComponent,
        title: "Gestion des sinistres - Demandes soumises | GNA",
      },
      {
        path: 'sinister/requests/submits/view', component: SinisterRequestSubmitViewComponent,
        title: "Gestion des sinistres - Demandes soumises | GNA",
      },
      {
        path: 'sinister/requests/validates/list', component: SinisterRequestValidateListComponent,
        title: "Gestion des sinistres - Demandes validées | GNA",
      },
      {
        path: 'sinister/requests/validates/view', component: SinisterRequestValidateViewComponent,
        title: "Gestion des sinistres - Demandes validées | GNA",
      },
      {
        path: 'sinister/requests/rejects/list', component: SinisterRequestRejectListComponent,
        title: "Gestion des sinistres - Demandes rejetées | GNA",
      },
      {
        path: 'sinister/requests/rejects/view', component: SinisterRequestRejectViewComponent,
        title: "Gestion des sinistres - Demandes rejetées | GNA",
      },

      {
        path: 'compensations/requests/open/list', component: CompensationRequestOpenListComponent,
        title: "Gestion des indemnisations - Sinistres ouverts | GNA",
      },
      {
        path: 'compensations/requests/close/list', component: CompensationRequestCloseListComponent,
        title: "Gestion des indemnisations - Sinistres clôturés | GNA",
      },

      {
        path: 'accounting/requests/submits/list', component: AccountingRequestSubmitListComponent,
        title: "Comptabilité - Demandes soumises | GNA",
      },
      {
        path: 'accounting/requests/submits/view', component: AccountingRequestSubmitViewComponent,
        title: "Comptabilité - Demandes soumises | GNA",
      },
      {
        path: 'accounting/requests/validates/list', component: AccountingRequestValidateListComponent,
        title: "Comptabilité - Demandes validées | GNA",
      },
      {
        path: 'accounting/requests/validates/view', component: AccountingRequestValidateViewComponent,
        title: "Comptabilité - Demandes validées | GNA",
      },
      {
        path: 'accounting/requests/rejects/list', component: AccountingRequestRejectListComponent,
        title: "Comptabilité - Demandes rejetées | GNA",
      },
      {
        path: 'accounting/requests/rejects/view', component: AccountingRequestRejectViewComponent,
        title: "Comptabilité - Demandes rejetées | GNA",
      },


      {
        path: 'settings/lists/partners/list', component: PartnerListComponent,
        title: 'Partenaires - Lister | GNA',
      },
      {
        path: 'settings/lists/partners/add', component: PartnerSaveComponent,
        title: 'Partenaires - Créer | GNA',
      },
      {
        path: 'settings/lists/partners/edit', component: PartnerEditComponent,
        title: 'Partenaires - Modifier | GNA',
      },
      {
        path: 'settings/lists/partners/view', component: PartnerViewComponent,
        title: 'Partenaires | GNA',
      },
      {
        path: 'settings/lists/branches/list', component: BranchListComponent,
        title: 'Branches - Lister | GNA',
      },
      {
        path: 'settings/lists/branches/add', component: BranchAddComponent,
        title: 'Branches - Créer | GNA',
      },
      {
        path: 'settings/lists/branches/edit', component: BranchEditComponent,
        title: 'Branches - Modifier | GNA',
      },
      {
        path: 'settings/lists/branches/view', component: BranchViewComponent,
        title: 'Branches | GNA',
      },
      {
        path: 'settings/lists/categories/list', component: ProductCategoryListComponent,
        title: 'Catégories - Lister | GNA',
      },
      {
        path: 'settings/lists/categories/add', component: ProductCategoryAddComponent,
        title: 'Catégories - Créer | GNA',
      },
      {
        path: 'settings/lists/categories/edit', component: ProductCategoryEditComponent,
        title: 'Catégories - Modifier | GNA',
      },
      {
        path: 'settings/lists/categories/view', component: ProductCategoryViewComponent,
        title: 'Catégories | GNA',
      },
      {
        path: 'settings/lists/zones/list', component: ZoneListComponent,
        title: 'Territoires - Lister | GNA',
      },
      {
        path: 'settings/lists/zones/add', component: ZoneAddComponent,
        title: 'Territoires - Créer | GNA',
      },
      {
        path: 'settings/lists/zones/edit', component: ZoneEditComponent,
        title: 'Territoires - Modifier | GNA',
      },
      {
        path: 'settings/lists/zones/view', component: ZoneViewComponent,
        title: 'Territoires | GNA',
      },
      {
        path: 'marketing/segments/list', component: SegmentListComponent,
        title: 'Segmentation - Lister | GNA',
      },
      {
        path: 'marketing/segments/add', component: SegmentAddComponent,
        title: 'Segmentation - Créer | GNA',
      },
      {
        path: 'marketing/segments/edit', component: SegmentEditComponent,
        title: 'Segmentation - Modifier | GNA',
      },
      {
        path: 'marketing/segments/view', component: SegmentViewComponent,
        title: 'Segmentation | GNA',
      },
      {
        path: 'management/products/quotes/forms/list', component: FormQuotationListComponent,
        title: 'Formulaires de cotations - Lister | GNA',
      },
      {
        path: 'management/products/quotes/forms/add', component: FormQuotationAddComponent,
        title: 'Formulaires de cotations - Créer | GNA',
      },
      {
        path: 'management/products/quotes/forms/edit', component: FormQuotationEditComponent,
        title: 'Formulaires de cotations - Modifier | GNA',
      },
      {
        path: 'management/products/quotes/forms/view', component: FormQuotationViewComponent,
        title: 'Formulaires de cotations - Voir | GNA',
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
        path: 'management/products/pricing/list', component: PremiumCalculationListComponent,
        title: 'Tarification des primes - Lister | GNA',
      },
      {
        path: 'management/products/pricing/add', component: PremiumCalculationAddComponent,
        title: 'Tarification des primes - Créer | GNA',
      },
      {
        path: 'management/products/pricing/edit', component: PremiumCalculationEditComponent,
        title: 'Tarification des primes - Modifier | GNA',
      },
      {
        path: 'management/products/pricing/view', component: PremiumCalculationDetailComponent,
        title: 'Tarification des primes - Voir | GNA',
      },
      {
        path: 'management/products/capitals/list', component: CapitalListComponent,
        title: 'Capital - Lister | GNA',
      },
      {
        path: 'management/products/capitals/add', component: CapitalAddComponent,
        title: 'Capital - Créer | GNA',
      },
      {
        path: 'marketing/products/list', component: ProductListComponent,
        title: 'Produit - Lister | GNA',
      },
      {
        path: 'marketing/products/add', component: ProductAddComponent,
        title: 'Produit - Créer | GNA',
      },
      {
        path: 'marketing/products/edit', component: ProductEditComponent,
        title: 'Produit - Modifier | GNA',
      },
      {
        path: 'marketing/products/view', component: ProductViewComponent,
        title: 'Produit - Voir | GNA',
      },
      {
        path: 'marketing/products/simulation', component: QuoteSimulationComponent,
        title: 'Produit - Simulation | GNA',
      },
      {
        path: 'marketing/campaigns/list', component: CampaignListComponent,
        title: 'Marketing Campagnes | GNA',
      },
      {
        path: 'marketing/campaigns/view', component: CampaignDetailComponent,
        title: 'Marketing Campagnes | GNA',
      },
      {
        path: 'marketing/campaigns/add', component: CampaignAddComponent,
        title: 'Marketing Campagnes Créer | GNA',
      },
      {
        path: 'marketing/campaigns/edit', component: CampaignEditComponent,
        title: 'Marketing Campagnes Modifier | GNA',
      },
      {
        path: 'marketing/visits/list', component: VisitListComponent,
        title: 'Visites | Marketing - GNA',
      },
      {
        path: 'marketing/visits/view', component: VisitViewComponent,
        title: 'Visites | Marketing - GNA',
      },
      {
        path: 'marketing/complaints/open/list', component: ComplaintsListComponent,
        title: 'Réclamations - Tikets ouverts | Marketing - GNA',
      },
      {
        path: 'marketing/complaints/open/view', component: ComplaintsViewComponent,
        title: 'Réclamations - Tikets ouverts | Marketing - GNA',
      },
      {
        path: 'marketing/complaints/close/list', component: ComplaintsCloseListComponent,
        title: 'Réclamations - Tikets fermés | Marketing - GNA',
      },
      {
        path: 'marketing/complaints/close/view', component: ComplaintsCloseViewComponent,
        title: 'Réclamations - Tikets fermés | Marketing - GNA',
      },
      {
        path: 'profile', component: ProfileComponent,
        title: 'Compte - Mon Profil | GNA',
      },
      {
        path: 'admin/users/interns/profiles/list', component: UserProfileManagementComponent,
        title: 'Gestion Profils | GNA',
      },
      {
        path: 'admin/users/interns/profiles/add', component: UserProfileManagementSaveComponent,
        title: 'Gestion Profils - Créer | GNA',
      },
      {
        path: 'admin/users/interns/profiles/view', component: UserProfileManagementViewComponent,
        title: 'Gestion Profils | GNA',
      },
      {
        path: 'admin/users/interns/profiles/edit', component: UserProfileManagementEditComponent,
        title: 'Gestion Profils - Modifier | GNA',
      },
      {
        path: 'admin/users/interns/list', component: UsersManagerComponent,
        title: 'Gestion Utilisateurs | GNA',
      },
      {
        path: 'admin/users/interns/add', component: UsersManagerSaveComponent,
        title: 'Gestion Utilisateurs - Créer | GNA',
      },
      {
        path: 'admin/users/interns/edit', component: UserManagementEditComponent,
        title: 'Gestion Utilisateurs - Modifier | GNA',
      },
      {
        path: 'admin/users/interns/view', component: UserManagementViewComponent,
        title: 'Gestion Utilisateurs | GNA',
      },
      {
        path: 'admin/users/external/coinsurers/list', component: UserCoinsurerListComponent,
        title: 'Gestion Utilisateurs Externes | GNA',
      },
      {
        path: 'admin/users/external/coinsurers/add', component: UserCoinsurerAddComponent,
        title: 'Gestion Utilisateurs Externes | GNA',
      },
      {
        path: 'admin/users/external/coinsurers/edit', component: UserCoinsurerEditComponent,
        title: 'Gestion Utilisateurs Externes | GNA',
      },
      {
        path: 'admin/users/external/coinsurers/view', component: UserCoinsurerViewComponent,
        title: 'Gestion Utilisateurs Externes | GNA',
      },
      {
        path: 'admin/users/external/reinsurers/list', component: UserReinsurerListComponent,
        title: 'Gestion Utilisateurs Externes | GNA',
      },
      {
        path: 'admin/users/external/reinsurers/add', component: UserReinsurerAddComponent,
        title: 'Gestion Utilisateurs Externes | GNA',
      },
      {
        path: 'admin/users/external/reinsurers/edit', component: UserReinsurerEditComponent,
        title: 'Gestion Utilisateurs Externes | GNA',
      },
      {
        path: 'admin/users/external/reinsurers/view', component: UserReinsurerViewComponent,
        title: 'Gestion Utilisateurs Externes | GNA',
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
    path: 'simulation/quote',
    component: SimulationQuotationComponent,
    title: 'Simulation | GNA',
    canActivate: [authGuard]
  }
];
