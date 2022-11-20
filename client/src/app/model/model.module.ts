import { NgModule } from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {RestDataSource} from "./rest.datasource";
import {AuthService} from "./auth.service";

@NgModule({
  imports: [HttpClientModule],
  providers: [RestDataSource, AuthService]
})
export class ModelModule{}
