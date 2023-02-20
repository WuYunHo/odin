import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entity/user';

@Provide()
export class UsersService {
  @InjectEntityModel(Users)
  usersModel: Repository<Users>

  // save
  async saveUsers(name: string, password: string) {
    // create a entity object

    const users: Users = new Users();

    users.username = name;
    users.password = password;
    users.type = 0;

    // save entity
    const usersResult = await this.usersModel.save(users);

    // save success
    console.log('product id = ', usersResult.id);

    return usersResult;
  }

  async usersLogin(name: string, password: string){
        // find one by name
        let finduser = await this.usersModel.findOne({
          where: { username: name }
        });
        console.log("message of the user:", finduser);
        if(finduser.password == password){
          return {
            finduser,
            state: true,
          }
        }else{
          return {
            state: false,
          }
        }
  }
}
