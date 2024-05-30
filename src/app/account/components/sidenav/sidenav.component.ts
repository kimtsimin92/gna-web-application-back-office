import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatDrawer, MatDrawerContainer} from "@angular/material/sidenav";
import {FlatTreeControl} from "@angular/cdk/tree";
import {
  MatTree,
  MatTreeFlatDataSource,
  MatTreeFlattener,
  MatTreeNode,
  MatTreeNodeDef, MatTreeNodePadding,
  MatTreeNodeToggle
} from "@angular/material/tree";
import {MatIcon} from "@angular/material/icon";
import {NgClass, NgIf} from "@angular/common";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {AccountService} from "../../account.service";
import {AuthService} from "../../../auth/auth.service";
import {MenuItem} from "primeng/api";
import {PanelMenuModule} from "primeng/panelmenu";
import {RippleModule} from "primeng/ripple";

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatButton,
    MatDrawer,
    MatDrawerContainer,
    MatTreeNode,
    MatIcon,
    MatTree,
    MatTreeNodeDef,
    MatIconButton,
    MatTreeNodeToggle,
    MatTreeNodePadding,
    NgIf,
    RouterLink,
    NgClass,
    RouterLinkActive,
    PanelMenuModule,
    RippleModule
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit {

  @Input() drawerToggle: boolean = false;

  matTreeNodePadding: number = -5;

  showFiller = false;

  /*menuData: any[] = [
    {
      id: 1,
      name: 'Accueil',
      icon: 'home',
      link: '/account/home',
      class: null
    },
    {
      id: 2,
      name: 'Gestion des listes',
      icon: 'list',
      children: [{name: 'Partenaires', link: '/account/partners/list', class: null},
        {name: 'Branches', link: '/account/branches/list', class: null},
        {name: 'Territoires', link: '/account/zones/list', class: null},
        {name: 'Segments', link: '/account/segments/list', class: null},
       // {name: 'Incentives', link: '/account/incentives/list', class: null}
        ]

    },
    {
      id: 3,
      name: 'Configuration des produits',
      icon: 'room_preferences',
      children: [
        {name: 'Garanties', link: '/account/guarantees/list', class: null},
        {name: 'Groupes Produits', link: '/account/products-groups/list', class: null},
        {name: 'Formulaires Cotations', link: '/account/settings-products/forms/quotations/list', class: null},
       /!* {name: 'Formulaires Souscriptions', link: '/account/settings-products/forms/subscriptions/list', class: null},
        {name: 'Calculs Primes', link: '/account/settings-products/premium-calculations', class: null}*!/
      ],
    },
      {
        id: 4,
          name: 'Marketing',
          icon: 'sell',
          children: [{name: 'Produits', link: '/account/products/list', class: null}],
        },
/!*        {
          name: 'Souscriptions',
          icon: 'draw',
        },
        {
          name: 'Indemnisations',
          icon: 'payments',
        },
        {
          name: 'Coassurance',
          icon: 'handshake',
        },
        {
          name: 'Réassurance',
          icon: 'receipt_long',
        },
        {
          name: 'Comptabilité',
          icon: 'account_balance',
        },
        {
          name: 'Site Web',
          icon: 'language',
          children: [{name: 'Gestion pages'}, {name: 'Gestion blog'}],
        },
        {
          name: 'Statistiques',
          icon: 'equalizer',
          children: [{name: 'Tableau de bord produits'}, {name: 'Tableau de bord clients'}],
        },*!/
    /!*    {
          name: 'Paramètres',
          icon: 'settings',
          children: [
            {name: 'Gestion profils', link: '#'},
            {name: 'Gestion utilisateurs', link: '#'}
          ],
        },*!/
    {
      id: 5,
      name: 'Paramètres',
      icon: 'manage_accounts',
      children: [
       {name: 'Gestion Profils', link: '/account/settings/profiles/list', class: null},
        {name: 'Gestion Utilisateurs', link: '/account/settings/users', class: null},
       // {name: "Pistes d'audites", link: '/account/home', class: null}
      ],
    },
  ];*/

  menuData: any[] = [
    {
      id: 1,
      name: ' Tableau de bord',
      icon: 'fa-solid fa-pie-chart',
      link: '/account/dashboard',
      class: null,
    },
  ];

  currentNode: any;
  lastNodeSelected: any;


  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


  menuItems: MenuItem[] = [];

  userProfileData: any = null;

  profileGroups: any = {
    managementCustomers: "GROUP_MANAGEMENT_CUSTOMERS",
    managementProducts: "GROUP_MANAGEMENT_PRODUCTS",
    managementMarketing: "GROUP_MANAGEMENT_MARKETING",
  };

  profileRoles: any = {
    managementCustomerRequests: "ROLE_MANAGEMENT_CUSTOMER_REQUESTS",
    managementCustomerAccounts: "ROLE_MANAGEMENT_CUSTOMER_ACCOUNTS",
    managementMarketing: "ROLE_MANAGEMENT_MARKETING_SEGMENTATION",
  };

  constructor(
    private _router: Router,
    public authService: AuthService,
    public accountService: AccountService
  ) {
  }

  ngOnInit(): void {

    this.menuItems = [
      {
        label: 'Tableau de bord',
        route: '/account/dashboard'
      },
    ];


    // GROUP MANAGEMENT CUSTOMERS

    let groupManagementCustomers = {
      label: 'Gestion des comptes',
      items: []
    };

    let roleManagementCustomerRequests = {
      label: "Demandes d'ouvertures de comptes",
      items: [
        {
          label: "Particuliers",
          route: '/account/management/customers/requests/personals/list'
        },
        {
          label: "Entreprises",
          route: '/account/management/customers/requests/companies/list'
        }
      ]
    };

    let roleManagementCustomerAccounts = {
      label: "Comptes",
      items: [
        {
          label: "Particuliers",
          route: '/account/management/customers/accounts/personals/list'
        },
        {
          label: "Entreprises",
          route: '/account/management/customers/accounts/companies/list'
        }
      ]
    };

    //

    //

    let groupManagementProducts = {
      label: 'Configuration des produits',
      items: [
        {
          label: "Garanties",
          route: '/account/management/products/guarantees/list'
        },
        {
          label: "Groupes de produits",
          route: '/account/management/products/groups/list'
        },
      /*  {
           label: "Formulaires de cotations",
           route: '/account/management/products/quotes/forms/list'
         },
         {
           label: "Tarification des primes",
           route: '/account/management/products/pricing/list'
         },*/
        /* {
            label: "Capitaux",
            route: '/'
          }*/
      ]
    };

    let groupManagementMarketing = {
      label: 'Marketing',
      items: [
        {
          label: "Segmentation",
          route: '/account/marketing/segments/list'
        },
        {
          label: "Produits",
          route: '/account/marketing/products/list'
        },
       /* {
          label: "Campagnes",
          route: '/account/marketing/companies/list'
        }*/
      ]
    };

    let managementSubscriptions = {
      label: 'Gestion des souscriptions',
      items: [
        {
          label: "Cotations prospects",
          route: '/'
        },
        {
          label: "Demandes soumises",
          route: '/'
        },
        {
          label: "Demandes validées",
          route: '/'
        },
        {
          label: "Demandes rejetées",
          route: '/'
        }
      ]
    };

    let groupManagementSettings = {
      label: 'Paramètres',
      items: [
        {
          label: "Paramètres des listes",
          items: [
            {
              label: "Branches",
              route: '/account/branches/list'
            },
           /* {
              label: "Catégories",
              route: '/'
            },*/
            {
              label: "Territorialités",
              route: '/account/zones/list'
            },
           /* {
              label: "Incentives",
              route: '/'
            },*/
            {
              label: "Partenaires",
              route: '/account/partners/list'
            }
          ]
        },
      ]
    };

    let groupManagementAdmin = {
      label: 'Administration',
      items: [
        {
          label: "Gestion des utilisateurs internes",
          items: [
            {
              label: "Profils",
              route: '/account/admin/users/interns/profiles/list'
            },
            {
              label: "Utilisateurs",
              route: '/account/admin/users/interns/list'
            }
          ]
        },
     /*   {
          label: "Gestion des utilisateurs externes",
        },*/
      ]
    };


    if (this.authService.onGetProfileGroup(this.profileGroups.managementCustomers)) {

      if (this.authService.onGetProfileRole(this.profileRoles.managementCustomerRequests)) {
        // @ts-ignore
        groupManagementCustomers.items.push(roleManagementCustomerRequests);
      }

      if (this.authService.onGetProfileRole(this.profileRoles.managementCustomerAccounts)) {
        // @ts-ignore
        groupManagementCustomers.items.push(roleManagementCustomerAccounts);
      }

      this.menuItems.push(groupManagementCustomers);

    }

    if (this.authService.onGetProfileGroup(this.profileGroups.managementProducts)) {
      this.menuItems.push(groupManagementProducts);
    }


      this.menuItems.push(groupManagementMarketing);
      this.menuItems.push(groupManagementSettings);
      this.menuItems.push(groupManagementAdmin);


    }


    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

    onGoTo(node
  :
    any
  )
    {
      if (!this.accountService.isSave) {
        node.name.class = "mtn-selected";
        setTimeout(() => {
          this._router.navigateByUrl(node.name.link).then(() => {
          });
        }, 200);
      }
    }

    onGetNodeToToggle(node
  :
    any
  )
    {

      if (!this.accountService.isSave) {
        console.log(this.currentNode);
        console.log(node);

        if (!node.expandable) {
          let nodes = this.treeControl.dataNodes

          if (nodes.length > 0) {

            nodes.forEach(n => {
              // @ts-ignore
              if (n.name.class && node !== n) {
                // @ts-ignore
                n.name.class = null;
              }
            });
          }
        }

        if (this.currentNode == node) {
          if (node.isExpandable && !node.expandable) {
            this.treeControl.expand(this.currentNode);
          } else {
            this.treeControl.collapseAll();
            this.currentNode = null;
          }
        } else {

          if (!node.expandable) {

            if (this.currentNode) {
              if (this.currentNode.name && this.currentNode.name.children && this.currentNode.name.children.length > 0) {
                this.currentNode.name.children.forEach((c: any) => {
                  if (c.name && c.name.name === node.name.name) {
                    this.treeControl.collapseAll();
                    this.treeControl.expand(this.currentNode);
                  }
                });
              }
            }

          } else {

            if (node.expandable && node.level > 0) {
              this.treeControl.collapseAll();
              this.treeControl.expand(this.currentNode);
              this.treeControl.expand(node);
            } else {
              this.treeControl.collapseAll();
              this.treeControl.expand(node);
            }
          }

        }
        this.currentNode = node;
      }

    }
  }
