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
    RouterLinkActive
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

  constructor(
    private _router: Router,
    public authService: AuthService,
    public accountService: AccountService
  ) {
  }

  ngOnInit(): void {

let groupManageCustomerAccounts = {
      id: 3,
      name: ' Gestion des comptes',
      icon: 'fa-solid fa-users',
      children: [
        { name: "Demandes d'ouvertures de comptes", icon: '',
          children: [
            {name: "Comptes Particuliers", link: '/account/manager/accounts/personals/requests/list', class: null},
            {name: 'Comptes Entreprises', link: '/account/manager/accounts/companies/requests/list', class: null},
          ],},
        {name: 'Comptes',
          icon: '',
          children: [
            {name: "Comptes Particuliers", link: '/account/managements/accounts/personals/list', class: null},
            {name: 'Comptes Entreprises', link: '/account/managements/accounts/companies/list', class: null},
          ]},
      ],
    };

    this.menuData.push(groupManageCustomerAccounts);

     let groupSettingsProducts = {
          id: 4,
          name: ' Configuration des produits',
          icon: 'fa-solid fa-sliders',
          children: [
               {name: 'Garanties', link: '/account/guarantees/list', class: null},
        {name: 'Groupes de produits', link: '/account/products-groups/list', class: null},
            {name: 'Formulaires de cotations', link: '/account/settings-products/forms/quotations/list', class: null},
           {name: 'Calculs de primes', link: '/account/settings-products/premium-calculation/list', class: null}
          ],
        };

        this.menuData.push(groupSettingsProducts);

    let groupMarketing =  {
      id: 5,
      name: ' Marketing',
      icon: 'fa-solid fa-bullhorn',
      children: [
        {name: 'Produits', link: '/account/products/list', class: null},
        {name: 'Segmentation', link: '/account/segments/list', class: null},
        {name: 'Campagne', link: '/account/marketing/campaigns/list', class: null},
        {name: 'Communication', link: '/account/marketing/campaigns/list', class: null},
      ],
    };

    this.menuData.push(groupMarketing);


    let groupSubscriptions =  {
      id: 5,
      name: ' Gestion des souscriptions',
      icon: 'fa-solid fa-umbrella',
      children: [
        {name: 'Souscriptions soumises', link: '/account/products/list', class: null},
        {name: 'Souscriptions validées', link: '/account/segments/list', class: null},
        {name: 'Souscriptions rejetées', link: '/account/marketing/campaigns/list', class: null},
      ],
    };

    this.menuData.push(groupSubscriptions);

    let groupSinisters =  {
      id: 5,
      name: ' Gestion des sinistres',
      icon: 'fa-solid fa-bolt',
      children: [
        {name: 'Déclarations physiques', link: '/account/segments/list', class: null},
        {name: 'Demandes soumises', link: '/account/sinister/requests/submits/list', class: null},
        {name: 'Demandes validés', link: '/account/sinister/requests/validates/list', class: null},
        {name: 'Demandes rejetées', link: '/account/sinister/requests/rejects/list', class: null},
      ],
    };

    this.menuData.push(groupSinisters);

    let groupCompensations =  {
      id: 5,
      name: ' Gestion des indemnisations',
      icon: 'fa-solid fa-hand-holding-dollar',
      children: [
        {name: 'Sinistres ouverts', link: '/account/compensations/requests/open/list', class: null},
        {name: 'Sinistres clôturés', link: '/account/compensations/requests/close/list<<', class: null},
      ],
    };

    this.menuData.push(groupCompensations);

    let groupAccounting =  {
      id: 5,
      name: ' Comptabilité',
      icon: 'fa-solid fa-coins',
      children: [
        {name: 'Demandes soumises', link: '/account/accounting/requests/submits/list', class: null},
        {name: 'Demandes validés', link: '/account/accounting/requests/validates/list', class: null},
        {name: 'Demandes rejetées', link: '/account/accounting/requests/rejects/list', class: null},
      ],
    };

    this.menuData.push(groupAccounting);

    let groupCoinsurance =  {
      id: 5,
      name: ' Coassurances',
      icon: 'fa-solid fa-handshake',
      children: [
        {name: 'Demandes soumises', link: '/account/coinsurance/requests/submits/list', class: null},
        {name: 'Demandes validés', link: '/account/coinsurance/requests/validates/list', class: null},
        {name: 'Demandes rejetées', link: '/account/coinsurance/requests/rejects/list', class: null},
      ],
    };

    this.menuData.push(groupCoinsurance);

    let groupReinsurance =  {
      id: 5,
      name: ' Réassurances',
      icon: 'fa-solid fa-handshake',
      children: [
        {name: 'Demandes soumises', link: '/account/reinsurance/requests/submits/list', class: null},
        {name: 'Demandes validés', link: '/account/reinsurance/requests/validates/list', class: null},
        {name: 'Demandes rejetées', link: '/account/reinsurance/requests/rejects/list', class: null},
      ],
    };

    this.menuData.push(groupReinsurance);

    let groupExperts =  {
      id: 5,
      name: ' Expertises',
      icon: 'fa-solid fa-user-tie',
      children: [
        {name: 'Demandes soumises', link: '/account/expertise/requests/submits/list', class: null},
        {name: 'Demandes validés', link: '/account/expertise/requests/validates/list', class: null},
        {name: 'Demandes rejetées', link: '/account/expertise/requests/rejects/list', class: null},
      ],
    };

    this.menuData.push(groupExperts);

    let groupProviders =  {
      id: 5,
      name: ' Prestations',
      icon: 'fa-solid fa-briefcase',
      children: [
        {name: 'Demandes soumises', link: '/account/prestation/requests/submits/list', class: null},
        {name: 'Demandes validés', link: '/account/prestation/requests/validates/list', class: null},
        {name: 'Demandes rejetées', link: '/account/prestation/requests/rejects/list', class: null},
      ],
    };

    this.menuData.push(groupProviders);

    let groupPartners =  {
      id: 5,
      name: ' Partenariat',
      icon: 'fa-solid fa-handshake-angle',
      children: [
        {name: 'Souscription', link: '/account/products/list', class: null},
        {name: 'Offres', link: '/account/segments/list', class: null},
        {name: 'Rendez-vous', link: '/account/segments/list', class: null},
      ],
    };

    this.menuData.push(groupPartners);



    let groupSettings =
      {
        id: 6,
        name: ' Paramètres',
        icon: 'fa-solid fa-gear',
        children: [],
      };

  //  if (this.authService.getAuthGroups() && this.authService.getAuthGroups().length > 0 && this.authService.getAuthGroups().indexOf('GROUP_LIST') >= 0) {

      let groupSettingsListManagement = {name: 'Gestion Listes', icon: "i", class: null, children: []};

    //  if (this.authService.getAuthRoles() && this.authService.getAuthRoles().length > 0 && this.authService.getAuthRoles().indexOf('ROLE_PARTNER') >= 0) {

        let rolePartner = {name: ' Partenaires', link: '/account/partners/list', class: null};
        // @ts-ignore
        groupSettingsListManagement.children.push(rolePartner);

     // }

      let roleBranch =  {name: ' Branches', link: '/account/branches/list', class: null};
      // @ts-ignore
      groupSettingsListManagement.children.push(roleBranch);

      let roleZone =   {name: ' Territoires', link: '/account/zones/list', class: null};
      // @ts-ignore
      groupSettingsListManagement.children.push(roleZone);

      // @ts-ignore
      groupSettings.children.push(groupSettingsListManagement);

  //  }

    let roleManageProfiles =       {name: 'Gestion Profils', link: '/account/settings/profiles/list', class: null};
    let roleManageUsers =        {name: 'Gestion Utilisateurs', link: '/account/settings/users', class: null};


    // @ts-ignore
    groupSettings.children.push(roleManageProfiles);
    // @ts-ignore
    groupSettings.children.push(roleManageUsers);

    this.menuData.push(groupSettings);

    this.dataSource.data = this.menuData;

  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  onGoTo(node: any) {
    if (!this.accountService.isSave) {
      node.name.class = "mtn-selected";
      setTimeout(() => {
        this._router.navigateByUrl(node.name.link).then(() => {
        });
      }, 200);
    }
  }

  onGetNodeToToggle(node: any) {

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
