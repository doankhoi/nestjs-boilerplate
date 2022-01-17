import { Post } from '@entities';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PostService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private readonly http: HttpService) {}

  private toPost(item: any): Post {
    return {
      title: item.title,
      body: item.body,
    };
  }
  posts(): Observable<Post> {
    return this.http
      .get(this.apiUrl)
      .pipe(map(({ data }) => data.map(this.toPost)));
  }
}
