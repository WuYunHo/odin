import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entity/user';

@Provide()
export class UsersService {
  @InjectEntityModel(Users)
  usersModel: Repository<Users>

  async usersLogin(account: string, password: string){
        // find one by name
        let finduser = await this.usersModel.findOne({
          where: { account: account }
        });
        console.log("message of the user:", finduser)
        // console.log('service password',account, password)

        if(finduser == null){
          return {state: 1}
        }

        if(finduser.password == password){
          return finduser
        }else{
          return {state : 0}
        }      
  }

  async usersUpdate(id: number, tel: string, addr: string, birth: string, major: string){
    // find one by name
    let finduser = await this.usersModel.findOne({
      where: { id: id }
    });

    finduser.tel = tel;
    finduser.addr = addr;
    finduser.birth = birth;
    finduser.major = major;

    const user = await this.usersModel.save(finduser);
    console.log(user)

    return user
  }

  async freshvoltime(volID: number){
    // find one by name
    let finduser = await this.usersModel.findOne({
      where: { id: volID }
    });

    finduser.voltime = finduser.voltime + 0.25;

    const user = await this.usersModel.save(finduser);
    console.log(user)

    return user
  }

  // 修改密码
  async changePwd(account: string, cardmsg: string, password: string){
    let changeuser = await this.usersModel.findOne({
      where: { account: account }
    });

    if(changeuser.cardmsg == cardmsg){
      changeuser.password = password
    }

    const changedUser = await this.usersModel.save(changeuser);
    return changedUser
  }

  //取用户信息
  async getUserMsg(id: number){
    // find one by name
    if(id == undefined){
      return null
    }

    let user = await this.usersModel.findOne({
      where: { id: id }
    });

    console.log(id, user)

    return user
  }

  //重新请求用户信息
  async getUserbyId(id: number){
    let user = await this.usersModel.findOne({
      where: {
        id: id
      }
    })

    return user
  }

  async addcash(id: number, price: number){
    let prdtuser = await this.usersModel.findOne({
      where:{
        id: id
      }
    })

    prdtuser.cash = prdtuser.cash + price
    await this.usersModel.save(prdtuser)
  }

  async addvoltime(userid: number, duration: number){
    const user = await this.usersModel.findOne({
      where: {
        id: userid
      }
    })

    user.voltime += duration
    await this.usersModel.save(user)
  }
}
