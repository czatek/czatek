import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  exports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    LayoutModule
  ]
})
export class MaterialModule {}
