import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http } from '@angular/http';

import { SessionResourceService } from './session-resource.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SessionResourceService],
  providers: [Http]
})
export class OpenmrsApiModule { }
