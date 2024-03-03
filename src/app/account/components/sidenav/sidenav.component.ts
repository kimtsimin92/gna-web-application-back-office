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

  menuData: any[] = [
    {
      name: 'Accueil',
      link: '/account/home',
      class: null
    },
   /* {
      name: 'Gestion Listes',
      icon: 'list',
      children: [{name: 'Partenaires', link: '/account/partners/list', class: null},
        {name: 'Branches', link: '/account/branches/list', class: null},
        {name: 'Territoires', link: '/account/zones/list', class: null},
        {name: 'Segments', link: '/account/segments/list', class: null},
        {name: 'APIs', link: '/account/home', class: null}],
    },*/
    {
      name: 'Configuration des produits',
      icon: 'manage_accounts',
      children: [
        {name: 'Garanties', link: '/account/guarantees/list', class: null},
        {name: 'Groupes Produits', link: '/account/products-groups/list', class: null}
      ],
    },
    /*    {
          name: 'Marketing',
          icon: 'sell',
          children: [{name: 'Produits'}, {name: 'Comptes clients'}, {name: 'Segmentation'}, {name: 'Fidélité'}],
        },
        {
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
        },*/
    /*    {
          name: 'Paramètres',
          icon: 'settings',
          children: [
            {name: 'Gestion profils', link: '#'},
            {name: 'Gestion utilisateurs', link: '#'}
          ],
        },*/
   /* {
      name: 'Paramètres',
      icon: 'manage_accounts',
      children: [
        {name: 'Profil BO', link: '/account/settings/profiles', class: null},
        {name: 'Lier Profil BO', link: '/account/settings/users', class: null},
        {name: "Piste d'audite", link: '/account/home', class: null}
      ],
    },*/
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
    public accountService: AccountService
  ) {
  }

  ngOnInit(): void {
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
