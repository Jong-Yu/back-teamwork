// import { User } from '../entity/user.entity';
// import { DataSource, Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
// import { CreateUserDto } from 'src/user/dto/user.dto';

// export class UserRepository extends Repository<User> {
//   constructor(@InjectRepository(User) private dataSource: DataSource) {
//     super(User, dataSource.manager);
//   }

//   async insertUser(user: CreateUserDto) {
//     this.insert(user);
//   }
// }
