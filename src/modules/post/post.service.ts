// src/post/post.service.ts
import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { User } from '../user/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { EmailService } from '../email/email.service';

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name);
  constructor(
    @InjectRepository(Post)
    private postRepo: Repository<Post>,

    @InjectRepository(User)
    private userRepo: Repository<User>,

    private emailService: EmailService
  ) {}

  async create(userId: number, dto: CreatePostDto): Promise<Post> {
    // checking user is existing or not
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      this.logger.warn(`User ID ${userId} not found`);
      throw new NotFoundException(`User ID ${userId} not found`);
    }

    const post = this.postRepo.create({
      title: dto.title,
      content: dto.content,
      user,
    });

    this.logger.log(`Creating post for user ID ${userId}`);

    const savedPost = await this.postRepo.save(post);

    /**
     * ---------------------------------------------------
     *  📧 TRIGGER EMAIL AFTER POST CREATION
     * ---------------------------------------------------
     */

    this.logger.log(`Email Queuuing starts`);
    await this.emailService.createEmail({
      to: user.email,
      subject: 'New Post Created',
      template: 'welcome.html',   // template file
      payload: {
        username: user.name,
        postTitle: savedPost.title,
        postContent: savedPost.content,
        createdAt: new Date().toLocaleString(),
      },
    });

    this.logger.log(`Email queued for post ID ${savedPost.id}`);

    return savedPost;
  }


  async findAll(): Promise<Post[]> {
    const posts = await this.postRepo.find({ relations: ['user'] });
    this.logger.log(`Fetched ${posts.length} posts`);
    return posts;
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postRepo.findOne({ where: { id }, relations: ['user'] });
    if (!post) {
      this.logger.warn(`Post ID ${id} not found`);
      throw new NotFoundException(`Post ID ${id} not found`);
    }
    return post;
  }

  async update(id: number, dto: UpdatePostDto): Promise<Post> {
    const post = await this.findOne(id);
    Object.assign(post, dto);
    this.logger.log(`Updating post ID ${id}`);
    return this.postRepo.save(post);
  }

  async remove(id: number): Promise<void> {
    const result = await this.postRepo.delete(id);
    if (result.affected === 0) {
      this.logger.warn(`Post ID ${id} not found`);
      throw new NotFoundException(`Post ID ${id} not found`);
    }
    this.logger.log(`Deleted post ID ${id}`);
  }
}
