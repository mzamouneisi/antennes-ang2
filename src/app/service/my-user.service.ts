import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../compo/config/auth.service';
import { MyUser } from '../data/my-user.model';
import { Aservice } from './Aservice';

@Injectable({
  providedIn: 'root'
})
export class MyUserService extends Aservice {

  private users: MyUser[] = []
  
  getUsers(): MyUser[] {
    return this.users;
  }
  setUsers(list : MyUser[]) {
    this.users = list 
  }

  getIndexInUsers(u: MyUser): number {
    return this.getIndexUserById(u.id)
  }

  private apiUrl = this.API_URL + "users/"

  constructor(private http: HttpClient, private authService : AuthService) {
    super();
  }

  findAll(): Observable<MyUser[]> {   
    return this.http.get<MyUser[]>(`${this.apiUrl}`);
  }

  findById(email: string): Observable<MyUser> {
    return this.http.get<MyUser>(`${this.apiUrl}${email}`);
  }

  add(user: MyUser): Observable<MyUser> {
    console.log("addNew apiUrl, user : ", this.apiUrl, user)
    return this.http.post<MyUser>(this.apiUrl, user);
  }

  save(user: MyUser): Observable<MyUser> {
    console.log("save apiUrl, user : ", this.apiUrl, user)
    return this.http.put<MyUser>(this.apiUrl, user);
  }

  deleteById(user: MyUser): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${user.id}`);
  }

  purgeAndSave(): Observable<void> {
    return this.http.delete<void>(this.apiUrl+"purgeAndSave" );
  }

  importer(list: MyUser[], modeIncremental: boolean, purgeAndSaveData:boolean ): Observable<any> {
    console.log("---- importer modeIncremental, list", modeIncremental, list )

    const requestBody = {
      list,
      modeIncremental,
      purgeAndSaveData
    };

    return this.http.post<any>(this.apiUrl+"importer", requestBody);
  }

  getIndexUserById(id: number | null ): number {
    // return this.users.find(user => user.id === id);
    // console.log("getUserByEmail email", email )
    let user : MyUser | undefined
    let i = -1
    for (let index = 0; index < this.users.length; index++) {
      const u : MyUser = this.users[index];

      if(u.id == id) {
        user = u 
        i = index 
        break 
      }
    }
    return i 
  }

  test(u: MyUser) {
    var url = `${this.apiUrl}email/admin@mysoc.com`
    console.log(url)
    return this.http.get<MyUser>(url);
  }

  /////////////////////
}
