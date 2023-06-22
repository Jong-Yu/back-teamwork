import { Body, Controller, Post } from '@nestjs/common';
import { PostDto } from '../generated/nestjs-dto/post/dto/post.dto';

@Controller('post')
export class PostController {
  @Post()
  getPosts(@Body() dto: PostDto) {
    return dto;
  }
}
