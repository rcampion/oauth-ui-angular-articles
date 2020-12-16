import { Injectable } from '@angular/core';
import { SocketClientService } from './socket-client.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Contact } from '../interface/contact.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private socketClient: SocketClientService) {
  }

//  static getPostListing(post: any): any {
//    const postedAt = new Date(post['postedAt']);
//    return {...post, postedAt};
//  }

  save(post: any) {
    return this.socketClient.send('/topic/user/login', post);
  }

  update(post: any) {
    return this.socketClient.send('/topic/user/update', post);
  }

  delete(post: string) {
    return this.socketClient.send('/topic/user/delete', post);
  }

  onSave(id: string): Observable<any> {
    // return this.socketClient.onMessage(id, '/topic/contacts/created').pipe(map(post => PostService.getPostListing(post)));
    return this.socketClient.subscribe('/topic/user/created', id );
  }

  onUpdate(id: string): Observable<any> {
    // return this.socketClient.onMessage(id, '/topic/contacts/update').pipe(map(post => PostService.getPostListing(post)));
    return this.socketClient.subscribe('/topic/user/auth', id );
  }

  onDelete(id: string): Observable<any> {
    // return this.socketClient.onMessage(id, '/topic/contacts/deleted').pipe(map(post => post));
    return this.socketClient.subscribe('/topic/user/deleted', id );
  }

}
