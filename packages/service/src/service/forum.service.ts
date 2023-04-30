import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { Activity, Activitylist, Article, Collect, Comment, Light } from '../entity/forum';

// interface commentList {
//   [propName: string]: any
// }

const date = (date: string) => {
  let result = new Date(date).getTime();
  return result;
}

@Provide()
export class ForumService {
  @InjectEntityModel(Article)
  articleModel: Repository<Article>;

  @InjectEntityModel(Comment)
  commentModel: Repository<Comment>;

  @InjectEntityModel(Activity)
  activityModel: Repository<Activity>;

  @InjectEntityModel(Activitylist)
  activitylistModel: Repository<Activitylist>;

  @InjectEntityModel(Collect)
  collectModel: Repository<Collect>;

  @InjectEntityModel(Light)
  lightModel: Repository<Light>;

  // find all ariticles
  async findAriticles() {
    let allArticle = await this.articleModel.find({});
    console.log("All photos from the db: ", allArticle);
  }

  // find user draft
  async findDraft(userID: number) {
    let draft = await this.articleModel.find({
      where: {
        userID: userID,
        // state: 1,
      }
    })
    console.log('there are draft: ', draft)
    return draft
  } 

  async findDrafting() {
    let draft = await this.articleModel.find({
      where: {
        // userID: userID,
        state: 1,
      }
    })
    console.log('there are draft: ', draft)
    return draft
  } 

  async findPubing() {
    let draft = await this.articleModel.find({
      where: {
        // userID: userID,
        state: 3,
      }
    })
    console.log('there are draft: ', draft)
    return draft
  } 

  // add articles
  async saveArticle(context: string, userID: number, title: string, state: number, imgURL: string, username: string) {
    let article = new Article();
    article.state = state;
    article.title = title;
    article.userID = userID;
    article.context = context;
    article.collect = 0;
    article.looks = 0;
    article.light = 0;
    article.imgURL = imgURL;
    article.username = username;

    // save entity
    const articleResult = await this.articleModel.save(article);

    // save success
    console.log('article id = ', articleResult.articleID);
  }

  async pubArticle(articleID: number) {
    let stateUpdate = await this.articleModel.findOne({
      where: {
        articleID: articleID,
      },
    });
    stateUpdate.state = 1;

    await this.articleModel.save(stateUpdate);

    console.log('article state =', stateUpdate.articleID);
  }

  async refuseArticle(articleID: number) {
    let stateUpdate = await this.articleModel.findOne({
      where: {
        articleID: articleID,
      },
    });
    stateUpdate.state = 2;

    await this.articleModel.save(stateUpdate);

    console.log('article state =', stateUpdate.articleID);
  }

  async pubingArticle(articleID: number) {
    let stateUpdate = await this.articleModel.findOne({
      where: {
        articleID: articleID,
      },
    });
    stateUpdate.state = 3;

    await this.articleModel.save(stateUpdate);

    console.log('article state =', stateUpdate.articleID);
  }

  async deleteArticle(articleID: number) {
    const photo = await this.articleModel.findOne({
      where: {
        articleID: articleID,
      },
    });

    // 删除单个
    const deleteArticle = await this.articleModel.remove(photo);
    return deleteArticle
  }

  //点赞
  async lightArticle(articleID: number) {
    const article = await this.articleModel.findOne({
      where: {
        articleID: articleID,
      },
    });
    article.light = article.light + 1
    await this.articleModel.save(article);

    console.log('lighted article:', article);
    return article
  }

   //取消点赞
   async nolightArticle(articleID: number) {
    const article = await this.articleModel.findOne({
      where: {
        articleID: articleID,
      },
    });
    article.light = article.light - 1
    await this.articleModel.save(article);

    console.log('lighted article:', article);
    return article
  }

  //收藏
  async collectArticle(articleID: number) {
    const article = await this.articleModel.findOne({
      where: {
        articleID: articleID,
      },
    });
    article.collect = article.collect + 1
    await this.articleModel.save(article);

    console.log('lighted article:', article);
    return article
  }

  //取消收藏
  async nocollectArticle(articleID: number) {
    const article = await this.articleModel.findOne({
      where: {
        articleID: articleID,
      },
    });
    article.collect = article.collect - 1
    await this.articleModel.save(article);

    console.log('lighted article:', article);
    return article
  }

  // 一级comment
  async addFirstComment(articleID: number, context: string, userID: number, userName: string) {
    let comment = new Comment();
    comment.articleID = articleID;
    comment.context = context;
    comment.userID = userID;
    comment.tarcomID = -1;
    comment.userName = userName;

    // save entity
    const commentResult = await this.commentModel.save(comment);

    // save success
    console.log('comment id = ', commentResult.comID);
  }

  // 二、三级comment
  async addSecondComment(tarcomID: number, context: string, userID: number, userName: string) {
    let comment = new Comment();
    comment.articleID = -1;
    comment.context = context;
    comment.userID = userID;
    comment.tarcomID = tarcomID;
    comment.userName = userName;

    // save entity
    const commentResult = await this.commentModel.save(comment);

    // save success
    console.log('comment id = ', commentResult.comID);
  }

  //删除comment
  async deleteComment(comID: number) {
    let comment = await this.commentModel.find({
      where: {
        comID: comID,
      }
    })

    await this.commentModel.remove(comment)
    return comment
  }

  async findFirstComment(articleID: number) {
    let comment = await this.commentModel.find({
      where: {
        // userID: userID,
        articleID: articleID,
      }
    })
    console.log('there are comments: ', comment)
    return comment
  }

  //二级/三级comment
  async addOtherComment(articleID: number, context: string, userID: number, tarcomID: number) {
    let comment = new Comment();
    comment.articleID = null;
    comment.context = context;
    comment.userID = userID;
    comment.tarcomID = tarcomID;

    // save entity
    const commentResult = await this.commentModel.save(comment);

    // save success
    console.log('comment id = ', commentResult.comID);
  }

  // find all comments
  // async findComments(articleID: number) {

  //   let comments : commentList;
  //   comments.firstcom = await this.commentModel.find({
  //     where: {
  //       articleID: articleID,
  //     }
  //   });

  //   //循环一级评论
  //   for (const key in comments.firstcom) {
  //     comments.firstcom[key].secondcom = await this.commentModel.find({
  //       where: {
  //         tarcomID: Equal(comments.firstcom[key].comID)
  //       }
  //     })

  //     //循环二级评论
  //     for (const seckey in comments.firstcom[key].secondcom) {
  //       let thirdcom = [];
  //       const getThirdCom = async (id: number) => {
  //         const result = this.commentModel.find({
  //           where: {
  //             tarcomID: Equal(comments.firstcom[key].secondcom[seckey].comID)
  //           }
  //         })
  //         if(!result) return;
  //         for(const item of await result) {
  //           thirdcom.push(item)
  //           await getThirdCom(item.comID)
  //         }
  //       }
  //       getThirdCom(comments.firstcom[key].secondcom[seckey].comID);
  //       comments.firstcom[key].secondcom[seckey].thirdcom = thirdcom;
  //     }  
  //   }
  //   console.log("All comments are", comments);
  // }

  //导出评论表
  async findComments(){
    let allcomments = await this.commentModel.find({});

    return allcomments
  }

  async saveActivity(actvname: string, actvaddr: string, actvtime: string, actvduration: number, actvtext: string, leaderID: number, leadername: string, leadertel: string, needp: number, imgURL: string) {
    let activity = new Activity();
    activity.state = 0;
    activity.actvname = actvname;
    activity.actvaddr = actvaddr;
    activity.actvtime = actvtime;
    activity.actvduration = actvduration;
    activity.actvtext = actvtext;
    activity.leaderID = leaderID;
    activity.leadername = leadername;
    activity.leadertel = leadertel;
    activity.needp = needp;
    activity.imgURL = imgURL;

    // save entity
    const activityResult = await this.activityModel.save(activity);

    // save success
    console.log('activity id = ', activityResult.actvid);
  }

  async findActivity(leaderID: number) {
    let actv = await this.activityModel.find({
      where: {
        leaderID: leaderID,
        // state: 1,
      }
    })
    return actv
  } 

  async pubActivity(actvid: number) {
    let stateUpdate = await this.activityModel.findOne({
      where: {
        actvid: actvid,
      },
    });
    stateUpdate.state = 1;

    await this.activityModel.save(stateUpdate);

    console.log('activity state =', stateUpdate.actvid);
  }

  async deleteActivity(actvid: number) {
    const actv = await this.activityModel.findOne({
      where: {
        actvid: actvid,
      },
    });

    // 删除单个
    const deleteArticle = await this.activityModel.remove(actv);
    return deleteArticle
  }

  async refuseActivity(actvid: number) {
    let stateUpdate = await this.activityModel.findOne({
      where: {
        actvid: actvid,
      },
    });
    stateUpdate.state = 2;

    await this.activityModel.save(stateUpdate);

    console.log('article state =', stateUpdate.actvid);
  }

  async pubingActivity(actvid: number) {
    let stateUpdate = await this.activityModel.findOne({
      where: {
        actvid: actvid,
      },
    });
    stateUpdate.state = 3;

    await this.activityModel.save(stateUpdate);

    console.log('article state =', stateUpdate.actvid);
  }

  async findactvDrafting() {
    let draft = await this.activityModel.find({
      where: {
        // userID: userID,
        state: 1,
      }
    })
    return draft
  } 

  async findactvPubing() {
    let actv = await this.activityModel.find({
      where: {
        // userID: userID,
        state: 3,
      }
    })
    return actv
  } 

  //志愿者报名活动，alreadyp人数加1
  async volSignUp(actvid: number) {
    let actv = await this.activityModel.findOne({
      where: {
        actvid: actvid,
      }
    })

    actv.alreadyp = actv.alreadyp + 1;

    await this.activityModel.save(actv);

    return actv
  } 

  //志愿者取消报名活动，alreadyp人数-1
  async volnoSignUp(actvid: number) {
    let actv = await this.activityModel.findOne({
      where: {
        actvid: actvid,
      }
    })

    actv.alreadyp = actv.alreadyp - 1;

    await this.activityModel.save(actv);

    return actv
  } 

  async saveActivityList(actvid: number, menberID: number, menbername: string, menbertel: string) {
    let activityList = new Activitylist();
    activityList.actvID = actvid,
    activityList.menberID = menberID,
    activityList.menbername = menbername,
    activityList.menbertel = menbertel

    // save entity
    const activityListResult = await this.activitylistModel.save(activityList);

    // save success
    console.log('activityList id = ', activityListResult.actvID);
  }

  async findUseractv(leaderID: number) {
    let actv = await this.activityModel.find({
      where: {
        leaderID: leaderID,
        state: 3
      }
    })
    return actv
  } 

  async findUseractvlist(actvID: number) {
    let actvlist = await this.activitylistModel.find({
      where: {
        actvID: actvID
      }
    })
    return actvlist
  } 

  async findAllactvList() {
    let allactvList = await this.activitylistModel.find({})

    return allactvList
  }

  async cutactvList(actvID: number, menberID: number) {
    let temp = await this.activitylistModel.findOne({
      where: {
        actvID: actvID,
        menberID: menberID,
      }
    })

    let actv = await this.activitylistModel.remove(temp)
    return actv
  }

  async commentChart() {
    let comment = await this.commentModel.find({})

    let arr = []
    for(let i = 0; i < 7; i++) {
      let tmp = 0
      for(let item of comment) {
        if(86400000 * i < Date.parse(new Date().toString()) - date(item.pubtime.toString()) && Date.parse(new Date().toString()) - date(item.pubtime.toString()) < 86400000 * (i + 1)) {
          tmp += 1
        }
      }
      arr[i] = {'date': i.toString()+'天内', 'num': tmp}
    }
    
    return arr
  }

  async actvChart() {
    let actv = await this.activityModel.find({})

    let arr = []
    // let alltime = 0
    for(let i = 0; i < 30; i++){
      let daytime = 0
      let alltime = 0
      for(let item of actv) {
        // console.log(Date.parse(new Date().toString()) - date(item.actvtime.toString()))
        if(86400000 * i < - Date.parse(new Date().toString()) + date(item.actvtime.toString()) && - Date.parse(new Date().toString()) + date(item.actvtime.toString()) < 86400000 * (i + 1)) {
          daytime += 1
          alltime += item.actvduration
        }
      }
      arr[i] = {'type': '活动数量' ,'date': i.toString()+'天内', 'num': daytime}
      arr[i+30] = {'type': '活动时间' ,'date': i.toString()+'天内', 'num': alltime}
    }
    // console.log(arr)
    return arr
  }
  
  async addCollect(userID: number, articleID: number) {
    let collect = new Collect();
    collect.userID = userID;
    collect.articleID = articleID;

    await this.collectModel.save(collect)
  }

  async cutCollect(userID: number, articleID: number) {
    const collect = await this.collectModel.find({
      where: {
        userID: userID,
        articleID: articleID,
      }
    })

    const testcollect = await this.collectModel.remove(collect);
    console.log(testcollect)
  }

  async findCollect() {
    const allcollect = await this.collectModel.find({})

    return allcollect
  }

  async addLight(userID: number, articleID: number) {
    let collect = new Light();
    collect.userID = userID;
    collect.articleID = articleID;

    await this.lightModel.save(collect)
  }

  async cutLight(userID: number, articleID: number) {
    const collect = await this.lightModel.find({
      where: {
        userID: userID,
        articleID: articleID,
      }
    })

    const testcollect = await this.lightModel.remove(collect);
    console.log(testcollect)
  }

  async findLight() {
    const allcollect = await this.lightModel.find({})

    return allcollect
  }

  async punchactv(actvid: number, userid: number){
    const actv = await this.activityModel.findOne({
      where: {
        actvid: actvid
      }
    })

    console.log(date(actv.actvtime) - Date.parse(new Date().toString()))
    if(date(actv.actvtime) -  Date.parse(new Date().toString()) < 1000*60*60){
      //将目标用户在目标活动中状态改为1
      const actvlist = await this.activitylistModel.findOne({
        where: {
          actvID: actvid,
          menberID: userid,
        }
      })

      actvlist.state = 1;
      await this.activitylistModel.save(actvlist)
      return 1;
    }else{
      return 0;
    }
  }

  async finishactv(actvid: number, userid: number){
    const actv = await this.activityModel.findOne({
      where: {
        actvid: actvid
      }
    })

    const actvlist = await this.activitylistModel.findOne({
      where: {
        actvID: actvid,
        menberID: userid,
      }
    })

    actvlist.state = 2;
    await this.activitylistModel.save(actvlist)

    return actv.actvduration;
  }

  async quitactv(actvid: number, userid: number){
    const actv = await this.activityModel.findOne({
      where: {
        actvid: actvid
      }
    })

    if(date(actv.actvtime) -  Date.parse(new Date().toString()) > 1000*60*60*24*2){
      actv.alreadyp -= 1;
      await this.activityModel.save(actv)

      const actvlist = await this.activitylistModel.findOne({
        where: {
          actvID: actvid,
          menberID: userid
        }
      })

      await this.activitylistModel.remove(actvlist)
      return 1;
    }else if(- date(actv.actvtime) + Date.parse(new Date().toString()) > 1000*60*60*actv.actvduration){
      return 2;
    }else{
      return 0;
    }
  }
}


