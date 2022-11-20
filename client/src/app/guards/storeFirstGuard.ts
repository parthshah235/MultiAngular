import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";


@Injectable()
export class StoreFirstGuard{
  private firstNavigation = true;

  constructor(private router: Router) {
  }

  canActivate(route : ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    return true;
  }
}
