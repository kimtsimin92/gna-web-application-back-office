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
      name: 'Accueil',
      icon: 'home',
      link: '/account/home',
      class: null
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

      let groupSettingsProducts = {
          id: 3,
          name: 'Configuration des produits',
          icon: 'room_preferences',
          children: [
            {name: 'Garanties', link: '/account/guarantees/list', class: null},
            {name: 'Groupes Produits', link: '/account/products-groups/list', class: null},
            {name: 'Formulaires Cotations', link: '/account/settings-products/forms/quotations/list', class: null},
           /* {name: 'Formulaires Souscriptions', link: '/account/settings-products/forms/quotations/list', class: null},
            {name: 'Calculs Primes', link: '/account/settings-products/forms/quotations/list', class: null},*/
          ],
        };

        this.menuData.push(groupSettingsProducts);

      let groupMarketing =  {
        id: 4,
        name: 'Marketing',
        icon: 'sell',
        children: [{name: 'Produits', link: '/account/products/list', class: null}],
      };

      this.menuData.push(groupMarketing);

    let groupSettings =
      {
        id: 5,
        name: 'Paramètres',
        icon: 'manage_accounts',
        children: [],
      };

    if (this.authService.getAuthGroups() && this.authService.getAuthGroups().length > 0 && this.authService.getAuthGroups().indexOf('GROUP_LIST') >= 0) {


      if (this.authService.getAuthRoles() && this.authService.getAuthRoles().length > 0 && this.authService.getAuthRoles().indexOf('ROLE_PARTNER') >= 0) {

        let rolePartner = {name: 'Gestion Partenaires', link: '/account/partners/list', class: null};
        // @ts-ignore
        groupSettings.children.push(rolePartner);

      }

      let roleBranch =  {name: 'Gestion Branches', link: '/account/branches/list', class: null};
      // @ts-ignore
      groupSettings.children.push(roleBranch);

      let roleZone =   {name: 'Gestion Territoires', link: '/account/zones/list', class: null};
      // @ts-ignore
      groupSettings.children.push(roleZone);

      let roleSegment =    {name: 'Gestion Segments', link: '/account/segments/list', class: null};
      // @ts-ignore
      groupSettings.children.push(roleSegment);

    }

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
        this.treeControl.collapseAll();
        this.treeControl.expand(node);
        this.currentNode = null;
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
          this.treeControl.collapseAll();
          this.treeControl.expand(node);
        }

      }
      this.currentNode = node;
    }

  }
}
